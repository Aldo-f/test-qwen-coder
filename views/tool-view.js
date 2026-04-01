/**
 * Tool Views - Handles rendering and UI interactions
 * Implements MVC View pattern
 */

class ToolView {
  /**
   * Render a single tool card
   * @param {Object} tool - Tool data object
   * @returns {string} HTML string
   */
  static renderToolCard(tool) {
    return `
      <div class="tool-card" data-tool-id="${tool.id}" data-category="${tool.category}" data-tags="${tool.tags.join(' ')}">
        <div class="tool-icon">${tool.icon}</div>
        <h3 class="tool-name">${tool.name}</h3>
        <p class="tool-description">${tool.description}</p>
        <div class="tool-tags">
          ${tool.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <button class="btn-primary open-tool-btn" onclick="openToolModal('${tool.id}')">Open Tool</button>
      </div>
    `;
  }

  /**
   * Render all tools in a grid
   * @param {Array} tools - Array of tool objects
   * @param {HTMLElement} container - Container element
   */
  static renderToolsGrid(tools, container) {
    if (!container) {
      console.error('Container element not found');
      return;
    }

    if (tools.length === 0) {
      container.innerHTML = '<div class="no-tools">No tools found matching your criteria.</div>';
      return;
    }

    container.innerHTML = tools.map(tool => this.renderToolCard(tool)).join('');
  }

  /**
   * Render category filter buttons
   * @param {Array} categories - Array of category strings
   * @param {HTMLElement} container - Container element
   */
  static renderCategoryFilters(categories, container) {
    if (!container) return;

    container.innerHTML = `
      <button class="filter-btn active" data-category="all">All</button>
      ${categories.map(cat => 
        `<button class="filter-btn" data-category="${cat}">${cat}</button>`
      ).join('')}
    `;
  }

  /**
   * Render tag filter buttons
   * @param {Array} tags - Array of tag strings
   * @param {HTMLElement} container - Container element
   */
  static renderTagFilters(tags, container) {
    if (!container) return;

    container.innerHTML = tags.map(tag => 
      `<button class="tag-filter-btn" data-tag="${tag}">${tag}</button>`
    ).join('');
  }

  /**
   * Update active filter button state
   * @param {HTMLElement} container - Container with filter buttons
   * @param {string} activeValue - Active filter value
   */
  static updateFilterState(container, activeValue) {
    const buttons = container.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
      if (btn.dataset.category === activeValue) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  /**
   * Show loading spinner
   * @param {HTMLElement} container - Container element
   */
  static showLoading(container) {
    if (!container) return;
    container.innerHTML = '<div class="loading-spinner">Loading...</div>';
  }

  /**
   * Hide loading spinner
   * @param {HTMLElement} container - Container element
   */
  static hideLoading(container) {
    if (!container) return;
    const spinner = container.querySelector('.loading-spinner');
    if (spinner) spinner.remove();
  }

  /**
   * Show error message
   * @param {string} message - Error message
   * @param {HTMLElement} container - Container element
   */
  static showError(message, container) {
    if (!container) return;
    container.innerHTML = `<div class="error-message">${message}</div>`;
  }

  /**
   * Render tool modal content
   * @param {Object} tool - Tool data object
   * @param {HTMLElement} container - Modal content container
   */
  static renderToolModal(tool, container) {
    if (!container) return;

    container.innerHTML = `
      <div class="modal-header">
        <h2>${tool.icon} ${tool.name}</h2>
        <button class="close-modal" onclick="closeModal()">&times;</button>
      </div>
      <div class="modal-body" id="tool-modal-body">
        <div class="tool-info">
          <p>${tool.description}</p>
          <div class="tool-meta">
            <span class="category-badge">${tool.category}</span>
            <div class="tool-tags">
              ${tool.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
          </div>
        </div>
        <div class="tool-interface" id="tool-interface">
          <!-- Tool-specific interface will be loaded here -->
        </div>
      </div>
    `;
  }

  /**
   * Load tool-specific interface into modal
   * @param {Object} toolInstance - Tool model instance
   * @param {HTMLElement} container - Interface container
   */
  static loadToolInterface(toolInstance, container) {
    if (!container || !toolInstance) return;

    container.innerHTML = toolInstance.getSpecificContent();
    toolInstance.init(container);
  }

  /**
   * Animate tool card entrance
   * @param {HTMLElement} card - Card element
   * @param {number} delay - Animation delay
   */
  static animateCardEntrance(card, delay) {
    if (!card) return;
    
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, delay);
  }

  /**
   * Highlight search matches in text
   * @param {string} text - Original text
   * @param {string} query - Search query
   * @returns {string} HTML with highlighted matches
   */
  static highlightMatches(text, query) {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  /**
   * Update search results count
   * @param {number} count - Number of results
   * @param {HTMLElement} container - Container for count display
   */
  static updateResultsCount(count, container) {
    if (!container) return;
    
    container.textContent = `${count} tool${count !== 1 ? 's' : ''} found`;
  }
}

// Export view class
window.ToolView = ToolView;
