import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import LoginScreen from '../app/Screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ token: 'fake-token', user_id: 'fake-id' }),
  })
);

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

describe('LoginScreen', () => {
  const mockNavigation = { navigate: jest.fn() };

  beforeEach(() => {
    fetch.mockClear();
    AsyncStorage.setItem.mockClear();
  });

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={mockNavigation} />);
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
    expect(getByText('Go to Register')).toBeTruthy();
  });

  it('calls handleLogin and navigates on successful login', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={mockNavigation} />);
    
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
      });
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', 'fake-token');
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('user_id', 'fake-id');
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Main');
    });
  });

  it('navigates to Register screen when "Go to Register" is pressed', () => {
    const { getByText } = render(<LoginScreen navigation={mockNavigation} />);
    fireEvent.press(getByText('Go to Register'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Register');
  });
});
