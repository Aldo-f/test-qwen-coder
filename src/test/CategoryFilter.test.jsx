import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CategoryFilter from '../components/CategoryFilter';
import { mockCategories } from '../api/mockApi';

describe('CategoryFilter', () => {
  const mockOnCategoryChange = vi.fn();

  beforeEach(() => {
    mockOnCategoryChange.mockClear();
  });

  it('should render all category buttons', () => {
    render(<CategoryFilter selectedCategory="All" onCategoryChange={mockOnCategoryChange} />);
    
    mockCategories.forEach(category => {
      const button = screen.getByText(category);
      expect(button).toBeInTheDocument();
    });
  });

  it('should highlight the selected category', () => {
    render(<CategoryFilter selectedCategory="PDF" onCategoryChange={mockOnCategoryChange} />);
    
    const pdfButton = screen.getByText('PDF');
    expect(pdfButton).toHaveClass('bg-blue-600');
    expect(pdfButton).toHaveClass('text-white');
  });

  it('should not highlight unselected categories', () => {
    render(<CategoryFilter selectedCategory="PDF" onCategoryChange={mockOnCategoryChange} />);
    
    const imagesButton = screen.getByText('Images');
    expect(imagesButton).not.toHaveClass('bg-blue-600');
    expect(imagesButton).toHaveClass('bg-gray-100');
  });

  it('should call onCategoryChange when a category is clicked', () => {
    render(<CategoryFilter selectedCategory="All" onCategoryChange={mockOnCategoryChange} />);
    
    const pdfButton = screen.getByText('PDF');
    pdfButton.click();
    
    expect(mockOnCategoryChange).toHaveBeenCalledWith('PDF');
    expect(mockOnCategoryChange).toHaveBeenCalledTimes(1);
  });

  it('should allow selecting different categories', () => {
    render(<CategoryFilter selectedCategory="All" onCategoryChange={mockOnCategoryChange} />);
    
    const imagesButton = screen.getByText('Images');
    imagesButton.click();
    
    expect(mockOnCategoryChange).toHaveBeenCalledWith('Images');
  });

  it('should have "All" as the first category', () => {
    render(<CategoryFilter selectedCategory="All" onCategoryChange={mockOnCategoryChange} />);
    
    const allButton = screen.getByText('All');
    expect(allButton).toBeInTheDocument();
    expect(allButton).toHaveClass('bg-blue-600');
  });

  it('should apply hover styles to unselected buttons', () => {
    render(<CategoryFilter selectedCategory="All" onCategoryChange={mockOnCategoryChange} />);
    
    const imagesButton = screen.getByText('Images');
    expect(imagesButton).toHaveClass('hover:bg-gray-200');
  });

  it('should apply scale transform to selected button', () => {
    render(<CategoryFilter selectedCategory="PDF" onCategoryChange={mockOnCategoryChange} />);
    
    const pdfButton = screen.getByText('PDF');
    expect(pdfButton).toHaveClass('scale-105');
  });

  it('should have proper button styling classes', () => {
    render(<CategoryFilter selectedCategory="All" onCategoryChange={mockOnCategoryChange} />);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveClass('px-4');
      expect(button).toHaveClass('py-2');
      expect(button).toHaveClass('rounded-lg');
      expect(button).toHaveClass('text-sm');
      expect(button).toHaveClass('font-medium');
    });
  });
});
