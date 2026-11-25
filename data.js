/* ============================================================================
 * data.js — VISI svetainės duomenys vienoje vietoje.
 *
 * Kad atnaujintum tvarkaraštį, egzaminus, dėstytojus ar nuorodas, keisk TIK šį
 * failą — HTML liečiamas neturi būti. Puslapis (app.js) viską atvaizduoja
 * dinamiškai pagal čia esančius objektus.
 *
 * Visi duomenys surinkti į vieną globalų objektą `DATA`, kurį naudoja app.js.
 * ==========================================================================*/

const DATA = {

  /* --------------------------------------------------------------------------
   * Grupės informacija (rodoma viršuje ir poraštėje)
   * ------------------------------------------------------------------------*/
  group: {
    code: "PRIf-24/1",
    university: "VILNIUS TECH",
    faculty: "Fundamentinių mokslų fakultetas",
    program: "Programų sistemų inžinerija",
    course: 3,          // kursas
    semester: 5,        // semestras
    academicYear: "2026–2027 m. m.",
    term: "rudens semestras",
    description:
      "Neoficiali studijų grupės svetainė: tvarkaraštis, egzaminai, dėstytojai " +
      "ir naudingos nuorodos vienoje vietoje.",
  },

  /* --------------------------------------------------------------------------
   * Semestro pradžios pirmadienis.
   * Pagal jį JS apskaičiuoja, ar dabar „1 savaitė" (nelyginė) ar „2 savaitė"
   * (lyginė). Jei universitetas pakeistų atskaitos tašką — keisk čia.
   * Formatas: "YYYY-MM-DD" (turi būti PIRMADIENIS).
   * 1 savaitė = nelyginė (savaitės numeris nuo pradžios yra nelyginis).
   * ------------------------------------------------------------------------*/
  semesterStartMonday: "2026-09-07",

  /* --------------------------------------------------------------------------
   * Korpusų adresai. Raktas = kodas, naudojamas tvarkaraštyje ir egzaminuose.
   * Rodomas kaip patarimas (tooltip / paaiškinimas) prie auditorijos.
   * ------------------------------------------------------------------------*/
  buildings: {
    "P3(TRIII)": "Plytinės g. 27, Plytinės rūmai, III korpusas",
    "S4(SRA-II)": "Saulėtekio al. 11, Saulėtekio rūmai, II auditorinis korpusas",
    "S28 (SS)": "Saulėtekio al. 28, Sporto salė",
  },

  /* --------------------------------------------------------------------------
   * Paskaitų tvarkaraštis (5 semestras).
   * Kiekviena diena turi pavadinimą ir paskaitų masyvą.
   *
   * Paskaitos laukai:
   *   time      — "14:30–16:05" (naudojamas rūšiavimui ir „artimiausiai paskaitai")
   *   subject   — dalyko pavadinimas
   *   code      — dalyko kodas
   *   type      — "Paskaitos" / "Pratybos" / "Laboratoriniai darbai" / ""
   *   room      — auditorija (prasideda korpuso kodu iš `buildings`)
   *   lecturer  — dėstytojo vardas
   *   week      — "-" (kiekvieną sav.) | "1" (tik 1 sav.) | "2" (tik 2 sav.)
   * ------------------------------------------------------------------------*/
  schedule: [
    {
      day: "Pirmadienis",
      lessons: [
        { time: "14:30–16:05", subject: "Projektų valdymo principai", code: "FMITB24502", type: "Paskaitos", room: "S4(SRA-II) A09", lecturer: "Dr. Violeta Jadzgevičienė", week: "-" },
        { time: "16:20–17:55", subject: "Duomenų bazių valdymas", code: "FMISB19500", type: "Paskaitos", room: "S4(SRA-II) A10", lecturer: "Jelena Stankevič", week: "-" },
        { time: "18:10–19:45", subject: "Programų sistemų projektavimas (su kursiniu darbu)", code: "FMISB16503", type: "Paskaitos", room: "S4(SRA-II) A10", lecturer: "Aurimas Cholomskis", week: "-" },
        { time: "19:55–21:30", subject: "Programų sistemų projektavimas (su kursiniu darbu)", code: "FMISB16503", type: "Pratybos", room: "S4(SRA-II) A10", lecturer: "Aurimas Cholomskis", week: "-" },
      ],
    },
    {
      day: "Antradienis",
      lessons: [
        { time: "16:20–17:55", subject: "Žmogaus ir kompiuterio sąveika", code: "FMGSB16508", type: "Paskaitos", room: "S4(SRA-II) A10", lecturer: "Dovydas Gaižauskas", week: "2" },
      ],
    },
    {
      day: "Trečiadienis",
      lessons: [
        { time: "08:30–10:05", subject: "Žmogaus ir kompiuterio sąveika", code: "FMGSB16508", type: "Pratybos", room: "P3(TRIII) 310", lecturer: "Dovydas Gaižauskas", week: "2" },
        { time: "10:20–11:55", subject: "Žmogaus ir kompiuterio sąveika", code: "FMGSB16508", type: "Laboratoriniai darbai", room: "P3(TRIII) 310", lecturer: "Dovydas Gaižauskas", week: "-" },
        { time: "12:10–13:45", subject: "Duomenų bazių valdymas", code: "FMISB19500", type: "Pratybos", room: "P3(TRIII) 202", lecturer: "Jelena Stankevič", week: "-" },
        { time: "14:30–16:05", subject: "Programavimo technologijos (su kursiniu darbu)", code: "FMITB17504", type: "Pratybos", room: "P3(TRIII) 314", lecturer: "Mikalojus Ramanauskas", week: "-" },
        { time: "16:20–17:55", subject: "Projektų valdymo principai", code: "FMITB24502", type: "Pratybos", room: "P3(TRIII) 206", lecturer: "Dr. Violeta Jadzgevičienė", week: "1" },
      ],
    },
    {
      day: "Ketvirtadienis",
      lessons: [
        { time: "10:20–11:55", subject: "Programavimo technologijos (su kursiniu darbu)", code: "FMITB17504", type: "Paskaitos", room: "S4(SRA-II) A10", lecturer: "Dr. Jūratė Janutėnaitė-Bogdanienė", week: "2" },
        { time: "12:10–13:45", subject: "Programavimo technologijos (su kursiniu darbu)", code: "FMITB17504", type: "Paskaitos", room: "S4(SRA-II) A10", lecturer: "Dr. Jūratė Janutėnaitė-Bogdanienė", week: "-" },
        { time: "14:30–16:05", subject: "Fizinis aktyvumas ir sveikata (laisvai pasirenkamas)", code: "SMSSB93702", type: "", room: "S28 (SS) 2-7", lecturer: "Artūras Leščinskas", week: "-" },
      ],
    },
    {
      day: "Penktadienis",
      lessons: [
        { time: "14:30–16:05", subject: "Programų sistemų projektavimas (su kursiniu darbu)", code: "FMISB16503", type: "Laboratoriniai darbai", room: "P3(TRIII) 205", lecturer: "Aurimas Cholomskis", week: "1" },
      ],
    },
  ],

  /* --------------------------------------------------------------------------
   * Šio semestro egzaminai (5 semestras, 2026 ruduo).
   * date — "YYYY-MM-DD" (naudojamas atgaliniam skaičiavimui).
   * ------------------------------------------------------------------------*/
  exams: [
    { subject: "Žmogaus ir kompiuterio sąveika", code: "FMGSB16508", credits: 6, lecturer: "Dovydas Gaižauskas", date: "2027-01-05", time: "09:00", room: "P3(TRIII) 206" },
    { subject: "Programų sistemų projektavimas (su kursiniu darbu)", code: "FMISB16503", credits: 6, lecturer: "Aurimas Cholomskis", date: "2027-01-08", time: "09:00", room: "P3(TRIII) 206" },
    { subject: "Projektų valdymo principai", code: "FMITB24502", credits: 3, lecturer: "Violeta Jadzgevičienė", date: "2027-01-12", time: "09:00", room: "P3(TRIII) 310" },
    { subject: "Programavimo technologijos (su kursiniu darbu)", code: "FMITB17504", credits: 6, lecturer: "Jūratė Janutėnaitė-Bogdanienė", date: "2027-01-15", time: "09:00", room: "P3(TRIII) 202" },
    { subject: "Duomenų bazių valdymas", code: "FMISB19500", credits: 6, lecturer: "Jelena Stankevič", date: "2027-01-20", time: "09:00", room: "P3(TRIII) 205" },
  ],

  /* --------------------------------------------------------------------------
   * Laisvai pasirenkamų dalykų (3 kr.) atsiskaitymai.
   * Bendra data visiems; laikas ir vieta nenurodyti.
   * ------------------------------------------------------------------------*/
  electives: {
    date: "2026-12-10",
    note: "Laikas ir vieta nenurodyti.",
    items: [
      { subject: "Gilusis mokymas naudojant TensorFlow", lecturer: "Algirdas Laukaitis" },
      { subject: "Erdvinis modeliavimas ir vizualizavimas", lecturer: "Daiva Makutėnienė" },
      { subject: "Rinktiniai algoritmų teorijos skyriai 1", lecturer: "Artūras Mackūnas" },
      { subject: "3D kompiuterinė grafika ir animacija", lecturer: "Jurgis Zagorskas" },
      { subject: "Prancūzų kalba pradedantiesiems", lecturer: "Lina Dubikaltytė-Raugalienė" },
      { subject: "Programavimas C#", lecturer: "Aivaras Čechamiras" },
      { subject: "Fizinis aktyvumas ir sveikata", lecturer: "Artūras Leščinskas" },
      { subject: "Internetinių sistemų kūrimo karkasai", lecturer: "Dmitrij Kolodynskij" },
      { subject: "Programavimas Python", lecturer: "Jolanta Miliauskaitė" },
      { subject: "Ispanų kalba pradedantiesiems", lecturer: "Carlos Alvarez Romero" },
    ],
  },

  /* --------------------------------------------------------------------------
   * Egzaminų archyvas (ankstesni semestrai). Naujausias viršuje.
   * when — laisvas tekstas (data + laikas + vieta, kartais konsultacija).
   * ------------------------------------------------------------------------*/
  examsArchive: [
    {
      semester: "4 semestras (2026 pavasaris)",
      items: [
        { subject: "Algoritmų teorija", lecturer: "Dmitrij Šešok", when: "2026-05-04 08:30, S6(SRL-I) 420" },
        { subject: "Integruotos programavimo aplinkos (su kursiniu darbu)", lecturer: "Dmitrij Kolodynskij", when: "2026-05-08 14:30, S6(SRL-I) 501" },
        { subject: "Reikalavimų inžinerija", lecturer: "Valdona Judickaitė-Žukovskė", when: "2026-05-12 14:30, P3(TRIII) 205 (konsultacija MS Teams 2026-05-05 09:00)" },
        { subject: "Ekonomika", lecturer: "Eglė Kazlauskienė", when: "2026-05-19 08:30, S4(SRA-II) A10" },
        { subject: "Duomenų bazės (su kursiniu darbu)", lecturer: "Justas Trinkūnas", when: "2026-05-22 12:00, S4(SRA-II) A09" },
        { subject: "Profesinės veiklos praktika 1 (atsiskaitymas)", lecturer: "Daiva Šešokienė", when: "2026-08-28 10:00" },
      ],
    },
    {
      semester: "3 semestras (2025 ruduo)",
      items: [
        { subject: "Etika", lecturer: "Tomas Nemunas Mickevičius", when: "2025-12-09 16:20, S4(SRA-II) A08" },
        { subject: "Logika", lecturer: "Vytis Valatka", when: "2025-12-09 14:30, S2(SRA-I) A01" },
        { subject: "Viešoji komunikacija", lecturer: "Rūta Latinytė", when: "2025-12-10 14:30, S4(SRA-II) A08" },
        { subject: "Kompiuterių tinklai", lecturer: "Arūnas Statkus", when: "2026-01-05 09:00, S6(SRL-I) 501" },
        { subject: "Algoritmai ir duomenų struktūros", lecturer: "Nijolė Čeikienė", when: "2026-01-08 09:00, P3(TRIII) 314 (konsultacija Teams 2026-01-07 10:00)" },
        { subject: "Operacinės sistemos", lecturer: "Inga Tumasonienė", when: "2026-01-13 09:00, P3(TRIII) 105 (konsultacija 2026-01-12 10:00, S4(SRA-II) A09)" },
        { subject: "Programų sistemų inžinerijos pagrindai", lecturer: "Jolanta Mačėnienė", when: "2026-01-16 09:00, P3(TRIII) 205" },
        { subject: "Tikimybių teorija ir matematinė statistika", lecturer: "Dalius Pumputis", when: "2026-01-21 09:00, P3(TRIII) 202" },
      ],
    },
    {
      semester: "2 semestras (2025 pavasaris)",
      items: [
        { subject: "Specialybės anglų kalba", lecturer: "Viktorija Jakučionytė", when: "2025-05-12 10:20, S6(SRL-I) 423" },
        { subject: "Filosofija", lecturer: "Vitalija Keciorytė", when: "2025-05-15 11:00, S4(SRA-II) A08" },
        { subject: "Vadyba", lecturer: "Juliana Smirnova", when: "2025-05-29 09:00, S6(SRL-I) 401" },
        { subject: "Kompiuterių architektūra", lecturer: "Rokas Štrimaitis", when: "2025-06-05 11:00, S6(SRL-I) 501" },
        { subject: "Objektinis programavimas (su kursiniu darbu)", lecturer: "Saulius Valentinavičius", when: "2025-06-09 13:00, S5(SRK-II) 611" },
        { subject: "Pažintinė praktika (atsiskaitymas)", lecturer: "Karina Kulikauskaitė", when: "2025-06-13 13:00, S6(SRL-I) 418" },
        { subject: "Diskrečioji matematika 2", lecturer: "Olga Suboč", when: "2025-06-17 09:00, S5(SRK-II) 614" },
      ],
    },
    {
      semester: "1 semestras (2024 ruduo)",
      items: [
        { subject: "Anglų kalba", lecturer: "Viktorija Jakučionytė", when: "2024-12-12, S3(SRK-I) 214 (1 pogrupis 14:30, 2 pogrupis 10:20)" },
        { subject: "Informacinės technologijos", lecturer: "Nijolė Čeikienė", when: "2025-01-07 13:00, S6(SRL-I) 427 (konsultacija VK 2025-01-03 12:00)" },
        { subject: "Matematinės analizės pagrindai", lecturer: "Dalius Pumputis", when: "2025-01-09 09:00, P3(TRIII) 202 (konsultacija MS Teams 2025-01-08 10:00)" },
        { subject: "Procedūrinis programavimas", lecturer: "Dmitrij Šešok", when: "2025-01-13 09:00, P3(TRIII) 310" },
        { subject: "Diskrečioji matematika 1", lecturer: "Rima Kriauzienė", when: "2025-01-16 09:00, S6(SRL-I) 502 (konsultacija 2025-01-15 10:00, S6(SRL-I) 502)" },
        { subject: "Kompiuterinė grafika", lecturer: "Asta Margienė", when: "2025-01-20 09:00, P3(TRIII) 314 (konsultacija nuotoliu 2025-01-17 10:00)" },
      ],
    },
  ],

  /* --------------------------------------------------------------------------
   * Šio semestro dalykų kortelės. Vienas dalykas gali turėti kelis dėstytojus.
   * lecturers[] raktai turi sutapti su `lecturers` objekto raktais (email'ais).
   * ------------------------------------------------------------------------*/
  subjects: [
    { code: "FMITB24502", name: "Projektų valdymo principai", credits: 3, lecturerEmails: ["violeta.jadzgeviciene@vilniustech.lt"] },
    { code: "FMISB19500", name: "Duomenų bazių valdymas", credits: 6, lecturerEmails: ["jelena.stankevic@vilniustech.lt"] },
    { code: "FMISB16503", name: "Programų sistemų projektavimas (su kursiniu darbu)", credits: 6, lecturerEmails: ["aurimas.cholomskis@vilniustech.lt"] },
    { code: "FMGSB16508", name: "Žmogaus ir kompiuterio sąveika", credits: 6, lecturerEmails: ["dovydas.gaizauskas@vilniustech.lt"] },
    { code: "FMITB17504", name: "Programavimo technologijos (su kursiniu darbu)", credits: 6, lecturerEmails: ["j.janutenaite-bogdaniene@vilniustech.lt", "mikalojus.ramanauskas@vilniustech.lt"] },
    { code: "SMSSB93702", name: "Fizinis aktyvumas ir sveikata (laisvai pasirenkamas)", credits: 3, lecturerEmails: ["arturas.lescinskas@vilniustech.lt"] },
  ],

  /* --------------------------------------------------------------------------
   * Šio semestro dėstytojai. Raktas = el. paštas (naudojamas subjects[] sąsajai).
   * phone — toks, koks nurodytas kontaktuose; "" jei nėra.
   * office — kabinetas; "" jei nenurodyta.
   * ------------------------------------------------------------------------*/
  lecturers: {
    "violeta.jadzgeviciene@vilniustech.lt": { name: "Dr. Violeta Jadzgevičienė", title: "asistentė, Informacinių technologijų katedra", subject: "Projektų valdymo principai", phone: "(0 5) 274 4825", office: "Saulėtekio rūmai, S6(SRL-I) 518" },
    "jelena.stankevic@vilniustech.lt": { name: "Jelena Stankevič", title: "lektorė, Informacinių sistemų katedra", subject: "Duomenų bazių valdymas", phone: "(0 5) 274 4943", office: "" },
    "aurimas.cholomskis@vilniustech.lt": { name: "Aurimas Cholomskis", title: "lektorius, Informacinių sistemų katedra", subject: "Programų sistemų projektavimas", phone: "(0 5) 274 4829", office: "" },
    "dovydas.gaizauskas@vilniustech.lt": { name: "Dovydas Gaižauskas", title: "lektorius, Grafinių sistemų katedra", subject: "Žmogaus ir kompiuterio sąveika", phone: "(0 5) 274 4848", office: "" },
    "j.janutenaite-bogdaniene@vilniustech.lt": { name: "Dr. Jūratė Janutėnaitė-Bogdanienė", title: "docentė, Informacinių technologijų katedra", subject: "Programavimo technologijos (paskaitos)", phone: "(0 5) 274 4825", office: "Saulėtekio rūmai, S6(SRL-I) 517" },
    "mikalojus.ramanauskas@vilniustech.lt": { name: "Mikalojus Ramanauskas", title: "lektorius, Informacinių technologijų katedra", subject: "Programavimo technologijos (pratybos)", phone: "0 688 64 176", office: "Saulėtekio rūmai, S6(SRL-I) 514" },
    "arturas.lescinskas@vilniustech.lt": { name: "Artūras Leščinskas", title: "vyresnysis treneris, Sporto skyrius", subject: "Fizinis aktyvumas ir sveikata", phone: "(0 5) 251 2269", office: "Sporto salė, S28 (SS) 2-1" },
  },

  /* --------------------------------------------------------------------------
   * Naudingos nuorodos (mygtukų tinklelis).
   * ------------------------------------------------------------------------*/
  links: [
    { label: "Moodle", url: "https://moodle.vilniustech.lt" },
    { label: "Mano VILNIUS TECH", url: "https://mano.vilniustech.lt" },
    { label: "Studentų el. paštas (Outlook)", url: "https://outlook.office.com" },
    { label: "Paskaitų tvarkaraščiai", url: "https://mano.vilniustech.lt/timetable/site/search-form" },
    { label: "Egzaminų tvarkaraštis", url: "https://mano.vilniustech.lt/examstimetable/exams" },
    { label: "Dėstytojų konsultacijos", url: "https://mano.vilniustech.lt/lecturerconsult/consult/consult" },
    { label: "VILNIUS TECH žemėlapiai", url: "https://mano.vilniustech.lt/vgtulife/maps" },
    { label: "IT pagalba", url: "https://pagalba.vilniustech.lt" },
    { label: "VILNIUS TECH svetainė", url: "https://vilniustech.lt" },
  ],

  /* --------------------------------------------------------------------------
   * Kontaktai / bendruomenė.
   * discordInvite — palik "", kad Discord mygtukas nebūtų rodomas.
   * Įrašius pilną kvietimo nuorodą (pvz. "https://discord.gg/xxxx"),
   * mygtukas atsiras automatiškai.
   * ------------------------------------------------------------------------*/
  community: {
    discordInvite: "",
    discordNote: "Grupės Discord serveris — kvietimo kreipkitės į grupės administratorių.",
    itHelp: { email: "pagalba@vilniustech.lt", phone: "274 4918", url: "https://pagalba.vilniustech.lt" },
  },

  /* --------------------------------------------------------------------------
   * Svetainės komanda „Dvi galvos".
   * ------------------------------------------------------------------------*/
  team: [
    { name: "Martynas Paškevičius", role: "projekto vadovas, programuotojas", email: "mpaskevicius@stud.vilniustech.lt" },
    { name: "Adomas Salickas", role: "turinio ir testavimo koordinatorius", email: "adomas.salickas@stud.vilniustech.lt" },
  ],

  /* --------------------------------------------------------------------------
   * Poraštė.
   * updated — paskutinio atnaujinimo data (atnaujink keisdamas duomenis).
   * ------------------------------------------------------------------------*/
  footer: {
    author: "Sukūrė komanda „Dvi galvos“",
    note: "Projektų valdymo principai, 2026",
    updated: "2026-11-25",
  },
};
