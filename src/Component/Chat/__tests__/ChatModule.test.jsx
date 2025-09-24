import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatModule from '../ChatModule';

const mockSelectedChat = {
  id: 1,
  name: 'سابر - المساعد الذكي',
  avatar: '🤖',
  status: 'online'
};

describe('ChatModule', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the chat module correctly', () => {
    render(<ChatModule selectedChat={mockSelectedChat} />);
    
    expect(screen.getByText('سابر - المساعد الذكي')).toBeInTheDocument();
    expect(screen.getByText('🤖')).toBeInTheDocument();
  });

  it('displays current date correctly', () => {
    render(<ChatModule selectedChat={mockSelectedChat} />);
    
    const currentDate = new Date().toLocaleDateString('ar-SA');
    expect(screen.getByText(currentDate)).toBeInTheDocument();
  });

  it('renders sample messages correctly', () => {
    render(<ChatModule selectedChat={mockSelectedChat} />);
    
    expect(screen.getByText('Hi team 👋')).toBeInTheDocument();
    expect(screen.getByText('Anyone on for lunch today')).toBeInTheDocument();
    expect(screen.getByText("I'm down! Any ideas??")).toBeInTheDocument();
  });

  it('displays different message types (sent/received)', () => {
    render(<ChatModule selectedChat={mockSelectedChat} />);
    
    // Check for sent messages (should have blue background)
    const sentMessages = document.querySelectorAll('.bg-blue-500');
    expect(sentMessages.length).toBeGreaterThan(0);
    
    // Check for received messages (should have white background)
    const receivedMessages = document.querySelectorAll('.bg-white');
    expect(receivedMessages.length).toBeGreaterThan(0);
  });

  it('shows sender names for received messages', () => {
    render(<ChatModule selectedChat={mockSelectedChat} />);
    
    expect(screen.getByText('Jav')).toBeInTheDocument();
    expect(screen.getAllByText('Aubrey')).toHaveLength(2); // Aubrey has 2 messages
    expect(screen.getAllByText('Janet')).toHaveLength(2); // Janet has 2 messages
  });

  it('displays message timestamps', () => {
    render(<ChatModule selectedChat={mockSelectedChat} />);
    
    expect(screen.getAllByText('11:31 AM')).toHaveLength(2); // Two messages at 11:31 AM
    expect(screen.getByText('11:35 AM')).toBeInTheDocument();
    expect(screen.getByText('12:03 PM')).toBeInTheDocument();
  });

  it('shows online status correctly', () => {
    render(<ChatModule selectedChat={mockSelectedChat} />);
    
    expect(screen.getByText('متاح الآن')).toBeInTheDocument();
  });

  it('handles input field correctly', () => {
    render(<ChatModule selectedChat={mockSelectedChat} />);
    
    const messageInput = screen.getByPlaceholderText('اكتب رسالتك هنا...');
    
    fireEvent.change(messageInput, { target: { value: 'رسالة تجريبية' } });
    expect(messageInput.value).toBe('رسالة تجريبية');
  });

  it('shows send button when message is typed', () => {
    render(<ChatModule selectedChat={mockSelectedChat} />);
    
    const messageInput = screen.getByPlaceholderText('اكتب رسالتك هنا...');
    
    // Initially no send button should be visible
    expect(screen.queryByRole('button', { name: /إرسال/ })).not.toBeInTheDocument();
    
    // Type a message
    fireEvent.change(messageInput, { target: { value: 'رسالة جديدة' } });
    
    // Send button should appear
    const sendButton = document.querySelector('.bg-blue-500.rounded-full');
    expect(sendButton).toBeInTheDocument();
  });

  it('clears input when send button is clicked', () => {
    render(<ChatModule selectedChat={mockSelectedChat} />);
    
    const messageInput = screen.getByPlaceholderText('اكتب رسالتك هنا...');
    
    // Type a message
    fireEvent.change(messageInput, { target: { value: 'رسالة للإرسال' } });
    
    // Click send button
    const sendButton = document.querySelector('.bg-blue-500.rounded-full');
    fireEvent.click(sendButton);
    
    // Input should be cleared
    expect(messageInput.value).toBe('');
  });

  it('clears input when Enter key is pressed', () => {
    render(<ChatModule selectedChat={mockSelectedChat} />);
    
    const messageInput = screen.getByPlaceholderText('اكتب رسالتك هنا...');
    
    // Type a message
    fireEvent.change(messageInput, { target: { value: 'رسالة للإرسال' } });
    
    // Press Enter
    fireEvent.keyPress(messageInput, { key: 'Enter', code: 'Enter', charCode: 13 });
    
    // Input should be cleared
    expect(messageInput.value).toBe('');
  });

  it('displays action buttons in header', () => {
    render(<ChatModule selectedChat={mockSelectedChat} />);
    
    // Check for call and options buttons
    const actionButtons = screen.getAllByRole('button');
    expect(actionButtons.length).toBeGreaterThan(2); // At least call, options, and attachment buttons
  });

  it('shows attachment button', () => {
    render(<ChatModule selectedChat={mockSelectedChat} />);
    
    // Check for attachment button (paperclip icon)
    const attachmentButtons = document.querySelectorAll('svg');
    expect(attachmentButtons.length).toBeGreaterThan(0);
  });

  it('displays emoji button', () => {
    render(<ChatModule selectedChat={mockSelectedChat} />);
    
    // Check for emoji/plus button
    const emojiButton = document.querySelector('circle[cx="12"][cy="12"][r="10"]');
    expect(emojiButton).toBeInTheDocument();
  });

  it('shows helper text at bottom', () => {
    render(<ChatModule selectedChat={mockSelectedChat} />);
    
    expect(screen.getByText('اضغط Enter للإرسال')).toBeInTheDocument();
    expect(screen.getByText('مدعوم بالذكاء الاصطناعي')).toBeInTheDocument();
  });

  it('handles different chat statuses', () => {
    const awayChat = { ...mockSelectedChat, status: 'away' };
    render(<ChatModule selectedChat={awayChat} />);
    
    expect(screen.getByText('بعيد')).toBeInTheDocument();
  });

  it('handles offline status', () => {
    const offlineChat = { ...mockSelectedChat, status: 'offline' };
    render(<ChatModule selectedChat={offlineChat} />);
    
    expect(screen.getByText('غير متاح')).toBeInTheDocument();
  });

  it('renders with default values when no selectedChat provided', () => {
    render(<ChatModule />);
    
    expect(screen.getByText('شات مع سابر')).toBeInTheDocument();
    expect(screen.getByText('💬')).toBeInTheDocument();
  });

  it('displays messages with proper alignment', () => {
    render(<ChatModule selectedChat={mockSelectedChat} />);
    
    // Check for message alignment classes
    const messageContainers = document.querySelectorAll('.justify-end, .justify-start');
    expect(messageContainers.length).toBeGreaterThan(0);
  });

  it('shows message roles for team members', () => {
    render(<ChatModule selectedChat={mockSelectedChat} />);
    
    // Engineering role appears multiple times
    expect(screen.getAllByText('Engineering')).toHaveLength(4);
    // Product role appears multiple times
    expect(screen.getAllByText('Product')).toHaveLength(2);
  });

  it('handles long messages correctly', () => {
    render(<ChatModule selectedChat={mockSelectedChat} />);
    
    // Check for message that spans multiple lines
    expect(screen.getByText('That works- I was actually planning to get a smoothie anyways ✨')).toBeInTheDocument();
  });

  it('maintains message scroll area', () => {
    render(<ChatModule selectedChat={mockSelectedChat} />);
    
    // Check for scrollable message area
    const messageArea = document.querySelector('.overflow-y-auto');
    expect(messageArea).toBeInTheDocument();
  });

  it('preserves input focus during typing', () => {
    render(<ChatModule selectedChat={mockSelectedChat} />);
    
    const messageInput = screen.getByPlaceholderText('اكتب رسالتك هنا...');
    
    messageInput.focus();
    expect(document.activeElement).toBe(messageInput);
    
    fireEvent.change(messageInput, { target: { value: 'test' } });
    expect(document.activeElement).toBe(messageInput);
  });

  it('has proper accessibility attributes', () => {
    render(<ChatModule selectedChat={mockSelectedChat} />);
    
    const messageInput = screen.getByPlaceholderText('اكتب رسالتك هنا...');
    
    expect(messageInput).toHaveAttribute('type', 'text');
    expect(messageInput).toHaveClass('outline-none'); // Should have proper focus handling
  });
});
