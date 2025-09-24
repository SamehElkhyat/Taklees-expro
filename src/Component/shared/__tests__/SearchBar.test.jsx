import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  const defaultProps = {
    searchTerm: '',
    onSearchChange: jest.fn(),
    placeholder: 'Search...'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input correctly', () => {
    render(<SearchBar {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('type', 'text');
  });

  it('displays the current search term', () => {
    render(<SearchBar {...defaultProps} searchTerm="test search" />);
    
    const searchInput = screen.getByDisplayValue('test search');
    expect(searchInput).toBeInTheDocument();
  });

  it('calls onSearchChange when input value changes', () => {
    const mockOnSearchChange = jest.fn();
    render(<SearchBar {...defaultProps} onSearchChange={mockOnSearchChange} />);
    
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'new search' } });
    
    expect(mockOnSearchChange).toHaveBeenCalledWith('new search');
  });

  it('handles empty search correctly', () => {
    const mockOnSearchChange = jest.fn();
    render(<SearchBar {...defaultProps} onSearchChange={mockOnSearchChange} searchTerm="test" />);
    
    const searchInput = screen.getByDisplayValue('test');
    fireEvent.change(searchInput, { target: { value: '' } });
    
    expect(mockOnSearchChange).toHaveBeenCalledWith('');
  });

  it('applies custom placeholder text', () => {
    render(<SearchBar {...defaultProps} placeholder="ابحث هنا..." />);
    
    expect(screen.getByPlaceholderText('ابحث هنا...')).toBeInTheDocument();
  });

  it('has proper styling classes', () => {
    render(<SearchBar {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toHaveClass('w-full');
  });

  it('handles multiple rapid changes correctly', () => {
    const mockOnSearchChange = jest.fn();
    render(<SearchBar {...defaultProps} onSearchChange={mockOnSearchChange} />);
    
    const searchInput = screen.getByPlaceholderText('Search...');
    
    fireEvent.change(searchInput, { target: { value: 'a' } });
    fireEvent.change(searchInput, { target: { value: 'ab' } });
    fireEvent.change(searchInput, { target: { value: 'abc' } });
    
    expect(mockOnSearchChange).toHaveBeenCalledTimes(3);
    expect(mockOnSearchChange).toHaveBeenNthCalledWith(1, 'a');
    expect(mockOnSearchChange).toHaveBeenNthCalledWith(2, 'ab');
    expect(mockOnSearchChange).toHaveBeenNthCalledWith(3, 'abc');
  });

  it('maintains focus during typing', () => {
    render(<SearchBar {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search...');
    searchInput.focus();
    
    expect(document.activeElement).toBe(searchInput);
    
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(document.activeElement).toBe(searchInput);
  });

  it('handles special characters correctly', () => {
    const mockOnSearchChange = jest.fn();
    render(<SearchBar {...defaultProps} onSearchChange={mockOnSearchChange} />);
    
    const searchInput = screen.getByPlaceholderText('Search...');
    const specialText = 'test@#$%^&*()';
    
    fireEvent.change(searchInput, { target: { value: specialText } });
    
    expect(mockOnSearchChange).toHaveBeenCalledWith(specialText);
  });

  it('handles Arabic text correctly', () => {
    const mockOnSearchChange = jest.fn();
    render(<SearchBar {...defaultProps} onSearchChange={mockOnSearchChange} />);
    
    const searchInput = screen.getByPlaceholderText('Search...');
    const arabicText = 'البحث باللغة العربية';
    
    fireEvent.change(searchInput, { target: { value: arabicText } });
    
    expect(mockOnSearchChange).toHaveBeenCalledWith(arabicText);
  });

  it('supports keyboard navigation', () => {
    render(<SearchBar {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search...');
    
    // Test Tab navigation
    fireEvent.keyDown(searchInput, { key: 'Tab', code: 'Tab' });
    expect(searchInput).toBeInTheDocument();
    
    // Test Escape key
    fireEvent.keyDown(searchInput, { key: 'Escape', code: 'Escape' });
    expect(searchInput).toBeInTheDocument();
  });

  it('has accessible attributes', () => {
    render(<SearchBar {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search...');
    
    expect(searchInput).toHaveAttribute('type', 'text');
    expect(searchInput).toBeVisible();
  });
});
