export type Category = "cultural" | "adventure";

export type Tour = {
  slug: string;
  title: string;
  excerpt: string;
  price: number | null;
  days: string;
  group: string;
  season: string;
  category: Category;
  image: string;
  overview: string;
  highlights: string[];
  popular?: boolean;
};

export const tours: Tour[] = [
  {
    slug: "broad-peak",
    title: "Broad Peak Expedition – 45 Days",
    excerpt: "Broad Peak (8,051m) is the 12th highest mountain in the world…..",
    price: null,
    days: "45 Days",
    group: "Private / small team",
    season: "Summer",
    category: "adventure",
    image: "/media/tours/broad.jpg",
    popular: true,
    overview:
      "Broad Peak (8,051m) is the 12th highest mountain in the world and one of the great Karakoram 8,000ers. This 45-day expedition follows the classic route above Concordia, with full logistics, high-altitude support, and a team that has climbed these peaks themselves.",
    highlights: [
      "Attempt of Broad Peak, 8,051m",
      "Approach via Skardu, Askole, and the Baltoro Glacier",
      "Views of K2, Gasherbrum, and the Godwin-Austen Glacier",
      "Full expedition logistics and base-camp support",
    ],
  },
  {
    slug: "snow-lake-trek",
    title: "Snow Lake Trek (21 Days): A Journey Across Glaciers",
    excerpt: "The Snow Lake Trek is an extraordinary journey to one of the most stunning…",
    price: 2750,
    days: "21 Days",
    group: "5–12 People",
    season: "Summer",
    category: "adventure",
    image: "/media/tours/snow.jpg",
    popular: true,
    overview:
      "The Snow Lake Trek is an extraordinary journey to one of the most stunning high glacial basins on earth. Crossing the Biafo and Hispar glaciers, the route links Askole with Hunza through a wilderness of ice, rock, and 7,000m peaks.",
    highlights: [
      "Biafo–Hispar traverse and Snow Lake",
      "Remote camping on the Karakoram glaciers",
      "Finish in the Hunza Valley",
      "For strong, experienced trekkers",
    ],
  },
  {
    slug: "spantik-peak-expedition",
    title: "Spantik Peak Expedition – 31 Days",
    excerpt: "The Spantik Peak Expedition is an incredible 31-day adventure…",
    price: 4640,
    days: "31 Days",
    group: "4–10 People",
    season: "Summer",
    category: "adventure",
    image: "/media/tours/spantik.jpg",
    popular: true,
    overview:
      "The Spantik Peak Expedition is an incredible 31-day adventure on the Golden Peak (7,027m). Its elegant southeast ridge is one of the most beautiful snow climbs in the Karakoram, approached from the Hunza side.",
    highlights: [
      "Climb of Spantik, 7,027m",
      "Golden ridge at sunrise",
      "Hunza Valley acclimatization",
      "Guided by climbers who know this mountain",
    ],
  },
  {
    slug: "k2-gondogoro-la-circuit-trek",
    title: "K2 Gondogoro La Circuit Trek – 21 Days",
    excerpt: "The K2 Gondogoro La Circuit Trek is an extension of the classic K2 Base Camp…",
    price: 2690,
    days: "21 Days",
    group: "5–12 People",
    season: "Summer",
    category: "adventure",
    image: "/media/tours/gondogoro.jpg",
    popular: true,
    overview:
      "The K2 Gondogoro La Circuit Trek is an extension of the classic K2 Base Camp trek. After Concordia you cross the 5,585m Gondogoro La pass and descend into the Hushe Valley — one of the great mountain circuits of the world.",
    highlights: [
      "K2 Base Camp and Concordia",
      "Crossing of Gondogoro La (5,585m)",
      "Hushe Valley descent",
      "Trango Towers, Broad Peak, and Gasherbrum views",
    ],
  },
  {
    slug: "skardu-hunza-tour-14-summer",
    title: "Skardu & Hunza Valley – 14 Days By Road – Summer & Autumn",
    excerpt: "(Summer & Autumn) A breathtaking 14-day road adventure through the…",
    price: 1655,
    days: "14 Days",
    group: "2–12 People",
    season: "Summer & Autumn",
    category: "adventure",
    image: "/media/tours/hunza14.jpg",
    popular: true,
    overview:
      "A breathtaking 14-day road adventure through the Karakoram Highway, linking Islamabad with Skardu and Hunza. Forts, lakes, apricot valleys, and the high passes of northern Pakistan, traveled by road at a comfortable pace.",
    highlights: [
      "Karakoram Highway by road",
      "Skardu, Shigar, and Khaplu",
      "Hunza, Karimabad, and Attabad Lake",
      "Summer and autumn departures",
    ],
  },
  {
    slug: "skardu-hunza-tour-12-summer",
    title: "Skardu & Hunza Valley – 12 Days By Air – Summer & Autumn",
    excerpt: "(Summer & Autumn) The splendor of Gilgit-Baltistan on this spectacular…",
    price: 1725,
    days: "12 Days",
    group: "2–12 People",
    season: "Summer & Autumn",
    category: "adventure",
    image: "/media/tours/hunza12.jpg",
    popular: true,
    overview:
      "The splendor of Gilgit-Baltistan on this spectacular 12-day journey by air. Fly into the high valleys, then explore Skardu’s lakes and forts and the terraces of Hunza without the long road transfer.",
    highlights: [
      "Scenic flight into the mountains",
      "Shangrila, Kachura, and Skardu Fort",
      "Hunza Valley and Baltit Fort",
      "Ideal first trip to the north",
    ],
  },
  {
    slug: "k2-base-camp-trek",
    title: "K2 Base Camp Trek – 21 Days – World’s Second-Highest Peak",
    excerpt: "The K2 Base Camp Trek is one of the most iconic and challenging trekking…",
    price: 2590,
    days: "21 Days",
    group: "5–12 People",
    season: "Summer",
    category: "adventure",
    image: "/media/tours/k2.jpg",
    overview:
      "The K2 Base Camp Trek is one of the most iconic and challenging trekking adventures in the world. Taking you deep into the heart of the Karakoram, this 21-day expedition offers breathtaking views of towering peaks, including K2 (8,611m), Broad Peak, and the Trango Towers. The journey follows the legendary Baltoro Glacier, leading to Concordia, the “Throne Room of the Mountain Gods.”",
    highlights: [
      "Unparalleled scenery of K2, Broad Peak, and the Gasherbrums",
      "Trek through one of the world’s most rugged landscapes",
      "Skardu and Askole, the last village before the ice",
      "For experienced trekkers seeking a high-altitude expedition",
    ],
  },
  {
    slug: "fairy-meadows-8-days",
    title: "Fairy Meadows & Nanga Parbat Base Camp – 8 Days",
    excerpt: "The Fairy Meadows Tour offers an unforgettable adventure…",
    price: 911,
    days: "8 Days",
    group: "2–12 People",
    season: "Summer & Autumn",
    category: "adventure",
    image: "/media/tours/fairy.jpg",
    overview:
      "The Fairy Meadows tour offers an unforgettable adventure beneath Nanga Parbat, the ninth highest mountain on earth. A jeep track, a meadow camp, and a walk toward base camp with the Rupal and Raikot faces filling the sky.",
    highlights: [
      "Fairy Meadows camps with Nanga Parbat views",
      "Walk toward Nanga Parbat base camp",
      "Raikot Bridge jeep adventure",
      "Suitable for fit first-time trekkers",
    ],
  },
  {
    slug: "rakaposhi-base-camp-trek",
    title: "Rakaposhi Base Camp & Diran Peak Base Camp – 11 Days",
    excerpt: "This adventure takes you deep into the heart of the Karakoram….",
    price: 1275,
    days: "11 Days",
    group: "2–12 People",
    season: "Summer",
    category: "adventure",
    image: "/media/tours/rakaposhi.jpg",
    overview:
      "This adventure takes you deep into the heart of the Karakoram, from the orchards of Hunza to the pastures under Rakaposhi (7,788m) and Diran. Two base camps, one valley, and some of the finest mountain walls in Pakistan.",
    highlights: [
      "Rakaposhi and Diran base camps",
      "Minapin and the Hunza orchards",
      "Moderate high-valley trekking",
      "Time in Karimabad",
    ],
  },
  {
    slug: "khosar-gang-expedition",
    title: "Khosar Gang Expedition – 15 Days",
    excerpt: "The Khosar Gang Expedition is an ideal 6000m peak climb…",
    price: 1750,
    days: "15 Days",
    group: "4–10 People",
    season: "Summer",
    category: "adventure",
    image: "/media/tours/khosar.jpg",
    overview:
      "The Khosar Gang Expedition is an ideal 6,000m peak climb for mountaineers stepping up from trekking peaks. A compact Karakoram objective with proper acclimatization, glacier travel, and summit support.",
    highlights: [
      "6,000m summit objective",
      "Glacier skills and guided climbing",
      "Skardu logistics",
      "Small team, high attention",
    ],
  },
  {
    slug: "skardu-tour-9-summer",
    title: "Skardu – 9 Days By Air – Summer & Autumn",
    excerpt: "(Summer & Autumn) The enchanting Skardu Valley on this remarkable 9-day…",
    price: 1299,
    days: "9 Days",
    group: "2–12 People",
    season: "Summer & Autumn",
    category: "adventure",
    image: "/media/tours/skardu9.jpg",
    overview:
      "The enchanting Skardu Valley on this remarkable 9-day journey by air. Lakes the color of glacial flour, forts above the Indus, and the gateways to the Baltoro — without committing to a full trek.",
    highlights: [
      "Flight to Skardu",
      "Shangrila and Upper Kachura",
      "Khaplu Palace and Shigar",
      "Deosai when the road is open",
    ],
  },
  {
    slug: "nanga-parbat",
    title: "Nanga Parbat Expedition",
    excerpt: "The Killer Mountain — an 8,000m objective on the western anchor of the Himalaya.",
    price: null,
    days: "Expedition",
    group: "Small team",
    season: "Summer",
    category: "adventure",
    image: "/media/tours/nanga.jpg",
    overview:
      "Nanga Parbat (8,126m) anchors the western Himalaya. Summit Experts supports climbers on this historic mountain with the same local leadership that has stood on its summit — including an oxygen-free ascent in 2023.",
    highlights: [
      "8,126m expedition objective",
      "Local leadership with a Nanga Parbat summit",
      "Full permit and logistics handling",
      "Briefing and preparation in Islamabad",
    ],
  },
  {
    slug: "kartarpur-day-trip",
    title: "Kartarpur Corridor Day Trip – (All Season)",
    excerpt: "Kartarpur Sahib, one of the holiest sites in Sikhism…",
    price: 135,
    days: "1 Day",
    group: "Private or group",
    season: "All Season",
    category: "cultural",
    image: "/media/tours/kartarpur.jpg",
    overview:
      "Kartarpur Sahib, one of the holiest sites in Sikhism, sits just across the Ravi from the Indian border. This full-day journey from Lahore or the corridor gate is a quiet, profound pilgrimage through the fields Guru Nanak walked.",
    highlights: ["Gurdwara Darbar Sahib Kartarpur", "All-season day trip", "Guide and transport", "Spiritual, not strenuous"],
  },
  {
    slug: "khewra-salt-mine-day-trip",
    title: "Khewra Salt Mine & Katasraj Temple Day Trip (All Season)",
    excerpt: "Embark on an exciting day trip from Islamabad to Khewra…",
    price: 130,
    days: "1 Day",
    group: "Private or group",
    season: "All Season",
    category: "cultural",
    image: "/media/tours/khewra.jpg",
    overview:
      "Embark on an exciting day trip from Islamabad to Khewra, the world’s second-largest salt mine, and the ancient Katasraj temple complex — a Hindu sacred site set among the Salt Range hills.",
    highlights: ["Khewra Salt Mine", "Katasraj Temples", "Salt Range scenery", "Departing Islamabad"],
  },
  {
    slug: "taxila-day-trip",
    title: "Taxila City Tour – Day Trip (All Season)",
    excerpt: "Taxila, a UNESCO World Heritage Site, is one of the most…",
    price: 115,
    days: "1 Day",
    group: "Private or group",
    season: "All Season",
    category: "cultural",
    image: "/media/tours/taxila.jpg",
    overview:
      "Taxila, a UNESCO World Heritage Site, is one of the most important archaeological landscapes in Asia. Monasteries, stupas, and the crossroads of Greek, Persian, and Gandharan civilization, an hour from Islamabad.",
    highlights: ["UNESCO World Heritage", "Dharmarajika and Jaulian", "Museum visit", "Easy day from Islamabad"],
  },
  {
    slug: "peshawar-day-trip",
    title: "Peshawar City Tour – Day Trip (All Season)",
    excerpt: "Step back in time and immerse yourself in the rich history of Peshawar…",
    price: 115,
    days: "1 Day",
    group: "Private or group",
    season: "All Season",
    category: "cultural",
    image: "/media/tours/peshawar.jpg",
    overview:
      "Step back in time and immerse yourself in the rich history of Peshawar — the old city, the Storytellers’ Bazaar, Mughal mosques, and the gateway culture of the Khyber.",
    highlights: ["Qissa Khwani Bazaar", "Old city lanes", "Mughal monuments", "All-season departure"],
  },
  {
    slug: "karachi-day-trip",
    title: "Karachi City Tour – Day Trip (All Season)",
    excerpt: "Karachi, Pakistan’s bustling metropolis, is a city rich in history, culture….",
    price: 125,
    days: "1 Day",
    group: "Private or group",
    season: "All Season",
    category: "cultural",
    image: "/media/tours/karachi.jpg",
    overview:
      "Karachi, Pakistan’s bustling metropolis, is a city rich in history and culture. A day through colonial facades, the Quaid’s mausoleum, the harbor air, and the food that makes the city itself.",
    highlights: ["Mazar-e-Quaid", "Colonial Saddar and the port", "Local food stops", "Private vehicle and guide"],
  },
  {
    slug: "lahore-day-trip",
    title: "Lahore City Tour – Day Trip (All Season)",
    excerpt: "Your journey through Lahore begins with a hotel pick-up, setting the stage…",
    price: 100,
    days: "1 Day",
    group: "Private or group",
    season: "All Season",
    category: "cultural",
    image: "/media/tours/lahore.jpg",
    overview:
      "Your journey through Lahore begins with a hotel pick-up, setting the stage for the Mughal capital: Badshahi Mosque, Lahore Fort, the Walled City, and a meal that explains why people return.",
    highlights: ["Badshahi Mosque and Lahore Fort", "Walled City walk", "Hotel pick-up", "All season"],
  },
  {
    slug: "islamabad-day-trip",
    title: "Islamabad City Tour – Day Trip (All Season)",
    excerpt: "Islamabad, the capital of Pakistan, is a city that blends modernity….",
    price: 100,
    days: "1 Day",
    group: "Private or group",
    season: "All Season",
    category: "cultural",
    image: "/media/tours/islamabad.jpg",
    overview:
      "Islamabad, the capital of Pakistan, is a city that blends modernity with the Margalla Hills. Faisal Mosque, the Pakistan Monument, Saidpur, and viewpoints over the capital.",
    highlights: ["Faisal Mosque", "Pakistan Monument", "Margalla viewpoints", "Relaxed city pace"],
  },
  {
    slug: "unesco-world-heritage-tour-pakistan-12-days",
    title: "UNESCO World Heritage Sites in Pakistan – 12 Days",
    excerpt: "Embark on an extraordinary journey through Pakistan’s most…",
    price: 1495,
    days: "12 Days",
    group: "2–12 People",
    season: "All Season",
    category: "cultural",
    image: "/media/tours/unesco.jpg",
    overview:
      "Embark on an extraordinary journey through Pakistan’s most important heritage: Mughal Lahore, the Indus ruins, Makli, Mohenjo-daro’s story, Taxila, and the living forts of the north where roads allow.",
    highlights: [
      "Lahore’s Mughal ensemble",
      "Taxila and the Salt Range",
      "Makli and Sindh’s monuments",
      "Designed for culture-first travelers",
    ],
  },
  {
    slug: "chitral-valley-tour-09-days",
    title: "Chitral & Kalash Valley – 9 Days – Summer & Autumn",
    excerpt: "The Chitral and Kalash Valley Tour offers a unique blend…",
    price: 915,
    days: "9 Days",
    group: "2–10 People",
    season: "Summer & Autumn",
    category: "cultural",
    image: "/media/tours/chitral.jpg",
    overview:
      "The Chitral and Kalash Valley tour offers a unique blend of Hindu Kush scenery and one of the oldest living cultures in the mountains. Valleys of walnut, cedar, and festival color beneath Tirich Mir.",
    highlights: ["Kalash valleys", "Chitral town and fort", "Tirich Mir views", "Summer and autumn"],
  },
  {
    slug: "sikh-pilgramage-7-days",
    title: "Sikh Pilgrimage – 7 Days – March, April, June & November",
    excerpt: "The Sikh Pilgrimage Tour offers a profound spiritual…",
    price: 699,
    days: "7 Days",
    group: "Private or group",
    season: "March, April, June & November",
    category: "cultural",
    image: "/media/tours/sikh.jpg",
    overview:
      "The Sikh Pilgrimage Tour offers a profound spiritual route through the gurdwaras of Punjab and the Kartarpur Corridor — Nankana Sahib, Panja Sahib, and the places tied to Guru Nanak’s life.",
    highlights: [
      "Nankana Sahib and Panja Sahib",
      "Kartarpur Corridor",
      "Fixed seasonal departures",
      "Respectful, well-paced pilgrimage",
    ],
  },
];

export function getTour(slug: string) {
  return tours.find((t) => t.slug === slug);
}

export function formatPrice(price: number | null) {
  if (price == null) return "On request";
  return `$${price.toLocaleString("en-US")}`;
}

export const gallery = [
  { src: "/media/gallery/shangrila.jpg", tag: "Skardu", title: "Shangrila, Lower Kachura" },
  { src: "/media/gallery/kachura.jpg", tag: "Skardu", title: "Kachura Lake" },
  { src: "/media/gallery/fort.jpg", tag: "Skardu", title: "Skardu Fort" },
  { src: "/media/gallery/khaplu.jpg", tag: "Skardu", title: "Khaplu Palace" },
  { src: "/media/gallery/deosi.jpg", tag: "Skardu", title: "Sheosar, Deosai" },
  { src: "/media/gallery/hunza.jpg", tag: "Hunza Valley", title: "Baltit Fort, Hunza" },
  { src: "/media/gallery/passu.jpg", tag: "Hunza Valley", title: "Passu Cones" },
  { src: "/media/tours/hunza12.jpg", tag: "Hunza Valley", title: "Attabad Lake" },
  { src: "/media/gallery/gondogoro.jpg", tag: "Gondogoro", title: "Gondogoro La" },
  { src: "/media/tours/k2.jpg", tag: "K2", title: "K2, Karakoram" },
  { src: "/media/tours/gondogoro.jpg", tag: "K2", title: "Toward Concordia" },
  { src: "/media/gallery/nanga.jpg", tag: "Nanga Parbat", title: "Nanga Parbat" },
  { src: "/media/tours/fairy.jpg", tag: "Nanga Parbat", title: "Fairy Meadows" },
];

export const filters = ["All", "Gondogoro", "Hunza Valley", "K2", "Nanga Parbat", "Skardu"] as const;

export const team = [
  {
    name: "Izhar Ali",
    role: "Climbing Guide",
    initial: "IA",
    image: "/media/tours/khosar.jpg",
    bio: "Izhar Ali is a highly skilled climbing guide with extensive experience in the Karakoram Range. He has summited Gasherbrum II (2024), the Passu Cones (2021), and Minglik Sar, showcasing his exceptional technical expertise and endurance. Known for mastering challenging passes like Verjurav La and Khurdopin La, Izhar combines a deep commitment to safety with a passion for creating unforgettable mountaineering experiences.",
  },
  {
    name: "Yousuf Ali",
    role: "Climbing Guide",
    initial: "YA",
    image: "/media/tours/k2.jpg",
    bio: "An experienced climbing guide with an impressive record of high-altitude achievements. He successfully summited K2, the world’s second-highest peak, and conquered the infamous Nanga Parbat. His ascent of Spantik Peak further highlights his technical expertise and resilience. With extensive knowledge of challenging terrains and a strong focus on safety, Yousuf ensures an exceptional mountaineering experience for every adventurer.",
  },
  {
    name: "Tabasum Seher",
    role: "Sightseeing Guide",
    initial: "TS",
    image: "/media/gallery/hunza.jpg",
    bio: "From the breathtaking Hunza Valley, Tabasum Seher is a skilled guide specializing in Gilgit-Baltistan and Chitral Valley tours. With deep cultural knowledge and warm hospitality, she leads travelers to iconic landmarks and hidden gems, ensuring seamless and unforgettable journeys.",
  },
  {
    name: "Samana Rahim",
    role: "Mountaineer & Guide",
    initial: "SR",
    image: "/media/gallery/passu.jpg",
    bio: "From Shimshal Valley, Hunza, Samana Rahim is the second licensed female tourist guide in Pakistan and an accomplished mountaineer. She has guided climbs to peaks like Manglik Sar (6050m) and led an all-female team to its summit, championing women in mountaineering. With extensive trekking experience, Samana inspires adventure and promotes the beauty of northern Pakistan.",
  },
];

export const faqs = [
  {
    q: "How fit do I need to be for the treks?",
    a: "Our treks are designed for individuals with moderate to advanced fitness levels. We recommend regular cardio activities like hiking and long walks to build stamina. Trekking involves challenging terrains, so preparation is key.",
  },
  {
    q: "What’s included in the trip price?",
    a: "The price includes accommodation, meals during the trek, professional guides, porters, permits, and emergency arrangements. It excludes personal equipment, international flights, and travel insurance.",
  },
  {
    q: "Are group or private tours available?",
    a: "Yes, we offer both. Group tours are ideal for meeting fellow adventurers, while private tours provide a more personalized experience.",
  },
  {
    q: "Can I customize my trip itinerary?",
    a: "Yes, we offer customizable itineraries tailored to your preferences. Whether you want to add specific destinations, adjust the duration, or include private services, our team will work with you to create a personalized experience.",
  },
];

export const interests = [
  "Hunza Valley",
  "Skardu Valley",
  "Swat Valley",
  "Fairy Meadows",
  "Naran Kaghan",
  "Khunjerab Pass",
  "Deosai National Park",
  "Shangrila Resort (Lower Kachura Lake)",
  "Attabad Lake",
  "Shigar Valley",
  "Rama Meadows",
  "Saif-ul-Malook Lake",
  "K2 Base Camp",
  "Gondogoro La",
  "Kalash Valley",
  "Broad Peak",
  "Lahore",
  "Islamabad",
  "Not sure yet",
];

export const phones = ["+92 318 5217495", "+1 855 608 8666"];
export const email = "info@thesummitexperts.com";
