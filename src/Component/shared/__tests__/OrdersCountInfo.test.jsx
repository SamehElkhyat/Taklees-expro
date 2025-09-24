import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrdersCountInfo from '../OrdersCountInfo';

describe('OrdersCountInfo', () => {
  it('renders total orders count correctly', () => {
    render(<OrdersCountInfo totalCount={25} />);
    
    expect(screen.getByText(/إجمالي الطلبات/)).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('handles zero orders', () => {
    render(<OrdersCountInfo totalCount={0} />);
    
    expect(screen.getByText(/إجمالي الطلبات/)).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles large numbers correctly', () => {
    render(<OrdersCountInfo totalCount={1000} />);
    
    expect(screen.getByText('1000')).toBeInTheDocument();
  });

  it('displays custom label when provided', () => {
    render(<OrdersCountInfo totalCount={100} label="إجمالي الطلبات المكتملة" />);
    
    expect(screen.getByText(/إجمالي الطلبات المكتملة/)).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('shows correct labels in Arabic', () => {
    render(<OrdersCountInfo totalCount={50} />);
    
    expect(screen.getByText(/إجمالي الطلبات/)).toBeInTheDocument();
  });

  it('applies correct styling to count numbers', () => {
    render(<OrdersCountInfo totalCount={42} />);
    
    const countElement = screen.getByText('42');
    expect(countElement).toHaveClass('font-bold');
  });

  it('handles negative numbers gracefully', () => {
    render(<OrdersCountInfo totalCount={-5} />);
    
    expect(screen.getByText('-5')).toBeInTheDocument();
  });

  it('supports custom className', () => {
    render(<OrdersCountInfo totalCount={10} className="custom-orders-info" />);
    
    const container = screen.getByText(/إجمالي الطلبات/).closest('div');
    expect(container).toHaveClass('custom-orders-info');
  });

  it('displays with default layout', () => {
    render(<OrdersCountInfo totalCount={75} />);
    
    const container = screen.getByText(/إجمالي الطلبات/).closest('div');
    expect(container).toHaveClass('mb-4', 'text-center');
  });

  it('supports custom text colors', () => {
    render(<OrdersCountInfo totalCount={100} textColor="text-gray-900" countColor="text-red-500" />);
    
    const container = screen.getByText(/إجمالي الطلبات/).closest('p');
    expect(container).toHaveClass('text-gray-900');
    
    const countElement = screen.getByText('100');
    expect(countElement).toHaveClass('text-red-500');
  });

  it('maintains accessibility standards', () => {
    render(<OrdersCountInfo totalCount={25} />);
    
    // All text should be visible and accessible
    expect(screen.getByText(/إجمالي الطلبات/)).toBeVisible();
    expect(screen.getByText('25')).toBeVisible();
  });
});
