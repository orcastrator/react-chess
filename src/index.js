import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ChessPiece, WhiteBishop, BlackBishop } from "./chess-pieces";

function Square(props) {
    if (props.color === "white") {
        return (
            <button className="square white" onClick={props.onClick}>
                {props.value}
            </button>
        );
    } else {
        return (
            <button className="square black" onClick={props.onClick}>
                {props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(8).fill(Array(8).fill(null)),
            whiteIsNext: true,
            selectedPiece: ChessPiece
        };
    }

    handleClick(i, j) {
        // slice performs a deep copy
        // all arrays in javascript are pointers, therefore const will not prevent you from changing its values
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i][j]) {
            return;
        }

        let { whiteIsNext } = this.state;

        // performs a deep copy
        const square_array = squares[i].slice();
        if (whiteIsNext) square_array[j] = WhiteBishop.state.icon;
        else square_array[j] = BlackBishop.state.icon;
        squares[i] = square_array;

        this.setState({
            squares: squares,
            whiteIsNext: !this.state.whiteIsNext
        });
    }

    renderSquare(i, j) {
        let color;
        if (i % 2 === 0) {
            if (j % 2 === 0) {
                color = "white";
            } else {
                color = "black";
            }
        } else {
            if (j % 2 === 0) {
                color = "black";
            } else {
                color = "white";
            }
        }

        return (
            <Square
                value={this.state.squares[i][j]}
                onClick={() => this.handleClick(i, j)}
                color={color}
            />
        );
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status =
                "Next player: " + (this.state.whiteIsNext ? "White" : "Black");
        }

        let board = [];
        for (let i = 0; i < 8; i++) {
            let boardRow = [];
            for (let j = 0; j < 8; j++) {
                boardRow.push(this.renderSquare(i, j));
            }
            board.push(<div className="board-row">{boardRow}</div>);
        }

        return (
            <div>
                <div className="status">{status}</div>
                {board}
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
