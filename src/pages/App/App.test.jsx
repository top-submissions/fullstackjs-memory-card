import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Helper to mock Pokemon API with test data
const mockPokemonAPI = (
  pokemon = [
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
  ],
) => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ results: pokemon }),
  });
};

describe('App', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders Scoreboard with initial scores', async () => {
    // Arrange: mock API
    mockPokemonAPI();

    // Act: render App
    render(<App />);

    // Assert: wait for loading to complete, then check scores
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    expect(screen.getByText(/^score$/i)).toBeInTheDocument();
    expect(screen.getByText(/^best score$/i)).toBeInTheDocument();
  });

  it('renders multiple cards from data array', async () => {
    // Arrange: mock API
    mockPokemonAPI();

    // Act: render App
    render(<App />);

    // Assert: verify cards appear after loading
    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
    expect(screen.getByText('charmander')).toBeInTheDocument();
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('manages score state', async () => {
    // Arrange: mock API
    mockPokemonAPI();

    // Act: render App
    render(<App />);

    // Assert: wait for load, then check score is 0
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('increments score when a card is clicked', async () => {
    // Arrange: mock API and setup user
    mockPokemonAPI();
    const user = userEvent.setup();

    // Act: render App, wait for load, click card
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
    await user.click(screen.getByText('pikachu'));

    // Assert: score incremented to 1
    expect(screen.getAllByText('1')[0]).toBeInTheDocument();
  });

  it('manages best score state', async () => {
    // Arrange: mock API
    mockPokemonAPI();

    // Act: render App
    render(<App />);

    // Assert: wait for load, check best score is 0
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    expect(screen.getAllByText('0').length).toBeGreaterThanOrEqual(2);
  });

  it('updates best score when current score exceeds it', async () => {
    // Arrange: mock API and setup user
    mockPokemonAPI();
    const user = userEvent.setup();

    // Act: render App, wait for load, click card
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
    await user.click(screen.getByText('pikachu'));

    // Assert: both scores show 1
    expect(screen.getAllByText('1').length).toBe(2);
  });

  it('resets score to 0 when clicking the same card twice', async () => {
    // Arrange: mock API and setup user
    mockPokemonAPI();
    const user = userEvent.setup();
    render(<App />);

    // Act: wait for load, click pikachu twice
    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
    await user.click(screen.getByText('pikachu'));
    await user.click(screen.getByText('pikachu'));

    // Assert: current score is 0, best score is 1
    const scores = screen.getAllByText(/^\d+$/);
    expect(scores[0]).toHaveTextContent('0'); // current score
    expect(scores[1]).toHaveTextContent('1'); // best score
  });

  it('preserves best score when score resets', async () => {
    // Arrange: mock API and setup user
    mockPokemonAPI();
    const user = userEvent.setup();
    render(<App />);

    // Act: wait for load, click pikachu twice
    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
    await user.click(screen.getByText('pikachu'));
    await user.click(screen.getByText('pikachu'));

    // Assert: score=0, best=1
    const scores = screen.getAllByText(/^\d+$/);
    expect(scores[0]).toHaveTextContent('0');
    expect(scores[1]).toHaveTextContent('1');
  });

  it('increases score continuously when clicking all unique cards', async () => {
    // Arrange: mock API and setup user
    mockPokemonAPI();
    const user = userEvent.setup();
    render(<App />);

    // Act: wait for load, click all three cards
    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
    await user.click(screen.getByText('pikachu'));
    await user.click(screen.getByText('charmander'));
    await user.click(screen.getByText('bulbasaur'));

    // Assert: both scores show 3
    expect(screen.getAllByText('3').length).toBe(2);
  });

  it('transitions from loading to showing cards', async () => {
    // Arrange: mock API
    mockPokemonAPI();

    // Act: render App
    render(<App />);

    // Assert: loading disappears and cards appear
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('fetches cards from Pokemon API on mount', async () => {
    // Arrange: mock Pokemon API response
    mockPokemonAPI([
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
    ]);

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
    mockPokemonAPI(mockPokemon);

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
    mockPokemonAPI([
      { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
    ]);
    const user = userEvent.setup();

    // Act: render, wait for cards to load, then click one
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
    await user.click(screen.getByText('pikachu'));

    // Assert: score incremented after clicking API-loaded card
    expect(screen.getAllByText('1')[0]).toBeInTheDocument();
  });
});
