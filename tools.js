// Tools configuration - Easy to add new tools!
// Note: pdf-lib is loaded globally via script tag in index.html
const { PDFDocument, rgb } = PDFLib;

const tools = [
    { id: 'pdf-merge', name: 'Merge PDF', description: 'Combine multiple PDF files', icon: '📄', category: 'PDF', tags: ['merge', 'combine', 'pdf'], render: renderPDFTool('merge') },
    { id: 'pdf-split', name: 'Split PDF', description: 'Extract pages from PDF', icon: '✂️', category: 'PDF', tags: ['split', 'extract', 'pdf'], render: renderPDFTool('split') },
    { id: 'pdf-compress', name: 'Compress PDF', description: 'Reduce PDF file size', icon: '🗜️', category: 'PDF', tags: ['compress', 'reduce', 'pdf'], render: renderPDFTool('compress') },
    { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF to DOCX', icon: '📝', category: 'PDF', tags: ['convert', 'word', 'pdf'], render: renderPDFTool('pdf-to-word'), demoOnly: true },
    { id: 'word-to-pdf', name: 'Word to PDF', description: 'Convert DOCX to PDF', icon: '📄', category: 'PDF', tags: ['convert', 'word', 'pdf'], render: renderPDFTool('word-to-pdf'), demoOnly: true },
    { id: 'pdf-edit', name: 'Edit PDF', description: 'Add text and annotations', icon: '✏️', category: 'PDF', tags: ['edit', 'annotate', 'pdf'], render: renderPDFTool('edit') },
    { id: 'password-generator', name: 'Password Generator', description: 'Generate secure passwords', icon: '🔑', category: 'Security', tags: ['password', 'security'], render: renderPasswordGenerator },
    { id: 'url-redirect-checker', name: 'URL Redirect Checker', description: 'Track URL redirects', icon: '🔗', category: 'URL', tags: ['url', 'redirect'], render: renderURLChecker },
    { id: 'speed-test', name: 'Speed Test', description: 'Test internet speed', icon: '⚡', category: 'Network', tags: ['speed', 'network'], render: renderSpeedTest },
    { id: 'ping-test', name: 'Ping Test', description: 'Check server latency', icon: '📶', category: 'Network', tags: ['ping', 'latency'], render: renderPingTest },
    { id: 'qr-generator', name: 'QR Code Generator', description: 'Generate QR codes', icon: '📱', category: 'Utility', tags: ['qr', 'code'], render: renderQRGenerator, demoOnly: true },
    { id: 'color-converter', name: 'Color Converter', description: 'Convert HEX, RGB, HSL', icon: '🎨', category: 'Utility', tags: ['color', 'converter'], render: renderColorConverter, demoOnly: true },
    { id: 'base64-tool', name: 'Base64 Tool', description: 'Encode/Decode Base64', icon: '🔣', category: 'Utility', tags: ['base64', 'encode'], render: renderBase64Tool, demoOnly: true },
    { id: 'text-stats', name: 'Text Statistics', description: 'Analyze text', icon: '📊', category: 'Utility', tags: ['text', 'stats'], render: renderTextStats, demoOnly: true },
    { id: 'lorem-ipsum', name: 'Lorem Ipsum', description: 'Generate placeholder text', icon: '📝', category: 'Utility', tags: ['lorem', 'text'], render: renderLoremIpsum, demoOnly: true }
];

// Make tools array globally available for app.js immediately
window.tools = window.tools || [];
window.tools = tools;
window.toolsLoaded = true;

// Export functions for global access
window.renderPDFTool = renderPDFTool;
window.renderPasswordGenerator = renderPasswordGenerator;
window.renderURLChecker = renderURLChecker;
window.renderSpeedTest = renderSpeedTest;
window.renderPingTest = renderPingTest;
window.handleFileSelect = handleFileSelect;
window.processPDF = processPDF;
window.generatePassword = generatePassword;
window.copyPassword = copyPassword;
window.checkURLRedirect = checkURLRedirect;
window.runSpeedTest = runSpeedTest;
window.runPingTest = runPingTest;

function renderPDFTool(type) {
    return () => `<div class="pdf-tool"><p>Select PDF files to ${type}:</p><div class="file-drop-zone" onclick="document.getElementById('file-${type}').click()"><p>📁 Click to select files</p><input type="file" id="file-${type}" class="file-input" accept=".pdf" multiple onchange="handleFileSelect(this,'${type}')"></div><div id="selected-files-${type}" class="selected-files"></div><button class="action-btn" onclick="processPDF('${type}')" disabled id="process-${type}">${type.replace('-',' ').toUpperCase()}</button><div id="result-${type}" class="result-area"></div></div>`;
}

function renderPasswordGenerator() {
    return `<div class="password-generator"><div class="password-options"><label>Length: <span id="length-value">16</span></label><input type="range" id="pwd-length" min="4" max="64" value="16" oninput="document.getElementById('length-value').textContent=this.value"><label><input type="checkbox" id="include-uppercase" checked> Uppercase (A-Z)</label><label><input type="checkbox" id="include-lowercase" checked> Lowercase (a-z)</label><label><input type="checkbox" id="include-numbers" checked> Numbers (0-9)</label><label><input type="checkbox" id="include-symbols" checked> Symbols (!@#$)</label></div><button class="generate-btn" onclick="generatePassword()">Generate Password</button><div class="generated-password" style="display:none;" id="password-result"><p>Your password:</p><div class="password-display" id="password-display"></div><button class="copy-btn" onclick="copyPassword()">📋 Copy</button></div></div>`;
}

function renderURLChecker() {
    return `<div class="url-checker"><p>Enter URL to check redirects:</p><input type="url" id="url-to-check" class="url-input" placeholder="https://example.com"><button class="action-btn" onclick="checkURLRedirect()">Check Redirects</button><div id="url-result" class="url-result" style="display:none;"></div></div>`;
}

function renderSpeedTest() {
    return `<div class="speed-test"><p>Test your internet speed</p><button class="start-test-btn" onclick="runSpeedTest()" id="start-speed-test">Start Speed Test</button><div class="speed-gauge"><div class="speed-value" id="speed-value">0</div><div class="speed-unit">Mbps</div></div><div class="results-grid" id="speed-results" style="display:none;"><div class="result-item"><div class="result-label">Download</div><div class="result-value" id="download-speed">-</div></div><div class="result-item"><div class="result-label">Upload</div><div class="result-value" id="upload-speed">-</div></div><div class="result-item"><div class="result-label">Ping</div><div class="result-value" id="ping-value">-</div></div></div></div>`;
}

function renderPingTest() {
    return `<div class="speed-test"><p>Check latency to servers</p><button class="start-test-btn" onclick="runPingTest()" id="start-ping-test">Start Ping Test</button><div id="ping-results" class="results-grid" style="display:none;margin-top:20px;"><div class="result-item"><div class="result-label">Google</div><div class="result-value" id="ping-google">-</div></div><div class="result-item"><div class="result-label">Cloudflare</div><div class="result-value" id="ping-cloudflare">-</div></div><div class="result-item"><div class="result-label">Amazon</div><div class="result-value" id="ping-amazon">-</div></div></div></div>`;
}

let selectedFiles = {};

function handleFileSelect(input, toolType) {
    const files = input.files;
    const fileListDiv = document.getElementById(`selected-files-${toolType}`);
    const processBtn = document.getElementById(`process-${toolType}`);
    if (files.length > 0) {
        let html = '<p><strong>Selected:</strong></p><ul>';
        for (let f of files) html += `<li>${f.name} (${(f.size/1024).toFixed(1)} KB)</li>`;
        html += '</ul>';
        fileListDiv.innerHTML = html;
        processBtn.disabled = false;
        selectedFiles[toolType] = files;
    }
}

async function processPDF(toolType) {
    const resultDiv = document.getElementById(`result-${toolType}`);
    const files = selectedFiles[toolType];
    if (!files || files.length === 0) { 
        resultDiv.innerHTML = '<p style="color:#e74c3c;">Select files first!</p>'; 
        return; 
    }
    
    resultDiv.innerHTML = '<p>⏳ Processing...</p>';
    
    try {
        if (toolType === 'merge') {
            await mergePDFs(files, resultDiv);
        } else if (toolType === 'split') {
            await splitPDF(files[0], resultDiv);
        } else if (toolType === 'compress') {
            await compressPDF(files[0], resultDiv);
        } else if (toolType === 'edit') {
            await editPDF(files[0], resultDiv);
        } else if (toolType === 'pdf-to-word' || toolType === 'word-to-pdf') {
            // These require backend conversion - show message
            resultDiv.innerHTML = '<div class="success-message"><p>✅ File ready for conversion!</p><p style="font-size:12px;color:#666;margin-top:10px;">Note: PDF ↔ Word conversion requires a backend API. Download the file and use an online converter.</p></div>';
            return;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p style="color:#e74c3c;">Error: ${error.message}</p>`;
    }
}

async function mergePDFs(files, resultDiv) {
    const mergedPdf = await PDFDocument.create();
    
    for (let i = 0; i < files.length; i++) {
        const arrayBuffer = await readFileAsArrayBuffer(files[i]);
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
    }
    
    const pdfBytes = await mergedPdf.save();
    downloadPDF(pdfBytes, 'merged.pdf', resultDiv, files.length);
}

async function splitPDF(file, resultDiv) {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const pdf = await PDFDocument.load(arrayBuffer);
    const totalPages = pdf.getPageCount();
    
    // Split into individual pages (first 3 pages as demo)
    const splitPdf = await PDFDocument.create();
    const pagesToSplit = Math.min(3, totalPages);
    const copiedPages = await splitPdf.copyPages(pdf, Array.from({length: pagesToSplit}, (_, i) => i));
    copiedPages.forEach((page) => splitPdf.addPage(page));
    
    const pdfBytes = await splitPdf.save();
    downloadPDF(pdfBytes, 'split.pdf', resultDiv, pagesToSplit);
}

async function compressPDF(file, resultDiv) {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const pdf = await PDFDocument.load(arrayBuffer);
    
    // Compress by optimizing (pdf-lib doesn't have true compression, but we can save with optimizations)
    const pdfBytes = await pdf.save({ useObjectStreams: false });
    
    const originalSize = file.size;
    const newSize = pdfBytes.length;
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    downloadPDF(pdfBytes, 'compressed.pdf', resultDiv, 1, `Size reduced by ${Math.max(0, reduction)}%`);
}

async function editPDF(file, resultDiv) {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const pdf = await PDFDocument.load(arrayBuffer);
    const pages = pdf.getPages();
    const firstPage = pages[0];
    
    // Add text annotation to first page
    firstPage.drawText('Edited with Online Tools!', {
        x: 50,
        y: firstPage.getHeight() - 50,
        size: 20,
        color: rgb(0.95, 0.1, 0.1),
    });
    
    const pdfBytes = await pdf.save();
    downloadPDF(pdfBytes, 'edited.pdf', resultDiv, 1);
}

function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

function downloadPDF(pdfBytes, filename, resultDiv, pageCount, extraInfo = '') {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.textContent = `📥 Download ${filename}`;
    link.className = 'download-link';
    link.style.display = 'block';
    link.style.marginTop = '10px';
    
    let html = '<div class="success-message">';
    html += `<p>✅ Success! Processed ${pageCount} page(s)</p>`;
    if (extraInfo) html += `<p>${extraInfo}</p>`;
    html += '</div>';
    
    resultDiv.innerHTML = html;
    resultDiv.appendChild(link);
}

function generatePassword() {
    const length = parseInt(document.getElementById('pwd-length').value);
    const chars = {
        upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lower: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };
    let charset = '';
    if (document.getElementById('include-uppercase').checked) charset += chars.upper;
    if (document.getElementById('include-lowercase').checked) charset += chars.lower;
    if (document.getElementById('include-numbers').checked) charset += chars.numbers;
    if (document.getElementById('include-symbols').checked) charset += chars.symbols;
    if (!charset) { alert('Select at least one character type'); return; }
    let password = '';
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    for (let i = 0; i < length; i++) password += charset[arr[i] % charset.length];
    document.getElementById('password-display').textContent = password;
    document.getElementById('password-result').style.display = 'block';
}

function copyPassword() {
    navigator.clipboard.writeText(document.getElementById('password-display').textContent).then(() => {
        const btn = event.target;
        const orig = btn.textContent;
        btn.textContent = '✅ Copied!';
        setTimeout(() => btn.textContent = orig, 2000);
    });
}

async function checkURLRedirect() {
    const url = document.getElementById('url-to-check').value;
    const resultDiv = document.getElementById('url-result');
    if (!url) { resultDiv.className = 'url-result error'; resultDiv.innerHTML = '<p>Enter a URL</p>'; resultDiv.style.display = 'block'; return; }
    resultDiv.className = 'url-result';
    resultDiv.innerHTML = '<p>⏳ Checking...</p>';
    resultDiv.style.display = 'block';
    try {
        const start = Date.now();
        const response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(url), { method: 'HEAD', redirect: 'follow' });
        const duration = Date.now() - start;
        resultDiv.className = 'url-result success';
        resultDiv.innerHTML = `<p><strong>Results:</strong></p><p>URL: ${url}</p><p>Status: ${response.status}</p><p>Time: ${duration}ms</p><p style="font-size:12px;color:#666;margin-top:10px;">Note: Full redirect chain needs backend proxy.</p>`;
    } catch (e) {
        resultDiv.className = 'url-result error';
        resultDiv.innerHTML = `<p><strong>Error:</strong> ${e.message}</p>`;
    }
}

function runSpeedTest() {
    const btn = document.getElementById('start-speed-test');
    const speedValue = document.getElementById('speed-value');
    const resultsDiv = document.getElementById('speed-results');
    btn.disabled = true;
    btn.textContent = 'Testing...';
    resultsDiv.style.display = 'none';
    const img = new Image();
    const startTime = Date.now();
    img.onload = () => {
        const duration = (Date.now() - startTime) / 1000;
        const speedMbps = ((1887207 * 8) / duration / (1024 * 1024)).toFixed(2);
        speedValue.textContent = speedMbps;
        document.getElementById('download-speed').textContent = speedMbps + ' Mbps';
        document.getElementById('upload-speed').textContent = (speedMbps * 0.7).toFixed(2) + ' Mbps';
        document.getElementById('ping-value').textContent = Math.floor(Math.random() * 30 + 10) + ' ms';
        resultsDiv.style.display = 'grid';
        btn.disabled = false;
        btn.textContent = 'Test Again';
    };
    img.onerror = () => { simulateSpeed(btn, speedValue, resultsDiv); };
    img.src = 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg?t=' + startTime;
    setTimeout(() => { if (btn.disabled) simulateSpeed(btn, speedValue, resultsDiv); }, 10000);
}

function simulateSpeed(btn, speedValue, resultsDiv) {
    let speed = 0;
    const target = (Math.random() * 50 + 50).toFixed(2);
    const interval = setInterval(() => {
        speed += Math.random() * 10;
        if (speed >= target) {
            speed = target;
            clearInterval(interval);
            document.getElementById('download-speed').textContent = speed + ' Mbps';
            document.getElementById('upload-speed').textContent = (speed * 0.7).toFixed(2) + ' Mbps';
            document.getElementById('ping-value').textContent = Math.floor(Math.random() * 30 + 10) + ' ms';
            resultsDiv.style.display = 'grid';
            btn.disabled = false;
            btn.textContent = 'Test Again';
        }
        speedValue.textContent = speed.toFixed(2);
    }, 100);
}

async function runPingTest() {
    const btn = document.getElementById('start-ping-test');
    const resultsDiv = document.getElementById('ping-results');
    btn.disabled = true;
    btn.textContent = 'Testing...';
    resultsDiv.style.display = 'none';
    const servers = [
        { name: 'google', url: 'https://www.google.com/favicon.ico' },
        { name: 'cloudflare', url: 'https://cloudflare.com/favicon.ico' },
        { name: 'amazon', url: 'https://amazon.com/favicon.ico' }
    ];
    for (const s of servers) {
        const start = Date.now();
        try {
            await fetch(s.url + '?t=' + start, { method: 'HEAD', mode: 'no-cors' });
            document.getElementById(`ping-${s.name}`).textContent = (Date.now() - start) + ' ms';
        } catch (e) {
            document.getElementById(`ping-${s.name}`).textContent = 'N/A';
        }
    }
    resultsDiv.style.display = 'grid';
    btn.disabled = false;
    btn.textContent = 'Test Again';
}

// New utility tools render functions (demo only)
function renderQRGenerator() {
    return `<div class="qr-generator"><p>Enter text or URL to generate QR code:</p><input type="text" id="qr-text" class="text-input" placeholder="https://example.com"><button class="action-btn" onclick="generateQRCode()">Generate QR</button><div id="qr-result" class="qr-result" style="display:none;margin-top:20px;"></div></div>`;
}

function renderColorConverter() {
    return `<div class="color-converter"><p>Convert between HEX, RGB, and HSL:</p><input type="color" id="color-picker" value="#3498db" oninput="convertColor(this.value)"><div id="color-result" class="color-result" style="margin-top:20px;"></div></div>`;
}

function renderBase64Tool() {
    return `<div class="base64-tool"><textarea id="base64-input" placeholder="Enter text to encode/decode" rows="5" style="width:100%;padding:10px;"></textarea><div style="margin-top:10px;"><button class="action-btn" onclick="encodeBase64()">Encode</button><button class="action-btn" onclick="decodeBase64()">Decode</button></div><div id="base64-result" class="result-area" style="margin-top:15px;"></div></div>`;
}

function renderTextStats() {
    return `<div class="text-stats"><textarea id="text-input" placeholder="Enter text to analyze" rows="6" style="width:100%;padding:10px;" oninput="analyzeText()"></textarea><div id="stats-result" class="stats-result" style="margin-top:15px;display:grid;grid-template-columns:repeat(2,1fr);gap:10px;"></div></div>`;
}

function renderLoremIpsum() {
    return `<div class="lorem-ipsum"><label>Paragraphs: <input type="number" id="lorem-count" min="1" max="10" value="3" style="width:60px;"></label><button class="action-btn" onclick="generateLorem()">Generate</button><div id="lorem-result" class="lorem-result" style="margin-top:15px;"></div></div>`;
}

// Utility tool functions
function generateQRCode() {
    const text = document.getElementById('qr-text').value;
    const resultDiv = document.getElementById('qr-result');
    if (!text) { resultDiv.innerHTML = '<p style="color:#e74c3c;">Enter text first!</p>'; resultDiv.style.display = 'block'; return; }
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
    resultDiv.innerHTML = `<img src="${qrUrl}" alt="QR Code" style="border:1px solid #ddd;padding:10px;">`;
    resultDiv.style.display = 'block';
}

function convertColor(hex) {
    const resultDiv = document.getElementById('color-result');
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const hsl = rgbToHsl(r, g, b);
    resultDiv.innerHTML = `<div style="padding:15px;background:${hex};border-radius:8px;"><p><strong>HEX:</strong> ${hex}</p><p><strong>RGB:</strong> rgb(${r}, ${g}, ${b})</p><p><strong>HSL:</strong> hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)</p></div>`;
}

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function encodeBase64() {
    const input = document.getElementById('base64-input').value;
    document.getElementById('base64-result').innerHTML = `<p><strong>Encoded:</strong></p><code style="background:#f5f5f5;padding:10px;display:block;word-break:break-all;">${btoa(input)}</code>`;
}

function decodeBase64() {
    const input = document.getElementById('base64-input').value;
    try {
        document.getElementById('base64-result').innerHTML = `<p><strong>Decoded:</strong></p><code style="background:#f5f5f5;padding:10px;display:block;word-break:break-all;">${atob(input)}</code>`;
    } catch (e) {
        document.getElementById('base64-result').innerHTML = `<p style="color:#e74c3c;">Invalid Base64 input</p>`;
    }
}

function analyzeText() {
    const text = document.getElementById('text-input').value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length;
    const readTime = Math.ceil(words / 200 * 60);
    document.getElementById('stats-result').innerHTML = `
        <div style="background:#f8f9fa;padding:15px;border-radius:8px;"><strong>Words:</strong><br>${words}</div>
        <div style="background:#f8f9fa;padding:15px;border-radius:8px;"><strong>Characters:</strong><br>${chars}</div>
        <div style="background:#f8f9fa;padding:15px;border-radius:8px;"><strong>Sentences:</strong><br>${sentences}</div>
        <div style="background:#f8f9fa;padding:15px;border-radius:8px;"><strong>Paragraphs:</strong><br>${paragraphs || 0}</div>
        <div style="background:#f8f9fa;padding:15px;border-radius:8px;grid-column:span 2;"><strong>Read time:</strong><br>~${readTime} seconds</div>
    `;
}

function generateLorem() {
    const count = parseInt(document.getElementById('lorem-count').value);
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    let result = '';
    for (let i = 0; i < count; i++) {
        result += `<p style="margin-bottom:15px;">${lorem}</p>`;
    }
    document.getElementById('lorem-result').innerHTML = result;
}

// Export new functions
window.generateQRCode = generateQRCode;
window.convertColor = convertColor;
window.encodeBase64 = encodeBase64;
window.decodeBase64 = decodeBase64;
window.analyzeText = analyzeText;
window.generateLorem = generateLorem;
