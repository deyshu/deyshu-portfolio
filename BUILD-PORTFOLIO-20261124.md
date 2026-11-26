# Build report — DEYSHU Portfolio

**Date:** 2026-11-24
**For:** DEYSHU (read this first in the morning)
**Status:** Built and tested locally. **Nothing is online, deployed, pushed, or published.** Waiting for your OK.

---

## The short version

I built your new portfolio website. It's a single, self-contained site (plain HTML, CSS and JavaScript — no frameworks, no build step, nothing to install). It has a dark, "alive" look: a slow-moving gradient background with depth, glassy panels, project cards that tilt in 3D as you move the mouse, and sections that fade in as you scroll. It works on a phone and on a big screen.

It's **data-driven**: every project on the page comes from one file, `projects.json`. To add a new project later, you edit that one file and drop in some pictures — the site updates itself. Nothing about the projects is baked into the page.

I tested the whole thing end to end in a real browser, including a test that **deliberately breaks it** to prove the projects really do come from that file and aren't hardcoded. Everything passed.

**Where it is:** `~/Documents/PORTFOLIO/DEYSHU-PORTFOLIO/`

---

## How to look at it

1. Open the folder `~/Documents/PORTFOLIO/DEYSHU-PORTFOLIO/`.
2. **Double-click `serve.command`.** A small black window opens and your browser pops up with the portfolio. (It runs entirely on your own computer — nothing goes online.)
3. When you're done, click that small black window and press `Control + C` to stop it.

> Why not just double-click `index.html`? Because the site reads `projects.json`, and browsers block that read for pages opened straight off the disk (a security rule, not a bug in the site). `serve.command` works around it in the normal, proper way, still 100% offline. I was asked to make it "open by double-clicking" — this is the honest version of that: one double-click, on `serve.command`.

---

## What's on the page

- **Hero** — your name DEYSHU, "Independent Software Developer · Taiwan", and the line *"A builder who ships real production systems — with AI as a co-pilot."* over the moving background.
- **Stats band** — five honest numbers: 5 major projects · Live in production across a church network · 4-tier architecture · ~390 tests on the photo editor · 13 core technologies.
- **Projects** — the main event, one rich card per project. **JIL Church System is featured first and largest.** Each card has the write-up, your role, tech tags, highlights, and screenshots shown inside device-style frames (a browser window for desktop shots, a phone for mobile shots).
- **Tech stack** — a row of pill tags that lift on hover: Google Apps Script, JavaScript, TypeScript, React, Swift, Rust, Tauri, SQLite, PostgreSQL, Supabase, Python, Docker, Cloudflare.
- **About** — a short, warm bio (student in Taiwan, independent builds-with-AI developer, serves at church).
- **Footer / contact** — with placeholder slots for Email, GitHub and LinkedIn for you to fill in.

You can click any real screenshot to see it full-size (press Escape to close).

---

## The project folders I found, and the real pictures I used

I searched your Mac and read the real projects to keep everything accurate. Here's what I found and used. **I did not fake a single screenshot.**

### 1. JIL Church System — found, with real screenshots ✅
- **Found in:** `~/Documents/PORTFOLIO/JESUS IS LORD PROJECT/JIL QR/` (the "LIVE CODES" Apps Script project) and its training-deck captures under `.../LIVE CODES/claude/training-decks/shots/`.
- **Real images I used (6):** all genuine captures of your system on the **test tenant** ("PH | Test"), so they show the real screens with safe demo data — no real members:
  - `admin-overview.jpg` — the Admin dashboard
  - `mis-executive-overview.jpg` — the MIS executive overview
  - `master-kpi-overview.jpg` — the Master portal, KPI overview across regions
  - `mis-members.jpg` — a membership view
  - `kiosk-home.png` — the phone check-in kiosk
  - `welcome-qr-card.png` — the personal QR identity card
- I also copied your real **`JIL Logo.PNG`** into the assets.

### 2. JIL NEXUS — found the project, no screenshot possible
- **Found in:** your notes/prompts under the same JIL folders; it's the self-hosted Supabase + Docker database backbone.
- **No picture:** a database backend has no screen of its own, so I used a clearly-labeled "Screenshot coming" frame. (If you ever want one, a shot of the Supabase dashboard or the schema would fit.)

### 3. Church Presentation Studio — not found on this Mac
- I searched for a Tauri/Rust project and didn't find it here. Used a labeled "Screenshot coming" frame. The write-up (Tauri 2, React/TS, Rust, SQLite, live mic Bible-reference detection, dual-screen HDMI) comes from your spec.

### 4. Deyhub Studio — found, used the real app icon (not the photo) ✅
- **Found in:** `~/Documents/PORTFOLIO/JESUS IS LORD PROJECT/JILStudio/`.
- **Important choice:** that project contains `sample.png`, but its own `CLAUDE.md` says it is *"a photograph of an identifiable person… the repository can never be shared."* So I did **not** use it — putting an identifiable person's photo on a public portfolio would be wrong. Instead I used the app's **real icon** (`build/JILStudio.iconset/icon_512x512@2x.png`) in an app frame, plus a labeled "Screenshot coming" placeholder for the interface, with a note that a clean, people-free capture goes there.

### 5. Jarvis — not on this Mac (as expected)
- Your spec says it lives on the Windows ASUS laptop. I didn't hunt or fake anything — used a labeled frame and your summary (Python, local Ollama llama3.2, speech in/out, faith-based personality, video roadmap).

---

## Which projects still need a real screenshot from you (and where to drop each)

Just drop the image file into the folder named below, then reload the page — it appears automatically.

| Project | What's missing | Drop the file here |
|---|---|---|
| **JIL NEXUS** | optional — a Supabase dashboard or schema shot | `assets/jil-nexus/` |
| **Church Presentation Studio** | a screenshot of the app | `assets/church-presentation-studio/` |
| **Deyhub Studio** | a UI screenshot with **no identifiable people** in the photo | `assets/deyhub-studio/` |
| **Jarvis** | a screenshot or short demo image from the Windows laptop | `assets/jarvis/` |

After dropping a file, open `projects.json`, find that project's `images` list, and change the `"frame": "placeholder"` entry to point at your file, e.g.
`{ "src": "assets/jarvis/jarvis.png", "frame": "browser", "alt": "Jarvis", "caption": "Jarvis in action" }`.
Use `"frame": "phone"` for phone-shaped shots, `"browser"` for desktop shots.

---

## Test results (I tested the whole flow, not spot-checks)

I served the folder locally and drove it in a real browser (Chrome).

| Test | Result |
|---|---|
| Every section renders (hero, stats, 5 projects, stack, about, footer) | ✅ Pass — 5 project cards, 5 stat tiles, 13 tech chips, 2 about paragraphs, 3 contact slots |
| All project cards come from `projects.json` | ✅ Pass |
| Images load | ✅ Pass — all 7 real images loaded; 4 browser frames + 2 phone frames + 4 labeled "coming" frames |
| Animations run (background, 3D tilt, scroll-reveal) | ✅ Pass |
| **Zero console errors** on a normal load | ✅ Pass |
| Click a screenshot → full-size lightbox → Escape closes it | ✅ Pass |
| Responsive at **phone width (390px)** | ✅ Pass — no sideways scrolling; cards and stats stack to one column; top menu collapses |
| Responsive at **desktop width** | ✅ Pass |

### Auto-update test (add then remove a project)
- Added a dummy 6th project **"TEST PROJECT — DELETE ME"** to `projects.json` and reloaded → **a 6th card appeared on its own.** ✅
- Removed it and reloaded → **back to 5 cards, the test card gone.** ✅
- The file is clean afterwards (5 real projects, no leftovers).

### Control run — the "must fail when broken" test
This proves the site is genuinely driven by the data file and not secretly hardcoded.
- **Broken:** I renamed `projects.json` so it couldn't be found, then reloaded → the Projects section showed **0 cards and a visible empty-state message** ("projects.json is missing or invalid, so there is nothing to show"), and logged one handled error. ✅ (This error is *expected* — it's the mechanism correctly reporting the break.)
- **Restored:** I put `projects.json` back and reloaded → **all 5 cards rendered again**, empty-state gone. ✅

Both outcomes are exactly what should happen: broken data = visibly empty, good data = full page.

---

## STEP 4 — anything I had to fix

Nothing broke during testing, so there were no bug-fixes to make. One **design decision** during the build: my first pick for a JIL analytics screenshot happened to be captured mid-load (it showed a "Loading charts…" state), so I swapped it for a cleaner membership view. That's the only change from the first draft.

---

## Anything I could not do, or chose not to do

- **Did not fabricate any screenshots.** Where no real image exists (NEXUS, Presentation Studio, Deyhub Studio UI, Jarvis), there's a clearly-labeled empty frame — never a fake.
- **Did not use `sample.png`** from the photo-editor project, because it's a photo of a real person in a repo that must never be shared. Used the app icon instead.
- **Could not force a true 390px browser window** through the automation (the window wouldn't shrink past ~1114px), so I verified the phone layout by loading the page inside a real 390px frame and measuring it directly — it passed (no overflow, everything stacks).
- **One thing to know:** the `master-kpi-overview.jpg` screenshot has your own email address (`deyshuhayai@gmail.com`) in its top-right corner, because that's how the real Master portal shows who's signed in. It's only your own email, but if you'd rather not have it on a public site, I can swap that shot or you can crop it. Your call.
- **Did not change any of your existing projects.** I only read them. Everything new lives inside the one new folder.

---

## Next steps for you

1. Double-click **`serve.command`** and look through the site.
2. Fill in your real contact links in `projects.json` (the `"contact"` section near the top — Email, GitHub, LinkedIn).
3. If you want, send me (or drop in) real screenshots for NEXUS, Presentation Studio, Deyhub Studio and Jarvis — see the table above.
4. Tell me what to change — wording, colours, order, which screenshots, the email question above.
5. **When you're happy, say the word and we can talk about putting it online.** Until then it stays exactly where it is: on your Mac only.

**Reminder: nothing is deployed, pushed, or published. It's all local, waiting for your OK.**
