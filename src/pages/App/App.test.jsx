import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('renders multiple cards from data array', () => {
    // Act: render App
    render(<App />);

    // Assert: verify cards appear (checking for card titles proves they rendered)
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
  });

  it('manages score state', () => {
    // Act: render App
    render(<App />);

    // Assert: score starts at 0 (managed by App state, not Scoreboard default)
    expect(screen.getByText(/^score: 0$/i)).toBeInTheDocument();
  });

  it('increments score when a card is clicked', async () => {
    // Arrange: setup user interaction
    const user = userEvent.setup();

    // Act: render App and click first card
    render(<App />);
    await user.click(screen.getByText('Pikachu'));

    // Assert: score incremented from 0 to 1
    expect(screen.getByText(/^score: 1$/i)).toBeInTheDocument();
  });

  it('manages best score state', () => {
    // Act: render App
    render(<App />);

    // Assert: best score starts at 0 (managed by App state, not Scoreboard default)
    expect(screen.getByText(/^best score: 0$/i)).toBeInTheDocument();
  });
});
