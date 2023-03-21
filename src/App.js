import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Li } from './components/Li/Li'
import { Switch } from './components/Switch/Switch'
import { Header } from './components/Header/Header'
import { Modal } from './components/Modal/Modal'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: 'light',
      modalValue: '',
      isModalOpen: false,
      list: [],
      listIndex: 0,
    }
    this.setColor = this.setColor.bind(this)
    this.setModalValue = this.setModalValue.bind(this)
    this.setIsModalOpen = this.setIsModalOpen.bind(this)
    this.addToList = this.addToList.bind(this)
    this.cancelAdd = this.cancelAdd.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.changeItem = this.changeItem.bind(this)
  }

  setColor() {
    this.setState((state) => ({
      color: state.color === 'light' ? 'dark' : 'light',
    }))
  }

  setIsModalOpen(value) {
    this.setState({
      isModalOpen: value,
    })
  }

  setModalValue(e) {
    this.setState({
      modalValue: e.target.value,
    })
  }

  addToList() {
    if (this.state.modalValue) {
      this.setState((state) => {
        const newList = [
          ...state.list,
          { value: state.modalValue, done: false, index: state.listIndex++ },
        ];
        return {
          isModalOpen: false,
          list: newList,
          modalValue: '',
        }
      })
    }
  }

  cancelAdd() {
    this.setState({
      isModalOpen: false,
      modalValue: '',
    })
  }

  deleteItem(index) {
    this.setState((state) => ({
      list: [...state.list.filter((item) => item.index !== index)],
    }))
  }

  changeItem(index) {
    this.setState((state) => ({
      list: [
        ...state.list.map((item) =>
          item.index === index ? { ...item, done: !item.done } : item,
        ),
      ],
    }))
  }

  render() {
    return (
      <div className={this.state.color === 'light' ? 'App-light' : 'App-dark'} data-testid="wrapper">
        <Switch setColor={this.setColor} />
        <Header setIsModalOpen={this.setIsModalOpen} />
        <div
          className={
            this.state.color === 'light' ? 'wrapper-light' : 'wrapper-dark'
          }
          data-testid="listWrapper"
        >
          {this.state.list.map(({ value, done, index }) => (
            <Li
              key={index}
              done={done}
              deleteItem={() => this.deleteItem(index)}
              changeItem={() => this.changeItem(index)}
            >
              {value}
            </Li>
          ))}
        </div>
        {this.state.isModalOpen && (
          <Modal
            modalValue={this.state.modalValue}
            setModalValue={this.setModalValue}
            cancelAdd={this.cancelAdd}
            addToList={this.addToList}
          />
        )}
      </div>
    )
  }
}

export default App
