import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ErrorPage from './ErrorPage';

describe('ErrorPage', () => {
  it('renders error message', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );
    expect(screen.getByText(/oh no/i)).toBeInTheDocument();
  });
});
