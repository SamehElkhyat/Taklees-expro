import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoadingButton from '../LoadingButton';

describe('LoadingButton Component', () => {
  describe('Basic Rendering', () => {
    test('renders button with children text', () => {
      render(<LoadingButton>Click me</LoadingButton>);
      
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    test('renders with default props', () => {
      render(<LoadingButton>Default Button</LoadingButton>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
      expect(button).not.toBeDisabled();
      expect(button).toHaveClass('btn-success');
    });

    test('renders with custom variant and className', () => {
      render(
        <LoadingButton 
          variant="primary" 
          className="custom-class"
        >
          Custom Button
        </LoadingButton>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-primary');
      expect(button).toHaveClass('custom-class');
    });

    test('renders as submit button when type is submit', () => {
      render(
        <LoadingButton type="submit">
          Submit Button
        </LoadingButton>
      );
      
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });
  });

  describe('Loading State', () => {
    test('shows spinner when isLoading is true with default spinner', () => {
      render(
        <LoadingButton isLoading={true} loadingText="Loading...">
          Click me
        </LoadingButton>
      );
      
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.queryByText('Click me')).not.toBeInTheDocument();
      
      // Check for Bootstrap spinner
      const spinner = document.querySelector('.spinner-border');
      expect(spinner).toBeInTheDocument();
    });

    test('shows gear icon when isLoading is true with gear loadingIcon', () => {
      render(
        <LoadingButton 
          isLoading={true} 
          loadingIcon="gear"
          className="test-gear-button"
        >
          Click me
        </LoadingButton>
      );
      
      expect(screen.queryByText('Click me')).not.toBeInTheDocument();
      
      // Check for FontAwesome gear icon
      const gearIcon = document.querySelector('.fa-solid.fa-gear.fa-spin');
      expect(gearIcon).toBeInTheDocument();
      expect(gearIcon).toHaveStyle('font-size: 30px');
    });

    test('applies special className for gear icon loading state', () => {
      render(
        <LoadingButton 
          isLoading={true} 
          loadingIcon="gear"
          className="original-class"
        >
          Click me
        </LoadingButton>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('d-flex');
      expect(button).toHaveClass('justify-content-center');
      expect(button).toHaveClass('align-items-center');
    });

    test('shows custom loading text', () => {
      render(
        <LoadingButton 
          isLoading={true} 
          loadingText="جارٍ الحفظ..."
        >
          Save
        </LoadingButton>
      );
      
      expect(screen.getByText('جارٍ الحفظ...')).toBeInTheDocument();
    });

    test('disables button when isLoading is true', () => {
      render(
        <LoadingButton isLoading={true}>
          Click me
        </LoadingButton>
      );
      
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('Disabled State', () => {
    test('disables button when disabled prop is true', () => {
      render(
        <LoadingButton disabled={true}>
          Disabled Button
        </LoadingButton>
      );
      
      expect(screen.getByRole('button')).toBeDisabled();
    });

    test('disables button when both disabled and isLoading are true', () => {
      render(
        <LoadingButton disabled={true} isLoading={true}>
          Button
        </LoadingButton>
      );
      
      expect(screen.getByRole('button')).toBeDisabled();
    });

    test('keeps button enabled when disabled is false and isLoading is false', () => {
      render(
        <LoadingButton disabled={false} isLoading={false}>
          Enabled Button
        </LoadingButton>
      );
      
      expect(screen.getByRole('button')).not.toBeDisabled();
    });
  });

  describe('Click Handling', () => {
    test('calls onClick when button is clicked and not loading', () => {
      const mockOnClick = jest.fn();
      render(
        <LoadingButton onClick={mockOnClick}>
          Click me
        </LoadingButton>
      );
      
      fireEvent.click(screen.getByRole('button'));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test('does not call onClick when button is loading', () => {
      const mockOnClick = jest.fn();
      render(
        <LoadingButton onClick={mockOnClick} isLoading={true}>
          Click me
        </LoadingButton>
      );
      
      fireEvent.click(screen.getByRole('button'));
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    test('does not call onClick when button is disabled', () => {
      const mockOnClick = jest.fn();
      render(
        <LoadingButton onClick={mockOnClick} disabled={true}>
          Click me
        </LoadingButton>
      );
      
      fireEvent.click(screen.getByRole('button'));
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });

  describe('Size Prop', () => {
    test('applies size prop to spinner', () => {
      render(
        <LoadingButton isLoading={true} size="lg">
          Large Button
        </LoadingButton>
      );
      
      const spinner = document.querySelector('.spinner-border');
      expect(spinner).toHaveClass('spinner-border-lg');
    });

    test('uses default size when not specified', () => {
      render(
        <LoadingButton isLoading={true}>
          Default Size
        </LoadingButton>
      );
      
      const spinner = document.querySelector('.spinner-border');
      expect(spinner).toHaveClass('spinner-border-sm');
    });
  });

  describe('Additional Props', () => {
    test('passes through additional props to button element', () => {
      render(
        <LoadingButton 
          data-testid="custom-button"
          aria-label="Custom Label"
          title="Button Title"
        >
          Custom Props
        </LoadingButton>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-testid', 'custom-button');
      expect(button).toHaveAttribute('aria-label', 'Custom Label');
      expect(button).toHaveAttribute('title', 'Button Title');
    });

    test('preserves existing className when not loading', () => {
      render(
        <LoadingButton className="custom-class">
          Normal Button
        </LoadingButton>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveClass('px-3');
      expect(button).toHaveClass('rounded-pill');
    });
  });

  describe('Accessibility', () => {
    test('maintains proper button semantics', () => {
      render(<LoadingButton>Accessible Button</LoadingButton>);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAccessibleName('Accessible Button');
    });

    test('spinner has proper accessibility attributes', () => {
      render(
        <LoadingButton isLoading={true}>
          Loading Button
        </LoadingButton>
      );
      
      const spinner = document.querySelector('.spinner-border');
      expect(spinner).toHaveAttribute('aria-hidden', 'true');
    });

    test('loading state provides screen reader feedback', () => {
      render(
        <LoadingButton isLoading={true} loadingText="Loading...">
          Submit
        </LoadingButton>
      );
      
      // The loading text should be announced by screen readers
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    test('handles undefined onClick gracefully', () => {
      render(<LoadingButton>No onClick</LoadingButton>);
      
      // Should not throw error when clicked
      expect(() => {
        fireEvent.click(screen.getByRole('button'));
      }).not.toThrow();
    });

    test('handles empty children', () => {
      render(<LoadingButton></LoadingButton>);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toBeEmptyDOMElement();
    });

    test('handles complex children elements', () => {
      render(
        <LoadingButton>
          <span>Complex</span> <strong>Children</strong>
        </LoadingButton>
      );
      
      expect(screen.getByText('Complex')).toBeInTheDocument();
      expect(screen.getByText('Children')).toBeInTheDocument();
    });
  });
});
