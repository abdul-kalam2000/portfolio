/* main.js — rendering and interaction. No project content lives here;
   edit js/projects-data.js instead. */

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  wireFilter();
  typeTerminal();
  wireNavToggle();
  setYear();
});

function renderProjects(activeFilter = "all") {
  const list = document.getElementById("project-list");
  list.innerHTML = "";

  const items = PROJECTS.filter(p => activeFilter === "all" || p.category === activeFilter);

  items.forEach((project, i) => {
    const cat = CATEGORIES[project.category];
    const row = document.createElement("article");
    row.className = "project-row";
    row.setAttribute("data-category", project.category);

    const stackTags = project.stack.map(s => `<span class="tag">${escapeHTML(s)}</span>`).join("");
    const bullets = project.bullets.map(b => `<li>${escapeHTML(b)}</li>`).join("");
    const links = project.links.map(
      l => `<a class="project-link" href="${l.url}" target="_blank" rel="noopener">${escapeHTML(l.label)}</a>`
    ).join("");

    row.innerHTML = `
      <button class="project-summary" aria-expanded="false" aria-controls="detail-${project.id}">
        <span class="project-dot" style="background:${cat.color}" aria-hidden="true"></span>
        <span class="project-heading">
          <span class="project-title">${escapeHTML(project.title)}</span>
          <span class="project-oneliner">${escapeHTML(project.summary)}</span>
        </span>
        <span class="project-meta">
          <span class="project-cat">${cat.label}</span>
          <span class="project-date">${escapeHTML(project.date)}</span>
          <span class="chevron" aria-hidden="true">＋</span>
        </span>
      </button>
      <div class="project-detail" id="detail-${project.id}" hidden>
        <div class="tags">${stackTags}</div>
        <ul>${bullets}</ul>
        ${links ? `<div class="project-links">${links}</div>` : ""}
      </div>
    `;

    const btn = row.querySelector(".project-summary");
    const detail = row.querySelector(".project-detail");
    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!isOpen));
      detail.hidden = isOpen;
      row.classList.toggle("is-open", !isOpen);
    });

    list.appendChild(row);
  });

  const countEl = document.getElementById("project-count");
  if (countEl) countEl.textContent = items.length;
}

function wireFilter() {
  const filterBar = document.getElementById("filter-bar");
  if (!filterBar) return;
  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    filterBar.querySelectorAll("[data-filter]").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderProjects(btn.getAttribute("data-filter"));
  });
}

function wireNavToggle() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}

function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---- Hero terminal typewriter -----------------------------------
   Types out a real excerpt of the Retbleed demo's actual output.
   Respects prefers-reduced-motion by rendering instantly. */
function typeTerminal() {
  const el = document.getElementById("terminal-body");
  if (!el) return;

  const lines = [
    { text: "$ ./retbleed", cls: "cmd" },
    { text: "=== RETBLEED ATTACK DEMO ===", cls: "" },
    { text: "STATUS: [VULNERABLE] No Defense. Attack should SUCCEED.", cls: "warn" },
    { text: "Offset 00 | Found: 's' | HIT!  [##########     ] 49 cyc (Fast)", cls: "hit" },
    { text: "Offset 01 | Found: 'u' | HIT!  [##########     ] 51 cyc (Fast)", cls: "hit" },
    { text: "Offset 02 | Found: 'p' | HIT!  [##########     ] 48 cyc (Fast)", cls: "hit" },
    { text: "", cls: "" },
    { text: "$ gcc -DSECURE_MODE -o retbleed retbleed.c && ./retbleed", cls: "cmd" },
    { text: "STATUS: [SECURE] Defense Active. Attack should FAIL.", cls: "ok" },
    { text: "Offset 00 | Found: '?' | SAFE   [               ] >150 cyc (Slow)", cls: "safe" },
  ];

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    el.innerHTML = lines.map(l => `<div class="term-line ${l.cls}">${escapeHTML(l.text) || "&nbsp;"}</div>`).join("");
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let currentDiv = null;

  function step() {
    if (lineIndex >= lines.length) {
      el.insertAdjacentHTML("beforeend", '<div class="term-line term-cursor">&#9608;</div>');
      return;
    }
    const line = lines[lineIndex];
    if (charIndex === 0) {
      currentDiv = document.createElement("div");
      currentDiv.className = `term-line ${line.cls}`;
      el.appendChild(currentDiv);
    }
    if (charIndex < line.text.length) {
      currentDiv.textContent = line.text.slice(0, charIndex + 1);
      charIndex++;
      setTimeout(step, line.cls === "cmd" ? 28 : 8);
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(step, line.text === "" ? 60 : 140);
    }
  }
  step();
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
