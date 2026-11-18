import re, json, os, glob
from bs4 import BeautifulSoup
import pathlib
REPO=str(pathlib.Path(__file__).resolve().parents[2]); WP=REPO+'/.wp-capture/html'
OUTP=f'{REPO}/.wp-capture/out/pages'; OUTM=f'{REPO}/.wp-capture/out/meta'
os.makedirs(OUTP,exist_ok=True); os.makedirs(OUTM,exist_ok=True)
for f in glob.glob(OUTP+'/*')+glob.glob(OUTM+'/*'): os.remove(f)
redirects={}
for line in open(''+REPO+'/.wp-capture/redirects.txt'):
    a,b=line.split(); redirects[a]=b
def rw(s):
    s=s.replace('https:\\/\\/thesummitexperts.com\\/','\\/').replace('http:\\/\\/thesummitexperts.com\\/','\\/')
    s=re.sub(r'(https?:)?//(www\.)?thesummitexperts\.com/', '/', s)
    s=re.sub(r'(["\'])https?://(www\.)?thesummitexperts\.com\1', r'\1/\1', s)
    return s
routes={}
for path in sorted(glob.glob(WP+'/*.html')):
    name=os.path.basename(path)[:-5]
    url='/' if name=='home' else ('/404' if name=='__404' else '/'+name.replace('__','/')+'/')
    if 'https://thesummitexperts.com'+url in redirects: continue
    key='index' if name=='home' else name
    raw=open(path,encoding='utf-8').read()
    hm=re.search(r'<head>(.*?)</head>',raw,re.S); bm=re.search(r'<body([^>]*)>(.*)</body>',raw,re.S)
    headraw=hm.group(1); bodyattrs=bm.group(1); bodyraw=bm.group(2)
    bodyclass=re.search(r'class="([^"]*)"',bodyattrs).group(1)
    soup=BeautifulSoup(headraw,'html.parser')
    meta=[];links=[];jsonld=[];title='';assets=[];vp=0
    for el in soup.children:
        n=getattr(el,'name',None)
        if not n: continue
        if n=='title': title=el.get_text()
        elif n=='meta':
            a=dict(el.attrs)
            if a.get('charset'): continue
            # the root renders the first viewport meta; keep any repeats
            if a.get('name')=='viewport':
                vp+=1
                if vp==1: continue
            meta.append(a)
        elif n=='link' and 'stylesheet' not in (el.get('rel') or []) and el.get('rel')!=['preload']:
            a=dict(el.attrs); a['rel']=' '.join(a['rel']) if isinstance(a.get('rel'),list) else a.get('rel')
            if 'sizes' in a and isinstance(a['sizes'],list): a['sizes']=' '.join(a['sizes'])
            links.append(a)
        elif n=='script' and el.get('type')=='application/ld+json':
            jsonld.append(el.string)
        else:
            assets.append(n)
    # keep raw head assets (styles/scripts/noscript/stylesheet links) in order, from raw text
    # remove title/meta/non-stylesheet link/jsonld from raw head
    h=headraw
    h=re.sub(r'<title>.*?</title>','',h,flags=re.S)
    h=re.sub(r'<meta\b[^>]*>','',h)
    h=re.sub(r'<script type="application/ld\+json"[^>]*>.*?</script>','',h,flags=re.S)
    def keeplink(m):
        t=m.group(0)
        return t if re.search(r"rel=['\"](stylesheet|preload)['\"]",t) else ''
    h=re.sub(r'<link\b[^>]*>',keeplink,h)
    h=re.sub(r'<!--.*?-->','',h,flags=re.S)
    h=re.sub(r'\n\s*\n+','\n',h)
    payload=rw(h)+'\n'+rw(bodyraw)
    open(f'{OUTP}/{key}.html','w',encoding='utf-8').write(payload)
    lang=re.search(r'<html([^>]*)>',raw).group(1)
    json.dump({'title':title,'bodyClass':bodyclass,'meta':meta,'links':links,'jsonld':jsonld},open(f'{OUTM}/{key}.json','w',encoding='utf-8'),ensure_ascii=False)
    routes[url]=key
red={a.replace('https://thesummitexperts.com',''):b.replace('https://thesummitexperts.com','')+('/' if not b.endswith('/') else '') for a,b in redirects.items()}
json.dump({'routes':routes,'redirects':red},open(f'{REPO}/src/wp/routes.json','w'),indent=1)
print(len(routes),'pages;',len(red),'redirects')

# Pack pages (a few per file) and meta into src/wp — see src/wp/content.ts.
pages=sorted(glob.glob(OUTP+'/*.html'))
packs=[];cur=[];size=0
for p in pages:
    sz=os.path.getsize(p)
    if cur and size+sz>3_400_000: packs.append(cur);cur=[];size=0
    cur.append(p);size+=sz
packs.append(cur)
os.makedirs(REPO+'/src/wp/packs',exist_ok=True)
for f in glob.glob(REPO+'/src/wp/packs/*'): os.remove(f)
for i,pk in enumerate(packs,1):
    with open(f'{REPO}/src/wp/packs/pages-{i:02d}.html','w',encoding='utf-8') as o:
        for p in pk:
            o.write(f'<!--@@wp-page:{os.path.basename(p)[:-5]}@@-->\n'); o.write(open(p,encoding='utf-8').read()); o.write('\n')
meta={os.path.basename(p)[:-5]:json.load(open(p,encoding='utf-8')) for p in sorted(glob.glob(OUTM+'/*.json'))}
json.dump(meta,open(REPO+'/src/wp/meta.json','w',encoding='utf-8'),ensure_ascii=False,separators=(',',':'))
