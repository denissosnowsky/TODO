import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Header } from './Header';

describe('<Header />', () => {
  it('should render component correctly', () => {
    render(<Header setIsModalOpen={jest.fn} />);

    expect(screen.getByText('TODO LIST')).toBeInTheDocument();
    expect(screen.getByText('\u2795')).toBeInTheDocument();
  });

  it('should fire setIsModalOpen handler with true', () => {
    const mockSetIsModalOpen = jest.fn();

    render(<Header setIsModalOpen={mockSetIsModalOpen} />);

    const button = screen.getByText('\u2795');

    userEvent.click(button);

    expect(mockSetIsModalOpen).toHaveBeenCalledWith(true);
  });
});
