import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    // Mock fetch for API tests
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

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

  it('updates best score when current score exceeds it', async () => {
    // Arrange: setup user interaction
    const user = userEvent.setup();

    // Act: render App and click card to increment score to 1
    render(<App />);
    await user.click(screen.getByText('Pikachu'));

    // Assert: best score updated to match new high score
    expect(screen.getByText(/^best score: 1$/i)).toBeInTheDocument();
  });

  // it('shuffles cards after being clicked', async () => {
  //   // Arrange: setup user and capture initial order
  //   const user = userEvent.setup();
  //   render(<App />);
  //   const initialFirstCard = screen.getAllByRole('img')[0].alt;

  //   // Act: click a card to trigger shuffle
  //   await user.click(screen.getByText('Pikachu'));

  //   // Assert: card order changed (first card is different)
  //   const newFirstCard = screen.getAllByRole('img')[0].alt;
  //   expect(newFirstCard).not.toBe(initialFirstCard);
  // });

  it('resets score to 0 when clicking the same card twice', async () => {
    // Arrange: setup user interaction
    const user = userEvent.setup();
    render(<App />);

    // Act: click Pikachu once (score becomes 1), then click Pikachu again
    await user.click(screen.getByText('Pikachu'));
    await user.click(screen.getByText('Pikachu'));

    // Assert: score reset to 0 after duplicate click
    expect(screen.getByText(/^score: 0$/i)).toBeInTheDocument();
  });

  it('preserves best score when score resets', async () => {
    // Arrange: setup user interaction
    const user = userEvent.setup();
    render(<App />);

    // Act: click Pikachu (score=1, best=1), then click duplicate to reset
    await user.click(screen.getByText('Pikachu'));
    await user.click(screen.getByText('Pikachu'));

    // Assert: score reset to 0 but best score still 1
    expect(screen.getByText(/^score: 0$/i)).toBeInTheDocument();
    expect(screen.getByText(/^best score: 1$/i)).toBeInTheDocument();
  });

  it('increases score continuously when clicking all unique cards', async () => {
    // Arrange: setup user interaction
    const user = userEvent.setup();
    render(<App />);

    // Act: click all three unique cards in sequence
    await user.click(screen.getByText('Pikachu'));
    await user.click(screen.getByText('Charmander'));
    await user.click(screen.getByText('Bulbasaur'));

    // Assert: score reached maximum (all cards clicked once)
    expect(screen.getByText(/^score: 3$/i)).toBeInTheDocument();
    expect(screen.getByText(/^best score: 3$/i)).toBeInTheDocument();
  });

  // it('displays loading state initially', () => {
  //   // Act: render App
  //   render(<App />);

  //   // Assert: loading text appears before cards are ready
  //   expect(screen.getByText(/loading/i)).toBeInTheDocument();
  // });

  it('transitions from loading to showing cards', async () => {
    // Act: render App
    render(<App />);

    // Assert: loading disappears and cards appear
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  it('fetches cards from Pokemon API on mount', async () => {
    // Arrange: mock Pokemon API response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
          { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
        ],
      }),
    });

    // Act: render App (triggers fetch in useEffect)
    render(<App />);

    // Assert: cards from API appear after loading
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
    expect(screen.getByText('venusaur')).toBeInTheDocument();
  });

  it('displays error message when API fetch fails', async () => {
    // Arrange: mock fetch to reject
    global.fetch.mockRejectedValueOnce(new Error('API Error'));

    // Act: render App (triggers failed fetch)
    render(<App />);

    // Assert: error message appears instead of crash
    await waitFor(() => {
      expect(screen.getByText(/error loading cards/i)).toBeInTheDocument();
    });
  });

  it('displays exactly 12 cards from Pokemon API', async () => {
    // Arrange: mock API response with 12 Pokemon
    const mockPokemon = Array.from({ length: 12 }, (_, i) => ({
      name: `pokemon${i + 1}`,
      url: `https://pokeapi.co/api/v2/pokemon/${i + 1}/`,
    }));

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockPokemon }),
    });

    // Act: render App and wait for cards to load
    render(<App />);
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    // Assert: exactly 12 cards rendered
    const cards = screen.getAllByRole('img');
    expect(cards).toHaveLength(12);
  });

  it('increments score when clicking API-loaded card', async () => {
    // Arrange: mock API and setup user
    const user = userEvent.setup();
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
          { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
        ],
      }),
    });

    // Act: render, wait for cards to load, then click one
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
    await user.click(screen.getByText('pikachu'));

    // Assert: score incremented after clicking API-loaded card
    expect(screen.getByText(/^score: 1$/i)).toBeInTheDocument();
  });
});
