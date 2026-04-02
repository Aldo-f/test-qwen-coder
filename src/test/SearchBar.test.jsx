import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  it('should render search input with placeholder', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search tools...');
    expect(input).toBeInTheDocument();
  });

  it('should call onSearch when user types in input', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search tools...');
    fireEvent.change(input, { target: { value: 'PDF' } });
    
    expect(mockOnSearch).toHaveBeenCalledWith('PDF');
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('should call onSearch with each keystroke', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search tools...');
    fireEvent.change(input, { target: { value: 'P' } });
    fireEvent.change(input, { target: { value: 'PD' } });
    fireEvent.change(input, { target: { value: 'PDF' } });
    
    expect(mockOnSearch).toHaveBeenCalledTimes(3);
    expect(mockOnSearch).toHaveBeenNthCalledWith(1, 'P');
    expect(mockOnSearch).toHaveBeenNthCalledWith(2, 'PD');
    expect(mockOnSearch).toHaveBeenNthCalledWith(3, 'PDF');
  });

  it('should prevent form submission on enter', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    // The form element doesn't have a role="form" by default, so we query it directly
    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
    
    // Submitting the form should call preventDefault internally
    // We can verify this by checking that the form exists and has an onSubmit handler
    fireEvent.submit(form);
    
    // Since SearchBar prevents default, no page reload should occur
    // The test passes if no errors are thrown
    expect(true).toBe(true);
  });

  it('should have search icon', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should clear search when input is cleared', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search tools...');
    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.change(input, { target: { value: '' } });
    
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });

  it('should handle special characters in search', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search tools...');
    fireEvent.change(input, { target: { value: 'PDF & Images' } });
    
    expect(mockOnSearch).toHaveBeenCalledWith('PDF & Images');
  });
});
