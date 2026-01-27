import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('renders with an image', () => {
    // Arrange: prepare image URL
    const testImageUrl = 'https://example.com/image.jpg';

    // Act: render Card with imageUrl prop
    render(<Card imageUrl={testImageUrl} />);

    // Assert: image element exists with correct src
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', testImageUrl);
  });
});
