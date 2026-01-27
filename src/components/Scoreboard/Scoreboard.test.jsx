import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Scoreboard from './Scoreboard';

describe('Scoreboard', () => {
  it('renders with initial score of 0', () => {
    // Arrange & Act: render Scoreboard
    render(<Scoreboard />);

    // Assert: verify current score displays as 0
    expect(screen.getByText(/^score: 0$/i)).toBeInTheDocument();
  });

  it('displays custom score when passed as prop', () => {
    // Arrange: prepare a score value to pass
    const customScore = 5;

    // Act: render with score prop
    render(<Scoreboard score={customScore} />);

    // Assert: verify custom score displays
    expect(screen.getByText(/^score: 5$/i)).toBeInTheDocument();
  });

  it('renders with initial best score of 0', () => {
    // Act: render Scoreboard
    render(<Scoreboard />);

    // Assert: verify current best score displays as 0
    expect(screen.getByText(/^best score: 0$/i)).toBeInTheDocument();
  });

  it('displays custom best score when passed as prop', () => {
    // Arrange: prepare a best score value to pass
    const customBestScore = 10;

    // Act: render with bestScore prop
    render(<Scoreboard bestScore={customBestScore} />);

    // Assert: verify custom best score displays
    expect(screen.getByText(/^best score: 10$/i)).toBeInTheDocument();
  });

  it('displays both custom score and bestScore simultaneously', () => {
    // Arrange: prepare both score values
    const currentScore = 7;
    const highScore = 12;

    // Act: render with both props
    render(<Scoreboard score={currentScore} bestScore={highScore} />);

    // Assert: both scores display independently
    expect(screen.getByText(/^score: 7$/i)).toBeInTheDocument();
    expect(screen.getByText(/^best score: 12$/i)).toBeInTheDocument();
  });
});
