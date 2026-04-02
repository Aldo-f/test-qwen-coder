import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ToolCard from '../components/ToolCard';

const mockTool = {
  id: '1',
  name: 'PDF Merger',
  description: 'Combine multiple PDF files into one',
  category: 'PDF',
  icon: '📄',
  url: '/tools/pdf-merger'
};

describe('ToolCard', () => {
  it('should render tool information correctly', () => {
    render(<ToolCard tool={mockTool} />);
    
    expect(screen.getByText('PDF Merger')).toBeInTheDocument();
    expect(screen.getByText('Combine multiple PDF files into one')).toBeInTheDocument();
    expect(screen.getByText('📄')).toBeInTheDocument();
    expect(screen.getByText('PDF')).toBeInTheDocument();
  });

  it('should render as a link with correct href', () => {
    render(<ToolCard tool={mockTool} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/tools/pdf-merger');
  });

  it('should have proper card styling classes', () => {
    render(<ToolCard tool={mockTool} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveClass('block');
    expect(link).toHaveClass('p-6');
    expect(link).toHaveClass('bg-white');
    expect(link).toHaveClass('rounded-xl');
    expect(link).toHaveClass('shadow-sm');
  });

  it('should have hover effects', () => {
    render(<ToolCard tool={mockTool} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveClass('hover:shadow-lg');
    expect(link).toHaveClass('hover:border-blue-300');
    expect(link).toHaveClass('hover:-translate-y-1');
  });

  it('should display category badge with correct styling', () => {
    render(<ToolCard tool={mockTool} />);
    
    const badge = screen.getByText('PDF');
    expect(badge).toHaveClass('inline-flex');
    expect(badge).toHaveClass('px-2.5');
    expect(badge).toHaveClass('py-0.5');
    expect(badge).toHaveClass('rounded-full');
    expect(badge).toHaveClass('text-xs');
    expect(badge).toHaveClass('font-medium');
    expect(badge).toHaveClass('bg-blue-100');
    expect(badge).toHaveClass('text-blue-800');
  });

  it('should have arrow icon', () => {
    render(<ToolCard tool={mockTool} />);
    
    const svgs = document.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('should have group hover effects on title', () => {
    render(<ToolCard tool={mockTool} />);
    
    const title = screen.getByText('PDF Merger');
    expect(title).toHaveClass('group-hover:text-blue-600');
  });

  it('should handle different tool data', () => {
    const differentTool = {
      id: '2',
      name: 'Image Compressor',
      description: 'Reduce image file size',
      category: 'Images',
      icon: '🖼️',
      url: '/tools/image-compressor'
    };
    
    render(<ToolCard tool={differentTool} />);
    
    expect(screen.getByText('Image Compressor')).toBeInTheDocument();
    expect(screen.getByText('Reduce image file size')).toBeInTheDocument();
    expect(screen.getByText('🖼️')).toBeInTheDocument();
    expect(screen.getByText('Images')).toBeInTheDocument();
  });

  it('should have transition classes for smooth animations', () => {
    render(<ToolCard tool={mockTool} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveClass('transition-all');
    expect(link).toHaveClass('duration-300');
  });
});
