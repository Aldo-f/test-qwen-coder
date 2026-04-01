# Online Tools Website

A website with multiple online tools, inspired by:
- **iLovePDF** - PDF editing tools
- **LastPass Password Generator** - Password generator
- **WhereGoes** - URL redirect checker
- **Fast.com** - Internet speed test

## Available Tools

### PDF Tools (like iLovePDF)
- Merge PDF - Combine multiple PDF files
- Split PDF - Split PDF pages
- Compress PDF - Reduce PDF file size
- PDF to Word - Convert PDF to Word
- Word to PDF - Convert Word to PDF
- PDF to PowerPoint - Convert PDF to PowerPoint
- PDF to Excel - Convert PDF to Excel
- Edit PDF - Edit PDF files
- Sign PDF - Sign PDF documents
- Protect PDF - Secure PDF with password
- Unlock PDF - Unlock PDF
- Rotate PDF - Rotate PDF pages

### Security Tools
- Password Generator - Generate strong passwords (like LastPass)

### URL Tools (like WhereGoes)
- URL Redirect Checker - Check URL redirects
- URL Shortener - Shorten long URLs

### Network Tools (like Fast.com)
- Internet Speed Test - Test your internet speed
- Ping Test - Measure latency to servers

## Features

- **Search**: Search tools by name, description, or tags
- **Categories**: Filter tools by category (PDF, Security, URL, Network)
- **Tags**: Filter tools by specific tags
- **Responsive**: Works on desktop and mobile
- **Easily extensible**: Easily add new tools via `tools.js`

## Adding New Tools

To add a new tool, edit `tools.js`:

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

Then create a render function that returns the HTML for the tool interface.

## Usage

The website is static and can be directly hosted on GitHub Pages.

### Local Development
Simply open `index.html` in your browser.

### GitHub Pages
Push to your GitHub repository and enable GitHub Pages in the repository settings.

## Structure

```
/
├── index.html      # Main page
├── styles.css      # Styling
├── tools.js        # Tool configuration and functionality
├── app.js          # Application logic (search, filtering, modals)
└── README.md       # Documentation
```

## Demo Mode

This is a demo implementation. For production functionality, tools need to be connected to backend services or APIs:
- PDF tools: Connect to a PDF processing backend
- URL redirect checker: Use a backend proxy to follow redirects
- Speed test: Implement real speed tests with large file downloads

## License

Free to use and modify.
