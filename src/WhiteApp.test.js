import { shallow } from 'enzyme';

import App from './App';

jest.mock('./components/Li/Li', () => ({ Li: () => <div>Li</div> }));
jest.mock('./components/Switch/Switch', () => ({
  Switch: () => <div>Switch</div>
}));
jest.mock('./components/Header/Header', () => ({
  Header: () => <div>Header</div>
}));
jest.mock('./components/Modal/Modal', () => ({ Modal: () => <div>Modal</div> }));

describe('<App />', () => {
  const defaultState = {
    color: 'light',
    modalValue: '',
    isModalOpen: false,
    list: [],
    listIndex: 0
  };

  it('should render component correctly', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find('Switch')).toExist();
    expect(wrapper.find('Header')).toExist();
    expect(wrapper.find('Li')).not.toExist();
    expect(wrapper.find('Modal')).not.toExist();
  });

  it('should have default correct state', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.instance().state).toEqual(defaultState);
  });

  it('should change color state after setColor fire', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.instance().state.color).toBe('light');
    expect(wrapper.find('[data-testid="wrapper"]').props().className).toBe('App-light');
    expect(wrapper.find('[data-testid="listWrapper"]').props().className).toBe('wrapper-light');

    wrapper.instance().setColor();

    expect(wrapper.instance().state.color).toBe('dark');
    expect(wrapper.find('[data-testid="wrapper"]').props().className).toBe('App-dark');
    expect(wrapper.find('[data-testid="listWrapper"]').props().className).toBe('wrapper-dark');

    wrapper.instance().setColor();

    expect(wrapper.instance().state.color).toBe('light');
    expect(wrapper.find('[data-testid="wrapper"]').props().className).toBe('App-light');
    expect(wrapper.find('[data-testid="listWrapper"]').props().className).toBe('wrapper-light');
  });

  it('should change modalOpen state after setIsModalOpen fire', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.instance().state.isModalOpen).toBeFalsy();
    expect(wrapper.find('Modal')).not.toExist();

    wrapper.instance().setIsModalOpen(true);

    expect(wrapper.instance().state.isModalOpen).toBeTruthy();
    expect(wrapper.find('Modal')).toExist();

    wrapper.instance().setIsModalOpen(false);

    expect(wrapper.instance().state.isModalOpen).toBeFalsy();
    expect(wrapper.find('Modal')).not.toExist();
  });

  it('should change modalValue when setModalValue fire', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.instance().state.modalValue).toBe('');

    wrapper.instance().setModalValue({ target: { value: 'Hello World!' } });

    expect(wrapper.instance().state.modalValue).toBe('Hello World!');
  });

  it('should change modal state and add item to list state when addToList fire', () => {
    const wrapper = shallow(<App />);

    wrapper.setState({ ...defaultState, isModalOpen: true });

    expect(wrapper.instance().state.modalValue).toBe('');
    expect(wrapper.instance().state.isModalOpen).toBeTruthy();
    expect(wrapper.instance().state.list).toEqual([]);
    expect(wrapper.instance().state.listIndex).toBe(0);

    // do not change state cause modalValue is empty
    wrapper.instance().addToList();

    expect(wrapper.instance().state.modalValue).toBe('');
    expect(wrapper.instance().state.isModalOpen).toBeTruthy();
    expect(wrapper.instance().state.list).toEqual([]);
    expect(wrapper.instance().state.listIndex).toBe(0);

    wrapper.setState({
      ...defaultState,
      isModalOpen: true,
      modalValue: 'modalValue'
    });

    expect(wrapper.instance().state.modalValue).toBe('modalValue');

    wrapper.instance().addToList();

    expect(wrapper.instance().state.modalValue).toBe('');
    expect(wrapper.instance().state.isModalOpen).toBeFalsy();
    expect(wrapper.instance().state.list).toEqual([{ value: 'modalValue', done: false, index: 0 }]);
    expect(wrapper.instance().state.listIndex).toBe(1);
  });

  it('should clean modalOpen and modalValue when cancelAdd fire', () => {
    const wrapper = shallow(<App />);

    wrapper.setState({
      ...defaultState,
      isModalOpen: true,
      modalValue: 'modalValue'
    });

    expect(wrapper.instance().state.modalValue).toBe('modalValue');
    expect(wrapper.instance().state.isModalOpen).toBeTruthy();

    wrapper.instance().cancelAdd();

    expect(wrapper.instance().state.modalValue).toBe('');
    expect(wrapper.instance().state.isModalOpen).toBeFalsy();
  });

  it('should delete item from list state after deleteItem fire', () => {
    const wrapper = shallow(<App />);

    wrapper.setState({
      ...defaultState,
      list: [{ value: 'modalValue', done: false, index: 0 }]
    });

    expect(wrapper.instance().state.list).toEqual([{ value: 'modalValue', done: false, index: 0 }]);

    wrapper.instance().deleteItem(0);

    expect(wrapper.instance().state.list).toEqual([]);
  });

  it('should change done field in list item when changeItem fire', () => {
    const wrapper = shallow(<App />);

    wrapper.setState({
      ...defaultState,
      list: [{ value: 'modalValue', done: false, index: 0 }]
    });

    expect(wrapper.instance().state.list).toEqual([{ value: 'modalValue', done: false, index: 0 }]);

    wrapper.instance().changeItem(0);

    expect(wrapper.instance().state.list).toEqual([{ value: 'modalValue', done: true, index: 0 }]);

    wrapper.instance().changeItem(0);

    expect(wrapper.instance().state.list).toEqual([{ value: 'modalValue', done: false, index: 0 }]);
  });

  it('should render Li elements for every list item', () => {
    const wrapper = shallow(<App />);

    wrapper.setState({
      ...defaultState,
      list: [
        { value: 'modalValue1', done: false, index: 0 },
        { value: 'modalValue2', done: false, index: 1 }
      ]
    });

    expect(wrapper.instance().state.list).toEqual([
      { value: 'modalValue1', done: false, index: 0 },
      { value: 'modalValue2', done: false, index: 1 }
    ]);

    expect(wrapper.find('Li').length).toBe(2);
  });
});
