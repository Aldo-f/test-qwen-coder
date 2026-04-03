import { describe, it, expect } from 'vitest';
import { mockToolsData, mockCategories, fetchToolsMock, searchToolsMock, getToolsByCategoryMock } from '../api/mockApi';

describe('mockApi', () => {
  describe('mockToolsData', () => {
    it('should have correct structure', () => {
      expect(mockToolsData).toBeInstanceOf(Array);
      expect(mockToolsData.length).toBeGreaterThan(0);
      
      mockToolsData.forEach(tool => {
        expect(tool).toHaveProperty('id');
        expect(tool).toHaveProperty('name');
        expect(tool).toHaveProperty('description');
        expect(tool).toHaveProperty('category');
        expect(tool).toHaveProperty('icon');
        expect(tool).toHaveProperty('url');
      });
    });

    it('should contain tools with valid categories', () => {
      const categories = mockToolsData.map(tool => tool.category);
      categories.forEach(category => {
        expect(mockCategories).toContain(category);
      });
    });
  });

  describe('mockCategories', () => {
    it('should include "All" as first option', () => {
      expect(mockCategories[0]).toBe('All');
    });

    it('should contain all unique categories', () => {
      const uniqueCategories = [...new Set(mockCategories)];
      expect(uniqueCategories.length).toBe(mockCategories.length);
    });
  });

  describe('fetchToolsMock', () => {
    it('should return all tools', async () => {
      const result = await fetchToolsMock();
      expect(result).toEqual(mockToolsData);
      expect(result.length).toBe(mockToolsData.length);
    });

    it('should resolve with a delay', async () => {
      const start = Date.now();
      await fetchToolsMock();
      const duration = Date.now() - start;
      expect(duration).toBeGreaterThanOrEqual(250); // Allow some tolerance
    });
  });

  describe('searchToolsMock', () => {
    it('should return all tools when query is empty', async () => {
      const result = await searchToolsMock('');
      expect(result).toEqual(mockToolsData);
    });

    it('should filter tools by name', async () => {
      const result = await searchToolsMock('PDF');
      expect(result.length).toBeGreaterThan(0);
      result.forEach(tool => {
        expect(tool.name.toLowerCase()).toContain('pdf');
      });
    });

    it('should filter tools by description', async () => {
      const result = await searchToolsMock('password');
      expect(result.length).toBeGreaterThan(0);
      result.forEach(tool => {
        expect(tool.description.toLowerCase()).toContain('password');
      });
    });

    it('should filter tools by category', async () => {
      const result = await searchToolsMock('Developer');
      expect(result.length).toBeGreaterThan(0);
      result.forEach(tool => {
        expect(tool.category.toLowerCase()).toContain('developer');
      });
    });

    it('should be case insensitive', async () => {
      const resultUpper = await searchToolsMock('PDF');
      const resultLower = await searchToolsMock('pdf');
      expect(resultUpper).toEqual(resultLower);
    });

    it('should return empty array when no matches found', async () => {
      const result = await searchToolsMock('nonexistenttool123');
      expect(result).toEqual([]);
    });
  });

  describe('getToolsByCategoryMock', () => {
    it('should return all tools when category is "All"', async () => {
      const result = await getToolsByCategoryMock('All');
      expect(result).toEqual(mockToolsData);
    });

    it('should return all tools when category is null', async () => {
      const result = await getToolsByCategoryMock(null);
      expect(result).toEqual(mockToolsData);
    });

    it('should filter tools by specific category', async () => {
      const result = await getToolsByCategoryMock('PDF');
      expect(result.length).toBeGreaterThan(0);
      result.forEach(tool => {
        expect(tool.category).toBe('PDF');
      });
    });

    it('should return only tools matching the category', async () => {
      const result = await getToolsByCategoryMock('Images');
      const allMatch = result.every(tool => tool.category === 'Images');
      expect(allMatch).toBe(true);
    });

    it('should return empty array for non-existent category', async () => {
      const result = await getToolsByCategoryMock('NonExistent');
      expect(result).toEqual([]);
    });
  });
});
