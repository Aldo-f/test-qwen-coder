import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock the useTools hook
const mockUseTools = {
  tools: [
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
      description: 'Reduce image file size',
      category: 'Images',
      icon: '🖼️',
      url: '/tools/image-compressor'
    }
  ],
  loading: false,
  error: null,
  search: () => {},
  filterByCategory: () => {},
  refresh: () => {}
};

vi.mock('../hooks/useTools', () => ({
  useTools: () => mockUseTools
}));

describe('App', () => {
  it('should render the main header', () => {
    render(<App />);
    
    expect(screen.getByText('Tools Hub')).toBeInTheDocument();
  });

  it('should render the subtitle', () => {
    render(<App />);
    
    expect(screen.getByText(/Discover and use powerful tools/)).toBeInTheDocument();
  });

  it('should render the SearchBar component', () => {
    render(<App />);
    
    expect(screen.getByPlaceholderText('Search tools...')).toBeInTheDocument();
  });

  it('should render category filter buttons', () => {
    render(<App />);
    
    // Use getAllByText since categories appear in both filter buttons and tool card badges
    const allButton = screen.getByText('All');
    const pdfButtons = screen.getAllByText('PDF');
    const imagesButtons = screen.getAllByText('Images');
    
    expect(allButton).toBeInTheDocument();
    expect(pdfButtons.length).toBeGreaterThan(0);
    expect(imagesButtons.length).toBeGreaterThan(0);
  });

  it('should render tool cards', () => {
    render(<App />);
    
    expect(screen.getByText('PDF Merger')).toBeInTheDocument();
    expect(screen.getByText('Image Compressor')).toBeInTheDocument();
  });

  it('should have a refresh button', () => {
    render(<App />);
    
    const refreshButton = document.querySelector('button[title="Refresh"]');
    expect(refreshButton).toBeInTheDocument();
  });

  it('should have a footer with copyright', () => {
    render(<App />);
    
    expect(screen.getByText(/© 2024 Tools Hub/)).toBeInTheDocument();
  });

  it('should show "Frontend Ready" status indicator', () => {
    render(<App />);
    
    expect(screen.getByText('Frontend Ready')).toBeInTheDocument();
  });

  it('should have proper layout structure', () => {
    render(<App />);
    
    // Check for main sections
    expect(document.querySelector('header')).toBeInTheDocument();
    expect(document.querySelector('main')).toBeInTheDocument();
    expect(document.querySelector('footer')).toBeInTheDocument();
  });

  it('should apply gradient background to header text', () => {
    render(<App />);
    
    const title = screen.getByText('Tools Hub');
    expect(title).toHaveClass('bg-gradient-to-r');
    expect(title).toHaveClass('from-blue-600');
    expect(title).toHaveClass('to-purple-600');
  });

  it('should have responsive container classes', () => {
    render(<App />);
    
    const containers = document.querySelectorAll('.max-w-7xl');
    expect(containers.length).toBeGreaterThan(0);
  });

  it('should display tool descriptions', () => {
    render(<App />);
    
    expect(screen.getByText('Combine multiple PDF files into one')).toBeInTheDocument();
    expect(screen.getByText('Reduce image file size')).toBeInTheDocument();
  });

  it('should display tool categories as badges', () => {
    render(<App />);
    
    // Find the badge span specifically (it has rounded-full class)
    const badges = document.querySelectorAll('span.rounded-full');
    expect(badges.length).toBeGreaterThan(0);
    expect(badges[0]).toHaveClass('bg-blue-100');
    expect(badges[0]).toHaveClass('text-blue-800');
  });
});
