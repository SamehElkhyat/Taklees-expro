import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ActionButtons from '../ActionButtons';

describe('ActionButtons Component', () => {
  const mockOnShare = jest.fn();
  const mockOnExport = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    test('renders share and export buttons', () => {
      render(<ActionButtons onShare={mockOnShare} onExport={mockOnExport} />);
      
      expect(screen.getByText('مشاركة')).toBeInTheDocument();
      expect(screen.getByText('تصدير')).toBeInTheDocument();
    });

    test('applies correct CSS classes', () => {
      render(<ActionButtons onShare={mockOnShare} onExport={mockOnExport} />);
      
      const shareButton = screen.getByText('مشاركة').closest('button');
      const exportButton = screen.getByText('تصدير').closest('button');

      expect(shareButton).toHaveClass('bg-[#00AEEF]', 'text-white');
      expect(exportButton).toHaveClass('bg-[transparent]', 'text-black', 'border');
    });

    test('renders with lucide-react icons', () => {
      const { container } = render(<ActionButtons onShare={mockOnShare} onExport={mockOnExport} />);
      
      // Check for SVG icons (lucide-react renders as SVG)
      const svgElements = container.querySelectorAll('svg');
      expect(svgElements).toHaveLength(2);
    });
  });

  describe('Button Interactions', () => {
    test('calls onShare when share button is clicked', () => {
      render(<ActionButtons onShare={mockOnShare} onExport={mockOnExport} />);
      
      fireEvent.click(screen.getByText('مشاركة'));
      expect(mockOnShare).toHaveBeenCalledTimes(1);
    });

    test('calls onExport when export button is clicked', () => {
      render(<ActionButtons onShare={mockOnShare} onExport={mockOnExport} />);
      
      fireEvent.click(screen.getByText('تصدير'));
      expect(mockOnExport).toHaveBeenCalledTimes(1);
    });

    test('handles multiple clicks correctly', () => {
      render(<ActionButtons onShare={mockOnShare} onExport={mockOnExport} />);
      
      const shareButton = screen.getByText('مشاركة');
      const exportButton = screen.getByText('تصدير');

      fireEvent.click(shareButton);
      fireEvent.click(shareButton);
      fireEvent.click(exportButton);

      expect(mockOnShare).toHaveBeenCalledTimes(2);
      expect(mockOnExport).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    test('buttons have proper button roles', () => {
      render(<ActionButtons onShare={mockOnShare} onExport={mockOnExport} />);
      
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
    });

    test('buttons have accessible names in Arabic', () => {
      render(<ActionButtons onShare={mockOnShare} onExport={mockOnExport} />);
      
      expect(screen.getByRole('button', { name: /مشاركة/ })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /تصدير/ })).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    test('handles undefined callback functions gracefully', () => {
      render(<ActionButtons onShare={undefined} onExport={undefined} />);
      
      // Should not throw error when clicked
      expect(() => {
        fireEvent.click(screen.getByText('مشاركة'));
        fireEvent.click(screen.getByText('تصدير'));
      }).not.toThrow();
    });

    test('handles null callback functions gracefully', () => {
      render(<ActionButtons onShare={null} onExport={null} />);
      
      // Should not throw error when clicked
      expect(() => {
        fireEvent.click(screen.getByText('مشاركة'));
        fireEvent.click(screen.getByText('تصدير'));
      }).not.toThrow();
    });
  });

  describe('Responsive Design', () => {
    test('has responsive layout classes', () => {
      const { container } = render(<ActionButtons onShare={mockOnShare} onExport={mockOnExport} />);
      
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('w-full', 'lg:w-auto', 'flex', 'flex-col', 'sm:flex-row');
    });

    test('buttons have responsive sizing classes', () => {
      render(<ActionButtons onShare={mockOnShare} onExport={mockOnExport} />);
      
      const shareButton = screen.getByText('مشاركة').closest('button');
      const exportButton = screen.getByText('تصدير').closest('button');

      expect(shareButton).toHaveClass('w-full', 'sm:w-[141px]', 'h-[45px]', 'sm:h-[55px]');
      expect(exportButton).toHaveClass('w-full', 'sm:w-[141px]', 'h-[45px]', 'sm:h-[55px]');
    });

    test('has responsive text hiding on small screens', () => {
      render(<ActionButtons onShare={mockOnShare} onExport={mockOnExport} />);
      
      const shareSpan = screen.getByText('مشاركة');
      const exportSpan = screen.getByText('تصدير');

      expect(shareSpan).toHaveClass('hidden', 'sm:inline');
      expect(exportSpan).toHaveClass('hidden', 'sm:inline');
    });
  });

  describe('Icon Styling', () => {
    test('share icon has correct transformation', () => {
      const { container } = render(<ActionButtons onShare={mockOnShare} onExport={mockOnExport} />);
      
      const shareButton = screen.getByText('مشاركة').closest('button');
      const shareIcon = shareButton.querySelector('svg');
      
      expect(shareIcon).toHaveClass('transform', 'scale-x-[-1]', 'sm:w-6', 'sm:h-6');
    });

    test('export icon has correct sizing', () => {
      const { container } = render(<ActionButtons onShare={mockOnShare} onExport={mockOnExport} />);
      
      const exportButton = screen.getByText('تصدير').closest('button');
      const exportIcon = exportButton.querySelector('svg');
      
      expect(exportIcon).toHaveClass('sm:w-6', 'sm:h-6');
    });
  });
});
