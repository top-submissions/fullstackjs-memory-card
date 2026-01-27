import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  // it('renders without crashing', () => {
  //   // Arrange: render puts App in test DOM
  //   render(<App />);

  //   // Act: query for any element that proves App rendered
  //   const heading = screen.getByText(/vite \+ react/i);

  //   // Assert: verify the heading exists in the document
  //   expect(heading).toBeInTheDocument();
  // });

  it('renders Scoreboard with initial scores', () => {
    // Act: render App
    render(<App />);

    // Assert: Scoreboard displays in App (checking for score text proves it rendered)
    expect(screen.getByText(/^score: 0$/i)).toBeInTheDocument();
    expect(screen.getByText(/^best score: 0$/i)).toBeInTheDocument();
  });
});
