import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=5, ncols=5, chanceLightStartsOn=0.40 }) {
  const [board, setBoard] = useState(createBoard());

  /** 
   * createBoard:
   * creates a board (i.e., nested array) nrows high/ncols wide, each cell randomly lit or unlit 
  */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    // iterate to create each row (using nrows)
    for (let y = 0; y < nrows; y++) {
      let row = [];
      // for each row, iterate to create each cell within the row(using ncols)
      for (let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      console.log("ROW: ", row);
      // push the row array onto initialBoard
      initialBoard.push(row);
    }
    console.log("INITIAL BOARD: ", initialBoard);
    // after completing the nested looping, return initialBoard
    return initialBoard;
  }

  /**
   * hasWon:
   * returns true if player has won; false if not
   */
  function hasWon() {
    const hasWon = (board.every(row => row.every(c => c === false)));
    return hasWon;
  }

  /**
   * flipCellsAround:
   * takes one argument - coord
   * changes the state of cells from lit to unlit
   */
  function flipCellsAround(coord) {
    // set state for the board
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      // flipCell: if these coordinates are actually on board, flip the cell
      const flipCell = (y, x, boardCopy) => {
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

      // TODO: return the copy
      console.log(boardCopy);
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return (
      <div>Congratulations! You won the game!</div>
    )
  }

  // TODO

  // make table board
  const tblBoard = [];
  for (let y = 0; y < nrows; y++) {
    const row = [];
    for (let x = 0; x < ncols; x++) {
      const coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coord)} 
        />
      );
    }
    tblBoard.push(<tr key={y}>{row}</tr>);
  }

  // TODO
  return (
    <table className="Board">
      <tbody>{tblBoard}</tbody>
    </table>
  )
}

export default Board;
