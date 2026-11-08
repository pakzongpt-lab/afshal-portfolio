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
    summary: "Lawyers Connect (Glasgow), ARTOSO Construction & Property Management (Ontario), PML Official, Petmaa — plus brand and social roles at Zaryan's Business Group, SA Corporation, SIMVAH, ESS Factor and Startup Buddies.",
    work: ["Lawyers Connect", "ARTOSO", "PML Official", "Petmaa", "Zaryan's Business Group", "SA Corporation", "SIMVAH", "ESS Factor", "Startup Buddies"],
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

export const collage = [
  { src: "/img/portrait.webp", alt: "Afshal Amir — studio portrait", span: "tall" },
  { src: "/img/poster-meet.webp", alt: "'Meet Afshal Amir' personal brand poster", span: "tall" },
  { src: "/img/candid-drive.webp", alt: "Afshal on the road", span: "tall" },
  { src: "/img/candid-mug.webp", alt: "Afshal at his desk", span: "wide" },
  { src: "/img/candid-studio.webp", alt: "Afshal in the studio", span: "tall" },
  { src: "/img/team-lahore.webp", alt: "Afshal with collaborators in Lahore", span: "wide" },
  { src: "/img/shoot-duo.webp", alt: "On a shoot location", span: "wide" },
];

// Media files Afshal is sending. Cards render a styled placeholder until the file exists.
export const influencers = [
  {
    name: "Ducky Bhai",
    tag: "Creator collaboration",
    image: "", // TODO: /influencers/ducky-bhai.webp
    video: "",
    blurb: "Working with one of Pakistan's biggest creators to put a brand in front of an audience that already trusts him.",
  },
  {
    name: "Abrar",
    tag: "Creator campaign",
    image: "", // TODO: /influencers/abrar.webp
    video: "", // TODO: /influencers/abrar.mp4
    blurb: "A creator-led campaign shot and edited for short-form — made to feel native to the feed, not like an ad.",
  },
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
  { title: "Reel", video: "/video/bts.mp4", src: "/video/bts-poster.jpg" },
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
