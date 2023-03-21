import { render, screen } from '@testing-library/react'

import App from './App'

jest.mock('./components/Li/Li', () => ({ Li: () => <div>Li</div> }))
jest.mock('./components/Switch/Switch', () => ({
  Switch: () => <div>Switch</div>,
}))
jest.mock('./components/Header/Header', () => ({
  Header: () => <div>Header</div>,
}))
jest.mock('./components/Modal/Modal', () => ({ Modal: () => <div>Modal</div> }))

describe('<App />', () => {
  it('should render component correctly', () => {
    render(<App />)

    expect(screen.getByText('Switch')).toBeInTheDocument()
    expect(screen.getByText('Header')).toBeInTheDocument()
  })

  it('should render light theme by default', () => {
    render(<App />)

    const wrapper = screen.getByTestId('wrapper')
    const listWrapper = screen.getByTestId('listWrapper')

    expect(wrapper).toHaveClass('App-light');
    expect(listWrapper).toHaveClass('wrapper-light');
  })
})
