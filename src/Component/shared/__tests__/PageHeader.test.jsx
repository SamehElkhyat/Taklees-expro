import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageHeader from '../PageHeader';

describe('PageHeader', () => {
  it('renders title correctly', () => {
    render(<PageHeader title="Test Title" />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders Arabic title correctly', () => {
    render(<PageHeader title="عنوان الصفحة" />);
    
    expect(screen.getByText('عنوان الصفحة')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<PageHeader title="Main Title" subtitle="Subtitle text" />);
    
    expect(screen.getByText('Main Title')).toBeInTheDocument();
    expect(screen.getByText('Subtitle text')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    render(<PageHeader title="Main Title" />);
    
    expect(screen.getByText('Main Title')).toBeInTheDocument();
    // Should not have any subtitle element
    expect(screen.queryByText('subtitle')).not.toBeInTheDocument();
  });

  it('applies correct heading hierarchy', () => {
    render(<PageHeader title="Page Title" />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Page Title');
  });

  it('has proper styling classes', () => {
    render(<PageHeader title="Styled Title" />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('text-2xl', 'font-bold');
  });

  it('supports custom className prop', () => {
    render(<PageHeader title="Custom Class" className="custom-header" />);
    
    const headerContainer = screen.getByText('Custom Class').closest('div');
    expect(headerContainer).toHaveClass('custom-header');
  });

  it('renders action buttons when provided', () => {
    const ActionButton = () => <button>Action</button>;
    
    render(<PageHeader title="Title with Action" action={<ActionButton />} />);
    
    expect(screen.getByText('Title with Action')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('handles long titles gracefully', () => {
    const longTitle = 'This is a very long title that should handle text wrapping properly and not break the layout';
    
    render(<PageHeader title={longTitle} />);
    
    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });

  it('maintains accessibility standards', () => {
    render(<PageHeader title="Accessible Title" subtitle="Accessible subtitle" />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toBeVisible();
  });

  it('supports RTL text direction', () => {
    render(<PageHeader title="العنوان الرئيسي" subtitle="العنوان الفرعي" />);
    
    expect(screen.getByText('العنوان الرئيسي')).toBeInTheDocument();
    expect(screen.getByText('العنوان الفرعي')).toBeInTheDocument();
  });

  it('renders with breadcrumb when provided', () => {
    const breadcrumb = (
      <nav>
        <span>Home</span> / <span>Page</span>
      </nav>
    );
    
    render(<PageHeader title="Page Title" breadcrumb={breadcrumb} />);
    
    expect(screen.getByText('Page Title')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('handles empty title gracefully', () => {
    render(<PageHeader title="" />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('');
  });

  it('supports icon prop', () => {
    const Icon = () => <svg data-testid="header-icon">Icon</svg>;
    
    render(<PageHeader title="Title with Icon" icon={<Icon />} />);
    
    expect(screen.getByText('Title with Icon')).toBeInTheDocument();
    expect(screen.getByTestId('header-icon')).toBeInTheDocument();
  });

  it('applies different size variants', () => {
    render(<PageHeader title="Large Title" size="large" />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('text-3xl');
  });

  it('supports color variants', () => {
    render(<PageHeader title="Colored Title" variant="primary" />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('text-primary');
  });
});
