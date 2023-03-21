import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Modal } from './Modal';

describe('<Modal />', () => {
    it('should render component correctly', () => {
        render(<Modal />);

        expect(screen.getByText('📝')).toBeInTheDocument();
        expect(screen.getByText('💨')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should fire addToList and cancelAdd when clicking appropriate buttons', () => {
        const mockAddToList = jest.fn();
        const mockCancelAdd = jest.fn();

        render(<Modal addToList={mockAddToList} cancelAdd={mockCancelAdd} />);

        const buttons = screen.getAllByRole('button');

        userEvent.click(buttons[0]);

        expect(mockAddToList).toHaveBeenCalled();

        userEvent.click(buttons[1]);

        expect(mockCancelAdd).toHaveBeenCalled();
    });

    it('should control input by modalValue value and setModalValue onChange handler', () => {
        const mockModalValue = 'mockModalValue';
        const mockSetModalValue = jest.fn();

        render(<Modal modalValue={mockModalValue} setModalValue={mockSetModalValue} />); 

        const input = screen.getByRole('textbox');

        expect(input.value).toBe(mockModalValue);

        fireEvent.change(input, { target: { value: 'value' } })

        expect(mockSetModalValue).toHaveBeenCalled();
    });
});