import { useState } from 'react';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import ToolGrid from './components/ToolGrid';
import { useTools } from './hooks/useTools';

function App() {
  const { tools, loading, error, search, filterByCategory, refresh } = useTools();
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const handleSearch = (query) => {
    search(query);
  };
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterByCategory(category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tools Hub
              </h1>
              <p className="mt-2 text-gray-600 text-lg">Discover and use powerful tools to boost your productivity</p>
            </div>
            <button
              onClick={refresh}
              className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              title="Refresh"
              disabled={loading}
            >
              <svg 
                className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <SearchBar onSearch={handleSearch} />
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <ToolGrid tools={tools} loading={loading} error={error} />
      </main>

      <footer className="bg-white border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-center text-gray-500 text-sm">
              © 2024 Tools Hub. Built with React + Vite + Tailwind CSS + GraphQL
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Frontend Ready</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
