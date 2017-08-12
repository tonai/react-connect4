import React from 'react';
import PropTypes from 'prop-types';

import './Connect4Cell.css';

function Connect4Cell({col, row}) {
  return (
    <div className="Connect4Cell" >
      <div className="Connect4Cell__mask"></div>
    </div>
  );
}

Connect4Cell.propTypes = {
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired
};

Connect4Cell.defaultProps = {};

export default Connect4Cell;
