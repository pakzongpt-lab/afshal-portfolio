/** Pro prompts: longer, multi-step workflows. Server-side only; sent to Pro members through /api/prompts. */
export const proPrompts: Record<string, { t: string; p: string }[]> = {
  reels: [
    { t: "30 reels in one sitting", p: "Act as my content strategist. Business: [BUSINESS], audience: [AUDIENCE], offer: [OFFER]. Step 1: list 6 audience problems. Step 2: for each problem write 5 reel ideas in different formats. Step 3: turn the best 10 into full 30-second scripts with hook, beats, on-screen text and call to action. Step 4: give a filming order that batches by location and outfit." },
    { t: "Viral reel reverse-engineer", p: "Here is the transcript and description of a reel that performed well: [PASTE]. Break down why it worked: hook type, pacing, pattern interrupts, emotion, call to action. Then write 3 new scripts for [MY NICHE] that use the same structure with completely different content." },
    { t: "Retention editor", p: "Here is my reel script with timings: [SCRIPT]. Mark every moment a viewer might swipe away. For each, give a fix: cut, visual change, text pop, sound cue or re-hook line. Return the tightened script with a visual change at least every 3 seconds." },
    { t: "Series that sells", p: "Design a 10-episode reel series that moves a cold viewer to buying [PRODUCT at PRICE]. Episodes 1–4 teach, 5–7 prove, 8–9 handle objections, 10 offers. For each: title, hook, script outline, on-screen text, call to action and the comment keyword to trigger a DM." },
    { t: "Client reel package brief", p: "I'm producing reels for a client: [CLIENT, INDUSTRY, GOAL]. Write the full brief: content pillars, 12 reel concepts with hooks, shot list per reel, props, locations, talent notes, a one-day shoot schedule and the edit style guide (fonts, captions, music mood)." },
  ],
  "ai-video": [
    { t: "30-second AI ad, shot by shot", p: "Create a 30-second AI-generated ad for [PRODUCT] aimed at [AUDIENCE]. Give 6 shots. For each: a text-to-image prompt for the first frame, an image-to-video motion prompt, duration, voiceover line and on-screen text. Keep the character and product descriptions identical across shots, and end with the logo frame." },
    { t: "Consistent AI presenter", p: "Design an AI presenter for [BRAND]: write a master character sheet (face, age, hair, wardrobe, setting, lighting), a voice description, and 5 reusable prompts (greeting, product demo, testimonial style, announcement, sign-off) that all start from the same character sheet." },
    { t: "Product film from one photo", p: "I have one product photo of [PRODUCT]. Plan a 15-second film from it: 4 image-edit prompts to create new angles and scenes, 4 image-to-video prompts with camera moves, a sound design list and the caption sequence." },
    { t: "AI b-roll library", p: "Build a b-roll shot library for [NICHE]: 20 text-to-video prompts grouped into establishing, detail, people, product and abstract shots. Each 4–6 seconds, same colour grade and lens style so they cut together." },
    { t: "Prompt debugger", p: "Act as an AI video prompt engineer. I'll paste a prompt and describe the output problem. Diagnose the cause (ambiguous subject, conflicting motion, too many actions, lighting clash), rewrite the prompt, add a negative prompt and suggest settings. First prompt: [PROMPT]. Problem: [PROBLEM]." },
  ],
  images: [
    { t: "Full product photoshoot set", p: "Plan a 12-image AI photoshoot for [PRODUCT]: 4 clean catalogue shots, 4 lifestyle scenes, 2 close-up details, 2 ad creatives with text space. Write each prompt with the same product description, lighting language and colour palette so the set looks like one shoot." },
    { t: "Brand visual system", p: "Create a visual system for [BRAND], which should feel [ADJECTIVES]: colour palette with hex codes, photography rules, illustration style, texture and background rules, and 6 reusable image prompt templates with [SUBJECT] slots." },
    { t: "Ad creative variations", p: "My winning ad image is described as: [DESCRIPTION]. Write 10 variation prompts that change one thing each (background, angle, prop, model, colour, crop, season, mood, composition, format) so I can test what drives the result." },
    { t: "Carousel art direction", p: "Art-direct a 7-slide carousel about [TOPIC] for [BRAND]: for each slide give the layout, image prompt, headline position and colour use. Keep one grid and one accent colour throughout." },
    { t: "Consistent brand model", p: "Write a master description for an AI brand model for [BRAND] (face, skin tone, hair, build, styling) and 8 scene prompts that reuse it exactly: studio, street, cafe, home, office, outdoor, close-up and product-in-hand." },
  ],
  hooks: [
    { t: "Hook bank for a month", p: "Build a 60-hook bank for [NICHE] and [AUDIENCE]: 10 each of curiosity, mistake, proof, contrarian, story and how-to hooks. Then mark the 15 strongest and pair each with a matching first visual." },
    { t: "Brand voice guide", p: "Analyse these 10 captions from my brand: [PASTE]. Write a voice guide: tone words, sentence length, words we use, words we never use, emoji rules, how we open and close. Then rewrite this caption in that voice: [CAPTION]." },
    { t: "Caption A/B set", p: "For this post about [TOPIC], write 4 captions that test one variable each against a control: hook style, length, call to action and proof. Tell me what result would mean each variant won." },
    { t: "Comment-to-DM funnel", p: "Design a comment-keyword funnel for [OFFER]: the reel hook, the call to action with keyword, the automatic DM message, 2 follow-up DMs, and the reply for people who ask the price in comments." },
    { t: "Story selling week", p: "Write 7 days of Instagram Stories (4 frames a day) that warm an audience up to [OFFER] on day 7: polls, questions, behind the scenes, proof and the final offer with urgency that is true." },
  ],
  planning: [
    { t: "90-day content strategy", p: "Build a 90-day content strategy for [BUSINESS]: goals per month, pillars, weekly rhythm, 3 campaigns, formats per platform, what to measure each week and what to change if reach, saves or leads fall." },
    { t: "Content operating system", p: "Design a weekly workflow for a one-person brand: idea capture, scripting, batch filming, editing, scheduling, engagement and review. Give time blocks, tools for each step and a checklist I can reuse every week." },
    { t: "Repurposing machine", p: "Here is one long piece of content: [TRANSCRIPT/ARTICLE]. Produce: 5 reel scripts, 2 carousels, 5 hooks, 3 LinkedIn posts, 1 email and 10 story frames, each with its own angle rather than a summary." },
    { t: "Monthly review", p: "Here are my last 30 posts with reach, saves, shares and profile visits: [DATA]. Find patterns by format, topic, hook and posting time. Give 5 things to repeat, 5 to stop and next month's plan." },
    { t: "Launch runway", p: "Plan a 21-day launch for [PRODUCT]: 7 days of problem content, 7 of solution and proof, 7 of open cart. Give each day's post, story, email and WhatsApp broadcast with the goal for each." },
  ],
  ads: [
    { t: "Full-funnel campaign", p: "Build a Meta ads funnel for [PRODUCT at PRICE] with a monthly budget of [BUDGET]: cold, warm and hot campaigns, audiences, budget split, 3 creatives per stage with copy, and the numbers that tell me each stage is working." },
    { t: "Creative testing matrix", p: "Create a testing matrix for [PRODUCT]: 4 angles × 3 hooks × 2 formats. Write the copy for each cell, a naming convention, the order to test in and rules for picking winners." },
    { t: "Landing page from an ad", p: "Write a full landing page for the ad angle '[ANGLE]': headline, sub-headline, hero bullets, problem section, solution, proof placeholders marked [ADD REAL REVIEW], offer, FAQ, guarantee and final call to action." },
    { t: "Account audit", p: "Here are my campaign results by ad set and creative: [DATA]. Find wasted spend, creative fatigue, audience overlap and budget problems. Give a prioritised fix list and a 2-week plan." },
    { t: "Offer stack", p: "Build an offer stack for [PRODUCT]: core offer, 3 bonuses that cost me little, a guarantee, real urgency and a price anchor. Write the offer as it would appear in an ad, on the page and in a WhatsApp message." },
  ],
  seo: [
    { t: "Topic cluster plan", p: "Build a topic cluster for [BUSINESS] around '[MAIN KEYWORD]': 1 pillar page and 12 supporting articles with target keyword, intent, title, outline and internal links between them." },
    { t: "Local SEO plan", p: "Create a 30-day local SEO plan for a [BUSINESS] in [CITY]: Google Business Profile tasks, citations, review plan, location page outline, local content ideas and what to track weekly." },
    { t: "GEO: be quoted by AI", p: "Rewrite this page so AI assistants can quote it accurately: [PAGE TEXT]. Add a clear definition, facts with units, a short FAQ, a comparison table in text and a summary. Do not add facts I didn't give you; mark gaps as [NEEDED]." },
    { t: "Service page that converts", p: "Write a service page for [SERVICE] in [CITY]: SEO title, meta description, H1, benefit sections, process, pricing guidance, FAQ, trust section with [REAL PROOF] placeholders and schema markup." },
    { t: "Website teardown", p: "Act as a conversion consultant. Here is my home page copy and structure: [PASTE]. Score clarity, trust, offer and call to action out of 10 with reasons, then rewrite the page section by section." },
  ],
  business: [
    { t: "AI chatbot knowledge base", p: "Build a knowledge base for a chatbot for [BUSINESS]: greeting, tone rules, 25 FAQs with answers from these facts [FACTS], lead questions, when to hand over to a human, and what it must never promise." },
    { t: "Sales call script", p: "Write a 15-minute sales call script for [SERVICE at PRICE]: opening, 6 discovery questions, how to summarise their problem, the pitch, 5 objection replies and the close with next step." },
    { t: "WhatsApp sales system", p: "Design a WhatsApp sales system for [BUSINESS]: quick replies, catalogue structure, labels for lead stages, a broadcast plan for 4 weeks and message templates for new lead, quote sent, follow-up, payment and delivery." },
    { t: "Business growth report", p: "Act as a growth consultant. Business: [DETAILS: what it sells, price, city, monthly sales, channels]. Give a report: 3 biggest leaks, 5 quick wins for this week, a 30-day plan and what to automate first. Use only what I told you and say what you'd need to know more." },
    { t: "Standard operating procedure", p: "Turn this messy description of how we do [PROCESS] into a clear SOP: purpose, who does it, tools, numbered steps, quality checks and common mistakes. Description: [PASTE]." },
  ],
  freelance: [
    { t: "Niche and offer finder", p: "My skills: [SKILLS]. My experience: [EXPERIENCE]. Suggest 5 niches where I could charge more, with the client's problem, a packaged offer, a starting price logic and where to find those clients." },
    { t: "Outreach campaign", p: "Write a 4-touch outreach sequence to [CLIENT TYPE] offering [SERVICE]: first message, value follow-up, case study follow-up and break-up message, for both email and LinkedIn. Under 80 words each." },
    { t: "Proposal document", p: "Write a full proposal for [CLIENT] for [PROJECT]: their situation, goals, approach in phases, deliverables, timeline, 3 pricing options, terms and next step." },
    { t: "Client onboarding kit", p: "Create an onboarding kit for a new [SERVICE] client: welcome message, what I need from them, kickoff call agenda, communication rules, timeline and first-week plan." },
    { t: "Raise my rates", p: "I charge [RATE] for [SERVICE]. Help me raise it: what to add to justify the price, how to present it to new clients, and a message telling existing clients about the change." },
  ],
  urdu: [
    { t: "Urdu brand voice", p: "Mere brand [BRAND] ke liye Roman Urdu ki voice guide banayein: lehja, kaun se lafz use karne hain, kaun se nahi, English aur Urdu ka mix kitna ho, aur 5 misaal ke captions." },
    { t: "30 din ka Urdu content plan", p: "[BUSINESS] ke liye 30 din ka content calendar Roman Urdu mein banayein: har din ka format, topic, hook aur call to action. Ramzan, Eid ya local moqay shamil karein agar [MONTH] mein aate hain." },
    { t: "Urdu sales script", p: "[PRODUCT at PRICE] bechne ke liye WhatsApp voice note ka script Roman Urdu mein likhein: salam, masla, hal, qeemat, aitraaz ka jawab aur order ka tareeqa. 45 second." },
    { t: "Urdu ad set", p: "[OFFER] ke liye 3 Meta ads Roman Urdu mein likhein: ek jazbati, ek faiday wala, ek mukhtasar. Har ek ke saath headline aur 30 second ki reel ka script." },
    { t: "Urdu course outline", p: "'[TOPIC]' par Urdu mein ek chhota course design karein: 6 lessons ke titles, har lesson ke 3 points, ek mashq aur aakhir mein ek project." },
  ],
};

export const proCount = Object.values(proPrompts).reduce((n, a) => n + a.length, 0);
