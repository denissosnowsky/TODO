import React from 'react';

export class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNight: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState((state) => ({
      isNight: !state.isNight
    }));
    this.props.setColor();
  }

  render() {
    return (
      <div className="switch" onClick={this.toggle} data-testid="div">
        {this.state.isNight ? <span>&#127762;</span> : <span>&#127774;</span>}
      </div>
    );
  }
}
