import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Li } from './Li';

describe('<Li />', () => {
  it('should render component correctly', () => {
    render(<Li children={'CHILDREN'} />);

    expect(screen.getByText('CHILDREN')).toBeInTheDocument();
    expect(screen.getByText('\u274C')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should render crossed text for done items and not crossed for undone items', () => {
    const { rerender } = render(<Li children={'CHILDREN'} done />);

    expect(screen.getByText('CHILDREN')).toHaveClass('note-done');

    rerender(<Li children={'CHILDREN'} done={false} />);

    expect(screen.getByText('CHILDREN')).toHaveClass('note-not-done');
  });

  it('should fire changeItem when clicking on checkbox', () => {
    const mockChangeItem = jest.fn();

    render(<Li changeItem={mockChangeItem} />);

    const checkbox = screen.getByRole('checkbox');

    userEvent.click(checkbox);

    expect(mockChangeItem).toHaveBeenCalled();
  });

  it('should fire deleteItem when clicking on delete icon', () => {
    const mockDeleteItem = jest.fn();

    render(<Li deleteItem={mockDeleteItem} />);

    const deleteIcon = screen.getByText('\u274C');

    userEvent.click(deleteIcon);

    expect(mockDeleteItem).toHaveBeenCalled();
  });
});
