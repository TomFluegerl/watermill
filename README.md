# Hochzeit – Alte Wassermühle 🌾

Hochzeitswebseite für den 26. Juni 2026 in Mauterndorf.

## Deployment auf GitHub Pages

### 1. Repository vorbereiten

```bash
cd /pfad/zu/waterwheel
git add .
git commit -m "Hochzeitswebseite hinzugefügt"
git push -u origin main
```

### 2. GitHub Pages aktivieren

1. Gehe zu **github.com/TomFluegerl/waterwheel**
2. Klicke auf **Settings** → **Pages** (im linken Menü)
3. Unter **Source** wähle **Deploy from a branch**
4. Wähle den Branch **main** und Ordner **/ (root)**
5. Klicke auf **Save**

Die Webseite ist dann unter **https://tomfluegerl.github.io/watermill/** erreichbar.

### 3. Eigene Domain (optional)

Wenn du eine eigene Domain verwenden möchtest:
1. Erstelle eine Datei `CNAME` im Root-Verzeichnis mit deiner Domain
2. Konfiguriere die DNS-Einträge bei deinem Domain-Provider

## Bilder ersetzen

Die Platzhalterbilder befinden sich im Ordner `images/`. Ersetze sie einfach mit eigenen Fotos:

- `01_hero_watermill.jpg` – Hauptbild (Wassermühle/Hochzeitsbild)
- `02_alpine_meadow.jpg` – Naturbild (Trennbild)
- `03_wedding_table.jpg` – Tischdeko/Feier (Footer-Hintergrund)
- `04_austrian_village.jpg` – Ort/Mauterndorf (Sektion Ort & Zeit)
- `05_wood_texture.jpg` – Holztextur (aktuell nicht verwendet)

## Inhalte anpassen

Alle Texte befinden sich direkt in der `index.html` und können mit einem Texteditor bearbeitet werden.

## Technologie

Statische HTML/CSS/JS-Webseite – kein Build-Prozess nötig.
