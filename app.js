// Main application logic - Updated to use MVC architecture

let activeTagFilter = null;
let tools = [];
let appController = null;

// Check if we should show demo-only tools
function shouldShowDemoTools() {
    return window.location.search.includes('test=true');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Wait for all scripts to load
    setTimeout(() => {
        // Get tools from legacy window.tools or create from ToolModels
        const legacyTools = window.tools || [];
        
        // Filter out demo-only tools unless test=true
        const filteredTools = legacyTools.filter(tool => {
            if (!tool.demoOnly) return true;
            return shouldShowDemoTools();
        });
        
        if (window.ToolController && window.ToolView && window.ToolModels) {
            // Use new MVC architecture
            appController = new window.ToolController();
            
            // Convert legacy tools format to work with MVC
            const toolsData = filteredTools.length > 0 ? filteredTools : [
                { id: 'password-generator', name: 'Password Generator', description: 'Generate secure random passwords', category: 'Security', tags: ['password', 'security', 'generator', 'random'], icon: '🔐' },
                { id: 'speed-test', name: 'Speed Test', description: 'Test your internet download speed', category: 'Network', tags: ['speed', 'network', 'test', 'bandwidth'], icon: '🚀' },
                { id: 'ping-test', name: 'Ping Test', description: 'Measure latency to various servers', category: 'Network', tags: ['ping', 'latency', 'network', 'test'], icon: '📡' },
                { id: 'url-redirect-checker', name: 'URL Redirect Checker', description: 'Check URL redirects and final destination', category: 'URL', tags: ['url', 'redirect', 'check', 'http'], icon: '🔗' },
                { id: 'pdf-merge', name: 'Merge PDF', description: 'Combine multiple PDF files into one', category: 'PDF', tags: ['pdf', 'merge', 'combine', 'join'], icon: '📄' },
                { id: 'pdf-split', name: 'Split PDF', description: 'Separate PDF pages into individual files', category: 'PDF', tags: ['pdf', 'split', 'separate', 'pages'], icon: '✂️' },
                { id: 'pdf-compress', name: 'Compress PDF', description: 'Reduce PDF file size', category: 'PDF', tags: ['pdf', 'compress', 'optimize', 'size'], icon: '🗜️' },
                { id: 'pdf-edit', name: 'Edit PDF', description: 'Add text and shapes to PDF', category: 'PDF', tags: ['pdf', 'edit', 'text', 'annotate'], icon: '✏️' }
            ];
            
            appController.initialize(toolsData);
            
            // Render category and tag filters
            renderFilters();
            
            // Make openToolModal available globally for tool cards
            window.openToolModal = (toolId) => {
                appController.openTool(toolId);
            };
            
            // Make closeModal available globally
            window.closeModal = () => {
                appController.closeToolModal();
            };
        } else {
            // Fallback to legacy mode
            tools = filteredTools;
            if (tools.length > 0) {
                renderToolsGrid(tools);
                populateCategoryFilter();
                populateTagFilters();
            }
        }
    }, 200);
});

// Render category and tag filters using controller
function renderFilters() {
    if (!appController) return;
    
    const categoryContainer = document.getElementById('category-filters');
    const tagContainer = document.getElementById('tag-filters');
    
    if (categoryContainer) {
        const categories = appController.getCategories();
        window.ToolView.renderCategoryFilters(categories, categoryContainer);
    }
    
    if (tagContainer) {
        const tags = appController.getTags();
        window.ToolView.renderTagFilters(tags, tagContainer);
    }
}

// Legacy functions for backward compatibility
function renderToolsGrid(toolsToRender) {
    const grid = document.getElementById('toolsGrid') || document.getElementById('tools-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    toolsToRender.forEach(tool => {
        const card = document.createElement('div');
        card.className = 'tool-card';
        card.onclick = () => openToolModal(tool);
        
        const tagsHTML = tool.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        card.innerHTML = `
            <div class="tool-icon">${tool.icon}</div>
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
            <div class="tool-tags">${tagsHTML}</div>
        `;
        
        grid.appendChild(card);
    });
}

function populateCategoryFilter() {
    const categories = [...new Set(tools.map(tool => tool.category))];
    const select = document.getElementById('categoryFilter');
    if (!select) return;
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        select.appendChild(option);
    });
}

function populateTagFilters() {
    const allTags = tools.flatMap(tool => tool.tags);
    const uniqueTags = [...new Set(allTags)];
    const tagFiltersDiv = document.getElementById('tagFilters') || document.getElementById('tag-filters');
    if (!tagFiltersDiv) return;
    
    uniqueTags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'tag-filter-btn';
        btn.textContent = tag;
        btn.onclick = () => toggleTagFilter(tag, btn);
        tagFiltersDiv.appendChild(btn);
    });
}

function toggleTagFilter(tag, btn) {
    if (activeTagFilter === tag) {
        activeTagFilter = null;
        btn.classList.remove('active');
    } else {
        if (activeTagFilter) {
            document.querySelector('.tag-filter-btn.active').classList.remove('active');
        }
        activeTagFilter = tag;
        btn.classList.add('active');
    }
    filterTools();
}

function filterTools() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const selectedCategory = document.getElementById('categoryFilter')?.value || '';
    
    const filteredTools = tools.filter(tool => {
        const matchesSearch = tool.name.toLowerCase().includes(searchTerm) ||
                             tool.description.toLowerCase().includes(searchTerm) ||
                             tool.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        const matchesCategory = !selectedCategory || tool.category === selectedCategory;
        const matchesTag = !activeTagFilter || tool.tags.includes(activeTagFilter);
        
        return matchesSearch && matchesCategory && matchesTag;
    });
    
    renderToolsGrid(filteredTools);
}

function openToolModal(tool) {
    const modal = document.getElementById('toolModal') || document.getElementById('tool-modal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent') || document.getElementById('modal-content');
    
    if (!modal || !content) return;
    
    if (title) {
        title.textContent = `${tool.icon} ${tool.name}`;
    }
    content.innerHTML = tool.render ? tool.render() : '<p>Tool interface loading...</p>';
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('toolModal') || document.getElementById('tool-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('toolModal') || document.getElementById('tool-modal');
    if (event.target === modal) {
        closeModal();
    }
};

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Enhanced test runner UI
window.runAllTests = async function() {
    const resultsPre = document.getElementById('test-results');
    if (!resultsPre) return;
    
    resultsPre.style.display = 'block';
    resultsPre.textContent = 'Running tests...\n';
    
    // Capture console.log output
    const originalLog = console.log;
    const logs = [];
    console.log = (...args) => {
        logs.push(args.join(' '));
        originalLog.apply(console, args);
    };
    
    try {
        await window.runAllTests();
        resultsPre.textContent = logs.join('\n');
    } catch (error) {
        resultsPre.textContent += `\nError running tests: ${error.message}`;
    } finally {
        console.log = originalLog;
    }
};
