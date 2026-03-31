# Online Tools Website

Een website met meerdere online tools, geïnspireerd door:
- **iLovePDF** - PDF bewerkingstools
- **LastPass Password Generator** - Wachtwoord generator
- **WhereGoes** - URL redirect checker
- **Fast.com** - Internet snelheidstest

## Beschikbare Tools

### PDF Tools (zoals iLovePDF)
- Merge PDF - Combineer meerdere PDF bestanden
- Split PDF - Splits PDF pagina's
- Compress PDF - Verklein PDF bestandsgrootte
- PDF to Word - Converteer PDF naar Word
- Word to PDF - Converteer Word naar PDF
- PDF to PowerPoint - Converteer PDF naar PowerPoint
- PDF to Excel - Converteer PDF naar Excel
- Edit PDF - Bewerk PDF bestanden
- Sign PDF - Onderteken PDF documenten
- Protect PDF - Beveilig PDF met wachtwoord
- Unlock PDF - Ontgrendel PDF
- Rotate PDF - Roteer PDF pagina's

### Security Tools
- Password Generator - Genereer sterke wachtwoorden (zoals LastPass)

### URL Tools (zoals WhereGoes)
- URL Redirect Checker - Controleer URL redirects
- URL Shortener - Verkort lange URLs

### Network Tools (zoals Fast.com)
- Internet Speed Test - Test je internetsnelheid
- Ping Test - Meet latentie naar servers

## Functionaliteiten

- **Zoeken**: Zoek tools op naam, beschrijving of tags
- **Categorieën**: Filter tools per categorie (PDF, Security, URL, Network)
- **Tags**: Filter tools op specifieke tags
- **Responsive**: Werkt op desktop en mobiel
- **Makkelijk uitbreidbaar**: Voeg eenvoudig nieuwe tools toe via `tools.js`

## Nieuwe Tools Toevoegen

Om een nieuwe tool toe te voegen, bewerk je `tools.js`:

```javascript
{
    id: 'unique-tool-id',
    name: 'Tool Name',
    description: 'Description of what the tool does',
    icon: '🔧',
    category: 'Category',
    tags: ['tag1', 'tag2', 'tag3'],
    render: renderYourToolFunction
}
```

Vervolgens maak je een render functie die de HTML voor de tool interface teruggeeft.

## Gebruik

De website is statisch en kan direct gehost worden op GitHub Pages.

### Lokale ontwikkeling
Open gewoon `index.html` in je browser.

### GitHub Pages
Push naar je GitHub repository en enable GitHub Pages in de repository settings.

## Structuur

```
/
├── index.html      # Hoofdpagina
├── styles.css      # Styling
├── tools.js        # Tool configuratie en functionaliteit
├── app.js          # Applicatie logica (zoeken, filteren, modals)
└── README.md       # Documentatie
```

## Demo Modus

Dit is een demo implementatie. Voor productiefunctionaliteit moeten de tools verbonden worden met backend services of API's:
- PDF tools: Verbind met een PDF processing backend
- URL redirect checker: Gebruik een backend proxy om redirects te volgen
- Speed test: Implementeer echte snelheidstests met grote bestandsdownloads

## License

Free to use and modify.
