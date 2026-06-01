import { render, screen } from '@testing-library/react';
import { DetailInfo } from 'components/DetailInfo';
import { detail } from 'mocks';

describe('DetailInfo', () => {
  it('renders fallback message when card is null', () => {
    render(<DetailInfo card={null} onClose={vi.fn()} />);

    expect(
      screen.getByText('Oops. Description not found...'),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /close details/i }),
    ).toBeInTheDocument();
  });

  it('renders fallback message when card is null', () => {
    render(<DetailInfo card={null} onClose={vi.fn()} />);

    expect(
      screen.getByText('Oops. Description not found...'),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /close details/i }),
    ).toBeInTheDocument();
  });

  it('renders card details', () => {
    render(<DetailInfo card={detail} onClose={vi.fn()} />);

    expect(
      screen.getByRole('heading', { name: 'Luke Skywalker' }),
    ).toBeInTheDocument();

    expect(screen.getByRole('img', { name: 'Luke Skywalker' })).toHaveAttribute(
      'src',
      detail.image,
    );

    expect(
      screen.getByRole('link', { name: /more on wookieepedia/i }),
    ).toHaveAttribute('href', detail.wiki);
  });
});
