import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SubmitSaberCertificate from '../SubmitSaberCertificate';

// Mock alert function
global.alert = jest.fn();

describe('SubmitSaberCertificate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component correctly', () => {
    render(<SubmitSaberCertificate />);
    
    expect(screen.getByText('طلب شهادة سابر')).toBeInTheDocument();
    expect(screen.getByText('احصل على شهادة سابر لمنتجاتك بسهولة وسرعة من خلال نظامنا المتطور')).toBeInTheDocument();
  });

  it('displays form fields correctly', () => {
    render(<SubmitSaberCertificate />);
    
    expect(screen.getByLabelText(/العنوان/)).toBeInTheDocument();
    expect(screen.getByLabelText(/الوصف/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('أدخل عنوان الطلب هنا...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('اكتب وصف تفصيلي للطلب أو الخدمة المطلوبة...')).toBeInTheDocument();
  });

  it('shows submit button initially disabled', () => {
    render(<SubmitSaberCertificate />);
    
    const submitButton = screen.getByRole('button', { name: /تقديم الطلب/ });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when both fields are filled', () => {
    render(<SubmitSaberCertificate />);
    
    const titleInput = screen.getByLabelText(/العنوان/);
    const descriptionInput = screen.getByLabelText(/الوصف/);
    const submitButton = screen.getByRole('button', { name: /تقديم الطلب/ });
    
    fireEvent.change(titleInput, { target: { value: 'عنوان تجريبي' } });
    fireEvent.change(descriptionInput, { target: { value: 'وصف تجريبي' } });
    
    expect(submitButton).not.toBeDisabled();
  });

  it('updates character count for description field', () => {
    render(<SubmitSaberCertificate />);
    
    const descriptionInput = screen.getByLabelText(/الوصف/);
    
    fireEvent.change(descriptionInput, { target: { value: 'نص تجريبي' } });
    
    expect(screen.getByText('9 حرف')).toBeInTheDocument();
  });

  it('handles form input changes correctly', () => {
    render(<SubmitSaberCertificate />);
    
    const titleInput = screen.getByLabelText(/العنوان/);
    const descriptionInput = screen.getByLabelText(/الوصف/);
    
    fireEvent.change(titleInput, { target: { value: 'عنوان جديد' } });
    fireEvent.change(descriptionInput, { target: { value: 'وصف جديد' } });
    
    expect(titleInput.value).toBe('عنوان جديد');
    expect(descriptionInput.value).toBe('وصف جديد');
  });

  it('shows validation alert when trying to submit empty form', async () => {
    render(<SubmitSaberCertificate />);
    
    const titleInput = screen.getByLabelText(/العنوان/);
    const submitButton = screen.getByRole('button', { name: /تقديم الطلب/ });
    
    // Fill only title, leave description empty
    fireEvent.change(titleInput, { target: { value: 'عنوان فقط' } });
    
    // Try to submit
    fireEvent.click(submitButton);
    
    expect(global.alert).toHaveBeenCalledWith('يرجى ملء جميع الحقول المطلوبة');
  });

  it('shows validation alert when trying to submit with whitespace only', async () => {
    render(<SubmitSaberCertificate />);
    
    const titleInput = screen.getByLabelText(/العنوان/);
    const descriptionInput = screen.getByLabelText(/الوصف/);
    const submitButton = screen.getByRole('button', { name: /تقديم الطلب/ });
    
    // Fill with whitespace only
    fireEvent.change(titleInput, { target: { value: '   ' } });
    fireEvent.change(descriptionInput, { target: { value: '   ' } });
    
    // Try to submit
    fireEvent.click(submitButton);
    
    expect(global.alert).toHaveBeenCalledWith('يرجى ملء جميع الحقول المطلوبة');
  });

  it('handles successful form submission', async () => {
    jest.useFakeTimers();
    render(<SubmitSaberCertificate />);
    
    const titleInput = screen.getByLabelText(/العنوان/);
    const descriptionInput = screen.getByLabelText(/الوصف/);
    const submitButton = screen.getByRole('button', { name: /تقديم الطلب/ });
    
    // Fill form with valid data
    fireEvent.change(titleInput, { target: { value: 'عنوان صحيح' } });
    fireEvent.change(descriptionInput, { target: { value: 'وصف صحيح ومفصل' } });
    
    // Submit form
    fireEvent.click(submitButton);
    
    // Check loading state
    expect(screen.getByText('جاري التقديم...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
    
    // Fast-forward time
    jest.advanceTimersByTime(2000);
    
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('تم تقديم الطلب بنجاح! سيتم مراجعته خلال 3-5 أيام عمل.');
    });
    
    // Check form is reset
    expect(titleInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
    
    jest.useRealTimers();
  });

  it('displays loading state correctly during submission', async () => {
    jest.useFakeTimers();
    render(<SubmitSaberCertificate />);
    
    const titleInput = screen.getByLabelText(/العنوان/);
    const descriptionInput = screen.getByLabelText(/الوصف/);
    const submitButton = screen.getByRole('button', { name: /تقديم الطلب/ });
    
    // Fill form
    fireEvent.change(titleInput, { target: { value: 'عنوان' } });
    fireEvent.change(descriptionInput, { target: { value: 'وصف' } });
    
    // Submit
    fireEvent.click(submitButton);
    
    // Check loading elements
    expect(screen.getByText('جاري التقديم...')).toBeInTheDocument();
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument(); // Loading spinner
    expect(submitButton).toBeDisabled();
    
    jest.useRealTimers();
  });

  it('displays info cards correctly', () => {
    render(<SubmitSaberCertificate />);
    
    expect(screen.getByText('سرعة في الاستجابة')).toBeInTheDocument();
    expect(screen.getByText('مراجعة الطلب خلال 3-5 أيام عمل')).toBeInTheDocument();
    
    expect(screen.getByText('معتمد رسمياً')).toBeInTheDocument();
    expect(screen.getByText('شهادات معتمدة من هيئة المواصفات')).toBeInTheDocument();
    
    expect(screen.getByText('دعم فني')).toBeInTheDocument();
    expect(screen.getByText('فريق متخصص لمساعدتك في كل خطوة')).toBeInTheDocument();
  });

  it('has proper form accessibility', () => {
    render(<SubmitSaberCertificate />);
    
    const titleInput = screen.getByLabelText(/العنوان/);
    const descriptionInput = screen.getByLabelText(/الوصف/);
    
    expect(titleInput).toHaveAttribute('required');
    expect(descriptionInput).toHaveAttribute('required');
    expect(titleInput).toHaveAttribute('type', 'text');
    expect(descriptionInput.tagName).toBe('TEXTAREA');
  });

  it('displays required field indicators', () => {
    render(<SubmitSaberCertificate />);
    
    const requiredIndicators = screen.getAllByText('*');
    expect(requiredIndicators).toHaveLength(2); // Both fields are required
  });

  it('handles edge cases for character count', () => {
    render(<SubmitSaberCertificate />);
    
    const descriptionInput = screen.getByLabelText(/الوصف/);
    
    // Empty description
    expect(screen.getByText('0 حرف')).toBeInTheDocument();
    
    // Long description
    const longText = 'ا'.repeat(100);
    fireEvent.change(descriptionInput, { target: { value: longText } });
    expect(screen.getByText('100 حرف')).toBeInTheDocument();
  });

  it('prevents default form submission behavior', () => {
    render(<SubmitSaberCertificate />);
    
    const form = screen.getByRole('form');
    const preventDefaultSpy = jest.fn();
    
    fireEvent.submit(form, { preventDefault: preventDefaultSpy });
    
    // Form should prevent default behavior
    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
