import re, os, glob, sys, urllib.parse, concurrent.futures, subprocess
import pathlib
REPO=str(pathlib.Path(__file__).resolve().parents[2]); PUB=REPO+'/public'; HOST='https://thesummitexperts.com'
urls=set()
pat=re.compile(r'(?:https?:)?(?:\\/|/){2}thesummitexperts\.com((?:\\/|/)wp-(?:content|includes)(?:\\/|/)[^"\'\s<>)]+)')
for f in glob.glob(REPO+'/.wp-capture/html/*.html'):
    s=open(f,encoding='utf-8').read()
    for m in pat.finditer(s):
        p=m.group(1).replace('\\/','/').replace('&amp;','&')
        p=p.split('&quot;')[0].split('&#039;')[0]
        p=p.split(',')[0] if ' ' in p else p
        urls.add(p)
if os.path.exists(REPO+'/.wp-capture/requests.txt'):
    for u in open(REPO+'/.wp-capture/requests.txt').read().split():
        pu=urllib.parse.urlparse(u)
        if pu.path.startswith(('/wp-content','/wp-includes')): urls.add(pu.path)
def clean(p):
    p=urllib.parse.urlparse(p).path
    return urllib.parse.unquote(p)
done=set()
def fetch(p):
    p=clean(p)
    if p in done: return None
    done.add(p)
    dest=PUB+p
    if os.path.exists(dest) and os.path.getsize(dest)>0: return dest
    os.makedirs(os.path.dirname(dest),exist_ok=True)
    r=subprocess.run(['curl','-sfL','--retry','2','-o',dest,HOST+urllib.parse.quote(p)])
    if r.returncode!=0:
        if os.path.exists(dest): os.remove(dest)
        print('FAIL',p); return None
    return dest
def css_refs(path,p):
    s=open(path,encoding='utf-8',errors='ignore').read()
    out=[]
    for m in re.finditer(r'url\(\s*[\'"]?([^\'")]+)',s):
        u=m.group(1)
        if u.startswith('data:') or u.startswith('#'): continue
        if u.startswith('http'):
            if 'thesummitexperts.com' not in u: continue
            out.append(urllib.parse.urlparse(u).path); continue
        out.append(urllib.parse.urljoin(p,u))
    for m in re.finditer(r'@import\s+(?:url\()?[\'"]([^\'"]+)',s):
        out.append(urllib.parse.urljoin(p,m.group(1)))
    return out
queue=list(urls)
while queue:
    batch=[clean(q) for q in queue if clean(q) not in done]; queue=[]
    with concurrent.futures.ThreadPoolExecutor(16) as ex:
        res=list(ex.map(lambda p:(p,fetch(p)),batch))
    for p,d in res:
        if d and d.endswith('.css'): queue+=css_refs(d,p)
print('files',len(done))
