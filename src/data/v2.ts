// Content for the v2 redesign. Facts come from Afshal's briefs, his portfolio PDF,
// the Star X Marketing Instagram profile and the live sites that could be read.

export const starx = {
  name: "Star X Marketing",
  role: "Marketing Director",
  site: "https://www.starxmarketing.com",
  instagram: "https://www.instagram.com/starxmarketing/",
  handle: "@starxmarketing",
  followers: "4.8K", // Instagram profile, Nov 2026
  logo: "/work/logo-starx.webp",
  pitch: "A full-service digital growth agency: we take a business from its first logo to a full marketing engine.",
  services: [
    { icon: "Palette", title: "Branding & Graphic Design" },
    { icon: "Share2", title: "Social Media Marketing" },
    { icon: "Globe", title: "Website Development" },
    { icon: "ShoppingCart", title: "E-commerce Development" },
    { icon: "Film", title: "Video Editing & Motion Graphics" },
    { icon: "PenTool", title: "Content Strategy & Creation" },
    { icon: "Megaphone", title: "Paid Advertising" },
    { icon: "Brain", title: "AI Integration" },
    { icon: "Smartphone", title: "Mobile App Development" },
    { icon: "Workflow", title: "Business Automation" },
  ],
  posts: [
    { src: "/starx/growth-isnt-added.webp", alt: "Star X post: Growth isn't added" },
    { src: "/starx/you-can-trust-us.webp", alt: "Star X post: You can trust us — web development" },
    { src: "/starx/need-a-stunning-website.webp", alt: "Star X post: Need a stunning website?" },
    { src: "/starx/websites-that-build.webp", alt: "Star X post: We build websites that build your business" },
    { src: "/starx/brand-first-impression.webp", alt: "Star X post: Your brand's first impression matters" },
    { src: "/starx/brand-not-growing.webp", alt: "Star X post: Your brand is not growing because…" },
    { src: "/starx/pakistan-independence-day.webp", alt: "Star X post: Pakistan Independence Day" },
  ],
};

export type Job = {
  company: string;
  role: string;
  period?: string;
  logo?: string;
  url?: string;
  accent: string;
  summary: string;
  work: string[];
  slug?: string;
};

// Order requested by Afshal: Jolta, Gaming Wala Bhai, AutoChannel1, others, Star X.
export const jobs: Job[] = [
  {
    company: "Jolta Electric",
    role: "Marketing, creative direction & web",
    logo: "/work/logo-jolta.webp",
    url: "https://joltaelectric.com",
    accent: "#2fd06b",
    summary: "Pakistan's electric motorcycle and scooter maker. I worked across the website, dealership branding and outdoor campaigns, and received the Best Performance Award.",
    work: ["Website UI design", "Dealership signage kits", "Highway billboard campaigns", "Marketing creatives & social"],
    slug: "jolta-electric",
  },
  {
    company: "Gaming Wala Bhai",
    role: "Brand identity & website",
    logo: "/work/logo-gwb.webp",
    url: "https://gamingwalabhai.com",
    accent: "#ffd200",
    summary: "A community-first gaming brand. I built the identity system — mascot, logo, colour and type — and the website.",
    work: ["Mascot & logo system", "Brand guidelines", "Merch & signage", "Website"],
    slug: "gaming-wala-bhai",
  },
  {
    company: "AutoChannel1",
    role: "Website",
    url: "https://autochannel1.com",
    accent: "#ff4d4d",
    summary: "Website for an automotive brand.",
    work: ["Website design & build"],
    slug: "auto-channel-1",
  },
  {
    company: "Other clients & roles",
    role: "Brands, websites & marketing",
    accent: "#8d6bff",
    summary: "Websites for Keune Pakistan, House of Flowers, Buzzazi, Zufishan Shahzaib, Lawyers Connect (Glasgow), ARTOSO (Ontario), PML Official and Petmaa — plus brand and social roles at Zaryan's Business Group, SA Corporation, SIMVAH, ESS Factor and Startup Buddies.",
    work: ["Keune Pakistan", "House of Flowers", "Buzzazi", "Zufishan Shahzaib", "Lawyers Connect", "ARTOSO", "PML Official", "Petmaa", "Zaryan's Business Group", "SA Corporation", "SIMVAH", "ESS Factor", "Startup Buddies"],
  },
  {
    company: "Star X Marketing",
    role: "Marketing Director",
    logo: "/work/logo-starx.webp",
    url: "https://www.starxmarketing.com",
    accent: "#ffe000",
    summary: "My agency. I lead strategy and creative direction across branding, social, websites, ads, content and AI automation.",
    work: ["Strategy & creative direction", "Client growth programmes", "Websites & e-commerce", "AI automations"],
    slug: "star-x-marketing",
  },
];

export const clients = [
  { name: "Jolta Electric", logo: "/work/logo-jolta.webp", url: "https://joltaelectric.com" },
  { name: "Lawyers Connect", logo: "/work/logo-lawyers-connect.webp", url: "https://lawyers-connect.co.uk" },
  { name: "ARTOSO Property Management", logo: "/work/logo-artoso.webp", url: "https://artosoproperties.com" },
  { name: "Gaming Wala Bhai", logo: "/work/logo-gwb.webp", url: "https://gamingwalabhai.com" },
  { name: "Star X Marketing", logo: "/work/logo-starx.webp", url: "https://www.starxmarketing.com" },
  { name: "SIMVAH", logo: "/work/logo-simvah.webp" },
  { name: "Myra Bano", logo: "/work/logo-myra-bano.webp" },
  { name: "Olive Tree", logo: "/work/logo-olive-tree.webp" },
  { name: "CIM", logo: "/work/logo-cim.webp" },
  { name: "Stellar", logo: "/work/logo-stellar.webp" },
  { name: "Haroon's Arcade", logo: "/work/logo-haroons-arcade.webp" },
  { name: "Ahmad Builders", logo: "/work/logo-ahmad-builders.webp" },
];

// Only three photos of Afshal, plus his creator collaborations.
export const collage = [
  { src: "/img/me-suit.webp", alt: "Afshal Amir — studio portrait in a black suit", span: "tall" },
  { src: "/influencers/ducky-bhai.webp", alt: "Afshal Amir with Ducky Bhai", span: "tall" },
  { src: "/img/me-car.webp", alt: "Afshal Amir on the road", span: "tall" },
  { src: "/influencers/muhammad-abrar.webp", alt: "Afshal Amir with Muhammad Abrar", span: "tall" },
  { src: "/img/me-desk.webp", alt: "Afshal Amir at his desk", span: "tall" },
];

export const influencers = [
  {
    name: "Ducky Bhai",
    tag: "Creator collaboration",
    image: "/influencers/ducky-bhai.webp",
    focus: "50% 72%",
    video: "/influencers/ducky-bhai-meeting.mp4",
    poster: "/influencers/ducky-bhai-meeting.jpg",
    videoLabel: "Watch the Ducky Bhai meeting",
    blurb: "Working with one of Pakistan's biggest creators to put a brand in front of an audience that already trusts him.",
  },
  {
    name: "Muhammad Abrar",
    tag: "Creator campaign",
    image: "/influencers/muhammad-abrar.webp",
    focus: "50% 30%",
    video: "", // TODO: Abrar meeting video (not received yet)
    poster: "",
    videoLabel: "Watch the Abrar meeting",
    blurb: "A creator-led campaign planned with Muhammad Abrar — content shaped to feel native to the feed, not like an ad.",
  },
];

// Headline numbers stated by Afshal.
export const heroStats = [
  { value: 50, suffix: "+", label: "Websites designed & built" },
  { value: 5, suffix: "+", label: "Top companies worked in" },
  { value: 4, suffix: "", label: "Countries served remotely" },
];
export const remoteCountries = ["Scotland", "USA", "Dubai", "Canada"];

export type Site = {
  name: string;
  domain: string;
  type: string;
  desktop?: string; // stitched full-page screenshot of the live home page
  mobile?: string;
  stack: string[];
};

// Screenshots are real captures of each live home page (desktop + mobile).
export const websites: Site[] = [
  { name: "Keune Pakistan", domain: "keunepakistan.com", type: "Shopify e-commerce · hair care", desktop: "/sites/keune-desktop.webp", mobile: "/sites/keune-mobile.webp", stack: ["Shopify", "Custom theme", "WhatsApp chat"] },
  { name: "House of Flowers", domain: "houseofflowers.pk", type: "E-commerce · flowers & gifting", desktop: "/sites/houseofflowers-desktop.webp", mobile: "/sites/houseofflowers-mobile.webp", stack: ["Shopify", "Same-day delivery flow", "Mobile app-style nav"] },
  { name: "Lawyers Connect", domain: "lawyers-connect.co.uk", type: "Law firm · Glasgow, Scotland", desktop: "/shots/lawyers.webp", stack: ["WordPress", "Elementor", "Lead forms"] },
  { name: "ARTOSO", domain: "artoso.ca", type: "Construction & renovation · Ontario, Canada", desktop: "/shots/artoso.webp", stack: ["WordPress", "Service pages", "Quote requests"] },
  { name: "Jolta Electric", domain: "joltaelectric.com", type: "EV maker · model line-up", desktop: "/work/ui-jolta.webp", stack: ["UI design", "Model comparison", "Dealer locator"] },
  { name: "Buzzazi", domain: "buzzazi.com", type: "Shopify store", stack: ["Shopify"] },
  { name: "Zufishan Shahzaib", domain: "zufishanshahzaib.com", type: "Website", stack: ["Website"] },
];
export const moreSites = ["Gaming Wala Bhai", "AutoChannel1", "ARTOSO Property Management", "Star X Marketing", "PML Official", "Petmaa"];

export const devServices = [
  { icon: "Code2", title: "Custom Websites", line: "Hand-built, fast and on-brand — no template look." },
  { icon: "LayoutDashboard", title: "Web Portals", line: "Client, member and partner portals with logins and roles." },
  { icon: "Cpu", title: "Software Development", line: "Business software built around how your team actually works." },
  { icon: "Cloud", title: "SaaS Websites & Apps", line: "Marketing site, onboarding, billing and the product itself." },
  { icon: "Globe", title: "WordPress / Elementor", line: "Editable sites your team can update without a developer." },
  { icon: "ShoppingCart", title: "Shopify Stores", line: "Stores built to convert, with apps, payments and shipping set up." },
  { icon: "Users", title: "CRM Systems", line: "Leads, pipelines and follow-ups in one place — wired to your forms." },
  { icon: "BarChart3", title: "Dashboards", line: "Live numbers for sales, ads and operations at a glance." },
  { icon: "Smartphone", title: "Mobile Apps", line: "iOS and Android apps with one codebase, from MVP to store launch." },
  { icon: "ShoppingBag", title: "E-commerce & WooCommerce", line: "Catalogues, checkout and order flows that scale." },
  { icon: "Plug", title: "APIs & Integrations", line: "Payment gateways, WhatsApp, CRMs and AI connected together." },
  { icon: "Rocket", title: "Landing Pages", line: "Single-goal pages for ads and launches, built to convert." },
];
export const techStack = ["react", "nextdotjs", "typescript", "nodedotjs", "php", "laravel", "python", "flutter", "wordpress", "elementor", "shopify", "woocommerce", "tailwindcss", "firebase", "mongodb", "mysql", "n8n", "figma", "android", "apple"];

export const kinetic = [
  "Stop the scroll", "Hooks that convert", "Ads that pay back", "SEO that compounds", "Brands people remember",
  "Content that sells", "Funnels that close", "AI that follows up", "Data over guesswork", "Growth on autopilot",
];


export const stairs = [
  { icon: "Fingerprint", title: "Logo & Identity", text: "Every brand starts with a mark people can recognise in half a second." },
  { icon: "Palette", title: "Branding", text: "Colours, type, voice and rules — so every touchpoint looks like the same company." },
  { icon: "Share2", title: "Social Presence", text: "Profiles set up and optimised on the platforms your customers actually use." },
  { icon: "Globe", title: "Website", text: "A fast, clear website that turns visitors into enquiries — your 24/7 salesperson." },
  { icon: "Search", title: "SEO & GEO", text: "Found on Google and recommended by AI assistants like ChatGPT and Perplexity." },
  { icon: "CalendarClock", title: "Daily Posting", text: "Consistency compounds. A calendar that keeps the brand visible every single day." },
  { icon: "Clapperboard", title: "Content Creation", text: "Hooks, reels, carousels and shoots that stop the scroll and start conversations." },
  { icon: "Megaphone", title: "Ads & Campaigns", text: "Meta, Google and TikTok ads that put budget behind what's already working." },
  { icon: "Trophy", title: "Complete Marketing", text: "Strategy to execution under one roof. That's what we offer — the whole staircase." },
];

export type FlowNode = { id: string; icon: string; title: string; sub: string; detail: string };
export type Flow = { key: string; label: string; nodes: FlowNode[] };

export const flows: Flow[] = [
  {
    key: "lead",
    label: "Lead to sale",
    nodes: [
      { id: "visit", icon: "MousePointerClick", title: "Website visitor", sub: "Trigger", detail: "Someone lands on the site from Google, an ad or Instagram. The workflow starts the moment they engage." },
      { id: "bot", icon: "Bot", title: "AI chatbot", sub: "AI agent", detail: "A trained assistant answers questions instantly, 24/7, in the brand's voice." },
      { id: "collect", icon: "ClipboardList", title: "Collect details", sub: "Form / chat", detail: "Name, contact, budget and need are captured inside the conversation — no long forms." },
      { id: "qualify", icon: "Filter", title: "Qualify lead", sub: "AI scoring", detail: "The AI scores the lead (hot, warm, cold) using the answers and behaviour." },
      { id: "crm", icon: "Database", title: "CRM", sub: "Sync", detail: "The lead and full conversation are saved to the CRM automatically. No copy-paste." },
      { id: "follow", icon: "Repeat", title: "Follow-up", sub: "Sequence", detail: "Personalised follow-ups go out on a schedule until the lead replies or books." },
      { id: "book", icon: "CalendarCheck", title: "Book meeting", sub: "Calendar", detail: "Qualified leads pick a slot from the live calendar. No back-and-forth." },
      { id: "notify", icon: "BellRing", title: "Email + WhatsApp", sub: "Notify", detail: "The customer gets a confirmation; the team gets an instant alert on WhatsApp and email." },
      { id: "sales", icon: "Users", title: "Sales team", sub: "Handover", detail: "Sales walks into the call with the full context. Their time goes to closing, not chasing." },
    ],
  },
  {
    key: "support",
    label: "AI support agent",
    nodes: [
      { id: "msg", icon: "MessageCircle", title: "Customer message", sub: "WhatsApp / site", detail: "A question arrives on WhatsApp, Instagram DM or the website chat." },
      { id: "ai", icon: "Brain", title: "AI agent", sub: "Knowledge base", detail: "The agent reads the business's FAQs, policies and order data to answer accurately." },
      { id: "act", icon: "Zap", title: "Take action", sub: "Tools", detail: "Tracks an order, reschedules a booking or issues a quote — not just chat." },
      { id: "esc", icon: "UserRound", title: "Escalate", sub: "Human", detail: "Anything sensitive goes to a person with the conversation summarised." },
      { id: "log", icon: "BarChart3", title: "Log & learn", sub: "Analytics", detail: "Every conversation is logged so common questions become better content and FAQs." },
    ],
  },
  {
    key: "commerce",
    label: "E-commerce orders",
    nodes: [
      { id: "order", icon: "ShoppingCart", title: "New order", sub: "Store", detail: "An order is placed on WooCommerce or Shopify." },
      { id: "confirm", icon: "Send", title: "Confirm", sub: "WhatsApp + email", detail: "The customer gets an instant confirmation on WhatsApp and email." },
      { id: "stock", icon: "Box", title: "Stock & dispatch", sub: "Inventory", detail: "Inventory updates and the courier booking is created automatically." },
      { id: "review", icon: "Sparkles", title: "Review request", sub: "Day 7", detail: "A week after delivery, the customer is asked for a review." },
      { id: "report", icon: "LineChart", title: "Daily report", sub: "Dashboard", detail: "Sales, returns and ad spend roll into one morning report." },
    ],
  },
];

export const automations = [
  { icon: "Bot", title: "AI support agents" },
  { icon: "MessageCircle", title: "Website chatbots" },
  { icon: "CalendarCheck", title: "Automated bookings" },
  { icon: "Filter", title: "Lead management" },
  { icon: "Database", title: "CRM automation" },
  { icon: "Mail", title: "Email automation" },
  { icon: "Send", title: "WhatsApp automation" },
  { icon: "Repeat", title: "Customer follow-ups" },
  { icon: "ShoppingCart", title: "E-commerce workflows" },
  { icon: "Cpu", title: "AI business assistants" },
  { icon: "BarChart3", title: "Automated reporting" },
];

export const contentSteps = [
  { icon: "Users", title: "Research", text: "Who's watching, what they care about, what they scroll past." },
  { icon: "Target", title: "Find the hook", text: "The first second decides everything. We write ten hooks to find one." },
  { icon: "Lightbulb", title: "Concept", text: "One clear idea the audience can repeat to a friend." },
  { icon: "FileText", title: "Script & story", text: "Hook, tension, payoff. Every line earns the next." },
  { icon: "Image", title: "Visual direction", text: "References, mood, framing and colour — decided before the shoot." },
  { icon: "Clapperboard", title: "Design & production", text: "Shoot, design and build the assets." },
  { icon: "Film", title: "Motion & edit", text: "Pacing, captions, motion graphics and sound." },
  { icon: "Send", title: "Publish", text: "Right platform, right format, right time." },
  { icon: "TrendingUp", title: "Analyse & improve", text: "Watch time, saves, shares. Double down on what works." },
];

export const formats = [
  { title: "Social post", src: "/work/social-3.webp" },
  { title: "Carousel", src: "/work/social-4.webp" },
  { title: "Reel", video: "/influencers/ducky-bhai-meeting.mp4", src: "/influencers/ducky-bhai-meeting.jpg" },
  { title: "3D product", src: "/work/pack-simcat.webp" },
  { title: "Campaign", src: "/work/print-billboard-je125.webp" },
  { title: "Ad creative", src: "/starx/need-a-stunning-website.webp" },
];

export const method = [
  { icon: "FlaskConical", title: "Research", text: "Audience, market and competitors — the facts before the ideas." },
  { icon: "Hammer", title: "Build", text: "Brand, website, content and systems, built to last." },
  { icon: "Workflow", title: "Automate", text: "AI and automations take the repetitive work off your plate." },
  { icon: "Rocket", title: "Launch", text: "Go live with campaigns that put the work in front of people." },
  { icon: "GraduationCap", title: "Learn", text: "Measure, learn and improve every month." },
];

export const salesMachine = [
  { icon: "Target", title: "Lead generation" },
  { icon: "MessageCircle", title: "Customer inquiries" },
  { icon: "CalendarCheck", title: "Automated bookings" },
  { icon: "Send", title: "WhatsApp integration" },
  { icon: "Filter", title: "Sales funnels" },
  { icon: "TrendingUp", title: "Conversion optimisation" },
  { icon: "Bot", title: "Customer support" },
  { icon: "ShoppingCart", title: "E-commerce" },
  { icon: "Brain", title: "AI customer journeys" },
];

export const siteIssues = ["Slow loading", "Broken pages", "Technical errors", "Poor conversions", "Forms not working", "Not on Google"];

export const faqs = [
  { q: "Who is Afshal Amir?", a: "Muhammad Afshal Amir is a Lahore-based digital marketing and brand growth manager, AI-driven marketing strategist and software engineer, and the Marketing Director of Star X Marketing." },
  { q: "What services does Afshal offer?", a: "Branding and graphic design, social media marketing, website and e-commerce development, SEO and GEO, content creation and video, paid advertising, and AI automation for businesses." },
  { q: "Can you fix a website that isn't performing?", a: "Yes. Slow loading, broken pages, errors, weak conversions or poor search visibility — I find what's holding the site back and fix it." },
  { q: "Do you work with clients outside Pakistan?", a: "Yes — including legal and construction businesses in the UK and Canada." },
];
