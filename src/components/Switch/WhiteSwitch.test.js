import { shallow } from 'enzyme'

import { Switch } from './Switch'

describe('<Switch />', () => {
    it('should render component correctly', () => {
        const wrapper = shallow(<Switch />)

        expect(wrapper.find('span').props().children).toBe('🌞');
    });

    it('should have default false isNight state', () => {
        const wrapper = shallow(<Switch />)

        expect(wrapper.instance().state.isNight).toBeFalsy();
    });

    it('should toggle isNight and fire setColor prop when toggle handler clicking', () => {
        const mockSetColor = jest.fn();

        const wrapper = shallow(<Switch setColor={mockSetColor}/>)

        expect(wrapper.instance().state.isNight).toBeFalsy();
        expect(wrapper.find('span').props().children).toBe('🌞');

        wrapper.instance().toggle();

        expect(wrapper.instance().state.isNight).toBeTruthy();
        expect(mockSetColor).toHaveBeenCalled();
        expect(wrapper.find('span').props().children).toBe('🌒');

        wrapper.instance().toggle();

        expect(wrapper.instance().state.isNight).toBeFalsy();
        expect(mockSetColor).toHaveBeenCalledTimes(2);
        expect(wrapper.find('span').props().children).toBe('🌞');
    });
})