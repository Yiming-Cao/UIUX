# Prototype — Silver Palace Inc. verbetervoorstel

UI/UX 1 · Yiming · 1192702

## Openen

Dubbelklik `index.html`. Dat werkt zonder server: de twee fonts zitten ingebed in
`css/fonts.css`, dus er is geen netwerk of installatie nodig.

Werkt de layout niet goed in je browser? Start dan een klein servertje in deze map:

```
python -m http.server 8000
```

en open `http://localhost:8000`.

## Wat zit waar

| Bestand | Wat het is |
|---|---|
| `index.html` | Overzicht: de twee pagina's, de zes button-states en de tokens naast elkaar |
| `categorie.html` | Categoriepagina met filterrail, actieve filters als chips en 3 kaarten per rij |
| `product.html` | Productpagina met buy box, maatkeuze in cm én inch, staffelprijs en bevestiging |
| `css/styles.css` | Alle tokens (kleur, typografie, spacing, radius, elevatie) en de componenten |
| `css/fonts.css` | Cinzel en Inter als data-URI (subset, OFL) |
| `js/prototype.js` | De states die echt werken: maatkeuze, aantal, validatie, loading, bevestiging |

## Wat je in de video laat zien

1. `categorie.html` — klik een maat in de filterrail: het aantal resultaten verandert.
   Hover over een kaart: rand, schaduw en 2 px omhoog.
2. `product.html` — klik een andere maat: de regel eronder past zich aan.
3. Zet het aantal op 2 en klik **Add to cart** → foutmelding met icoon én tekst.
4. Zet het op 12 en klik opnieuw → loading-state, daarna bevestiging op de plek van de knop,
   en de teller in de header loopt mee.
5. Tab een paar keer → overal een zichtbare focusring.
6. `index.html` — de zes states en de tokens naast elkaar: de controle dat het prototype
   dezelfde waarden gebruikt als het document.

## Belangrijk om te kunnen uitleggen

Elke kleur, afstand en corps in `styles.css` komt uit de tokens van het document
(hoofdstuk 10). Er staat geen enkele losse waarde in. Dat is het argument: het ontwerp
is niet alleen mooi op een plaatje, het is ook te bouwen — en dit is het bewijs.
