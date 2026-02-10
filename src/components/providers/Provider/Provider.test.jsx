import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from './Provider';

describe('Provider', () => {
  it('renders children', () => {
    render(
      <Provider>
        <div>Test Child</div>
      </Provider>,
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
