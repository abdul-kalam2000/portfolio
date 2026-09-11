# Portfolio Site — Abdul Kalam Mansoor

A single-page, no-build-step portfolio site. Plain HTML/CSS/JS — no framework, no compiler, no `npm install` needed to run or edit it.

## File structure

```
index.html          <- page structure/content (education, experience, contact, etc.)
css/style.css        <- all styling (colors, type, layout — see :root variables at the top)
js/projects-data.js  <- YOUR PROJECT LIST LIVES HERE — edit this to add/remove/update projects
js/main.js           <- renders the project list from projects-data.js, handles the filter
                        buttons and the terminal type-on animation. You shouldn't need to
                        touch this for normal updates.
```

## Adding a new project (the main thing you'll do)

Open `js/projects-data.js`. Copy one of the existing objects inside the `PROJECTS` array,
paste it in, and edit the fields:

```js
{
  id: "my-new-project",              // unique, lowercase, no spaces
  title: "My New Project",
  category: "security",              // security | networking | database | hardware | research
  date: "Jan 2027",
  summary: "One sentence — shown before the user expands the card.",
  stack: ["Python", "Docker"],       // shown as small tags
  bullets: [
    "First accomplishment, written like a resume bullet.",
    "Second accomplishment."
  ],
  links: [
    { label: "GitHub", url: "https://github.com/you/repo" }
  ]
}
```

Save the file, refresh the page — that's it. No build step, no other file needs to change.
The project count in the "Work" section header updates automatically.

**Adding a new category** (e.g. "cloud" or "mobile"): add it to the `CATEGORIES` object at
the bottom of `projects-data.js`, and add a matching `--accent-<name>` color variable in
`css/style.css` under `:root`. Also add a filter button for it in `index.html` inside
`#filter-bar` (copy one of the existing `<button data-filter="...">` lines).

## Updating anything else

- **Bio / hero text, experience, education, certifications, contact links:** edit directly
  in `index.html` — it's plain, readable HTML with clear section comments.
- **Colors / fonts / spacing:** edit the `:root { ... }` block at the top of `css/style.css`.
  Everything else in the stylesheet references those variables, so changing e.g. `--accent`
  updates the whole site's accent color in one place.
- **The hero terminal animation:** the typed-out lines live in the `lines` array inside the
  `typeTerminal()` function in `js/main.js`.

## Previewing locally

No server or build tool needed — just open `index.html` directly in a browser. If your
browser blocks local file scripts, run a tiny local server instead:

```bash
# from inside this folder
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying

This is a fully static site, so it works with any static host. A few common options:

**GitHub Pages (free, matches your existing GitHub presence):**
1. Push this folder to a GitHub repo (e.g. `abdul-kalam2000.github.io` for a root domain,
   or any repo name + enable Pages on the `main` branch).
2. In the repo Settings → Pages, set the source to the `main` branch, root folder.
3. If you want it at `akmansoor.com.np`, add a `CNAME` file in this folder containing just
   that domain, and point your domain's DNS to GitHub Pages per
   [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

**Netlify / Vercel (also free, drag-and-drop friendly):** create an account, drag this
folder onto their dashboard, and it's live — both support connecting a custom domain too.

## Accessibility & performance notes

- Respects `prefers-reduced-motion` — the terminal types instantly instead of animating for
  users who've asked their OS to reduce motion.
- All interactive elements (nav toggle, filter buttons, project rows) are real `<button>`
  elements, keyboard-accessible and screen-reader friendly.
- No build step means no JavaScript framework overhead — it should load fast on any
  connection.
