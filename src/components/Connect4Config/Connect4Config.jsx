import React from 'react';
import PropTypes from 'prop-types';

import './Connect4Config.css';

function Connect4Config({config, onConfigUpdated, onGameStart}) {
  return (
    <div className="Connect4Config">
      <div className="Connect4Config__table">
        <div className="Connect4Config__row">
          <label className="Connect4Config__label">Cols :</label>
          <input
            className="Connect4Config__input"
            name="cols"
            onBlur={handleBlur}
            onChange={handleChange}
            type="number"
            value={config.cols}
          />
        </div>
        <div className="Connect4Config__row">
          <label className="Connect4Config__label">Rows :</label>
          <input
            className="Connect4Config__input"
            name="rows"
            onBlur={handleBlur}
            onChange={handleChange}
            type="number"
            value={config.rows}
          />
        </div>
        <div className="Connect4Config__row">
          <label className="Connect4Config__label">Length :</label>
          <input
            className="Connect4Config__input"
            name="length"
            onBlur={handleBlur}
            onChange={handleChange}
            type="number"
            value={config.length}
          />
        </div>
      </div>
      <div className="Connect4Config__buttons">
        <button onClick={handleClick} type="button">Play</button>
      </div>
    </div>
  );

  function format(value) {
    if (value < 3) {
      return 3;
    } else if (value > 20) {
      return 20;
    }
    return Number(value);
  }

  function formatValues(values) {
    for (let i in values) {
      if (values.hasOwnProperty(i)) {
        values[i] = format(values[i]);
      }
    }
    return values;
  }

  function handleBlur() {
    const values = formatValues({...config});
    onConfigUpdated(values);
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    onConfigUpdated({
      ...config,
      [name]: Number(value)
    });
  }

  function handleClick(event) {
    event.preventDefault();
    onGameStart();
  }
}

Connect4Config.propTypes = {
  config: PropTypes.shape({
    cols: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired
  }).isRequired,
  onConfigUpdated: PropTypes.func.isRequired,
  onGameStart: PropTypes.func.isRequired
};

Connect4Config.defaultProps = {};

export default Connect4Config;
