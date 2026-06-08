import type { Card } from 'src/types';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CardItem } from 'components';

const mockCard: Card = {
  name: 'John Doe',
  age: 25,
  email: 'john.doe@example.com',
  password: 'qwQW11',
  gender: 'male',
  country: 'USA',
  picture: 'example.com',
};

describe('CardItem', () => {
  it('renders all card details correctly when picture is provided', () => {
    render(<CardItem card={mockCard} />);

    expect(
      screen.getByRole('heading', { level: 3, name: 'John Doe' }),
    ).toBeInTheDocument();
    expect(screen.getByText('25 years old')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();

    const img = screen.getByRole('img', { name: "John Doe's preview" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'example.com');
  });

  it('renders fallback initials when picture is not provided', () => {
    const cardWithoutPicture = { ...mockCard, picture: '' };
    render(<CardItem card={cardWithoutPicture} />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();

    expect(screen.getByText('Jo')).toBeInTheDocument();
  });

  it('handles plural/singular form for age correctly', () => {
    const babyCard = { ...mockCard, age: 1 };
    render(<CardItem card={babyCard} />);

    expect(screen.getByText('1 year old')).toBeInTheDocument();
  });
});
