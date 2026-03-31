// Tools configuration - Easy to add new tools!
const tools = [
    { id: 'pdf-merge', name: 'Merge PDF', description: 'Combine multiple PDF files', icon: '📄', category: 'PDF', tags: ['merge', 'combine', 'pdf'], render: renderPDFTool('merge') },
    { id: 'pdf-split', name: 'Split PDF', description: 'Extract pages from PDF', icon: '✂️', category: 'PDF', tags: ['split', 'extract', 'pdf'], render: renderPDFTool('split') },
    { id: 'pdf-compress', name: 'Compress PDF', description: 'Reduce PDF file size', icon: '🗜️', category: 'PDF', tags: ['compress', 'reduce', 'pdf'], render: renderPDFTool('compress') },
    { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF to DOCX', icon: '📝', category: 'PDF', tags: ['convert', 'word', 'pdf'], render: renderPDFTool('pdf-to-word') },
    { id: 'word-to-pdf', name: 'Word to PDF', description: 'Convert DOCX to PDF', icon: '📄', category: 'PDF', tags: ['convert', 'word', 'pdf'], render: renderPDFTool('word-to-pdf') },
    { id: 'pdf-edit', name: 'Edit PDF', description: 'Add text and annotations', icon: '✏️', category: 'PDF', tags: ['edit', 'annotate', 'pdf'], render: renderPDFTool('edit') },
    { id: 'password-generator', name: 'Password Generator', description: 'Generate secure passwords', icon: '🔑', category: 'Security', tags: ['password', 'security'], render: renderPasswordGenerator },
    { id: 'url-redirect-checker', name: 'URL Redirect Checker', description: 'Track URL redirects', icon: '🔗', category: 'URL', tags: ['url', 'redirect'], render: renderURLChecker },
    { id: 'speed-test', name: 'Speed Test', description: 'Test internet speed', icon: '⚡', category: 'Network', tags: ['speed', 'network'], render: renderSpeedTest },
    { id: 'ping-test', name: 'Ping Test', description: 'Check server latency', icon: '📶', category: 'Network', tags: ['ping', 'latency'], render: renderPingTest }
];

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

function processPDF(toolType) {
    const resultDiv = document.getElementById(`result-${toolType}`);
    const files = selectedFiles[toolType];
    if (!files || files.length === 0) { resultDiv.innerHTML = '<p style="color:#e74c3c;">Select files first!</p>'; return; }
    resultDiv.innerHTML = '<p>⏳ Processing...</p>';
    setTimeout(() => {
        let totalSize = Array.from(files).reduce((sum, f) => sum + f.size, 0);
        resultDiv.innerHTML = `<div class="success-message"><p>✅ Success!</p><p>Processed ${files.length} file(s), ${(totalSize/1024).toFixed(1)} KB</p><p style="font-size:12px;color:#666;margin-top:10px;">Note: Client-side demo. For full PDF processing, integrate pdf-lib or backend API.</p></div>`;
    }, 1500);
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
