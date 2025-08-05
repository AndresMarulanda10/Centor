import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from '../useCounter';

describe('useCounter', () => {
  it('should increment and decrement the count', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(0);
  });
});
