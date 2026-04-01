import { useState, useEffect } from 'react';
import { fetchTools, searchTools, getToolsByCategory } from '../api/toolsApi';

export function useTools() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTools();
  }, []);

  const loadTools = async () => {
    try {
      setLoading(true);
      const data = await fetchTools();
      setTools(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const search = async (query) => {
    try {
      setLoading(true);
      const data = await searchTools(query);
      setTools(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = async (category) => {
    try {
      setLoading(true);
      const data = await getToolsByCategory(category);
      setTools(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { tools, loading, error, search, filterByCategory, refresh: loadTools };
}
