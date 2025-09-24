import { renderHook } from '@testing-library/react';
import UseSignalR from '../UseSignalR';

// Mock SignalR
const mockConnection = {
  start: jest.fn().mockResolvedValue(undefined),
  stop: jest.fn().mockResolvedValue(undefined),
  on: jest.fn(),
  off: jest.fn(),
  invoke: jest.fn().mockResolvedValue(undefined),
  state: 'Connected'
};

jest.mock('@microsoft/signalr', () => ({
  HubConnectionBuilder: jest.fn().mockImplementation(() => ({
    withUrl: jest.fn().mockReturnThis(),
    build: jest.fn().mockReturnValue(mockConnection)
  })),
  LogLevel: {
    Information: 'Information'
  }
}));

describe('UseSignalR Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes SignalR connection correctly', () => {
    const { result } = renderHook(() => UseSignalR());
    
    expect(result.current).toBeDefined();
    expect(typeof result.current.startConnection).toBe('function');
    expect(typeof result.current.stopConnection).toBe('function');
  });

  it('starts connection successfully', async () => {
    const { result } = renderHook(() => UseSignalR());
    
    await result.current.startConnection();
    
    expect(mockConnection.start).toHaveBeenCalled();
  });

  it('stops connection successfully', async () => {
    const { result } = renderHook(() => UseSignalR());
    
    await result.current.stopConnection();
    
    expect(mockConnection.stop).toHaveBeenCalled();
  });

  it('handles connection errors gracefully', async () => {
    mockConnection.start.mockRejectedValueOnce(new Error('Connection failed'));
    
    const { result } = renderHook(() => UseSignalR());
    
    // Should not throw error
    await expect(result.current.startConnection()).resolves.toBeUndefined();
  });

  it('registers event handlers correctly', () => {
    const { result } = renderHook(() => UseSignalR());
    
    const mockHandler = jest.fn();
    result.current.onReceiveMessage('TestEvent', mockHandler);
    
    expect(mockConnection.on).toHaveBeenCalledWith('TestEvent', mockHandler);
  });

  it('unregisters event handlers correctly', () => {
    const { result } = renderHook(() => UseSignalR());
    
    const mockHandler = jest.fn();
    result.current.offReceiveMessage('TestEvent', mockHandler);
    
    expect(mockConnection.off).toHaveBeenCalledWith('TestEvent', mockHandler);
  });

  it('sends messages correctly', async () => {
    const { result } = renderHook(() => UseSignalR());
    
    await result.current.sendMessage('TestMethod', 'test data');
    
    expect(mockConnection.invoke).toHaveBeenCalledWith('TestMethod', 'test data');
  });

  it('provides connection state', () => {
    const { result } = renderHook(() => UseSignalR());
    
    expect(result.current.connectionState).toBe('Connected');
  });

  it('handles multiple event registrations', () => {
    const { result } = renderHook(() => UseSignalR());
    
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    
    result.current.onReceiveMessage('Event1', handler1);
    result.current.onReceiveMessage('Event2', handler2);
    
    expect(mockConnection.on).toHaveBeenCalledWith('Event1', handler1);
    expect(mockConnection.on).toHaveBeenCalledWith('Event2', handler2);
  });

  it('cleans up connections on unmount', () => {
    const { unmount } = renderHook(() => UseSignalR());
    
    unmount();
    
    expect(mockConnection.stop).toHaveBeenCalled();
  });
});
