import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Switch } from './Switch';

describe('<Switch />', () => {
    it('should render component correctly', () => {
        render(<Switch />);

        expect(screen.getByText('🌞')).toBeInTheDocument();
    });

    it('should fire setColor when clicking on wrapper', () => {
        const mockSetColor = jest.fn();
    
        render(<Switch setColor={mockSetColor} />);

        const wrapper = screen.getByTestId('div');
        
        userEvent.click(wrapper);

        expect(mockSetColor).toHaveBeenCalled();
    });

    it('should toggle icons by clicking on wrapper', () => {
        const mockSetColor = jest.fn();

        render(<Switch setColor={mockSetColor} />);

        const wrapper = screen.getByTestId('div');

        expect(screen.getByText('🌞')).toBeInTheDocument();

        userEvent.click(wrapper);

        expect(screen.getByText('🌒')).toBeInTheDocument();

        userEvent.click(wrapper);

        expect(screen.getByText('🌞')).toBeInTheDocument();
    });
})