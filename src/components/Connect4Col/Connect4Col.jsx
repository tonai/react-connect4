import React from 'react';
import PropTypes from 'prop-types';

import './Connect4Col.css';

function Connect4Col({col, display, onColSelected}) {
  if (display) {
    return (<button className="Connect4Col" onClick={handleClik} ></button>);
  } else {
    return (<div className="Connect4Col Connect4Col--placeholder" ></div>);
  }

  function handleClik() {
    onColSelected(col);
  }
}

Connect4Col.propTypes = {
  col: PropTypes.number.isRequired,
  onColSelected: PropTypes.func.isRequired
};

Connect4Col.defaultProps = {};

export default Connect4Col;
