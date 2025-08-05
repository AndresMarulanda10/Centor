import React from 'react';
import { render, screen } from '@testing-library/react-native';
import App from './App';

describe('App', () => {
  it('renders the main screen', () => {
    render(<App />);
    const mainText = screen.getByText(/Edit app\/index.tsx to edit this screen./i);
    expect(mainText).toBeTruthy();
  });
});
