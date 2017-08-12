import React from 'react';
import PropTypes from 'prop-types';

import { CONNECT4_STATUS_RUNNING } from '../../settings/const';

import Connect4Cell from '../Connect4Cell/Connect4Cell.jsx';
import Connect4Col from '../Connect4Col/Connect4Col.jsx';
import Connect4Token from '../Connect4Token/Connect4Token.jsx';
import './Connect4Board.css';

function Connect4Board({board, onColSelected, status}) {
  return (
    <div className="Connect4Board" >
      <div className="Connect4Board__container" >
        {board.map((row, rowIndex) => row.map((cell, colIndex) => cell && (
          <Connect4Token
            cell={cell}
            col={colIndex}
            key={`${rowIndex}-${colIndex}`}
            row={rowIndex}
          />
        )))}
        <div className="Connect4Board__table" >
          <div className="Connect4Board__head" >
            <div className="Connect4Board__row" >
              {board[0].map((col, colIndex) => (
                <div className="Connect4Board__cell" key={colIndex} >
                  <Connect4Col
                    col={colIndex}
                    display={!col && status === CONNECT4_STATUS_RUNNING}
                    onColSelected={onColSelected}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="Connect4Board__body" >
            {board.map((row, rowIndex) => (
              <div className="Connect4Board__row" key={rowIndex} >
                {row.map((cell, colIndex) => (
                  <div className="Connect4Board__cell" key={colIndex} id={`${rowIndex}-${colIndex}`} >
                    <Connect4Cell col={colIndex} row={rowIndex} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Connect4Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.array),
  onColSelected: PropTypes.func.isRequired,
  status: PropTypes.string
};

Connect4Board.defaultProps = {};

export default Connect4Board;
