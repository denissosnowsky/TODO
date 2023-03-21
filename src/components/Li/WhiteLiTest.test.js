import { shallow } from 'enzyme'

import { Li } from './Li'

describe('<Li />', () => {
    it('should render component correctly', () => {
        const wrapper = shallow(<Li children={'CHILDREN'} done />)
          
        expect(wrapper.find('.note-done').props().children).toBe('CHILDREN');
        expect(wrapper.find('.delete').props().children).toBe('\u274C');

        wrapper.setProps({ children: 'NEW_CHILDREN' });

        expect(wrapper.find('.note-done').props().children).toBe('NEW_CHILDREN');
    })

    it('should render crossed text for done items and not crossed for undone items', () => {
        const wrapper = shallow(<Li done />)

        expect(wrapper.instance().props.done).toBeTruthy();

        wrapper.setProps({ done: false });

        expect(wrapper.instance().props.done).toBeFalsy();
    });

    it('should fire changeItem when clicking on checkbox', () => {
        const mockChangeItem = jest.fn();

        const wrapper = shallow(<Li done changeItem={mockChangeItem}/>)

        const checkbox = wrapper.find('.checkbox');

        checkbox.props().onClick();

        expect(mockChangeItem).toHaveBeenCalled();
    });

    it('should fire deleteItem when clicking on delete icon', () => {
        const mockDeleteItem = jest.fn();

        const wrapper = shallow(<Li done deleteItem={mockDeleteItem}/>)

        const deleteIcon = wrapper.find('.delete');

        deleteIcon.props().onClick();

        expect(mockDeleteItem).toHaveBeenCalled();
    });
})