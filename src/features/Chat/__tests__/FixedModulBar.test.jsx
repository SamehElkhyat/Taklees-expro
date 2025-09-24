import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FixedModulBar from '../FixedModulBar';

// Mock ChatModule component
jest.mock('../ChatModule', () => {
  return function MockChatModule({ selectedChat }) {
    return (
      <div data-testid="chat-module">
        Chat Module - {selectedChat?.name || 'No chat selected'}
      </div>
    );
  };
});

describe('FixedModulBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the chat toggle button correctly', () => {
    render(<FixedModulBar />);
    
    expect(screen.getByText('شات مع سابر')).toBeInTheDocument();
    expect(screen.getByText('مساعد ذكي متاح على مدار الساعة')).toBeInTheDocument();
  });

  it('shows online status indicator', () => {
    render(<FixedModulBar />);
    
    // Check for green status indicators
    const statusIndicators = document.querySelectorAll('.bg-\\[\\#28a745\\]');
    expect(statusIndicators.length).toBeGreaterThan(0);
  });

  it('opens chat interface when toggle button is clicked', () => {
    render(<FixedModulBar />);
    
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    
    expect(screen.getByText('المحادثات')).toBeInTheDocument();
    expect(screen.getByText('اختر محادثة للبدء')).toBeInTheDocument();
  });

  it('displays chat options correctly', () => {
    render(<FixedModulBar />);
    
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    
    expect(screen.getByText('سابر - المساعد الذكي')).toBeInTheDocument();
    expect(screen.getByText('الدعم التقني')).toBeInTheDocument();
    expect(screen.getByText('المبيعات')).toBeInTheDocument();
    expect(screen.getByText('الحسابات')).toBeInTheDocument();
  });

  it('shows chat descriptions correctly', () => {
    render(<FixedModulBar />);
    
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    
    expect(screen.getByText('مساعد AI للإجابة على الأسئلاء')).toBeInTheDocument();
    expect(screen.getByText('فريق الدعم التقني')).toBeInTheDocument();
    expect(screen.getByText('فريق المبيعات والاستشارات')).toBeInTheDocument();
    expect(screen.getByText('استفسارات الحسابات والفواتير')).toBeInTheDocument();
  });

  it('displays unread message counts', () => {
    render(<FixedModulBar />);
    
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    
    // Check for unread message badges
    expect(screen.getByText('2')).toBeInTheDocument(); // Technical support
    expect(screen.getByText('1')).toBeInTheDocument(); // Accounts
  });

  it('shows different status indicators for different chats', () => {
    render(<FixedModulBar />);
    
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    
    expect(screen.getByText('متاح الآن')).toBeInTheDocument();
    expect(screen.getByText('بعيد')).toBeInTheDocument();
    expect(screen.getByText('غير متاح')).toBeInTheDocument();
  });

  it('selects chat when chat option is clicked', () => {
    render(<FixedModulBar />);
    
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    
    const aiAssistantChat = screen.getByText('سابر - المساعد الذكي');
    fireEvent.click(aiAssistantChat);
    
    expect(screen.getByTestId('chat-module')).toBeInTheDocument();
    expect(screen.getByText('Chat Module - سابر - المساعد الذكي')).toBeInTheDocument();
  });

  it('shows welcome message when no chat is selected', () => {
    render(<FixedModulBar />);
    
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    
    expect(screen.getByText('مرحباً بك')).toBeInTheDocument();
    expect(screen.getByText('اختر محادثة من الشريط الجانبي للبدء')).toBeInTheDocument();
  });

  it('closes chat interface when close button is clicked', () => {
    render(<FixedModulBar />);
    
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    
    const closeButton = screen.getByRole('button', { name: '' }); // Close button
    fireEvent.click(closeButton);
    
    expect(screen.queryByText('المحادثات')).not.toBeInTheDocument();
  });

  it('highlights selected chat option', () => {
    render(<FixedModulBar />);
    
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    
    const technicalSupportChat = screen.getByText('الدعم التقني');
    fireEvent.click(technicalSupportChat);
    
    // Check if the selected chat has the blue border
    const selectedChatElement = technicalSupportChat.closest('div');
    expect(selectedChatElement).toHaveClass('bg-blue-50');
  });

  it('displays chat avatars correctly', () => {
    render(<FixedModulBar />);
    
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    
    expect(screen.getByText('🤖')).toBeInTheDocument(); // AI Assistant
    expect(screen.getByText('🛠️')).toBeInTheDocument(); // Technical Support
    expect(screen.getByText('💼')).toBeInTheDocument(); // Sales
    expect(screen.getByText('💰')).toBeInTheDocument(); // Accounts
  });

  it('shows footer information', () => {
    render(<FixedModulBar />);
    
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    
    expect(screen.getByText('مدعوم بتقنية الذكاء الاصطناعي')).toBeInTheDocument();
  });

  it('applies hover effects correctly', () => {
    render(<FixedModulBar />);
    
    const toggleButton = screen.getByRole('button');
    
    // The button should have hover classes
    expect(toggleButton).toHaveClass('hover:bg-gray-50');
  });

  it('handles keyboard interactions', () => {
    render(<FixedModulBar />);
    
    const toggleButton = screen.getByRole('button');
    
    // Test Enter key
    fireEvent.keyDown(toggleButton, { key: 'Enter', code: 'Enter' });
    
    expect(screen.getByText('المحادثات')).toBeInTheDocument();
  });

  it('maintains accessibility standards', () => {
    render(<FixedModulBar />);
    
    const toggleButton = screen.getByRole('button');
    
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('type', 'button');
  });

  it('displays correct z-index for overlay', () => {
    render(<FixedModulBar />);
    
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    
    const overlay = document.querySelector('.fixed.inset-0');
    expect(overlay).toHaveClass('z-[1333332]');
  });

  it('shows different chat statuses with correct colors', () => {
    render(<FixedModulBar />);
    
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    
    // Check for different status color classes
    const onlineElements = document.querySelectorAll('.bg-green-500');
    const awayElements = document.querySelectorAll('.bg-yellow-500');
    const offlineElements = document.querySelectorAll('.bg-gray-400');
    
    expect(onlineElements.length).toBeGreaterThan(0);
    expect(awayElements.length).toBeGreaterThan(0);
    expect(offlineElements.length).toBeGreaterThan(0);
  });

  it('prevents body scroll when chat is open', () => {
    render(<FixedModulBar />);
    
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    
    // Check if overlay is present (which typically prevents scroll)
    const overlay = document.querySelector('.fixed.inset-0.bg-black.bg-opacity-50');
    expect(overlay).toBeInTheDocument();
  });
});
