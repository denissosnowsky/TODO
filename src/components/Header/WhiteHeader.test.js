import { shallow } from 'enzyme'

import { Header } from './Header'

describe('<Header />', () => {
  it('should render component correctly', () => {
      const wrapper = shallow(<Header />)
      
      expect(wrapper).toContainReact(<span className="logo">TODO LIST</span>);
      expect(wrapper.find('.plus').props().children).toBe('\u2795');
      // have empty state
      expect(wrapper.state()).toStrictEqual({});
  })

  it('should fire setIsModalOpen prop with true', () => {
    const mockSetIsModalOpen = jest.fn();

    const wrapper = shallow(<Header setIsModalOpen={mockSetIsModalOpen} />)

    const button = wrapper.find('.plus');

    button.props().onClick();

    expect(mockSetIsModalOpen).toHaveBeenCalledWith(true);
  });
})
