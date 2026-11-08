// Every fact here comes from Afshal's own brief, his portfolio PDF, or the live
// websites that could be read. Anything marked TODO needs his input.

export const profile = {
  name: "Muhammad Afshal Amir",
  short: "Afshal Amir",
  role: "Digital Marketing & Brand Growth Manager",
  sub: "AI-Driven Marketing Strategist",
  location: "Lahore, Pakistan",
  years: "5+",
  headline: ["Where technology", "meets creativity.", "And strategy turns", "into execution."],
  // TODO(Afshal): replace with your real email + WhatsApp number (international format, digits only)
  email: "hello@afshalamir.com",
  whatsapp: "",
  site: "https://afshalamir.vercel.app",
};

export type Social = { key: string; label: string; url: string };
export const socials: Social[] = [
  { key: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/muhammad-afshal-amir-189594211" },
  { key: "instagram", label: "Instagram", url: "https://www.instagram.com/afshal_/" },
  { key: "facebook", label: "Facebook", url: "https://www.facebook.com/share/1CA7f4r7dv/" },
  // TODO(Afshal): add these profile links if you use them. Empty ones show as decoration only.
  { key: "x", label: "X / Twitter", url: "" },
  { key: "youtube", label: "YouTube", url: "" },
  { key: "tiktok", label: "TikTok", url: "" },
  { key: "snapchat", label: "Snapchat", url: "" },
];

export const rotating = [
  "AI automation",
  "brand identity",
  "performance marketing",
  "websites that sell",
  "social media",
  "motion & video",
  "creative direction",
  "e-commerce",
];

export const sectors = ["EV", "Fashion", "IT", "E-commerce", "Retail", "Corporate"];

export const stats = [
  { value: 5, suffix: "+", label: "Years in brand & marketing" },
  { value: 6, suffix: "", label: "Industries worked across" },
  { value: 9, suffix: "", label: "Websites shipped" },
  { value: 3, suffix: "", label: "Performance awards" },
];

export type Service = {
  key: string;
  title: string;
  line: string;
  points: string[];
};

export const services: Service[] = [
  {
    key: "ai",
    title: "AI & Automation",
    line: "Putting AI to work where it saves hours, not where it makes noise.",
    points: ["AI-assisted content pipelines", "Workflow automation", "AI integrations for marketing teams", "Rapid prototyping with AI builders"],
  },
  {
    key: "marketing",
    title: "Digital Marketing",
    line: "Strategy first, channels second, numbers always.",
    points: ["Meta, Google & TikTok Ads", "SEO & search marketing", "Campaign planning & reporting", "Analytics with GA, Ahrefs, SEMrush"],
  },
  {
    key: "social",
    title: "Social Media",
    line: "Calendars, creatives and community — run end to end.",
    points: ["Content strategy & calendars", "Post & carousel design", "Brand partnerships", "Event coverage & execution"],
  },
  {
    key: "brand",
    title: "Brand Development",
    line: "Identities that hold up from a favicon to a billboard.",
    points: ["Logo & identity systems", "Brand guidelines", "Merch & stationery", "Signage & environmental graphics"],
  },
  {
    key: "design",
    title: "Graphic Design",
    line: "Print, packaging and pixels with the same attention to detail.",
    points: ["Packaging design", "Billboards & large format", "Print collateral", "Marketing creatives"],
  },
  {
    key: "motion",
    title: "Video & Motion",
    line: "Edits and motion graphics that keep thumbs from scrolling.",
    points: ["Reels & short-form edits", "Motion graphics", "3D marketing content", "Shoot direction"],
  },
  {
    key: "web",
    title: "Website Development",
    line: "Fast, clear websites built to turn visitors into enquiries.",
    points: ["WordPress & Elementor", "UI/UX design", "Landing pages", "Lead & enquiry flows"],
  },
  {
    key: "commerce",
    title: "E-commerce",
    line: "Stores that are easy to run and easy to buy from.",
    points: ["WooCommerce", "Shopify", "Product content", "Checkout & catalogue setup"],
  },
];

export type Experience = { company: string; role: string; period: string; note: string };
export const experience: Experience[] = [
  {
    company: "Zaryan's Business Group",
    role: "Social Media Marketing Manager · Brand Partnerships, Events & Execution Lead",
    period: "Mar 2022 — Present",
    note: "Leads social media marketing alongside brand partnerships, events and on-ground execution for the group's brands.",
  },
  {
    company: "SA Corporation Pvt. Ltd.",
    role: "Brand Manager",
    period: "Previous",
    note: "Managed the brand across channels and was named Employee of the Year.",
  },
  {
    company: "SIMVAH Pvt. Ltd.",
    role: "Brand Manager",
    period: "Previous",
    note: "Owned brand presentation, including identity work for SIMVAH Trading and Services.",
  },
  {
    company: "ESS Factor",
    role: "Social Media Manager & Graphic Designer",
    period: "Previous",
    note: "Ran social media and produced the design work behind it.",
  },
  {
    company: "Startup Buddies",
    role: "Graphic Designer & Social Media Manager",
    period: "Previous",
    note: "Designed graphics and managed social media for early-stage businesses.",
  },
];

export const education = [
  { title: "Digital Marketing Innovations", place: "LUMS", period: "Mar 2023" },
  { title: "Bachelor of Software Engineering", place: "Superior University", period: "2018 — 2022" },
  { title: "FSc Pre-Engineering", place: "", period: "" },
  { title: "Matriculation", place: "", period: "" },
];

export const awards = [
  { title: "Best Performance Award", by: "Jolta Electric", image: "/img/award-jolta.webp" },
  { title: "Employee of the Year", by: "SA Corporation", image: "" },
  { title: "Final Project Excellence Award", by: "LUMS", image: "" },
];

export const toolGroups = [
  { group: "Design", items: ["Photoshop", "Illustrator", "After Effects", "Figma", "Canva"] },
  { group: "Web", items: ["WordPress", "Elementor", "WooCommerce", "Shopify"] },
  { group: "Ads & Data", items: ["Meta Ads", "Google Ads", "TikTok Ads", "Google Analytics", "Ahrefs", "SEMrush"] },
  { group: "AI", items: ["ChatGPT", "Claude", "Gemini", "Manus AI", "Higgsfield", "Antigravity", "Lovable"] },
];

export type Project = {
  slug: string;
  name: string;
  domain: string;
  industry: string;
  place?: string;
  verified: boolean; // true when the live site was reviewed for this write-up
  accent: string;
  cover: string; // main preview image
  logo?: string;
  summary: string;
  overview: string[];
  role: string[];
  approach: string[];
  features: string[];
  tech: string[];
  gallery: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: "lawyers-connect",
    name: "Lawyers Connect",
    domain: "lawyers-connect.co.uk",
    industry: "Legal services",
    place: "Glasgow, Scotland",
    verified: true,
    accent: "#2f5bd3",
    cover: "/shots/lawyers.webp",
    logo: "/work/logo-lawyers-connect.webp",
    summary: "Identity, website and social content for a Glasgow firm of solicitors and notaries.",
    overview: [
      "Lawyers Connect is a Glasgow-based firm of solicitors and notaries serving clients across Scotland in personal injury, medical negligence, immigration, litigation, notarial work, and wills and estates.",
      "People usually arrive at a law firm's website worried and short on time. The site needed to feel calm, explain each service in plain English and make the first enquiry easy.",
    ],
    role: ["Logo & brand identity", "Website UI/UX design", "WordPress build", "Social media creatives"],
    approach: [
      "Deep navy and warm gold carry the identity from the logo through to the website and social posts, so every touchpoint reads as one firm.",
      "Large serif headlines and short paragraphs keep the tone human. Each practice area gets its own page instead of one crowded list.",
      "A three-step 'what happens next' section answers the question most visitors have before they pick up the phone.",
    ],
    features: [
      "Six practice-area service pages",
      "Three-step approach explainer",
      "Founder profile section",
      "Confidential enquiry form with area of law, preferred contact (phone, email or WhatsApp), incident date and best time to call",
      "Floating WhatsApp button",
      "Regulatory, privacy and complaints information in the footer",
    ],
    tech: ["WordPress", "Elementor", "Contact Form 7", "Swiper"],
    gallery: [
      { src: "/work/ui-lawyers.webp", alt: "Lawyers Connect full-page website design" },
      { src: "/work/social-4.webp", alt: "Lawyers Connect social media posts" },
      { src: "/img/lawyers-creative.webp", alt: "Lawyers Connect 'Accident claim journey' post" },
    ],
  },
  {
    slug: "artoso-construction",
    name: "ARTOSO Construction & Renovation",
    domain: "artoso.ca",
    industry: "Construction & renovation",
    place: "Ontario, Canada",
    verified: true,
    accent: "#e2a72b",
    cover: "/shots/artoso.webp",
    summary: "A website that presents a multi-trade contractor as one accountable team.",
    overview: [
      "ARTOSO Construction & Renovation Inc. delivers construction, renovation and project coordination across Ontario from its head office in Sault Ste. Marie.",
      "The company covers a lot of trades. The challenge was to show that range without the site turning into a directory.",
    ],
    role: ["Website UI/UX design", "WordPress build", "Content structure"],
    approach: [
      "The message leads: 'Spaces built for how you live.' The hero promises one team and one standard, so the trades that follow read as one service.",
      "A dark, architectural palette with a single gold accent matches the brand mark and keeps photography in focus.",
      "Services, projects and process are each a short scroll away, and 'Get a quote' stays pinned in the header.",
    ],
    features: [
      "Dedicated pages for construction, renovation & remodeling, commercial, roofing, HVAC, ICT & low-voltage and project management",
      "Project showcase: custom home build, kitchen transformation, commercial build-out, low-voltage infrastructure",
      "Consultation-to-handover process section",
      "Quote request flow",
      "Head office contact bar with phone and email",
    ],
    tech: ["WordPress", "Elementor", "Contact Form 7", "Swiper"],
    gallery: [{ src: "/work/ui-artoso.webp", alt: "ARTOSO full-page website design" }],
  },
  {
    slug: "jolta-electric",
    name: "Jolta Electric",
    domain: "joltaelectric.com",
    industry: "Electric vehicles",
    place: "Pakistan",
    verified: false,
    accent: "#2fd06b",
    cover: "/work/print-billboard-mecha.webp",
    logo: "/work/logo-jolta.webp",
    summary: "Website, dealership signage and billboard campaigns for a Pakistani EV maker.",
    overview: [
      "Jolta Electric builds electric motorcycles and scooters in Pakistan, with a range that runs from compact city scooters to larger motorcycles.",
      "The work spans the website, dealership branding and outdoor campaigns. Afshal received Jolta Electric's Best Performance Award.",
    ],
    role: ["Website UI design", "Dealership signage & standees", "Billboard campaigns", "Marketing creatives"],
    approach: [
      "Outdoor work leads with the product and one hard number, like range in kilometres, so the billboard reads at highway speed.",
      "Dealer signage was designed as a kit (3D boards, flex, standees, pillar wraps) so every showroom looks like the same brand.",
      "The website is built around choosing a model: lead with the line-up and make comparison easy.",
    ],
    features: ["Model line-up website design", "3D boards, flex & standees for dealerships", "Highway billboard campaigns", "Pillar & signage system"],
    tech: ["UI/UX design", "Large-format print"],
    gallery: [
      { src: "/work/ui-jolta.webp", alt: "Jolta Electric website design" },
      { src: "/work/print-billboard-je125.webp", alt: "Jolta JE-125L 'Power Ride' billboard" },
      { src: "/work/print-jolta-boards.webp", alt: "Jolta Electric dealership signage kit" },
    ],
  },
  {
    slug: "gaming-wala-bhai",
    name: "Gaming Wala Bhai",
    domain: "gamingwalabhai.com",
    industry: "Gaming",
    verified: false,
    accent: "#ffd200",
    cover: "/work/brand-gwb.webp",
    logo: "/work/logo-gwb.webp",
    summary: "A playful identity system for a gaming brand — from logo to merch.",
    overview: [
      "Gaming Wala Bhai (GWB) is a gaming brand built around community. It needed an identity that works as a profile picture, on a hoodie and on a shop sign.",
    ],
    role: ["Brand identity", "Website"],
    approach: [
      "A bearded mascot with a controller for glasses becomes the icon, so the brand is recognisable even without the wordmark.",
      "Yellow and black do most of the work, with a small set of controller-button colours for accents.",
      "Tagline: Play. Create. Belong.",
    ],
    features: ["Primary logo & icon", "Light, dark and icon-only variations", "Poppins type system", "Merch: hoodie, cap, bottle, lanyard", "Signage mock-ups"],
    tech: ["Brand identity", "Web"],
    gallery: [{ src: "/work/brand-gwb.webp", alt: "GWB brand identity board" }],
  },
  {
    slug: "artoso-properties",
    name: "ARTOSO Property Management",
    domain: "artosoproperties.com",
    industry: "Property management",
    verified: false,
    accent: "#d6a536",
    cover: "/work/logo-artoso.webp",
    logo: "/work/logo-artoso.webp",
    summary: "Identity and website for a property management company.",
    overview: ["Brand mark and website for ARTOSO Property Management Inc."],
    role: ["Logo design", "Website"],
    approach: [],
    features: [],
    tech: ["Web"],
    gallery: [],
  },
  {
    slug: "star-x-marketing",
    name: "Star X Marketing",
    domain: "starxmarketing.com",
    industry: "Marketing agency",
    verified: false,
    accent: "#ffe000",
    cover: "/work/logo-starx.webp",
    logo: "/work/logo-starx.webp",
    summary: "Identity and website for a digital marketing agency.",
    overview: ["Logo and website for Star X Marketing."],
    role: ["Logo design", "Website"],
    approach: [],
    features: [],
    tech: ["Web"],
    gallery: [],
  },
  {
    slug: "auto-channel-1",
    name: "Auto Channel 1",
    domain: "autochannel1.com",
    industry: "Automotive",
    verified: false,
    accent: "#ff4d4d",
    cover: "",
    summary: "Website for an automotive brand.",
    overview: ["Website for Auto Channel 1."],
    role: ["Website"],
    approach: [],
    features: [],
    tech: ["Web"],
    gallery: [],
  },
  {
    slug: "pml-official",
    name: "PML Official",
    domain: "pmlofficial.pk",
    industry: "Political organisation",
    place: "Pakistan",
    verified: false,
    accent: "#2ea44f",
    cover: "",
    summary: "Official website for a Pakistani political organisation.",
    overview: ["Official website for PML."],
    role: ["Website"],
    approach: [],
    features: [],
    tech: ["Web"],
    gallery: [],
  },
  {
    slug: "petmaa",
    name: "Petmaa",
    domain: "petmaa.com",
    industry: "Pet care",
    verified: false,
    accent: "#ff8a3d",
    cover: "",
    summary: "Website for a pet care brand.",
    overview: ["Website for Petmaa."],
    role: ["Website"],
    approach: [],
    features: [],
    tech: ["Web"],
    gallery: [],
  },
];

export type Work = { src: string; alt: string; title: string };
export const creative: { key: string; label: string; items: Work[] }[] = [
  {
    key: "logos",
    label: "Logos",
    items: [
      { src: "/work/logo-folio.webp", alt: "Twelve logos designed by Afshal", title: "Logo folio" },
    ],
  },
  {
    key: "branding",
    label: "Branding",
    items: [
      { src: "/work/brand-myra-bano.webp", alt: "Myra Bano brand identity", title: "Myra Bano — modest fashion" },
      { src: "/work/brand-gwb.webp", alt: "GWB brand identity", title: "GWB — gaming" },
    ],
  },
  {
    key: "social",
    label: "Social media",
    items: [
      { src: "/work/social-1.webp", alt: "Event and community social posts", title: "Events & community" },
      { src: "/work/social-2.webp", alt: "Event campaign posts", title: "Event campaigns" },
      { src: "/work/social-3.webp", alt: "Real estate and brand posts", title: "Real estate" },
      { src: "/work/social-4.webp", alt: "Lawyers Connect immigration posts", title: "Lawyers Connect" },
      { src: "/work/social-5.webp", alt: "Education admissions posts", title: "Education" },
    ],
  },
  {
    key: "packaging",
    label: "Packaging",
    items: [
      { src: "/work/pack-simcat.webp", alt: "SimCat cat food packaging", title: "SimCat" },
      { src: "/work/pack-herb-cabinet.webp", alt: "The Herb Cabinet serum packaging", title: "The Herb Cabinet" },
      { src: "/work/pack-nutracal.webp", alt: "Nutra Cal P packaging", title: "Nutra Cal P" },
      { src: "/work/pack-reva.webp", alt: "Reva mineral block packaging", title: "Reva Mineral Block" },
    ],
  },
  {
    key: "print",
    label: "Print & outdoor",
    items: [
      { src: "/work/print-billboard-mecha.webp", alt: "Jolta billboard", title: "Jolta — billboard" },
      { src: "/work/print-billboard-je125.webp", alt: "Jolta JE-125L billboard", title: "JE-125L Power Ride" },
      { src: "/work/print-jolta-boards.webp", alt: "Jolta dealership boards", title: "Dealer signage kit" },
      { src: "/work/print-cards.webp", alt: "Business card designs", title: "Business cards" },
    ],
  },
  {
    key: "ui",
    label: "UI/UX",
    items: [
      { src: "/work/ui-lawyers.webp", alt: "Lawyers Connect website", title: "Lawyers Connect" },
      { src: "/work/ui-artoso.webp", alt: "ARTOSO website", title: "ARTOSO" },
      { src: "/work/ui-jolta.webp", alt: "Jolta Electric website", title: "Jolta Electric" },
      { src: "/work/ui-fashion.webp", alt: "Fashion e-commerce website", title: "Fashion e-commerce" },
    ],
  },
];

export const logoWall = [
  "myra-bano", "olive-tree", "lawyers-connect", "artoso", "cim", "gwb",
  "stellar", "haroons-arcade", "ahmad-builders", "starx", "simvah", "jolta",
];
