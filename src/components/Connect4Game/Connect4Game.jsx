import React from 'react';
import PropTypes from 'prop-types';

import {
  CONNECT4_PLAYER_1,
  CONNECT4_PLAYER_2,
  CONNECT4_STATUS_DRAW,
  CONNECT4_STATUS_PLAYER1WIN,
  CONNECT4_STATUS_PLAYER2WIN,
  CONNECT4_STATUS_RUNNING
} from '../../settings/const';

import Connect4Board from '../Connect4Board/Connect4Board.jsx';
import './Connect4Game.css';

class Connect4Game extends React.PureComponent {
  handleColSelected = (col) => {
    this.setState((prevState, props) => {
      let status;

      const board = this.cloneBoard(prevState.board);
      const row = this.getTokenRow(board, col);
      const currentPlayer = prevState.currentPlayer === CONNECT4_PLAYER_1
        ? CONNECT4_PLAYER_2
        : CONNECT4_PLAYER_1;
      board[row][col] = prevState.currentPlayer;

      const win = this.checkWin(board, row, col, prevState.currentPlayer, props.length);
      if (win) {
        status = prevState.currentPlayer === CONNECT4_PLAYER_1
          ? CONNECT4_STATUS_PLAYER1WIN
          : CONNECT4_STATUS_PLAYER2WIN;
      } else {
        status = this.checkDraw(board, props.rows, props.cols);
      }

      return {board, currentPlayer, status};
    });
  };

  checkDraw(board, rows, cols) {
    return board.reduce((acc, row) =>
      acc + row.reduce((acc, cell) => acc + Boolean(cell), 0)
    , 0) === rows * cols
      ? CONNECT4_STATUS_DRAW
      : CONNECT4_STATUS_RUNNING;
  }

  checkWin(board, row, col, player, length) {
    let i;
    let win = 0;
    win += this.checkWinCol(board, row, col, player, length);
    for (i = col; i > col - length; i--) {
      win += this.checkWinRow(board, row, i, player, length);
    }
    for (i = col; i > col - length; i--) {
      win += this.checkWinDiagonal1(board, row + i - col, i, player, length);
    }
    for (i = col; i > col - length; i--) {
      win += this.checkWinDiagonal2(board, row - i + col, i, player, length);
    }
    return Boolean(win);
  }

  checkWinDiagonal1(board, row, col, player, length) {
    let suite = 0;
    for (let i = col; i < col + length; i++) {
      suite += board[row + i - col] && board[row + i - col][i] === player;
    }
    return suite === length;
  }

  checkWinDiagonal2(board, row, col, player, length) {
    let suite = 0;
    for (let i = col; i < col + length; i++) {
      suite += board[row - i + col] && board[row - i + col][i] === player;
    }
    return suite === length;
  }

  checkWinCol(board, row, col, player, length) {
    let suite = 0;
    for (let i = row; i < row + length; i++) {
      suite += board[i] && board[i][col] === player;
    }
    return suite === length;
  }

  checkWinRow(board, row, col, player, length) {
    let suite = 0;
    for (let i = col; i < col + length; i++) {
      suite += board[row] && board[row][i] === player;
    }
    return suite === length;
  }

  cloneBoard(board) {
    return board.map(row => [...row]);
  }

  componentWillMount() {
    const board = this.generateBoard(this.props.rows, this.props.cols);
    this.setState({
      board,
      currentPlayer: CONNECT4_PLAYER_1,
      status: CONNECT4_STATUS_RUNNING
    });
  }

  generateBoard(rows, cols) {
    const board = [];
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < cols; j++) {
        board[i][j] = null;
      }
    }
    return board;
  }

  getTokenRow(board, col) {
    let row = board.length - 1;
    while(board[row][col]) {
      row--;
    }
    return row;
  }

  render() {
    return (
      <div className="Connect4Game">
        <Connect4Board
          board={this.state.board}
          onColSelected={this.handleColSelected}
          status={this.state.status}
        />
        <div className="Connect4Game__message">
          {this.state.status === CONNECT4_STATUS_RUNNING && (
            <p>
              Current player :
              <span
                className="Connect4Game__token"
                style={{backgroundColor: this.state.currentPlayer}}
              ></span>
            </p>
          )}
          {this.state.status === CONNECT4_STATUS_PLAYER1WIN && (
            <p>Player 1 win</p>
          )}
          {this.state.status === CONNECT4_STATUS_PLAYER2WIN && (
            <p>Player 2 win</p>
          )}
          {this.state.status === CONNECT4_STATUS_DRAW && (
            <p>Draw</p>
          )}
        </div>
      </div>
    );
  }
}

Connect4Game.propTypes = {
  cols: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired
};

Connect4Game.defaultProps = {};

export default Connect4Game;
