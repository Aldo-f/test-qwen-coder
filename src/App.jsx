import { useState } from 'react';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import ToolGrid from './components/ToolGrid';
import { useTools } from './hooks/useTools';

function App() {
  const { tools, loading, error, search, filterByCategory } = useTools();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSearch = (query) => {
    search(query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterByCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Tools Hub</h1>
          <p className="mt-2 text-gray-600">Discover and use powerful tools to boost your productivity</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar onSearch={handleSearch} />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <ToolGrid tools={tools} loading={loading} error={error} />
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Tools Hub. Built with React + Vite + Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
