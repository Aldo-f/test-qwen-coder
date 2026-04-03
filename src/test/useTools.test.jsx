import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useTools } from '../hooks/useTools';

// Mock the Apollo Client since we're using mock data
vi.mock('@apollo/client/react', () => ({
  useQuery: vi.fn(() => ({
    data: null,
    loading: false,
    error: null,
    refetch: vi.fn()
  }))
}));

describe('useTools', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return initial state with empty tools and loading true', async () => {
    const { result } = renderHook(() => useTools());
    
    expect(result.current.tools).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it('should load tools successfully', async () => {
    const { result } = renderHook(() => useTools());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.tools).toHaveLength(6);
    expect(result.current.error).toBe(null);
  });

  it('should have search function', () => {
    const { result } = renderHook(() => useTools());
    
    expect(result.current.search).toBeInstanceOf(Function);
  });

  it('should have filterByCategory function', () => {
    const { result } = renderHook(() => useTools());
    
    expect(result.current.filterByCategory).toBeInstanceOf(Function);
  });

  it('should have refresh function', () => {
    const { result } = renderHook(() => useTools());
    
    expect(result.current.refresh).toBeInstanceOf(Function);
  });

  it('should track selected category', async () => {
    const { result } = renderHook(() => useTools());
    
    expect(result.current.selectedCategory).toBe('All');
  });

  it('should track search query', async () => {
    const { result } = renderHook(() => useTools());
    
    expect(result.current.searchQuery).toBe('');
  });

  it('should search tools by query', async () => {
    const { result } = renderHook(() => useTools());
    
    await act(async () => {
      await result.current.search('PDF');
    });
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.tools.length).toBeGreaterThan(0);
    result.current.tools.forEach(tool => {
      expect(
        tool.name.toLowerCase().includes('pdf') ||
        tool.description.toLowerCase().includes('pdf') ||
        tool.category.toLowerCase().includes('pdf')
      ).toBe(true);
    });
  });

  it('should filter tools by category', async () => {
    const { result } = renderHook(() => useTools());
    
    await act(async () => {
      await result.current.filterByCategory('Images');
    });
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.tools.length).toBeGreaterThan(0);
    result.current.tools.forEach(tool => {
      expect(tool.category).toBe('Images');
    });
  });

  it('should reset to all tools when filtering by "All"', async () => {
    const { result } = renderHook(() => useTools());
    
    // First filter by a specific category
    await act(async () => {
      await result.current.filterByCategory('PDF');
    });
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Then reset to all
    await act(async () => {
      await result.current.filterByCategory('All');
    });
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.tools.length).toBe(6);
  });

  it('should update selectedCategory when filterByCategory is called', async () => {
    const { result } = renderHook(() => useTools());
    
    await act(async () => {
      await result.current.filterByCategory('Developer');
    });
    
    expect(result.current.selectedCategory).toBe('Developer');
  });

  it('should update searchQuery when search is called', async () => {
    const { result } = renderHook(() => useTools());
    
    await act(async () => {
      await result.current.search('Test Query');
    });
    
    expect(result.current.searchQuery).toBe('Test Query');
  });

  it('should refresh tools', async () => {
    const { result } = renderHook(() => useTools());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    const initialToolsLength = result.current.tools.length;
    
    await act(async () => {
      await result.current.refresh();
    });
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.tools.length).toBe(initialToolsLength);
  });

  it('should handle empty search results', async () => {
    const { result } = renderHook(() => useTools());
    
    await act(async () => {
      await result.current.search('NonExistentTool12345');
    });
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.tools).toEqual([]);
  });

  it('should handle empty category results', async () => {
    const { result } = renderHook(() => useTools());
    
    await act(async () => {
      await result.current.filterByCategory('NonExistentCategory');
    });
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.tools).toEqual([]);
  });
});
