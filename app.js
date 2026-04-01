// Main application logic

let activeTagFilter = null;
let tools = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Wait for tools to be loaded from tools.js
    setTimeout(() => {
        tools = window.tools || [];
        if (tools.length > 0) {
            renderToolsGrid(tools);
            populateCategoryFilter();
            populateTagFilters();
        } else {
            console.error('No tools loaded!');
        }
    }, 100);
});

// Render all tools in the grid
function renderToolsGrid(toolsToRender) {
    const grid = document.getElementById('toolsGrid');
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

// Populate category filter dropdown
function populateCategoryFilter() {
    const categories = [...new Set(tools.map(tool => tool.category))];
    const select = document.getElementById('categoryFilter');
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        select.appendChild(option);
    });
}

// Populate tag filters
function populateTagFilters() {
    const allTags = tools.flatMap(tool => tool.tags);
    const uniqueTags = [...new Set(allTags)];
    const tagFiltersDiv = document.getElementById('tagFilters');
    
    uniqueTags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'tag-filter-btn';
        btn.textContent = tag;
        btn.onclick = () => toggleTagFilter(tag, btn);
        tagFiltersDiv.appendChild(btn);
    });
}

// Toggle tag filter
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

// Filter tools based on search, category, and tags
function filterTools() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedCategory = document.getElementById('categoryFilter').value;
    
    const filteredTools = tools.filter(tool => {
        // Search filter
        const matchesSearch = tool.name.toLowerCase().includes(searchTerm) ||
                             tool.description.toLowerCase().includes(searchTerm) ||
                             tool.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        // Category filter
        const matchesCategory = !selectedCategory || tool.category === selectedCategory;
        
        // Tag filter
        const matchesTag = !activeTagFilter || tool.tags.includes(activeTagFilter);
        
        return matchesSearch && matchesCategory && matchesTag;
    });
    
    renderToolsGrid(filteredTools);
}

// Open tool modal
function openToolModal(tool) {
    const modal = document.getElementById('toolModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    
    title.textContent = `${tool.icon} ${tool.name}`;
    content.innerHTML = tool.render();
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('toolModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('toolModal');
    if (event.target === modal) {
        closeModal();
    }
};

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});
