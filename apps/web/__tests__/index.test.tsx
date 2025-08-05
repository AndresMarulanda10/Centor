import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../app/page';
import { useCounter } from '@centor/logic/hooks/useCounter';
import { Button } from '@centor/design/components/Button';

jest.mock('@centor/logic/hooks/useCounter');
jest.mock('@centor/design/components/Button', () => ({
  Button: ({ onPress, title }: { onPress: () => void; title: string }) => (
    <button onClick={onPress}>{title}</button>
  ),
}));

describe('Home Page', () => {
  const mockIncrement = jest.fn();
  const mockDecrement = jest.fn();

  beforeEach(() => {
    (useCounter as jest.Mock).mockReturnValue({
      count: 5,
      increment: mockIncrement,
      decrement: mockDecrement,
    });
  });

  it('renders the counter and button', () => {
    render(<Home />);

    expect(screen.getByText('Web App')).toBeInTheDocument();
    expect(screen.getByText('Count: 5')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Increment/i })).toBeInTheDocument();
  });

  it('calls increment when the button is clicked', () => {
    render(<Home />);
    const incrementButton = screen.getByRole('button', { name: /Increment/i });
    fireEvent.click(incrementButton);
    expect(mockIncrement).toHaveBeenCalledTimes(1);
  });
});
