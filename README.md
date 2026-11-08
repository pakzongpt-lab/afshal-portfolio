# Afshal Amir — Portfolio

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Motion · GSAP · Lenis · React Three Fiber

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production check
```

## Deploy (GitHub → Vercel, ~3 minutes)

1. Create an empty repo on GitHub (e.g. `afshal-portfolio`).
2. In this folder:
   ```bash
   git add -A && git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/afshal-portfolio.git
   git push -u origin main
   ```
3. Go to **vercel.com/new**, import the repo, keep the defaults (Framework: Next.js) and click **Deploy**.
4. After it deploys, open `src/data/site.ts` and set `profile.site` to your live URL (used for SEO and share previews), then push again.

## Things to fill in — `src/data/site.ts`

- `profile.email` — your real email (currently a placeholder).
- `profile.whatsapp` — your number in international format, digits only (e.g. `923001234567`). The WhatsApp button appears once this is set.
- `socials` — add URLs for X, YouTube, TikTok and Snapchat if you use them. Empty ones show as floating decoration in the hero but aren't links.
- `projects` — six projects (Jolta, Gaming Wala Bhai, ARTOSO Properties, Star X, Auto Channel 1, PML Official, Petmaa) have short write-ups because those sites couldn't be reached while building. Add your role, approach and features, and drop screenshots into `public/shots/` (set `cover` to the file).
- `experience` — add dates for previous roles if you'd like them shown.

## Environment variables (Vercel → Project → Settings → Environment Variables)

| Variable | What it does |
| --- | --- |
| `RESEND_API_KEY` | Makes the contact form send email (free key at resend.com). Without it, the form opens the visitor's email app with the message filled in. |
| `CONTACT_TO_EMAIL` | Where form messages are delivered. |
| `CONTACT_FROM_EMAIL` | Optional sender, e.g. `Portfolio <hello@yourdomain.com>` once your domain is verified in Resend. |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID (`G-XXXXXXX`). Analytics loads only when this is set. |

## Where things live

- `src/data/site.ts` — all content
- `src/components/hero/` — hero + 3D scene
- `src/components/sections/` — page sections
- `src/app/work/[slug]/` — project case-study pages
- `public/work/` — portfolio images from your PDF · `public/img/` — photos · `public/video/` — behind-the-scenes clip

Accessibility: custom cursor only on mouse devices, never blocks clicks; everything respects "reduce motion"; skip link; keyboard-closable menu and lightbox.
