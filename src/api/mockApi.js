// Mock data for testing without backend
export const mockToolsData = [
  {
    id: '1',
    name: 'PDF Merger',
    description: 'Combine multiple PDF files into one',
    category: 'PDF',
    icon: '📄',
    url: '/tools/pdf-merger'
  },
  {
    id: '2',
    name: 'Image Compressor',
    description: 'Reduce image file size without losing quality',
    category: 'Images',
    icon: '🖼️',
    url: '/tools/image-compressor'
  },
  {
    id: '3',
    name: 'Text Formatter',
    description: 'Format and clean up text data',
    category: 'Text',
    icon: '📝',
    url: '/tools/text-formatter'
  },
  {
    id: '4',
    name: 'Color Converter',
    description: 'Convert between different color formats',
    category: 'Design',
    icon: '🎨',
    url: '/tools/color-converter'
  },
  {
    id: '5',
    name: 'JSON Validator',
    description: 'Validate and format JSON data',
    category: 'Developer',
    icon: '💻',
    url: '/tools/json-validator'
  },
  {
    id: '6',
    name: 'Password Generator',
    description: 'Generate secure random passwords',
    category: 'Security',
    icon: '🔒',
    url: '/tools/password-generator'
  }
];

export const mockCategories = ['All', 'PDF', 'Images', 'Text', 'Design', 'Developer', 'Security'];

// Simulated API functions for testing
export async function fetchToolsMock() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockToolsData);
    }, 300);
  });
}

export async function searchToolsMock(query) {
  const tools = await fetchToolsMock();
  if (!query) return tools;
  
  const lowerQuery = query.toLowerCase();
  return tools.filter(tool => 
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.description.toLowerCase().includes(lowerQuery) ||
    tool.category.toLowerCase().includes(lowerQuery)
  );
}

export async function getToolsByCategoryMock(category) {
  const tools = await fetchToolsMock();
  if (!category || category === 'All') return tools;
  
  return tools.filter(tool => tool.category === category);
}
