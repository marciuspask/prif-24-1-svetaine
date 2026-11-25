/* ============================================================================
 * app.js — paima duomenis iš data.js (globalus `DATA`) ir dinamiškai
 * sugeneruoja visą puslapio turinį. HTML keisti nereikia — tik data.js.
 * ==========================================================================*/

(function () {
  "use strict";

  /* ------------------------------------------------------------------
   * Maži pagalbininkai
   * ----------------------------------------------------------------*/

  // Trumpas būdas sukurti elementą. `html` įrašomas kaip innerHTML.
  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  // Apsauga nuo HTML injekcijos, kai įterpiam tekstą iš duomenų.
  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  // Savaitės dienų pavadinimai pagal JS getDay() (0 = sekmadienis).
  const WEEKDAY_LT = ["Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis"];

  // "14:30–16:05" -> { start: "14:30", end: "16:05", startMin: 870 }
  function parseTime(time) {
    const parts = time.split("–"); // en-dash
    const start = (parts[0] || "").trim();
    const end = (parts[1] || "").trim();
    const [h, m] = start.split(":").map(Number);
    return { start, end, startMin: h * 60 + m };
  }

  // "16:05" -> minutės nuo paros pradžios
  function endMin(time) {
    const end = time.split("–")[1].trim();
    const [h, m] = end.split(":").map(Number);
    return h * 60 + m;
  }

  // Vietinė "YYYY-MM-DD" (be laiko zonos iškraipymo)
  function ymd(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  /* ------------------------------------------------------------------
   * Savaitės paritetas (1 ar 2 savaitė) pagal semesterStartMonday.
   * weekIndex 0,2,4... => "1" (nelyginė), 1,3,5... => "2" (lyginė).
   * ----------------------------------------------------------------*/
  function weekParityFor(date) {
    const start = new Date(DATA.semesterStartMonday + "T00:00:00");
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffDays = Math.floor((d - start) / 86400000);
    const weekIndex = Math.floor(diffDays / 7);
    return (((weekIndex % 2) + 2) % 2) === 0 ? "1" : "2";
  }

  // Ar paskaita vyksta tą savaitę? ("-" visada vyksta)
  function lessonInWeek(lesson, parity) {
    return lesson.week === "-" || lesson.week === parity;
  }

  // Auditorija su korpuso adresu kaip title (tooltip)
  function roomHtml(room) {
    const code = Object.keys(DATA.buildings).find((c) => room.indexOf(c) === 0);
    const addr = code ? DATA.buildings[code] : "";
    const titleAttr = addr ? ` title="${esc(addr)}"` : "";
    return `<span class="room"${titleAttr}>${esc(room)}</span>`;
  }

  function weekBadge(week) {
    if (week === "1") return ' <span class="badge badge--w1">1&nbsp;sav.</span>';
    if (week === "2") return ' <span class="badge badge--w2">2&nbsp;sav.</span>';
    return "";
  }

  // Dienos pavadinimas -> indeksas DATA.schedule masyve
  function scheduleDayByName(name) {
    return DATA.schedule.find((d) => d.day === name) || null;
  }

  /* ==================================================================
   * HERO
   * ================================================================*/
  function renderHero() {
    const g = DATA.group;
    document.getElementById("heroEyebrow").textContent =
      `${g.university} · ${g.faculty}`;
    document.getElementById("heroTitle").textContent =
      `${g.code} · ${g.program}`;
    document.getElementById("heroDesc").textContent =
      `${g.course} kursas, ${g.semester} semestras · ${g.academicYear} ${g.term}. ${g.description}`;
  }

  /* ==================================================================
   * „ŠIANDIEN / ARTIMIAUSIA PASKAITA"
   * ================================================================*/
  function renderToday() {
    const box = document.getElementById("todayBox");
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const todayName = WEEKDAY_LT[now.getDay()];
    const parity = weekParityFor(now);

    const head = el("div", "today__head");
    head.appendChild(el("h2", "today__title", "Šiandien"));
    head.appendChild(el("span", "today__meta",
      `${esc(todayName)}, ${esc(ymd(now))} · šiuo metu ${parity} savaitė`));
    box.appendChild(head);

    // Šiandienos paskaitos (pagal paritetą)
    const today = scheduleDayByName(todayName);
    const todays = today ? today.lessons.filter((l) => lessonInWeek(l, parity)) : [];

    if (todays.length === 0) {
      box.appendChild(el("p", "today__empty",
        "Šiandien paskaitų nėra 🎉"));
    } else {
      const list = el("div", "today__list");
      todays.forEach((l) => {
        const t = parseTime(l.time);
        const isNow = nowMin >= t.startMin && nowMin < endMin(l.time);
        const row = el("div", "lesson-row" + (isNow ? " is-now" : ""));
        row.innerHTML =
          `<div class="lesson-row__time">${esc(l.time)}` +
          (isNow ? '<span class="tag-now">vyksta dabar</span>' : "") + `</div>` +
          `<div class="lesson-row__subject">${esc(l.subject)}</div>` +
          `<div class="lesson-row__meta">${l.type ? esc(l.type) + " · " : ""}` +
          `${roomHtml(l.room)} · ${esc(l.lecturer)}</div>`;
        list.appendChild(row);
      });
      box.appendChild(list);
    }

    // Artimiausia būsima paskaita (ieškom per artimiausias 14 dienų)
    const next = findNextLesson(now, nowMin);
    const nextWrap = el("div", "today__list");
    if (next) {
      const whenTxt = next.isToday
        ? `šiandien ${next.lesson.time}`
        : `${esc(next.dayName)}, ${esc(ymd(next.date))} ${next.lesson.time}`;
      const row = el("div", "lesson-row");
      row.innerHTML =
        `<div><span class="next-label">Kita paskaita:</span>${esc(whenTxt)}` +
        weekBadge(next.lesson.week) + `</div>` +
        `<div class="lesson-row__subject">${esc(next.lesson.subject)}</div>` +
        `<div class="lesson-row__meta">${next.lesson.type ? esc(next.lesson.type) + " · " : ""}` +
        `${roomHtml(next.lesson.room)} · ${esc(next.lesson.lecturer)}</div>`;
      nextWrap.appendChild(row);
      nextWrap.style.marginTop = "12px";
      box.appendChild(nextWrap);
    }
  }

  // Randa pirmą paskaitą, prasidedančią po dabar (atsižvelgiant į savaitės paritetą)
  function findNextLesson(now, nowMin) {
    for (let offset = 0; offset < 14; offset++) {
      const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
      const dayName = WEEKDAY_LT[date.getDay()];
      const day = scheduleDayByName(dayName);
      if (!day) continue;
      const parity = weekParityFor(date);
      const lessons = day.lessons
        .filter((l) => lessonInWeek(l, parity))
        .sort((a, b) => parseTime(a.time).startMin - parseTime(b.time).startMin);
      for (const l of lessons) {
        const startMin = parseTime(l.time).startMin;
        if (offset > 0 || startMin > nowMin) {
          return { lesson: l, date, dayName, isToday: offset === 0 };
        }
      }
    }
    return null;
  }

  /* ==================================================================
   * TVARKARAŠTIS (su savaitės filtru)
   * ================================================================*/
  let currentFilter = "all"; // "all" | "1" | "2"

  function renderSchedule() {
    const wrap = document.getElementById("scheduleWrap");
    wrap.innerHTML = "";

    DATA.schedule.forEach((day) => {
      const lessons = day.lessons.filter((l) => {
        if (currentFilter === "all") return true;
        return lessonInWeek(l, currentFilter);
      });

      const card = el("div", "day");
      const head = el("div", "day__head");
      head.appendChild(el("h3", "day__name", esc(day.day)));
      head.appendChild(el("span", "day__count",
        lessons.length === 1 ? "1 paskaita" : `${lessons.length} paskaitos`));
      card.appendChild(head);

      if (lessons.length === 0) {
        card.appendChild(el("p", "day__empty", "Nėra paskaitų pagal pasirinktą savaitę."));
      } else {
        const list = el("div", "day__lessons");
        lessons.forEach((l) => {
          const lesson = el("div", "lesson");
          lesson.innerHTML =
            `<div class="lesson__top">` +
              `<span class="lesson__time">${esc(l.time)}</span>` +
              (l.type ? `<span class="lesson__type">${esc(l.type)}</span>` : "") +
              weekBadge(l.week) +
            `</div>` +
            `<div class="lesson__subject">${esc(l.subject)} ` +
              `<span class="code">${esc(l.code)}</span></div>` +
            `<div class="lesson__details">` +
              `<span>📍 ${roomHtml(l.room)}</span>` +
              `<span>👤 ${esc(l.lecturer)}</span>` +
            `</div>`;
          list.appendChild(lesson);
        });
        card.appendChild(list);
      }
      wrap.appendChild(card);
    });
  }

  function setupScheduleFilter() {
    const buttons = document.querySelectorAll(".filter__btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        currentFilter = btn.getAttribute("data-week");
        renderSchedule();
      });
    });
  }

  /* ==================================================================
   * EGZAMINAI (su atgaliniu skaičiavimu)
   * ================================================================*/
  function daysUntil(dateStr) {
    const target = new Date(dateStr + "T00:00:00");
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((target - today) / 86400000);
  }

  // Taisyklingas lietuviškas „diena / dienos / dienų" pagal skaičių
  function dayWord(n) {
    const d10 = n % 10, d100 = n % 100;
    if (d10 === 1 && d100 !== 11) return "diena";
    if (d10 >= 2 && d10 <= 9 && (d100 < 11 || d100 > 19)) return "dienos";
    return "dienų";
  }

  function renderExams() {
    const wrap = document.getElementById("examsWrap");
    DATA.exams
      .slice()
      .sort((a, b) => a.date.localeCompare(b.date))
      .forEach((ex) => {
        const diff = daysUntil(ex.date);
        let cd = "countdown", num, label;
        if (diff > 0) { num = diff; label = dayWord(diff) + " liko"; if (diff <= 7) cd += " is-soon"; }
        else if (diff === 0) { cd += " is-today"; num = "šiandien"; label = ""; }
        else { cd += " is-past"; num = "✓"; label = "įvyko"; }

        const row = el("div", "exam");
        row.innerHTML =
          `<div class="exam__info">` +
            `<h4>${esc(ex.subject)} <span class="code">${esc(ex.code)}</span></h4>` +
            `<div class="exam__meta">` +
              `<span>📅 ${esc(ex.date)}</span>` +
              `<span>🕒 ${esc(ex.time)}</span>` +
              `<span>📍 ${roomHtml(ex.room)}</span>` +
              `<span>🎓 ${esc(ex.credits)} kr.</span>` +
              `<span>👤 ${esc(ex.lecturer)}</span>` +
            `</div>` +
          `</div>` +
          `<div class="${cd}">` +
            `<span class="countdown__num">${esc(num)}</span>` +
            (label ? `<span class="countdown__label">${esc(label)}</span>` : "") +
          `</div>`;
        wrap.appendChild(row);
      });
  }

  function renderElectives() {
    const e = DATA.electives;
    if (!e || !e.items.length) return;
    const diff = daysUntil(e.date);
    const wrap = document.getElementById("electivesWrap");
    const info = diff > 0 ? ` (liko ${diff} d.)` : (diff === 0 ? " (šiandien)" : "");
    let html =
      `<h4>Laisvai pasirenkamų dalykų (3 kr.) atsiskaitymai — ${esc(e.date)}${info}</h4>` +
      `<p class="electives__note">${esc(e.note)}</p><ul>`;
    e.items.forEach((it) => {
      html += `<li>${esc(it.subject)} — <span class="muted">${esc(it.lecturer)}</span></li>`;
    });
    html += `</ul>`;
    wrap.innerHTML = html;
  }

  function renderArchive() {
    const wrap = document.getElementById("archiveWrap");
    DATA.examsArchive.forEach((sem) => {
      const det = el("details");
      const sum = el("summary", null, esc(sem.semester));
      det.appendChild(sum);
      const body = el("div", "accordion__body");
      sem.items.forEach((it) => {
        const r = el("div", "archive-row");
        r.innerHTML = `<strong>${esc(it.subject)}</strong>` +
          `<span>${esc(it.lecturer)} · ${esc(it.when)}</span>`;
        body.appendChild(r);
      });
      det.appendChild(body);
      wrap.appendChild(det);
    });
  }

  /* ==================================================================
   * DALYKAI IR DĖSTYTOJAI
   * ================================================================*/
  function renderSubjects() {
    const wrap = document.getElementById("subjectsWrap");
    DATA.subjects.forEach((s) => {
      const card = el("div", "card");
      card.innerHTML =
        `<div class="card__head">` +
          `<div><h3 class="card__name">${esc(s.name)}</h3>` +
          `<div class="card__code">${esc(s.code)}</div></div>` +
          `<span class="card__credits">${esc(s.credits)} kr.</span>` +
        `</div>`;

      s.lecturerEmails.forEach((email) => {
        const L = DATA.lecturers[email];
        if (!L) return;
        const lect = el("div", "lect");
        let contacts = `<a href="mailto:${esc(email)}">${esc(email)}</a>`;
        if (L.phone) contacts += `<span>📞 ${esc(L.phone)}</span>`;
        if (L.office) contacts += `<span>🏢 ${esc(L.office)}</span>`;
        else contacts += `<span class="muted">🏢 kabinetas nenurodytas</span>`;
        lect.innerHTML =
          `<div class="lect__name">${esc(L.name)}</div>` +
          `<div class="lect__title">${esc(L.title)}</div>` +
          `<div class="lect__contacts">${contacts}</div>`;
        card.appendChild(lect);
      });
      wrap.appendChild(card);
    });
  }

  /* ==================================================================
   * NUORODOS
   * ================================================================*/
  function renderLinks() {
    const wrap = document.getElementById("linksWrap");
    DATA.links.forEach((lnk) => {
      const a = el("a", "link-btn");
      a.href = lnk.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = lnk.label;
      wrap.appendChild(a);
    });
  }

  /* ==================================================================
   * KONTAKTAI / BENDRUOMENĖ
   * ================================================================*/
  function renderCommunity() {
    const wrap = document.getElementById("communityWrap");
    const c = DATA.community;

    // Komanda
    const teamPanel = el("div", "panel");
    teamPanel.appendChild(el("h3", null, "Svetainės komanda „Dvi galvos“"));
    DATA.team.forEach((m) => {
      const tm = el("div", "team-member");
      tm.innerHTML =
        `<strong>${esc(m.name)}</strong>` +
        `<span class="role">${esc(m.role)}</span><br>` +
        `<a href="mailto:${esc(m.email)}">${esc(m.email)}</a>`;
      teamPanel.appendChild(tm);
    });
    const bug = el("p", "muted");
    bug.style.marginTop = "12px";
    bug.innerHTML = `Klaidą radai? <a href="mailto:${esc(DATA.team[0].email)}">Parašyk komandai</a>.`;
    teamPanel.appendChild(bug);
    wrap.appendChild(teamPanel);

    // Discord + IT pagalba
    const discPanel = el("div", "panel");
    discPanel.appendChild(el("h3", null, "Grupės Discord"));
    discPanel.appendChild(el("p", "muted", esc(c.discordNote)));
    // Mygtukas rodomas TIK jei užpildytas discordInvite
    if (c.discordInvite) {
      const a = el("a", "btn");
      a.href = c.discordInvite;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = "Prisijungti prie Discord";
      discPanel.appendChild(a);
    }
    if (c.itHelp) {
      const it = el("p", "muted");
      it.style.marginTop = "14px";
      it.innerHTML =
        `<strong style="color:var(--text)">IT pagalba:</strong> ` +
        `<a href="mailto:${esc(c.itHelp.email)}">${esc(c.itHelp.email)}</a>, ` +
        `tel. ${esc(c.itHelp.phone)}`;
      discPanel.appendChild(it);
    }
    wrap.appendChild(discPanel);
  }

  /* ==================================================================
   * PORAŠTĖ
   * ================================================================*/
  function renderFooter() {
    const f = DATA.footer;
    const wrap = document.getElementById("footerWrap");
    wrap.innerHTML =
      `<p><strong>${esc(f.author)}</strong> · ${esc(f.note)}</p>` +
      `<p>Paskutinį kartą atnaujinta: ${esc(f.updated)}</p>` +
      `<p class="muted">Neoficiali studentų svetainė. Visada pasitikrink oficialų tvarkaraštį Mano VILNIUS TECH.</p>`;
  }

  /* ==================================================================
   * NAVIGACIJA (mobilusis meniu) ir TEMA
   * ================================================================*/
  function setupNav() {
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("navMenu");
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    // Uždaryti meniu paspaudus nuorodą (telefone)
    menu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function setupTheme() {
    const btn = document.getElementById("themeToggle");
    const root = document.documentElement;
    const icon = btn.querySelector(".theme-toggle__icon");

    // Atkuriam ankstesnį pasirinkimą (jei buvo)
    const saved = localStorage.getItem("theme"); // "light" | "dark" | null
    if (saved === "light" || saved === "dark") {
      root.setAttribute("data-theme", saved);
    }

    function updateIcon() {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const attr = root.getAttribute("data-theme");
      const isDark = attr ? attr === "dark" : prefersDark;
      icon.textContent = isDark ? "☀️" : "🌙";
    }
    updateIcon();

    btn.addEventListener("click", () => {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const attr = root.getAttribute("data-theme");
      const isDark = attr ? attr === "dark" : prefersDark;
      const next = isDark ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      updateIcon();
    });
  }

  /* ==================================================================
   * PALEIDIMAS
   * ================================================================*/
  function init() {
    renderHero();
    renderToday();
    renderSchedule();
    setupScheduleFilter();
    renderExams();
    renderElectives();
    renderArchive();
    renderSubjects();
    renderLinks();
    renderCommunity();
    renderFooter();
    setupNav();
    setupTheme();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
