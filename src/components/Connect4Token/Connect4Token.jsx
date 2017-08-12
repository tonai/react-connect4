import React from 'react';
import PropTypes from 'prop-types';

import './Connect4Token.css';

class Connect4Token extends React.PureComponent {
  componentDidMount() {
    setTimeout(() =>
      this.setState({top: `${(this.props.row + 1) * 40 + 1}px`})
    , 0);
  }

  constructor(props) {
    super(props);
    this.state = {top: '0px'};
  }

  render() {
    console.log(this.state.top);
    const styles = {
      backgroundColor: this.props.cell,
      left: `${this.props.col * 40 + 1}px`,
      top: this.state.top
    };
    return (
      <div className="Connect4Token" style={styles} ></div>
    );
  }
}

Connect4Token.propTypes = {
  cell: PropTypes.string.isRequired,
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired
};

Connect4Token.defaultProps = {};

export default Connect4Token;
