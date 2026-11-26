# Build report — Portfolio update (2026-11-25)

**Status:** All changes saved to `~/Documents/PORTFOLIO/DEYSHU-PORTFOLIO/`. Nothing deployed/online. Structure verified; a live visual pass is still pending (see "What's left").

## What I changed this session
- **Brand:** added your "Deyshu Services" logo to the top nav and footer (I made its background transparent so it sits cleanly on the dark page), and set it as the browser-tab icon.
- **Theme:** re-skinned the whole site from blue to your brand's red → orange → yellow gradient — hero name, buttons, section labels, stat numbers, background glow.
- **You, on the page:** added your photo as a portrait in the About section (transparent cutout, with a warm glow behind it).
- **Hybrid, highlighted:** new "Hybrid by design" section with a Sheets ⇄ Postgres live-sync diagram and four pillars (Cloud · Self-hosted · Native · On-device AI). The project write-ups now lead with the hybrid angle too.
- **New project — ARK | Business Hub (Piggery POS):** read from your `ARK PROJECT` code and described accurately — Dashboard, Pigs (weight tracking), Funds/Investors, Expenses, Sales, Team, Audit Log; built on Apps Script + Sheets. (No saved screenshot exists; it has a labeled frame. I can render its UI on request.)
- **Real JIL screenshots:** expanded the gallery to 8 real shots from your test tenant (admin overview, MIS overview, master portal, members, MIS home, search, kiosk, QR card).
- Site is still fully data-driven from `projects.json` — now 6 projects.

## Privacy calls I made
- **Redacted your email** (`deyshuhayai@gmail.com`) out of the Master-portal screenshot so the network view can be shown safely.
- **Excluded the Anti-Theft-Detector** project from the public site: its screenshots contain your private Gmail, your iPhone's name, and your location/photo trap. That's personal security tooling, not safe to publish. Flagging it for you to decide.
- **Did not use** `JILStudio/sample.png` — it's a photo of a real person the repo says must never be shared. Used the app icon instead.

## What I verified
- `projects.json` valid — 6 projects.
- `script.js` passes a syntax check.
- All 11 referenced images exist on disk; logo + photo committed.

## What's left (not yet done)
- **Live visual + control-run test:** I couldn't drive a browser headlessly in this environment, and screen control was stopped, so I did NOT get a live look or run the "break projects.json → empty state" control test this round. Please reload `http://localhost:8080` (or double-click `serve.command`) to view it; tell me and I'll do the live verification pass.
- **Real screenshots still needed:** JIL NEXUS, ARK UI (can render on request), Church Presentation Studio, Deyhub Studio UI (people-free), Jarvis.
- **Contacts:** Email / Website / GitHub are still placeholders ("deyshuservices.site" is shown as text only, no link).

**Reminder: nothing is deployed or online. Local only, awaiting your OK.**
