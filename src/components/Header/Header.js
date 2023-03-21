import React from 'react'

export class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  render() {
    return (
      <div className="header">
        <span className="logo">TODO LIST</span>
        <span className="plus" onClick={() => this.props.setIsModalOpen(true)}>&#10133;</span>
      </div>
    )
  }
}
