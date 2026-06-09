import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from 'layouts';

describe('Header', () => {
  it('renders both buttons correctly', () => {
    const mockOnButtonClick = vi.fn();
    render(<Header onButtonClick={mockOnButtonClick} />);

    expect(screen.getByText('Controlled Form')).toBeInTheDocument();
    expect(screen.getByText('Uncontrolled Form')).toBeInTheDocument();
  });

  it('calls onButtonClick with "controlled" when Controlled Form button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnButtonClick = vi.fn();
    render(<Header onButtonClick={mockOnButtonClick} />);

    const controlledBtn = screen.getByText('Controlled Form');
    await user.click(controlledBtn);

    expect(mockOnButtonClick).toHaveBeenCalledTimes(1);
    expect(mockOnButtonClick).toHaveBeenCalledWith('controlled');
  });

  it('calls onButtonClick with "uncontrolled" when Uncontrolled Form button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnButtonClick = vi.fn();
    render(<Header onButtonClick={mockOnButtonClick} />);

    const uncontrolledBtn = screen.getByText('Uncontrolled Form');
    await user.click(uncontrolledBtn);

    expect(mockOnButtonClick).toHaveBeenCalledTimes(1);
    expect(mockOnButtonClick).toHaveBeenCalledWith('uncontrolled');
  });
});
