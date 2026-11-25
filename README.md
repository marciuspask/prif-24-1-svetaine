# PRIf-24/1 — studijų grupės svetainė

Statinė svetainė studijų grupei **PRIf-24/1** (VILNIUS TECH, Fundamentinių mokslų
fakultetas, Programų sistemų inžinerija, 3 kursas, 5 semestras, 2026–2027 m. m.
rudens semestras).

Grynas **HTML + CSS + vanilla JS**. Jokių framework'ų, jokio backend'o, jokio
kompiliavimo. Pakanka atidaryti `index.html` naršyklėje.

## Kas čia yra

| Failas | Paskirtis |
| --- | --- |
| `index.html` | Puslapio struktūra (semantinis HTML, fiksuota navigacija). |
| `styles.css` | Visi stiliai. Mobile-first, šviesi/tamsi tema. |
| `data.js` | **Visi duomenys** (tvarkaraštis, egzaminai, dėstytojai, nuorodos). Tik šį failą reikia keisti atnaujinant. |
| `app.js` | Logika — paima duomenis iš `data.js` ir sugeneruoja puslapį. |
| `README.md` | Šis failas. |

## Kaip paleisti lokaliai

Du būdai:

**1. Paprasčiausias — dukart spustelėk `index.html`.**
Jis atsidarys naršyklėje ir viskas veiks (`data.js` ir `app.js` kraunami kaip
paprasti failai, be `fetch`, todėl `file://` protokolas tinka).

**2. Per lokalų serverį (rekomenduojama kūrimui).**
Jei turi įdiegtą Python arba Node.js, projekto kataloge paleisk:

```bash
# Python 3
python3 -m http.server 8000

# arba Node.js
npx serve
```

Tada naršyklėje atidaryk `http://localhost:8000`.

## Kaip paskelbti per GitHub Pages

1. Sukurk GitHub repozitoriją (pvz. `prif-24-1`) ir įkelk visus failus
   į jos šaknį (`index.html` turi būti pačiame viršuje, ne poaplankyje):

   ```bash
   git init
   git add .
   git commit -m "Pradinė svetainės versija"
   git branch -M main
   git remote add origin https://github.com/NAUDOTOJAS/prif-24-1.git
   git push -u origin main
   ```

2. GitHub repozitorijoje eik į **Settings → Pages**.
3. Ties **Source** pasirink **Deploy from a branch**.
4. **Branch**: `main`, aplankas `/ (root)`. Spausk **Save**.
5. Po ~1 min svetainė bus pasiekiama adresu:
   `https://NAUDOTOJAS.github.io/prif-24-1/`

> Pakeitus failus tiesiog `git push` — Pages atsinaujins automatiškai.

## Kaip atnaujinti duomenis (`data.js`)

Visi duomenys yra `data.js` faile kaip paprasti JS objektai su komentarais.
HTML keisti **nereikia** — puslapis viską atvaizduoja automatiškai.

**Pridėti paskaitą** — `DATA.schedule` masyve, reikiamos dienos `lessons`:

```js
{ time: "14:30–16:05", subject: "Dalyko pavadinimas", code: "FMXXX00000",
  type: "Paskaitos", room: "P3(TRIII) 310", lecturer: "Vardas Pavardė", week: "-" }
```

- `type` — `"Paskaitos"`, `"Pratybos"`, `"Laboratoriniai darbai"` arba `""`.
- `week` — `"-"` (kiekvieną sav.), `"1"` (tik 1 sav.), `"2"` (tik 2 sav.).
- `room` pradžia turi sutapti su raktu `DATA.buildings` — tada atsiras adreso
  patarimas (tooltip). Naują korpusą pridėk į `DATA.buildings`.

**Pridėti egzaminą** — `DATA.exams` masyve (`date` formatu `"YYYY-MM-DD"` — nuo
jo priklauso atgalinis skaičiavimas).

**Pridėti dėstytoją** — įrašyk į `DATA.lecturers` (raktas = el. paštas), o dalyko
kortelėje (`DATA.subjects`) nurodyk tą el. paštą `lecturerEmails` masyve.

**Savaitės 1/2 skaičiavimas** — keisk `DATA.semesterStartMonday` (turi būti
semestro pirmos savaitės **pirmadienis**). Pagal jį JS nustato, ar dabar 1, ar 2
savaitė.

**Discord mygtukas** — kol `DATA.community.discordInvite` yra `""`, mygtukas
nerodomas (rodomas tik tekstas). Įrašius kvietimo nuorodą — mygtukas atsiras.

**Atnaujinimo data** poraštėje — `DATA.footer.updated`.

## Technika / prieinamumas

- Responsive, mobile-first. Telefone lentelės virsta kortelėmis — nėra
  horizontalaus slinkimo.
- Šviesi / tamsi tema pagal sistemos nustatymą; mygtuku navigacijoje galima
  perjungti rankiniu būdu (pasirinkimas įsimenamas `localStorage`).
- Semantinis HTML, „praleisti navigaciją" nuoroda, matomas fokusas, geras
  kontrastas.
- Vienintelė išorinė priklausomybė — Google Fonts (Inter). Nenorint jos —
  pašalink `<link>` eilutes `index.html` galvoje; CSS turi atsarginius
  sisteminius šriftus.

---

Sukūrė komanda **„Dvi galvos"** · Projektų valdymo principai, 2026
