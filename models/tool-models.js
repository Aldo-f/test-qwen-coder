/**
 * Tool Model - Base class for all tools
 * Implements DRY principle by providing common functionality
 */
class Tool {
  constructor(id, name, description, category, tags, icon) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
    this.tags = tags;
    this.icon = icon;
  }

  /**
   * Render the tool's HTML content
   * @returns {string} HTML string
   */
  render() {
    return `
      <div class="tool-content">
        <h3>${this.name}</h3>
        <p>${this.description}</p>
        ${this.getSpecificContent()}
      </div>
    `;
  }

  /**
   * Get specific content for this tool (to be overridden by subclasses)
   * @returns {string} HTML string
   */
  getSpecificContent() {
    return '';
  }

  /**
   * Initialize event listeners for this tool
   * @param {HTMLElement} container - The container element
   */
  init(container) {
    this.container = container;
    this.attachEventListeners();
  }

  /**
   * Attach event listeners (to be overridden by subclasses)
   */
  attachEventListeners() {
    // Override in subclasses
  }

  /**
   * Execute the tool's main function
   * @returns {Promise<any>} Result of the operation
   */
  async execute() {
    throw new Error('execute() must be implemented by subclass');
  }

  /**
   * Validate input before execution
   * @returns {boolean} True if valid
   */
  validate() {
    return true;
  }

  /**
   * Show error message
   * @param {string} message - Error message
   */
  showError(message) {
    const errorDiv = this.container.querySelector('.error-message') || this.createErrorElement();
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
  }

  /**
   * Hide error message
   */
  hideError() {
    const errorDiv = this.container.querySelector('.error-message');
    if (errorDiv) {
      errorDiv.style.display = 'none';
    }
  }

  /**
   * Create error message element
   * @returns {HTMLElement} Error div
   */
  createErrorElement() {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.display = 'none';
    errorDiv.style.color = '#dc3545';
    errorDiv.style.marginTop = '10px';
    this.container.appendChild(errorDiv);
    return errorDiv;
  }

  /**
   * Show loading state
   * @param {boolean} isLoading - Whether loading
   */
  setLoading(isLoading) {
    const button = this.container.querySelector('button[type="submit"]') || 
                   this.container.querySelector('button');
    if (button) {
      button.disabled = isLoading;
      button.textContent = isLoading ? 'Loading...' : this.getButtonText();
    }
  }

  /**
   * Get button text (to be overridden)
   * @returns {string} Button text
   */
  getButtonText() {
    return 'Execute';
  }
}

/**
 * Password Generator Tool Model
 */
class PasswordGeneratorTool extends Tool {
  constructor() {
    super(
      'password-generator',
      'Password Generator',
      'Generate secure random passwords',
      'Security',
      ['password', 'security', 'generator', 'random'],
      '🔐'
    );
    this.options = {
      length: 16,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true
    };
  }

  getSpecificContent() {
    return `
      <div class="form-group">
        <label for="pwd-length">Length: <span id="pwd-length-value">${this.options.length}</span></label>
        <input type="range" id="pwd-length" min="8" max="64" value="${this.options.length}">
      </div>
      <div class="form-group">
        <label><input type="checkbox" id="pwd-uppercase" ${this.options.uppercase ? 'checked' : ''}> Uppercase (A-Z)</label>
      </div>
      <div class="form-group">
        <label><input type="checkbox" id="pwd-lowercase" ${this.options.lowercase ? 'checked' : ''}> Lowercase (a-z)</label>
      </div>
      <div class="form-group">
        <label><input type="checkbox" id="pwd-numbers" ${this.options.numbers ? 'checked' : ''}> Numbers (0-9)</label>
      </div>
      <div class="form-group">
        <label><input type="checkbox" id="pwd-symbols" ${this.options.symbols ? 'checked' : ''}> Symbols (!@#$%)</label>
      </div>
      <div class="result-box">
        <input type="text" id="pwd-result" readonly placeholder="Generated password will appear here">
        <button type="button" id="pwd-copy" class="btn-secondary">Copy</button>
      </div>
      <button type="submit" class="btn-primary">Generate Password</button>
    `;
  }

  attachEventListeners() {
    const lengthSlider = this.container.querySelector('#pwd-length');
    const lengthValue = this.container.querySelector('#pwd-length-value');
    
    lengthSlider.addEventListener('input', (e) => {
      this.options.length = parseInt(e.target.value);
      lengthValue.textContent = this.options.length;
    });

    this.container.querySelector('#pwd-uppercase').addEventListener('change', (e) => {
      this.options.uppercase = e.target.checked;
    });

    this.container.querySelector('#pwd-lowercase').addEventListener('change', (e) => {
      this.options.lowercase = e.target.checked;
    });

    this.container.querySelector('#pwd-numbers').addEventListener('change', (e) => {
      this.options.numbers = e.target.checked;
    });

    this.container.querySelector('#pwd-symbols').addEventListener('change', (e) => {
      this.options.symbols = e.target.checked;
    });

    this.container.querySelector('#pwd-copy').addEventListener('click', () => {
      const result = this.container.querySelector('#pwd-result');
      if (result.value) {
        navigator.clipboard.writeText(result.value);
        alert('Password copied to clipboard!');
      }
    });
  }

  validate() {
    if (!this.options.uppercase && !this.options.lowercase && !this.options.numbers && !this.options.symbols) {
      this.showError('Please select at least one character type');
      return false;
    }
    this.hideError();
    return true;
  }

  async execute() {
    if (!this.validate()) return null;

    this.setLoading(true);
    
    const charset = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    let chars = '';
    if (this.options.uppercase) chars += charset.uppercase;
    if (this.options.lowercase) chars += charset.lowercase;
    if (this.options.numbers) chars += charset.numbers;
    if (this.options.symbols) chars += charset.symbols;

    let password = '';
    const array = new Uint32Array(this.options.length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < this.options.length; i++) {
      password += chars[array[i] % chars.length];
    }

    const resultInput = this.container.querySelector('#pwd-result');
    resultInput.value = password;
    
    this.setLoading(false);
    return password;
  }

  getButtonText() {
    return 'Generate Password';
  }
}

/**
 * Speed Test Tool Model
 */
class SpeedTestTool extends Tool {
  constructor() {
    super(
      'speed-test',
      'Speed Test',
      'Test your internet download speed',
      'Network',
      ['speed', 'network', 'test', 'bandwidth'],
      '🚀'
    );
  }

  getSpecificContent() {
    return `
      <div class="result-box">
        <div id="speed-result" class="speed-display">
          <span class="speed-value">--</span>
          <span class="speed-unit">Mbps</span>
        </div>
        <div id="speed-status">Click "Start Test" to begin</div>
      </div>
      <button type="submit" class="btn-primary">Start Test</button>
    `;
  }

  async execute() {
    this.setLoading(true);
    const statusEl = this.container.querySelector('#speed-status');
    const valueEl = this.container.querySelector('.speed-value');
    
    statusEl.textContent = 'Starting test...';
    
    try {
      // Use a reliable CDN file for testing
      const testFileUrl = 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg';
      const startTime = new Date().getTime();
      
      statusEl.textContent = 'Downloading test file...';
      
      // Add cache buster
      const cacheBuster = '?nn=' + startTime;
      const response = await fetch(testFileUrl + cacheBuster, {
        method: 'GET',
        cache: 'no-cache'
      });
      
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const endTime = new Date().getTime();
      
      const durationInSeconds = (endTime - startTime) / 1000;
      const fileSizeInBits = blob.size * 8;
      const speedInBps = fileSizeInBits / durationInSeconds;
      const speedInMbps = speedInBps / (1024 * 1024);
      
      valueEl.textContent = speedInMbps.toFixed(2);
      statusEl.textContent = 'Test completed!';
      
      this.setLoading(false);
      return speedInMbps;
    } catch (error) {
      statusEl.textContent = 'Test failed: ' + error.message;
      valueEl.textContent = 'Error';
      this.setLoading(false);
      return null;
    }
  }

  getButtonText() {
    return 'Start Test';
  }
}

/**
 * Ping Test Tool Model
 */
class PingTestTool extends Tool {
  constructor() {
    super(
      'ping-test',
      'Ping Test',
      'Measure latency to various servers',
      'Network',
      ['ping', 'latency', 'network', 'test'],
      '📡'
    );
    this.servers = [
      { name: 'Google', url: 'https://www.google.com/favicon.ico' },
      { name: 'Cloudflare', url: 'https://cloudflare.com/favicon.ico' },
      { name: 'Amazon', url: 'https://amazon.com/favicon.ico' }
    ];
  }

  getSpecificContent() {
    return `
      <div class="result-box">
        <div id="ping-results"></div>
      </div>
      <button type="submit" class="btn-primary">Start Ping Test</button>
    `;
  }

  async execute() {
    this.setLoading(true);
    const resultsEl = this.container.querySelector('#ping-results');
    resultsEl.innerHTML = '<div>Testing latency...</div>';
    
    const results = [];
    
    for (const server of this.servers) {
      try {
        const startTime = performance.now();
        await fetch(server.url + '?t=' + startTime, { 
          method: 'HEAD',
          mode: 'no-cors'
        });
        const endTime = performance.now();
        const latency = Math.round(endTime - startTime);
        results.push({ name: server.name, latency: latency, status: 'success' });
      } catch (error) {
        results.push({ name: server.name, latency: null, status: 'failed', error: error.message });
      }
    }
    
    resultsEl.innerHTML = results.map(r => {
      if (r.status === 'success') {
        return `<div class="ping-result"><strong>${r.name}:</strong> ${r.latency}ms</div>`;
      } else {
        return `<div class="ping-result"><strong>${r.name}:</strong> Failed</div>`;
      }
    }).join('');
    
    this.setLoading(false);
    return results;
  }

  getButtonText() {
    return 'Start Ping Test';
  }
}

/**
 * URL Redirect Checker Tool Model
 */
class URLRedirectCheckerTool extends Tool {
  constructor() {
    super(
      'url-redirect-checker',
      'URL Redirect Checker',
      'Check URL redirects and final destination',
      'URL',
      ['url', 'redirect', 'check', 'http'],
      '🔗'
    );
  }

  getSpecificContent() {
    return `
      <div class="form-group">
        <label for="url-input">Enter URL:</label>
        <input type="url" id="url-input" placeholder="https://example.com" required>
      </div>
      <div class="result-box">
        <div id="redirect-results"></div>
      </div>
      <button type="submit" class="btn-primary">Check Redirects</button>
    `;
  }

  validate() {
    const urlInput = this.container.querySelector('#url-input');
    const url = urlInput.value.trim();
    
    if (!url) {
      this.showError('Please enter a URL');
      return false;
    }
    
    try {
      new URL(url);
    } catch (e) {
      this.showError('Please enter a valid URL');
      return false;
    }
    
    this.hideError();
    return true;
  }

  async execute() {
    if (!this.validate()) return null;
    
    this.setLoading(true);
    const urlInput = this.container.querySelector('#url-input');
    const resultsEl = this.container.querySelector('#redirect-results');
    const url = urlInput.value.trim();
    
    resultsEl.innerHTML = '<div>Checking redirects...</div>';
    
    try {
      // Use a CORS proxy to check redirects
      const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);
      const response = await fetch(proxyUrl, { 
        method: 'HEAD',
        redirect: 'follow'
      });
      
      const finalUrl = response.url;
      const isRedirect = finalUrl !== url && !finalUrl.includes('allorigins.win');
      
      if (isRedirect) {
        resultsEl.innerHTML = `
          <div class="redirect-chain">
            <div><strong>Original:</strong> ${url}</div>
            <div><strong>Final Destination:</strong> <a href="${finalUrl}" target="_blank">${finalUrl}</a></div>
            <div><strong>Status:</strong> Redirect detected</div>
          </div>
        `;
      } else {
        resultsEl.innerHTML = `
          <div class="redirect-chain">
            <div><strong>URL:</strong> ${url}</div>
            <div><strong>Status:</strong> No redirects detected</div>
          </div>
        `;
      }
      
      this.setLoading(false);
      return { original: url, final: finalUrl, redirected: isRedirect };
    } catch (error) {
      resultsEl.innerHTML = `<div class="error">Error: ${error.message}</div>`;
      this.setLoading(false);
      return null;
    }
  }

  getButtonText() {
    return 'Check Redirects';
  }
}

/**
 * PDF Merge Tool Model
 */
class PDFMergeTool extends Tool {
  constructor() {
    super(
      'pdf-merge',
      'Merge PDF',
      'Combine multiple PDF files into one',
      'PDF',
      ['pdf', 'merge', 'combine', 'join'],
      '📄'
    );
  }

  getSpecificContent() {
    return `
      <div class="form-group">
        <label for="pdf-files">Select PDF files:</label>
        <input type="file" id="pdf-files" accept=".pdf" multiple required>
        <small>Select multiple PDF files to merge</small>
      </div>
      <div class="result-box">
        <div id="merge-status"></div>
      </div>
      <button type="submit" class="btn-primary">Merge PDFs</button>
    `;
  }

  validate() {
    const fileInput = this.container.querySelector('#pdf-files');
    
    if (!fileInput.files || fileInput.files.length === 0) {
      this.showError('Please select at least one PDF file');
      return false;
    }
    
    if (fileInput.files.length < 2) {
      this.showError('Please select at least two PDF files to merge');
      return false;
    }
    
    for (let file of fileInput.files) {
      if (file.type !== 'application/pdf') {
        this.showError(`File "${file.name}" is not a PDF`);
        return false;
      }
    }
    
    this.hideError();
    return true;
  }

  async execute() {
    if (!this.validate()) return null;
    
    this.setLoading(true);
    const statusEl = this.container.querySelector('#merge-status');
    const fileInput = this.container.querySelector('#pdf-files');
    
    statusEl.innerHTML = '<div>Loading PDF library...</div>';
    
    try {
      // Load pdf-lib dynamically
      if (typeof PDFLib === 'undefined') {
        await this.loadPDFLib();
      }
      
      statusEl.innerHTML = '<div>Merging PDFs...</div>';
      
      const { PDFDocument } = PDFLib;
      const mergedPdf = await PDFDocument.create();
      
      for (let i = 0; i < fileInput.files.length; i++) {
        const file = fileInput.files[i];
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      
      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      statusEl.innerHTML = `
        <div class="success">
          <strong>Success!</strong> Merged ${fileInput.files.length} PDFs.
          <br>
          <a href="${url}" download="merged.pdf" class="btn-secondary" style="display:inline-block; margin-top:10px;">Download Merged PDF</a>
        </div>
      `;
      
      this.setLoading(false);
      return { success: true, url: url, fileCount: fileInput.files.length };
    } catch (error) {
      statusEl.innerHTML = `<div class="error">Error: ${error.message}</div>`;
      this.setLoading(false);
      return null;
    }
  }

  async loadPDFLib() {
    return new Promise((resolve, reject) => {
      if (typeof PDFLib !== 'undefined') {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js';
      script.onload = resolve;
      script.onerror = () => reject(new Error('Failed to load PDF library'));
      document.head.appendChild(script);
    });
  }

  getButtonText() {
    return 'Merge PDFs';
  }
}

// Export all tool classes
window.ToolModels = {
  Tool,
  PasswordGeneratorTool,
  SpeedTestTool,
  PingTestTool,
  URLRedirectCheckerTool,
  PDFMergeTool
};
