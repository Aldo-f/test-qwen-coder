/**
 * Unit Tests for Tool Models and Controller
 * Simple test framework that works in browser environment
 */

class TestRunner {
  constructor() {
    this.results = [];
    this.passed = 0;
    this.failed = 0;
  }

  /**
   * Run a single test
   * @param {string} name - Test name
   * @param {Function} testFn - Test function
   */
  async run(name, testFn) {
    try {
      await testFn();
      this.results.push({ name, status: 'passed' });
      this.passed++;
      console.log(`✅ ${name}`);
    } catch (error) {
      this.results.push({ name, status: 'failed', error: error.message });
      this.failed++;
      console.error(`❌ ${name}: ${error.message}`);
    }
  }

  /**
   * Assert equality
   * @param {any} actual - Actual value
   * @param {any} expected - Expected value
   * @param {string} message - Error message
   */
  assertEqual(actual, expected, message = '') {
    if (actual !== expected) {
      throw new Error(`${message} Expected ${expected}, got ${actual}`);
    }
  }

  /**
   * Assert truthy value
   * @param {any} value - Value to test
   * @param {string} message - Error message
   */
  assertTrue(value, message = '') {
    if (!value) {
      throw new Error(`${message} Expected truthy value, got ${value}`);
    }
  }

  /**
   * Assert falsy value
   * @param {any} value - Value to test
   * @param {string} message - Error message
   */
  assertFalse(value, message = '') {
    if (value) {
      throw new Error(`${message} Expected falsy value, got ${value}`);
    }
  }

  /**
   * Assert array contains element
   * @param {Array} array - Array to search
   * @param {any} element - Element to find
   * @param {string} message - Error message
   */
  assertIncludes(array, element, message = '') {
    if (!array.includes(element)) {
      throw new Error(`${message} Array does not include ${element}`);
    }
  }

  /**
   * Get summary of test results
   * @returns {Object} Test summary
   */
  getSummary() {
    return {
      total: this.passed + this.failed,
      passed: this.passed,
      failed: this.failed,
      successRate: ((this.passed / (this.passed + this.failed)) * 100).toFixed(2)
    };
  }

  /**
   * Print final results
   */
  printResults() {
    const summary = this.getSummary();
    console.log('\n=== Test Results ===');
    console.log(`Total: ${summary.total}`);
    console.log(`Passed: ${summary.passed}`);
    console.log(`Failed: ${summary.failed}`);
    console.log(`Success Rate: ${summary.successRate}%`);
    
    if (this.failed > 0) {
      console.log('\nFailed tests:');
      this.results.filter(r => r.status === 'failed').forEach(r => {
        console.log(`  - ${r.name}: ${r.error}`);
      });
    }
  }
}

// Test suite for Tool Models
async function runToolModelTests() {
  const runner = new TestRunner();
  
  console.log('\n=== Running Tool Model Tests ===\n');

  // Test Tool base class
  await runner.run('Tool constructor creates instance with correct properties', () => {
    const tool = new window.ToolModels.Tool(
      'test-tool',
      'Test Tool',
      'Test description',
      'Test',
      ['tag1', 'tag2'],
      '🧪'
    );
    
    runner.assertEqual(tool.id, 'test-tool');
    runner.assertEqual(tool.name, 'Test Tool');
    runner.assertEqual(tool.description, 'Test description');
    runner.assertEqual(tool.category, 'Test');
    runner.assertTrue(tool.tags.includes('tag1'));
    runner.assertTrue(tool.tags.includes('tag2'));
    runner.assertEqual(tool.icon, '🧪');
  });

  // Test PasswordGeneratorTool
  await runner.run('PasswordGeneratorTool creates instance', () => {
    const tool = new window.ToolModels.PasswordGeneratorTool();
    runner.assertEqual(tool.id, 'password-generator');
    runner.assertEqual(tool.options.length, 16);
    runner.assertTrue(tool.options.uppercase);
    runner.assertTrue(tool.options.lowercase);
  });

  await runner.run('PasswordGeneratorTool generates valid password', async () => {
    const tool = new window.ToolModels.PasswordGeneratorTool();
    const mockContainer = document.createElement('div');
    mockContainer.innerHTML = `
      <input type="range" id="pwd-length" value="16">
      <span id="pwd-length-value">16</span>
      <input type="checkbox" id="pwd-uppercase" checked>
      <input type="checkbox" id="pwd-lowercase" checked>
      <input type="checkbox" id="pwd-numbers" checked>
      <input type="checkbox" id="pwd-symbols" checked>
      <input type="text" id="pwd-result">
      <button type="submit"></button>
    `;
    
    tool.init(mockContainer);
    const password = await tool.execute();
    
    runner.assertTrue(password !== null);
    runner.assertEqual(password.length, 16);
  });

  await runner.run('PasswordGeneratorTool validates options', () => {
    const tool = new window.ToolModels.PasswordGeneratorTool();
    tool.options.uppercase = false;
    tool.options.lowercase = false;
    tool.options.numbers = false;
    tool.options.symbols = false;
    
    const mockContainer = document.createElement('div');
    tool.container = mockContainer;
    
    const isValid = tool.validate();
    runner.assertFalse(isValid);
  });

  // Test SpeedTestTool
  await runner.run('SpeedTestTool creates instance', () => {
    const tool = new window.ToolModels.SpeedTestTool();
    runner.assertEqual(tool.id, 'speed-test');
    runner.assertEqual(tool.category, 'Network');
  });

  // Test PingTestTool
  await runner.run('PingTestTool creates instance with servers', () => {
    const tool = new window.ToolModels.PingTestTool();
    runner.assertEqual(tool.id, 'ping-test');
    runner.assertTrue(tool.servers.length > 0);
    runner.assertEqual(tool.servers[0].name, 'Google');
  });

  // Test URLRedirectCheckerTool
  await runner.run('URLRedirectCheckerTool creates instance', () => {
    const tool = new window.ToolModels.URLRedirectCheckerTool();
    runner.assertEqual(tool.id, 'url-redirect-checker');
    runner.assertEqual(tool.category, 'URL');
  });

  await runner.run('URLRedirectCheckerTool validates URL', () => {
    const tool = new window.ToolModels.URLRedirectCheckerTool();
    const mockContainer = document.createElement('div');
    mockContainer.innerHTML = '<input type="url" id="url-input" value="https://example.com">';
    tool.container = mockContainer;
    
    const isValid = tool.validate();
    runner.assertTrue(isValid);
  });

  await runner.run('URLRedirectCheckerTool rejects invalid URL', () => {
    const tool = new window.ToolModels.URLRedirectCheckerTool();
    const mockContainer = document.createElement('div');
    mockContainer.innerHTML = '<input type="url" id="url-input" value="not-a-url">';
    tool.container = mockContainer;
    
    const isValid = tool.validate();
    runner.assertFalse(isValid);
  });

  // Test PDFMergeTool
  await runner.run('PDFMergeTool creates instance', () => {
    const tool = new window.ToolModels.PDFMergeTool();
    runner.assertEqual(tool.id, 'pdf-merge');
    runner.assertEqual(tool.category, 'PDF');
  });

  runner.printResults();
  return runner;
}

// Test suite for ToolController
async function runControllerTests() {
  const runner = new TestRunner();
  
  console.log('\n=== Running Controller Tests ===\n');

  await runner.run('ToolController creates instance', () => {
    const controller = new window.ToolController();
    runner.assertTrue(controller !== null);
    runner.assertEqual(controller.tools.length, 0);
    runner.assertEqual(controller.currentFilter.category, 'all');
  });

  await runner.run('ToolController initializes with tools', () => {
    const controller = new window.ToolController();
    const mockTools = [
      { id: 'test-1', name: 'Test 1', description: 'Desc 1', category: 'Test', tags: ['tag1'], icon: '🧪' },
      { id: 'test-2', name: 'Test 2', description: 'Desc 2', category: 'Test', tags: ['tag2'], icon: '🧪' }
    ];
    
    controller.initialize(mockTools);
    runner.assertEqual(controller.tools.length, 2);
    runner.assertEqual(controller.filteredTools.length, 2);
  });

  await runner.run('ToolController filters by category', () => {
    const controller = new window.ToolController();
    const mockTools = [
      { id: 'pdf-1', name: 'PDF Tool', description: 'Desc', category: 'PDF', tags: [], icon: '📄' },
      { id: 'sec-1', name: 'Security Tool', description: 'Desc', category: 'Security', tags: [], icon: '🔐' }
    ];
    
    controller.initialize(mockTools);
    controller.currentFilter.category = 'PDF';
    controller.applyFilters();
    
    runner.assertEqual(controller.filteredTools.length, 1);
    runner.assertEqual(controller.filteredTools[0].category, 'PDF');
  });

  await runner.run('ToolController filters by search term', () => {
    const controller = new window.ToolController();
    const mockTools = [
      { id: 'pwd', name: 'Password Generator', description: 'Generate passwords', category: 'Security', tags: ['password'], icon: '🔐' },
      { id: 'speed', name: 'Speed Test', description: 'Test speed', category: 'Network', tags: ['speed'], icon: '🚀' }
    ];
    
    controller.initialize(mockTools);
    controller.currentFilter.search = 'password';
    controller.applyFilters();
    
    runner.assertEqual(controller.filteredTools.length, 1);
    runner.assertEqual(controller.filteredTools[0].id, 'pwd');
  });

  await runner.run('ToolController gets unique categories', () => {
    const controller = new window.ToolController();
    const mockTools = [
      { id: '1', name: 'Tool 1', description: 'Desc', category: 'PDF', tags: [], icon: '📄' },
      { id: '2', name: 'Tool 2', description: 'Desc', category: 'Security', tags: [], icon: '🔐' },
      { id: '3', name: 'Tool 3', description: 'Desc', category: 'PDF', tags: [], icon: '📄' }
    ];
    
    controller.tools = mockTools.map(t => new window.ToolModels.Tool(
      t.id, t.name, t.description, t.category, t.tags, t.icon
    ));
    
    const categories = controller.getCategories();
    runner.assertEqual(categories.length, 2);
    runner.assertTrue(categories.includes('PDF'));
    runner.assertTrue(categories.includes('Security'));
  });

  await runner.run('ToolController gets unique tags', () => {
    const controller = new window.ToolController();
    const mockTools = [
      { id: '1', name: 'Tool 1', description: 'Desc', category: 'PDF', tags: ['merge', 'pdf'], icon: '📄' },
      { id: '2', name: 'Tool 2', description: 'Desc', category: 'Security', tags: ['password', 'security'], icon: '🔐' }
    ];
    
    controller.tools = mockTools.map(t => new window.ToolModels.Tool(
      t.id, t.name, t.description, t.category, t.tags, t.icon
    ));
    
    const tags = controller.getTags();
    runner.assertEqual(tags.length, 4);
  });

  runner.printResults();
  return runner;
}

// Test suite for ToolView
async function runViewTests() {
  const runner = new TestRunner();
  
  console.log('\n=== Running View Tests ===\n');

  await runner.run('ToolView renders tool card HTML', () => {
    const tool = {
      id: 'test-tool',
      name: 'Test Tool',
      description: 'Test description',
      category: 'Test',
      tags: ['tag1', 'tag2'],
      icon: '🧪'
    };
    
    const html = window.ToolView.renderToolCard(tool);
    runner.assertTrue(html.includes('test-tool'));
    runner.assertTrue(html.includes('Test Tool'));
    runner.assertTrue(html.includes('tag1'));
    runner.assertTrue(html.includes('tag2'));
  });

  await runner.run('ToolView renders empty state', () => {
    const container = document.createElement('div');
    window.ToolView.renderToolsGrid([], container);
    runner.assertTrue(container.innerHTML.includes('No tools found'));
  });

  await runner.run('ToolView renders tools grid', () => {
    const container = document.createElement('div');
    const tools = [
      { id: '1', name: 'Tool 1', description: 'Desc', category: 'Test', tags: [], icon: '🧪' }
    ];
    
    window.ToolView.renderToolsGrid(tools, container);
    const cards = container.querySelectorAll('.tool-card');
    runner.assertEqual(cards.length, 1);
  });

  await runner.run('ToolView renders category filters', () => {
    const container = document.createElement('div');
    const categories = ['PDF', 'Security', 'Network'];
    
    window.ToolView.renderCategoryFilters(categories, container);
    runner.assertTrue(container.innerHTML.includes('All'));
    runner.assertTrue(container.innerHTML.includes('PDF'));
    runner.assertTrue(container.innerHTML.includes('Security'));
  });

  await runner.run('ToolView highlights search matches', () => {
    const text = 'Password Generator';
    const highlighted = window.ToolView.highlightMatches(text, 'password');
    runner.assertTrue(highlighted.includes('<mark>'));
    runner.assertTrue(highlighted.toLowerCase().includes('password'));
  });

  runner.printResults();
  return runner;
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Starting Test Suite...\n');
  
  const modelRunner = await runToolModelTests();
  const controllerRunner = await runControllerTests();
  const viewRunner = await runViewTests();
  
  const totalPassed = modelRunner.passed + controllerRunner.passed + viewRunner.passed;
  const totalFailed = modelRunner.failed + controllerRunner.failed + viewRunner.failed;
  
  console.log('\n=================================');
  console.log('📊 FINAL TEST SUMMARY');
  console.log('=================================');
  console.log(`Total Tests: ${totalPassed + totalFailed}`);
  console.log(`✅ Passed: ${totalPassed}`);
  console.log(`❌ Failed: ${totalFailed}`);
  console.log(`Success Rate: ${((totalPassed / (totalPassed + totalFailed)) * 100).toFixed(2)}%`);
  console.log('=================================\n');
  
  return {
    passed: totalPassed,
    failed: totalFailed,
    total: totalPassed + totalFailed
  };
}

// Export for use in browser
window.TestRunner = TestRunner;
window.runAllTests = runAllTests;
