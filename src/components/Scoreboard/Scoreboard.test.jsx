import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Scoreboard from './Scoreboard';

describe('Scoreboard', () => {
  it('renders with initial score of 0', () => {
    // Arrange & Act: render Scoreboard
    render(<Scoreboard />);

    // Assert: verify score displays as 0
    expect(screen.getByText(/score: 0/i)).toBeInTheDocument();
  });
});
