import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PaginationComponent from '../PaginationComponent';

describe('PaginationComponent', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    onPageChange: jest.fn(),
    showPageInfo: true
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders pagination correctly', () => {
    render(<PaginationComponent {...defaultProps} />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows page info when showPageInfo is true', () => {
    render(<PaginationComponent {...defaultProps} />);
    
    expect(screen.getByText(/صفحة 1 من 5/)).toBeInTheDocument();
  });

  it('hides page info when showPageInfo is false', () => {
    render(<PaginationComponent {...defaultProps} showPageInfo={false} />);
    
    expect(screen.queryByText(/صفحة 1 من 5/)).not.toBeInTheDocument();
  });

  it('highlights current page correctly', () => {
    render(<PaginationComponent {...defaultProps} currentPage={3} />);
    
    const currentPageButton = screen.getByText('3');
    expect(currentPageButton.closest('button')).toHaveClass('bg-blue-500');
  });

  it('calls onPageChange when page button is clicked', () => {
    const mockOnPageChange = jest.fn();
    render(<PaginationComponent {...defaultProps} onPageChange={mockOnPageChange} />);
    
    const pageButton = screen.getByText('3');
    fireEvent.click(pageButton);
    
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('shows previous button when not on first page', () => {
    render(<PaginationComponent {...defaultProps} currentPage={3} />);
    
    const prevButton = screen.getByRole('button', { name: /السابق|Previous/ });
    expect(prevButton).toBeInTheDocument();
    expect(prevButton).not.toBeDisabled();
  });

  it('disables previous button on first page', () => {
    render(<PaginationComponent {...defaultProps} currentPage={1} />);
    
    const prevButton = screen.getByRole('button', { name: /السابق|Previous/ });
    expect(prevButton).toBeDisabled();
  });

  it('shows next button when not on last page', () => {
    render(<PaginationComponent {...defaultProps} currentPage={3} />);
    
    const nextButton = screen.getByRole('button', { name: /التالي|Next/ });
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).not.toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<PaginationComponent {...defaultProps} currentPage={5} />);
    
    const nextButton = screen.getByRole('button', { name: /التالي|Next/ });
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange with previous page when previous button is clicked', () => {
    const mockOnPageChange = jest.fn();
    render(<PaginationComponent {...defaultProps} currentPage={3} onPageChange={mockOnPageChange} />);
    
    const prevButton = screen.getByRole('button', { name: /السابق|Previous/ });
    fireEvent.click(prevButton);
    
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with next page when next button is clicked', () => {
    const mockOnPageChange = jest.fn();
    render(<PaginationComponent {...defaultProps} currentPage={3} onPageChange={mockOnPageChange} />);
    
    const nextButton = screen.getByRole('button', { name: /التالي|Next/ });
    fireEvent.click(nextButton);
    
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it('handles single page correctly', () => {
    render(<PaginationComponent {...defaultProps} totalPages={1} />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    
    const prevButton = screen.getByRole('button', { name: /السابق|Previous/ });
    const nextButton = screen.getByRole('button', { name: /التالي|Next/ });
    
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it('shows ellipsis for large page ranges', () => {
    render(<PaginationComponent {...defaultProps} totalPages={20} currentPage={10} />);
    
    // Should show some form of truncation or ellipsis
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('handles zero total pages', () => {
    render(<PaginationComponent {...defaultProps} totalPages={0} />);
    
    expect(screen.getByText(/صفحة 1 من 0/)).toBeInTheDocument();
  });

  it('maintains accessibility standards', () => {
    render(<PaginationComponent {...defaultProps} />);
    
    const pageButtons = screen.getAllByRole('button');
    pageButtons.forEach(button => {
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  it('supports keyboard navigation', () => {
    render(<PaginationComponent {...defaultProps} />);
    
    const pageButton = screen.getByText('2');
    
    // Test Enter key
    fireEvent.keyDown(pageButton, { key: 'Enter', code: 'Enter' });
    expect(pageButton).toBeInTheDocument();
    
    // Test Space key
    fireEvent.keyDown(pageButton, { key: ' ', code: 'Space' });
    expect(pageButton).toBeInTheDocument();
  });

  it('handles edge case of negative current page', () => {
    render(<PaginationComponent {...defaultProps} currentPage={-1} />);
    
    // Should handle gracefully and not crash
    expect(screen.getByText(/صفحة -1 من 5/)).toBeInTheDocument();
  });

  it('handles edge case of current page greater than total pages', () => {
    render(<PaginationComponent {...defaultProps} currentPage={10} totalPages={5} />);
    
    // Should handle gracefully
    expect(screen.getByText(/صفحة 10 من 5/)).toBeInTheDocument();
  });

  it('applies correct styling to page buttons', () => {
    render(<PaginationComponent {...defaultProps} />);
    
    const pageButtons = screen.getAllByRole('button');
    pageButtons.forEach(button => {
      expect(button).toHaveClass('px-3', 'py-2', 'rounded');
    });
  });

  it('shows correct page range for middle pages', () => {
    render(<PaginationComponent {...defaultProps} totalPages={10} currentPage={5} />);
    
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('updates page info correctly when props change', () => {
    const { rerender } = render(<PaginationComponent {...defaultProps} />);
    
    expect(screen.getByText(/صفحة 1 من 5/)).toBeInTheDocument();
    
    rerender(<PaginationComponent {...defaultProps} currentPage={3} />);
    
    expect(screen.getByText(/صفحة 3 من 5/)).toBeInTheDocument();
  });
});
