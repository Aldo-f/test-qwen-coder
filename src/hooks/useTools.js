import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_TOOLS, SEARCH_TOOLS, GET_TOOLS_BY_CATEGORY } from '../api/queries';
import { fetchToolsMock, searchToolsMock, getToolsByCategoryMock } from '../api/mockApi';

// Set to true to use mock data for testing without backend
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export function useTools() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMode, setCurrentMode] = useState('all'); // 'all', 'search', 'category'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Only run GraphQL queries when NOT using mock data
  const { 
    data: toolsData, 
    loading: graphqlLoading, 
    error: graphqlError,
    refetch 
  } = useQuery(GET_TOOLS, {
    skip: USE_MOCK_DATA
  });

  const { 
    data: searchData, 
    loading: searchLoading 
  } = useQuery(SEARCH_TOOLS, {
    variables: { query: searchQuery },
    skip: USE_MOCK_DATA || currentMode !== 'search'
  });

  const { 
    data: categoryData, 
    loading: categoryLoading 
  } = useQuery(GET_TOOLS_BY_CATEGORY, {
    variables: { category: selectedCategory },
    skip: USE_MOCK_DATA || selectedCategory === 'All'
  });

  useEffect(() => {
    if (USE_MOCK_DATA) {
      loadToolsMock();
    } else if (toolsData) {
      setTools(toolsData.tools);
      setLoading(false);
    }
  }, [toolsData]);

  useEffect(() => {
    if (!USE_MOCK_DATA && currentMode === 'search' && searchData) {
      setTools(searchData.searchTools);
      setLoading(false);
    }
  }, [searchData]);

  useEffect(() => {
    if (!USE_MOCK_DATA && currentMode === 'category' && categoryData) {
      setTools(categoryData.toolsByCategory);
      setLoading(false);
    }
  }, [categoryData]);

  const loadToolsMock = async () => {
    try {
      setLoading(true);
      const data = await fetchToolsMock();
      setTools(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const search = async (query) => {
    setSearchQuery(query);
    setCurrentMode('search');
    
    try {
      setLoading(true);
      if (USE_MOCK_DATA) {
        const data = await searchToolsMock(query);
        setTools(data);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = async (category) => {
    setSelectedCategory(category);
    setCurrentMode(category === 'All' ? 'all' : 'category');
    
    try {
      setLoading(true);
      if (USE_MOCK_DATA) {
        const data = await getToolsByCategoryMock(category);
        setTools(data);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    if (USE_MOCK_DATA) {
      await loadToolsMock();
    } else {
      await refetch();
    }
  };

  return { 
    tools, 
    loading: loading || graphqlLoading || searchLoading || categoryLoading, 
    error: error || graphqlError, 
    search, 
    filterByCategory, 
    refresh,
    selectedCategory,
    searchQuery
  };
}
