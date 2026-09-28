# Pauls housewarming

Een mobiele, interactieve uitnodiging voor Pauls housewarming. De voordeur opent na een klik, daarna verschijnt de woonkamer met geanimeerde gasten, uitnodigingsinformatie en aanklikbare foto's van het uitzicht en de keuken.

## Publiceren met GitHub Pages

Deze repository bevat al een GitHub Actions-workflow. Na de eenmalige Pages-instelling wordt de website automatisch gepubliceerd bij iedere push naar `main`.

### 1. Maak een lege repository

Maak op GitHub een nieuwe repository, bijvoorbeeld `paul-housewarming`. Voeg bij het aanmaken nog geen README, `.gitignore` of licentie toe, omdat die al in deze map staan.

### 2. Upload deze map met Git

Open Terminal, PowerShell of Git Bash in deze map en voer uit:

```bash
git init
git branch -M main
git add .
git commit -m "Voeg housewarming-uitnodiging toe"
git remote add origin https://github.com/JOUW-GEBRUIKERSNAAM/paul-housewarming.git
git push -u origin main
```

Vervang `JOUW-GEBRUIKERSNAAM` en eventueel de repositorynaam door jouw eigen gegevens.

### 3. Zet GitHub Pages eenmalig aan

Ga in de repository naar:

`Settings` → `Pages` → bij **Source** kies je **GitHub Actions**.

Ga daarna naar het tabblad `Actions`. De workflow **Publiceer housewarming op GitHub Pages** wordt automatisch uitgevoerd. Na afronding staat de link bij de deployment en onder `Settings` → `Pages`.

De link heeft meestal deze vorm:

```text
https://JOUW-GEBRUIKERSNAAM.github.io/paul-housewarming/
```

Deze link kun je rechtstreeks via WhatsApp delen. De workflow vult tijdens publicatie automatisch het juiste adres in voor de WhatsApp-previewafbeelding.

## Latere wijzigingen publiceren

Pas bestanden aan en voer daarna uit:

```bash
git add .
git commit -m "Werk uitnodiging bij"
git push
```

Elke push naar `main` publiceert automatisch de nieuwste versie.

## Belangrijke bestanden

- `index.html` — inhoud en getekende personen
- `styles.css` — vormgeving en animaties
- `script.js` — deur, gesprekken, proostanimatie en fotovensters
- `assets/` — voordeur, woonkamer, keuken, uitzicht en deelafbeelding
- `.github/workflows/deploy-pages.yml` — automatische publicatie

## Lokaal bekijken

Dubbelklik op `index.html`, of start vanuit deze map een eenvoudige lokale server:

```bash
python3 -m http.server 8000
```

Open daarna `http://localhost:8000`.

## Privacy

De uitnodiging bevat een woonadres. GitHub Pages maakt de website via een openbare URL bereikbaar. De pagina bevat een `noindex`-instructie voor zoekmachines, maar dat is geen toegangsbeveiliging. Deel de link daarom alleen met genodigden.
