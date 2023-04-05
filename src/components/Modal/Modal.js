import React from 'react';

export class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="modalWrapper">
        <div className="modalWindow">
          <input type="text" value={this.props.modalValue} onChange={this.props.setModalValue} />
          <div className="modalButtons">
            <button onClick={this.props.addToList}>&#128221;</button>
            <button onClick={this.props.cancelAdd}>&#128168;</button>
          </div>
        </div>
      </div>
    );
  }
}
