/** AI tools directory. Descriptions say what each tool is for; check the tool's own site for current plans. */
export const toolGroups: { title: string; tools: { name: string; url: string; use: string }[] }[] = [
  {
    title: "Writing & thinking",
    tools: [
      { name: "ChatGPT", url: "https://chatgpt.com", use: "General assistant for scripts, captions, ideas and analysis." },
      { name: "Claude", url: "https://claude.ai", use: "Long documents, careful writing, coding and installable skills." },
      { name: "Gemini", url: "https://gemini.google.com", use: "Google's assistant; works with Docs, Gmail and Search." },
      { name: "Perplexity", url: "https://www.perplexity.ai", use: "Research with sources you can check." },
    ],
  },
  {
    title: "Images & design",
    tools: [
      { name: "Midjourney", url: "https://www.midjourney.com", use: "Stylised, high-quality images and brand visuals." },
      { name: "Flux", url: "https://bfl.ai", use: "Realistic images and product-style photos." },
      { name: "Ideogram", url: "https://ideogram.ai", use: "Images that need readable text, such as posters." },
      { name: "Canva", url: "https://www.canva.com", use: "Posts, carousels and quick edits with AI helpers." },
    ],
  },
  {
    title: "Video & reels",
    tools: [
      { name: "Kling", url: "https://klingai.com", use: "Text-to-video and image-to-video clips." },
      { name: "Runway", url: "https://runwayml.com", use: "AI video generation and editing tools." },
      { name: "Google Veo", url: "https://deepmind.google/models/veo/", use: "Text-to-video with sound." },
      { name: "Luma Dream Machine", url: "https://lumalabs.ai", use: "Fast image-to-video motion." },
      { name: "HeyGen", url: "https://www.heygen.com", use: "Talking avatar videos and translation." },
      { name: "CapCut", url: "https://www.capcut.com", use: "Editing reels with auto captions and templates." },
      { name: "Opus Clip", url: "https://www.opus.pro", use: "Cuts long videos into short clips." },
      { name: "Descript", url: "https://www.descript.com", use: "Edit video by editing the transcript." },
    ],
  },
  {
    title: "Voice & music",
    tools: [
      { name: "ElevenLabs", url: "https://elevenlabs.io", use: "Voiceovers in many languages and voices." },
      { name: "Suno", url: "https://suno.com", use: "Background music and jingles from a text prompt." },
    ],
  },
  {
    title: "Automation & chatbots",
    tools: [
      { name: "n8n", url: "https://n8n.io", use: "Connect apps and build AI workflows without much code." },
      { name: "Zapier", url: "https://zapier.com", use: "Simple automations between everyday apps." },
      { name: "Make", url: "https://www.make.com", use: "Visual automation scenarios." },
    ],
  },
];

/** Claude skills worth starting with. */
export const skills = [
  { name: "Anthropic skills", url: "https://github.com/anthropics/skills", use: "Official examples: documents, spreadsheets, slides, PDFs and a skill creator." },
  { name: "Frontend design", url: "https://github.com/anthropics/skills", use: "Helps Claude build websites that don't look templated." },
  { name: "Skill creator", url: "https://github.com/anthropics/skills", use: "Turns your own repeated process into a reusable skill." },
];

/** Reels and content made with AI. Hidden on the site until real entries are added. */
export const aiReels: { title: string; video: string; poster: string; tools: string }[] = [];

export const generators = [
  { key: "reel", label: "Reel script", placeholder: "e.g. A Lahore bakery launching a new chocolate cake", icon: "Clapperboard" },
  { key: "hooks", label: "Hooks", placeholder: "e.g. Why your Instagram page isn't getting customers", icon: "Zap" },
  { key: "caption", label: "Caption", placeholder: "e.g. New winter collection, 20% off this week", icon: "MessageCircle" },
  { key: "calendar", label: "7-day content plan", placeholder: "e.g. A home salon in Karachi", icon: "CalendarDays" },
  { key: "video", label: "AI video prompt", placeholder: "e.g. Perfume bottle on black marble", icon: "Film" },
] as const;

export type GeneratorKey = (typeof generators)[number]["key"];

export const generatorTasks: Record<GeneratorKey, string> = {
  reel: "Write a 30-second reel script. Give: HOOK (max 9 words), then 3 beats each with what is said and the on-screen text, then one call to action, then a one-line caption.",
  hooks: "Write 12 scroll-stopping hooks, max 9 words each, numbered. Mix question, mistake, number, bold claim and story hooks.",
  caption: "Write 3 caption options (emotional, benefit-led, short and playful), each under 60 words with one call to action, then 8 relevant hashtags.",
  calendar: "Create a 7-day content plan. For each day give: format (reel, carousel, story, post), topic, hook and call to action. Balance education, proof, behind-the-scenes and one offer.",
  video: "Write 3 text-to-video prompts (5–8 seconds each) with subject, setting, camera movement, lighting, style and duration, plus one negative prompt.",
};
