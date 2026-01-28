import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('renders image with alt text', () => {
    // Arrange: prepare image URL and alt text
    const testImageUrl = 'https://example.com/pikachu.jpg';
    const testAltText = 'Pikachu pokemon';

    // Act: render Card with imageUrl and alt props
    render(<Card imageUrl={testImageUrl} alt={testAltText} />);

    // Assert: image has alt attribute for accessibility
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', testAltText);
  });

  it('renders with a title', () => {
    // Arrange: prepare card data
    const testImageUrl = 'https://example.com/pikachu.jpg';
    const testTitle = 'Pikachu';

    // Act: render Card with title prop
    render(<Card imageUrl={testImageUrl} alt="Pikachu" title={testTitle} />);

    // Assert: title text is visible
    expect(screen.getByText(testTitle)).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    // Arrange: prepare mock function and user interaction
    const user = userEvent.setup();
    const mockOnClick = vi.fn();

    // Act: render Card and click it
    render(
      <Card
        imageUrl="https://example.com/test.jpg"
        alt="Test card"
        title="Test"
        onClick={mockOnClick}
      />,
    );
    await user.click(screen.getByRole('img'));

    // Assert: onClick was invoked once
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
