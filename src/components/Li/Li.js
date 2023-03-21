import React from 'react'

export class Li extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="list">
        <input type="checkbox" className="checkbox" onClick={this.props.changeItem} />
        <span className={this.props.done ? 'note-done' : 'note-not-done'}>{this.props.children}</span>
        <span className='delete' onClick={this.props.deleteItem}>&#10060;</span>
      </div>
    )
  }
}
