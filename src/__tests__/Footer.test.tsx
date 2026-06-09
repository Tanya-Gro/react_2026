import { render, screen } from '@testing-library/react';
import { Footer } from 'layouts';

describe('Footer', () => {
  it('renders copyright text with current author and year', () => {
    render(<Footer />);

    expect(screen.getByText('© Tanya-Gro, 2026')).toBeInTheDocument();
  });

  it('renders Github link with correct href and attributes', () => {
    render(<Footer />);

    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/Tanya-Gro');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

    const githubImg = screen.getByAltText('GitHub');
    expect(githubImg).toBeInTheDocument();
    expect(githubImg).toHaveAttribute('src', '/github.svg');
  });

  it('renders RS School link with correct href and attributes', () => {
    render(<Footer />);

    const rssLink = screen.getByRole('link', { name: /rs school/i });
    expect(rssLink).toBeInTheDocument();
    expect(rssLink).toHaveAttribute('href', 'https://rs.school/react/');
    expect(rssLink).toHaveAttribute('target', '_blank');
    expect(rssLink).toHaveAttribute('rel', 'noopener noreferrer');

    const rssImg = screen.getByAltText('RS School');
    expect(rssImg).toBeInTheDocument();
    expect(rssImg).toHaveAttribute('src', '/RSS.svg');
  });
});
