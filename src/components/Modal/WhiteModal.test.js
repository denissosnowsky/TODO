import { shallow } from 'enzyme'

import { Modal } from './Modal'

describe('<Modal />', () => {
    it('should render component correctly', () => {
        const wrapper = shallow(<Modal />)

        expect(wrapper.find('.modalButtons').props().children[0].props.children).toBe('📝');
        expect(wrapper.find('.modalButtons').props().children[1].props.children).toBe('💨');
        expect(wrapper.find('input').props().type).toBe('text');
    });

    it('should fire addToList and cancelAdd when clicking appropriate buttons', () => {
        const mockAddToList = jest.fn();
        const mockCancelAdd = jest.fn();

        const wrapper = shallow(<Modal addToList={mockAddToList} cancelAdd={mockCancelAdd} />)

        const buttons = wrapper.find('.modalButtons').props().children;

        const buttonAdd = buttons[0];
        const buttonCancel = buttons[1];

        buttonAdd.props.onClick();
        buttonCancel.props.onClick();

        expect(mockAddToList).toHaveBeenCalled();
        expect(mockCancelAdd).toHaveBeenCalled();
    });

    it('should control input by modalValue value and setModalValue onChange handler', () => {
        const mockModalValue1 = 'mockModalValue1';
        const mockModalValue2 = 'mockModalValue2';
        const mockSetModalValue = jest.fn();

        const wrapper = shallow(<Modal modalValue={mockModalValue1} setModalValue={mockSetModalValue} />)

        expect(wrapper.find('input')).toHaveProp('value', mockModalValue1);
        wrapper.setProps({ modalValue: mockModalValue2 });
        expect(wrapper.find('input')).toHaveProp('value', mockModalValue2);

        wrapper.find('input').props().onChange('Hello World');

        expect(mockSetModalValue).toHaveBeenCalledWith('Hello World');
    })
});