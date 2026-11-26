# DEYSHU — Portfolio

A self-contained portfolio site (plain HTML + CSS + vanilla JS, no build step). All project content lives in **`projects.json`** — the site renders itself from that file.

## How to open it

Because the site reads `projects.json`, modern browsers block that read when you just double-click `index.html` (a browser security rule for `file://` pages). Open it through a tiny local server instead — it still runs fully offline:

- **Easiest:** double-click **`serve.command`**. It starts a local server and opens the page in your browser. Press `Ctrl+C` in the little window to stop it.
- **Or by hand:** open Terminal in this folder and run `python3 -m http.server 8080`, then visit `http://localhost:8080`.

## How to add a new project (auto-update)

1. Open **`projects.json`**.
2. Copy an existing object inside `"projects": [ ... ]` and change its text (`name`, `tagline`, `description`, `tech`, `highlights`, `status`).
3. Put the project's real screenshots in a new folder under **`assets/`** (e.g. `assets/my-project/`) and point each `images` entry's `src` at them. No image yet? Set `"frame": "placeholder"` and it shows a tidy "Screenshot coming" card.
4. Reload the page — the new project appears automatically. Nothing else to edit.

Set `"featured": true` to pull a project to the top as the flagship. `"accent"` sets its highlight colour.
