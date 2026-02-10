import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LandingPage from './LandingPage';

describe('LandingPage', () => {
  it('renders landing page content', () => {
    render(<LandingPage />);
    expect(
      screen.getByText(/welcome to the memory card game/i),
    ).toBeInTheDocument();
  });
});
