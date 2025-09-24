import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../FormInput';

// Test wrapper component to provide formik context
const TestWrapper = ({ 
  formikProps = {}, 
  inputProps = {},
  initialValues = { testField: '' },
  validationSchema = Yup.object({
    testField: Yup.string().required('Field is required')
  })
}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {},
    ...formikProps
  });

  return (
    <FormInput
      id="testField"
      label="Test Field"
      placeholder="Enter test value"
      formik={formik}
      {...inputProps}
    />
  );
};

describe('FormInput Component', () => {
  describe('Basic Rendering', () => {
    test('renders input with label and placeholder', () => {
      render(<TestWrapper />);
      
      expect(screen.getByLabelText('Test Field')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter test value')).toBeInTheDocument();
    });

    test('renders with custom class names', () => {
      render(
        <TestWrapper 
          inputProps={{
            inputClassName: 'custom-input-class',
            labelClassName: 'custom-label-class',
            containerClassName: 'custom-container-class'
          }}
        />
      );
      
      const input = screen.getByRole('textbox');
      const label = screen.getByText('Test Field');
      
      expect(input).toHaveClass('custom-input-class');
      expect(label).toHaveClass('custom-label-class');
      expect(input.closest('.custom-container-class')).toBeInTheDocument();
    });

    test('renders with icon when showIcon is true', () => {
      render(
        <TestWrapper 
          inputProps={{
            showIcon: true,
            iconClass: 'fa-solid fa-user'
          }}
        />
      );
      
      const icon = document.querySelector('.fa-solid.fa-user');
      expect(icon).toBeInTheDocument();
    });

    test('renders different input types correctly', () => {
      const { rerender } = render(
        <TestWrapper inputProps={{ type: 'email' }} />
      );
      
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
      
      rerender(<TestWrapper inputProps={{ type: 'password' }} />);
      expect(screen.getByDisplayValue('')).toHaveAttribute('type', 'password');
      
      rerender(<TestWrapper inputProps={{ type: 'tel' }} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel');
    });
  });

  describe('Form Integration', () => {
    test('updates formik values when user types', () => {
      render(<TestWrapper />);
      
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test value' } });
      
      expect(input).toHaveValue('test value');
    });

    test('displays formik validation errors', () => {
      render(
        <TestWrapper 
          formikProps={{
            initialTouched: { testField: true },
            initialErrors: { testField: 'Field is required' }
          }}
        />
      );
      
      expect(screen.getByText('Field is required')).toBeInTheDocument();
    });

    test('shows error only when field is touched', () => {
      const { rerender } = render(
        <TestWrapper 
          formikProps={{
            initialTouched: { testField: false },
            initialErrors: { testField: 'Field is required' }
          }}
        />
      );
      
      expect(screen.queryByText('Field is required')).not.toBeInTheDocument();
      
      rerender(
        <TestWrapper 
          formikProps={{
            initialTouched: { testField: true },
            initialErrors: { testField: 'Field is required' }
          }}
        />
      );
      
      expect(screen.getByText('Field is required')).toBeInTheDocument();
    });

    test('triggers formik onBlur when input loses focus', () => {
      const mockOnBlur = jest.fn();
      render(
        <TestWrapper 
          formikProps={{
            handleBlur: mockOnBlur
          }}
        />
      );
      
      const input = screen.getByRole('textbox');
      fireEvent.blur(input);
      
      expect(mockOnBlur).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('input has correct accessibility attributes', () => {
      render(<TestWrapper inputProps={{ required: true }} />);
      
      const input = screen.getByRole('textbox');
      const label = screen.getByText('Test Field');
      
      expect(input).toHaveAttribute('id', 'testField');
      expect(input).toHaveAttribute('name', 'testField');
      expect(label).toHaveAttribute('htmlFor', 'testField');
      expect(input).toBeRequired();
    });

    test('error message has proper accessibility structure', () => {
      render(
        <TestWrapper 
          formikProps={{
            initialTouched: { testField: true },
            initialErrors: { testField: 'Field is required' }
          }}
        />
      );
      
      const errorMessage = screen.getByText('Field is required');
      expect(errorMessage).toHaveClass('error-message');
    });
  });

  describe('Edge Cases', () => {
    test('handles undefined formik values gracefully', () => {
      const formikWithUndefined = {
        values: {},
        errors: {},
        touched: {},
        handleChange: jest.fn(),
        handleBlur: jest.fn()
      };
      
      render(
        <FormInput
          id="testField"
          label="Test Field"
          formik={formikWithUndefined}
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('');
    });

    test('handles null formik values gracefully', () => {
      const formikWithNull = {
        values: { testField: null },
        errors: {},
        touched: {},
        handleChange: jest.fn(),
        handleBlur: jest.fn()
      };
      
      render(
        <FormInput
          id="testField"
          label="Test Field"
          formik={formikWithNull}
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('');
    });

    test('does not render icon when showIcon is false or iconClass is empty', () => {
      const { rerender } = render(
        <TestWrapper 
          inputProps={{
            showIcon: false,
            iconClass: 'fa-solid fa-user'
          }}
        />
      );
      
      expect(document.querySelector('.fa-solid.fa-user')).not.toBeInTheDocument();
      
      rerender(
        <TestWrapper 
          inputProps={{
            showIcon: true,
            iconClass: ''
          }}
        />
      );
      
      expect(document.querySelector('i')).not.toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    test('applies custom label and input styles', () => {
      const customLabelStyle = { color: 'red', fontSize: '16px' };
      const customInputStyle = { backgroundColor: 'blue' };
      
      render(
        <TestWrapper 
          inputProps={{
            labelStyle: customLabelStyle,
            inputStyle: customInputStyle
          }}
        />
      );
      
      const label = screen.getByText('Test Field');
      const input = screen.getByRole('textbox');
      
      expect(label).toHaveStyle('color: red');
      expect(label).toHaveStyle('font-size: 16px');
      expect(input).toHaveStyle('background-color: blue');
    });

    test('merges default and custom styles correctly', () => {
      render(<TestWrapper />);
      
      const label = screen.getByText('Test Field');
      // Should have default color from component plus any custom styles
      expect(label).toHaveStyle('color: #002E5B');
    });
  });
});
