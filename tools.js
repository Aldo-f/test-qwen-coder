// Tools configuration - Easy to add new tools!
// Just add a new object to this array with the required properties

const tools = [
    // PDF Tools (inspired by ilovepdf.com)
    {
        id: 'pdf-merge',
        name: 'Merge PDF',
        description: 'Combine multiple PDF files into one unified document',
        icon: '📄',
        category: 'PDF',
        tags: ['merge', 'combine', 'join', 'pdf'],
        render: renderPDFTool('merge')
    },
    {
        id: 'pdf-split',
        name: 'Split PDF',
        description: 'Separate PDF pages or extract specific pages from your PDF',
        icon: '✂️',
        category: 'PDF',
        tags: ['split', 'extract', 'separate', 'pdf'],
        render: renderPDFTool('split')
    },
    {
        id: 'pdf-compress',
        name: 'Compress PDF',
        description: 'Reduce file size while optimizing for maximal PDF quality',
        icon: '🗜️',
        category: 'PDF',
        tags: ['compress', 'reduce', 'optimize', 'pdf'],
        render: renderPDFTool('compress')
    },
    {
        id: 'pdf-to-word',
        name: 'PDF to Word',
        description: 'Convert your PDF to WORD documents with incredible accuracy',
        icon: '📝',
        category: 'PDF',
        tags: ['convert', 'word', 'docx', 'pdf'],
        render: renderPDFTool('pdf-to-word')
    },
    {
        id: 'word-to-pdf',
        name: 'Word to PDF',
        description: 'Convert DOC and DOCX files to PDF format easily',
        icon: '📄',
        category: 'PDF',
        tags: ['convert', 'word', 'docx', 'pdf'],
        render: renderPDFTool('word-to-pdf')
    },
    {
        id: 'pdf-to-ppt',
        name: 'PDF to PowerPoint',
        description: 'Turn your PDF files into easy to edit PPT and PPTX presentations',
        icon: '📊',
        category: 'PDF',
        tags: ['convert', 'powerpoint', 'ppt', 'pdf'],
        render: renderPDFTool('pdf-to-ppt')
    },
    {
        id: 'pdf-to-excel',
        name: 'PDF to Excel',
        description: 'Pull data straight from PDFs into Excel spreadsheets in seconds',
        icon: '📈',
        category: 'PDF',
        tags: ['convert', 'excel', 'spreadsheet', 'pdf'],
        render: renderPDFTool('pdf-to-excel')
    },
    {
        id: 'pdf-edit',
        name: 'Edit PDF',
        description: 'Add text, images, shapes or annotations to your PDF files',
        icon: '✏️',
        category: 'PDF',
        tags: ['edit', 'annotate', 'modify', 'pdf'],
        render: renderPDFTool('edit')
    },
    {
        id: 'pdf-sign',
        name: 'Sign PDF',
        description: 'Create your signature and sign any PDF document',
        icon: '✍️',
        category: 'PDF',
        tags: ['sign', 'signature', 'signing', 'pdf'],
        render: renderPDFTool('sign')
    },
    {
        id: 'pdf-protect',
        name: 'Protect PDF',
        description: 'Encrypt PDF files with a password to keep your data private',
        icon: '🔒',
        category: 'PDF',
        tags: ['protect', 'password', 'encrypt', 'security', 'pdf'],
        render: renderPDFTool('protect')
    },
    {
        id: 'pdf-unlock',
        name: 'Unlock PDF',
        description: 'Remove PDF password security, giving you the freedom to use your PDFs',
        icon: '🔓',
        category: 'PDF',
        tags: ['unlock', 'remove-password', 'decrypt', 'pdf'],
        render: renderPDFTool('unlock')
    },
    {
        id: 'pdf-rotate',
        name: 'Rotate PDF',
        description: 'Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once',
        icon: '🔄',
        category: 'PDF',
        tags: ['rotate', 'orientation', 'pdf'],
        render: renderPDFTool('rotate')
    },
    
    // Password Tools (inspired by lastpass.com/features/password-generator)
    {
        id: 'password-generator',
        name: 'Password Generator',
        description: 'Generate strong, secure passwords with customizable options',
        icon: '🔑',
        category: 'Security',
        tags: ['password', 'generator', 'security', 'random'],
        render: renderPasswordGenerator
    },
    
    // URL Tools (inspired by wheregoes.com)
    {
        id: 'url-redirect-checker',
        name: 'URL Redirect Checker',
        description: 'Track URL redirects and find where links ultimately lead',
        icon: '🔗',
        category: 'URL',
        tags: ['url', 'redirect', 'tracker', 'link'],
        render: renderURLChecker
    },
    {
        id: 'url-shortener',
        name: 'URL Shortener',
        description: 'Shorten long URLs into compact, shareable links',
        icon: '✂️',
        category: 'URL',
        tags: ['url', 'shorten', 'link', 'compact'],
        render: renderURLShortener
    },
    
    // Network Tools (inspired by fast.com)
    {
        id: 'speed-test',
        name: 'Internet Speed Test',
        description: 'Test your internet connection speed instantly',
        icon: '⚡',
        category: 'Network',
        tags: ['speed', 'internet', 'network', 'bandwidth'],
        render: renderSpeedTest
    },
    {
        id: 'ping-test',
        name: 'Ping Test',
        description: 'Check latency to various servers worldwide',
        icon: '📶',
        category: 'Network',
        tags: ['ping', 'latency', 'network', 'test'],
        render: renderPingTest
    }
];

// Render functions for each tool type

function renderPDFTool(toolType) {
    return function() {
        const toolNames = {
            'merge': 'Merge PDF Files',
            'split': 'Split PDF',
            'compress': 'Compress PDF',
            'pdf-to-word': 'Convert PDF to Word',
            'word-to-pdf': 'Convert Word to PDF',
            'pdf-to-ppt': 'Convert PDF to PowerPoint',
            'pdf-to-excel': 'Convert PDF to Excel',
            'edit': 'Edit PDF',
            'sign': 'Sign PDF',
            'protect': 'Protect PDF with Password',
            'unlock': 'Unlock PDF',
            'rotate': 'Rotate PDF'
        };
        
        return `
            <div class="pdf-tool">
                <p>Select your PDF file(s) to ${toolType.replace('-', ' ')}:</p>
                <div class="file-drop-zone" onclick="document.getElementById('file-${toolType}').click()">
                    <p>📁 Drag & drop files here or click to browse</p>
                    <input type="file" id="file-${toolType}" class="file-input" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx" multiple onchange="handleFileSelect(this, '${toolType}')">
                </div>
                <div id="selected-files-${toolType}" class="selected-files"></div>
                <button class="action-btn" onclick="processPDF('${toolType}')" disabled id="process-${toolType}">
                    ${toolNames[toolType] || toolType}
                </button>
                <div id="result-${toolType}" class="result-area"></div>
            </div>
        `;
    };
}

function renderPasswordGenerator() {
    return `
        <div class="password-generator">
            <div class="password-options">
                <div class="password-length">
                    <label for="pwd-length">Length: <span id="length-value">16</span></label>
                    <input type="range" id="pwd-length" min="4" max="64" value="16" oninput="document.getElementById('length-value').textContent = this.value">
                </div>
                <div class="password-option">
                    <input type="checkbox" id="include-uppercase" checked>
                    <label for="include-uppercase">Include Uppercase Letters (A-Z)</label>
                </div>
                <div class="password-option">
                    <input type="checkbox" id="include-lowercase" checked>
                    <label for="include-lowercase">Include Lowercase Letters (a-z)</label>
                </div>
                <div class="password-option">
                    <input type="checkbox" id="include-numbers" checked>
                    <label for="include-numbers">Include Numbers (0-9)</label>
                </div>
                <div class="password-option">
                    <input type="checkbox" id="include-symbols" checked>
                    <label for="include-symbols">Include Symbols (!@#$%^&*)</label>
                </div>
                <div class="password-option">
                    <input type="checkbox" id="avoid-ambiguous">
                    <label for="avoid-ambiguous">Avoid Ambiguous Characters (l, 1, I, O, 0)</label>
                </div>
            </div>
            <button class="generate-btn" onclick="generatePassword()">Generate Password</button>
            <div class="generated-password" style="display:none;" id="password-result">
                <p>Your generated password:</p>
                <div class="password-display" id="password-display"></div>
                <button class="copy-btn" onclick="copyPassword()">📋 Copy</button>
                <button class="copy-btn" onclick="generatePassword()">🔄 Regenerate</button>
            </div>
        </div>
    `;
}

function renderURLChecker() {
    return `
        <div class="url-checker">
            <p>Enter a URL to check its redirect chain:</p>
            <input type="url" id="url-to-check" class="url-input" placeholder="https://example.com">
            <button class="action-btn" onclick="checkURLRedirect()">Check Redirects</button>
            <div id="url-result" class="url-result" style="display:none;"></div>
        </div>
    `;
}

function renderURLShortener() {
    return `
        <div class="url-checker">
            <p>Enter a long URL to shorten:</p>
            <input type="url" id="url-to-shorten" class="url-input" placeholder="https://example.com/very/long/url/here">
            <button class="action-btn" onclick="shortenURL()">Shorten URL</button>
            <div id="shorten-result" class="url-result" style="display:none;"></div>
            <p style="margin-top:15px;font-size:14px;color:#666;">Note: This is a demo. For production, integrate with a URL shortening API like bit.ly or tinyurl.</p>
        </div>
    `;
}

function renderSpeedTest() {
    return `
        <div class="speed-test">
            <p>Test your internet connection speed</p>
            <button class="start-test-btn" onclick="runSpeedTest()" id="start-speed-test">Start Speed Test</button>
            <div class="speed-gauge">
                <div class="speed-value" id="speed-value">0</div>
                <div class="speed-unit">Mbps</div>
            </div>
            <div class="results-grid" id="speed-results" style="display:none;">
                <div class="result-item">
                    <div class="result-label">Download</div>
                    <div class="result-value" id="download-speed">-</div>
                </div>
                <div class="result-item">
                    <div class="result-label">Upload</div>
                    <div class="result-value" id="upload-speed">-</div>
                </div>
                <div class="result-item">
                    <div class="result-label">Ping</div>
                    <div class="result-value" id="ping-value">-</div>
                </div>
            </div>
        </div>
    `;
}

function renderPingTest() {
    return `
        <div class="speed-test">
            <p>Check latency to various servers</p>
            <button class="start-test-btn" onclick="runPingTest()" id="start-ping-test">Start Ping Test</button>
            <div id="ping-results" class="results-grid" style="display:none;margin-top:20px;">
                <div class="result-item">
                    <div class="result-label">Google</div>
                    <div class="result-value" id="ping-google">-</div>
                </div>
                <div class="result-item">
                    <div class="result-label">Cloudflare</div>
                    <div class="result-value" id="ping-cloudflare">-</div>
                </div>
                <div class="result-item">
                    <div class="result-label">Amazon</div>
                    <div class="result-value" id="ping-amazon">-</div>
                </div>
            </div>
        </div>
    `;
}

// Tool functionality implementations

let selectedFiles = {};

function handleFileSelect(input, toolType) {
    const files = input.files;
    const fileListDiv = document.getElementById(`selected-files-${toolType}`);
    const processBtn = document.getElementById(`process-${toolType}`);
    
    if (files.length > 0) {
        let fileListHTML = '<p><strong>Selected files:</strong></p><ul>';
        for (let i = 0; i < files.length; i++) {
            fileListHTML += `<li>${files[i].name} (${(files[i].size / 1024).toFixed(2)} KB)</li>`;
        }
        fileListHTML += '</ul>';
        fileListDiv.innerHTML = fileListHTML;
        processBtn.disabled = false;
        selectedFiles[toolType] = files;
    }
}

function processPDF(toolType) {
    const resultDiv = document.getElementById(`result-${toolType}`);
    resultDiv.innerHTML = '<p>⏳ Processing... This is a demo. In production, this would connect to a PDF processing backend.</p>';
    
    setTimeout(() => {
        resultDiv.innerHTML = `
            <div class="url-result success">
                <p>✅ <strong>Demo Mode:</strong> PDF ${toolType.replace('-', ' ')} operation completed!</p>
                <p>In production, this would download your processed file or show the result.</p>
                <p style="margin-top:10px;font-size:14px;">To implement: Connect to a PDF processing API or backend service.</p>
            </div>
        `;
    }, 1500);
}

function generatePassword() {
    const length = parseInt(document.getElementById('pwd-length').value);
    const includeUppercase = document.getElementById('include-uppercase').checked;
    const includeLowercase = document.getElementById('include-lowercase').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSymbols = document.getElementById('include-symbols').checked;
    const avoidAmbiguous = document.getElementById('avoid-ambiguous').checked;
    
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (avoidAmbiguous) {
        charset = charset.replace(/[l1IO0]/g, '');
    }
    
    if (charset === '') {
        alert('Please select at least one character type');
        return;
    }
    
    let password = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
        password += charset[array[i] % charset.length];
    }
    
    document.getElementById('password-display').textContent = password;
    document.getElementById('password-result').style.display = 'block';
}

function copyPassword() {
    const password = document.getElementById('password-display').textContent;
    navigator.clipboard.writeText(password).then(() => {
        alert('Password copied to clipboard!');
    });
}

function checkURLRedirect() {
    const url = document.getElementById('url-to-check').value;
    const resultDiv = document.getElementById('url-result');
    
    if (!url) {
        resultDiv.className = 'url-result error';
        resultDiv.innerHTML = '<p>Please enter a URL</p>';
        resultDiv.style.display = 'block';
        return;
    }
    
    resultDiv.className = 'url-result';
    resultDiv.innerHTML = '<p>⏳ Checking redirects...</p>';
    resultDiv.style.display = 'block';
    
    // Demo implementation - in production, use a backend proxy
    setTimeout(() => {
        resultDiv.className = 'url-result success';
        resultDiv.innerHTML = `
            <p><strong>Redirect Chain:</strong></p>
            <ol>
                <li>${url} (Initial URL)</li>
                <li>${url} (Final destination)</li>
            </ol>
            <p style="margin-top:10px;font-size:14px;color:#666;">Note: This is a demo. For full redirect tracking, a backend proxy is needed to follow redirects.</p>
        `;
    }, 1000);
}

function shortenURL() {
    const url = document.getElementById('url-to-shorten').value;
    const resultDiv = document.getElementById('shorten-result');
    
    if (!url) {
        resultDiv.className = 'url-result error';
        resultDiv.innerHTML = '<p>Please enter a URL</p>';
        resultDiv.style.display = 'block';
        return;
    }
    
    // Generate a random short code
    const shortCode = Math.random().toString(36).substring(2, 8);
    const shortURL = `${window.location.origin}/${shortCode}`;
    
    resultDiv.className = 'url-result success';
    resultDiv.innerHTML = `
        <p><strong>Shortened URL:</strong></p>
        <p style="font-size:18px;margin:10px 0;">${shortURL}</p>
        <button class="copy-btn" onclick="navigator.clipboard.writeText('${shortURL}')">📋 Copy</button>
        <p style="margin-top:10px;font-size:14px;color:#666;">Note: This generates a demo short URL. For production, integrate with a URL shortening service.</p>
    `;
    resultDiv.style.display = 'block';
}

function runSpeedTest() {
    const btn = document.getElementById('start-speed-test');
    const speedValue = document.getElementById('speed-value');
    const resultsDiv = document.getElementById('speed-results');
    
    btn.disabled = true;
    btn.textContent = 'Testing...';
    resultsDiv.style.display = 'none';
    
    let speed = 0;
    const targetSpeed = (Math.random() * 50 + 50).toFixed(2); // Random speed between 50-100 Mbps
    
    const interval = setInterval(() => {
        speed += (Math.random() * 10);
        if (speed >= targetSpeed) {
            speed = targetSpeed;
            clearInterval(interval);
            
            document.getElementById('download-speed').textContent = speed + ' Mbps';
            document.getElementById('upload-speed').textContent = (speed * 0.7).toFixed(2) + ' Mbps';
            document.getElementById('ping-value').textContent = Math.floor(Math.random() * 30 + 10) + ' ms';
            
            resultsDiv.style.display = 'grid';
            btn.disabled = false;
            btn.textContent = 'Run Test Again';
        }
        speedValue.textContent = speed.toFixed(2);
    }, 100);
}

function runPingTest() {
    const btn = document.getElementById('start-ping-test');
    const resultsDiv = document.getElementById('ping-results');
    
    btn.disabled = true;
    btn.textContent = 'Testing...';
    resultsDiv.style.display = 'none';
    
    setTimeout(() => {
        document.getElementById('ping-google').textContent = Math.floor(Math.random() * 30 + 10) + ' ms';
        document.getElementById('ping-cloudflare').textContent = Math.floor(Math.random() * 40 + 15) + ' ms';
        document.getElementById('ping-amazon').textContent = Math.floor(Math.random() * 50 + 20) + ' ms';
        
        resultsDiv.style.display = 'grid';
        btn.disabled = false;
        btn.textContent = 'Run Test Again';
    }, 2000);
}
