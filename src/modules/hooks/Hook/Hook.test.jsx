import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useHook from './Hook';

describe('useHook', () => {
  it('returns initial value and setValue function', () => {
    const { result } = renderHook(() => useHook());
    expect(result.current.value).toBe(0);
    expect(typeof result.current.setValue).toBe('function');
  });

  it('updates value when setValue is called', () => {
    const { result } = renderHook(() => useHook());
    act(() => {
      result.current.setValue(5);
    });
    expect(result.current.value).toBe(5);
  });
});
