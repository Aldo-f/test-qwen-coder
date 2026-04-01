/**
 * Tool Controller - Manages application logic and coordinates Model and View
 * Implements MVC Controller pattern
 */

class ToolController {
  constructor() {
    this.tools = [];
    this.filteredTools = [];
    this.currentFilter = {
      category: 'all',
      tags: [],
      search: ''
    };
    this.activeToolInstance = null;
  }

  /**
   * Initialize the controller with tools data
   * @param {Array} toolsData - Array of tool configuration objects
   */
  initialize(toolsData) {
    this.tools = toolsData.map(toolConfig => this.createToolInstance(toolConfig));
    this.filteredTools = [...this.tools];
    this.setupEventListeners();
    this.render();
  }

  /**
   * Create a tool instance based on its ID
   * @param {Object} toolConfig - Tool configuration
   * @returns {Tool} Tool instance
   */
  createToolInstance(toolConfig) {
    const toolClasses = {
      'password-generator': window.ToolModels?.PasswordGeneratorTool,
      'speed-test': window.ToolModels?.SpeedTestTool,
      'ping-test': window.ToolModels?.PingTestTool,
      'url-redirect-checker': window.ToolModels?.URLRedirectCheckerTool,
      'pdf-merge': window.ToolModels?.PDFMergeTool
    };

    const ToolClass = toolClasses[toolConfig.id];
    
    if (ToolClass) {
      return new ToolClass();
    }

    // Return a basic tool instance for tools without specific implementations
    return new window.ToolModels?.Tool(
      toolConfig.id,
      toolConfig.name,
      toolConfig.description,
      toolConfig.category,
      toolConfig.tags,
      toolConfig.icon
    );
  }

  /**
   * Setup global event listeners
   */
  setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.currentFilter.search = e.target.value.toLowerCase().trim();
        this.applyFilters();
      });
    }

    // Category filters
    const categoryContainer = document.getElementById('category-filters');
    if (categoryContainer) {
      categoryContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
          this.currentFilter.category = e.target.dataset.category;
          this.applyFilters();
        }
      });
    }

    // Tag filters
    const tagContainer = document.getElementById('tag-filters');
    if (tagContainer) {
      tagContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('tag-filter-btn')) {
          const tag = e.target.dataset.tag;
          const index = this.currentFilter.tags.indexOf(tag);
          
          if (index > -1) {
            this.currentFilter.tags.splice(index, 1);
            e.target.classList.remove('active');
          } else {
            this.currentFilter.tags.push(tag);
            e.target.classList.add('active');
          }
          
          this.applyFilters();
        }
      });
    }
  }

  /**
   * Apply all active filters to the tools list
   */
  applyFilters() {
    this.filteredTools = this.tools.filter(tool => {
      // Category filter
      if (this.currentFilter.category !== 'all' && 
          tool.category !== this.currentFilter.category) {
        return false;
      }

      // Tag filter
      if (this.currentFilter.tags.length > 0) {
        const hasMatchingTag = this.currentFilter.tags.some(tag => 
          tool.tags.includes(tag)
        );
        if (!hasMatchingTag) return false;
      }

      // Search filter
      if (this.currentFilter.search) {
        const searchTerm = this.currentFilter.search;
        const matchesName = tool.name.toLowerCase().includes(searchTerm);
        const matchesDescription = tool.description.toLowerCase().includes(searchTerm);
        const matchesTags = tool.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm)
        );
        
        if (!matchesName && !matchesDescription && !matchesTags) {
          return false;
        }
      }

      return true;
    });

    this.render();
  }

  /**
   * Render the current state of the application
   */
  render() {
    const toolsGrid = document.getElementById('tools-grid');
    const resultsCount = document.getElementById('results-count');
    
    if (toolsGrid) {
      window.ToolView?.renderToolsGrid(this.filteredTools, toolsGrid);
      
      // Animate cards
      const cards = toolsGrid.querySelectorAll('.tool-card');
      cards.forEach((card, index) => {
        window.ToolView?.animateCardEntrance(card, index * 50);
      });
    }

    if (resultsCount) {
      window.ToolView?.updateResultsCount(this.filteredTools.length, resultsCount);
    }

    // Update category filter state
    const categoryContainer = document.getElementById('category-filters');
    if (categoryContainer) {
      window.ToolView?.updateFilterState(categoryContainer, this.currentFilter.category);
    }
  }

  /**
   * Open a tool in the modal
   * @param {string} toolId - ID of the tool to open
   */
  openTool(toolId) {
    const tool = this.tools.find(t => t.id === toolId);
    if (!tool) {
      console.error(`Tool with ID ${toolId} not found`);
      return;
    }

    const modalContent = document.getElementById('modal-content');
    const toolInterface = document.getElementById('tool-interface');
    
    if (!modalContent || !toolInterface) {
      console.error('Modal elements not found');
      return;
    }

    // Render modal structure
    window.ToolView?.renderToolModal(tool, modalContent);
    
    // Create and initialize tool instance
    this.activeToolInstance = this.createToolInstance(tool);
    
    // Load tool interface after a short delay to ensure DOM is ready
    setTimeout(() => {
      const interfaceContainer = document.getElementById('tool-interface');
      if (interfaceContainer) {
        window.ToolView?.loadToolInterface(this.activeToolInstance, interfaceContainer);
      }
    }, 100);

    // Show modal
    const modal = document.getElementById('tool-modal');
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  }

  /**
   * Close the tool modal
   */
  closeToolModal() {
    const modal = document.getElementById('tool-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
    
    // Clean up tool instance
    this.activeToolInstance = null;
    
    // Clear modal content
    const modalContent = document.getElementById('modal-content');
    if (modalContent) {
      modalContent.innerHTML = '';
    }
  }

  /**
   * Get all unique categories from tools
   * @returns {Array} Array of category strings
   */
  getCategories() {
    const categories = new Set(this.tools.map(tool => tool.category));
    return Array.from(categories).sort();
  }

  /**
   * Get all unique tags from tools
   * @returns {Array} Array of tag strings
   */
  getTags() {
    const tags = new Set();
    this.tools.forEach(tool => {
      tool.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }

  /**
   * Execute the currently active tool
   * @returns {Promise<any>} Result of tool execution
   */
  async executeActiveTool() {
    if (!this.activeToolInstance) {
      throw new Error('No active tool');
    }

    try {
      return await this.activeToolInstance.execute();
    } catch (error) {
      console.error('Tool execution error:', error);
      throw error;
    }
  }
}

// Export controller class
window.ToolController = ToolController;
