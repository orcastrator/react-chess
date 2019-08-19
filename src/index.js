import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
    WhiteBishop,
    BlackBishop,
    WhiteKing,
    BlackKing,
    WhiteKnight,
    BlackKnight,
    WhitePawn,
    BlackPawn,
    WhiteQueen,
    BlackQueen,
    WhiteRook,
    BlackRook
} from "./chess-pieces";

function Square(props) {
    if (props.color === "white") {
        return (
            <button className="square white" onClick={props.onClick}>
                {props.value}
            </button>
        );
    } else if (props.color === "black") {
        return (
            <button className="square black" onClick={props.onClick}>
                {props.value}
            </button>
        );
    } else if (props.color === "selected") {
        return (
            <button className="square selected" onClick={props.onClick}>
                {props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.isKingInCheck = this.isKingInCheck.bind(this);
        this.isValidMove = this.isValidMove.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.renderSquare = this.renderSquare.bind(this);

        this.state = {
            squares: [
                [
                    new BlackRook(),
                    new BlackKnight(),
                    new BlackBishop(),
                    new BlackQueen(),
                    new BlackKing(),
                    new BlackBishop(),
                    new BlackKnight(),
                    new BlackRook()
                ],
                Array(8).fill(new BlackPawn()),
                Array(8).fill(null),
                Array(8).fill(null),
                Array(8).fill(null),
                Array(8).fill(null),
                Array(8).fill(new WhitePawn()),
                [
                    new WhiteRook(),
                    new WhiteKnight(),
                    new WhiteBishop(),
                    new WhiteQueen(),
                    new WhiteKing(),
                    new WhiteBishop(),
                    new WhiteKnight(),
                    new WhiteRook()
                ]
            ],
            whiteIsNext: true,
            selectedPiece: null,
            selectedI: null,
            selectedJ: null
        };
    }

    isKingInCheck(i, j) {
        let { squares } = this.state;

        for (var k = 0; k < squares.length; k++) {
            for (var l = 0; l < squares[k].length; l++) {
                if (squares[i][j]) {
                    if (squares[i][j].state.name === "white_king") {
                        let whiteKingI = k;
                        let whiteKingJ = l;
                        console.log(whiteKingI, whiteKingJ);
                    }
                    if (squares[i][j].state.name === "black_king") {
                        let blackKingI = k;
                        let blackKingJ = l;
                        console.log(blackKingI, blackKingJ);
                    }
                }
            }
        }
        for (k = 0; k < squares.length; k++) {
            for (l = 0; l < squares[k].length; l++) {
                if (squares[k][l] && squares[k][l].state.color === "black") {
                }
            }
        }
    }

    isValidMove(i, j) {
        let { squares, selectedPiece, selectedI, selectedJ } = this.state;

        let { name, color, type } = selectedPiece.state;
        if (squares[i][j] && squares[i][j].state.color === color) {
            return false;
        }

        let validMoves = [];
        if (name === "white_pawn") {
            if (squares[i][j]) validMoves.push([-1, -1], [-1, 1]);
            else {
                if (selectedI === 6) validMoves.push([-2, 0]);
                validMoves.push([-1, 0]);
            }
        } else if (name === "black_pawn") {
            if (squares[i][j]) validMoves.push([1, -1], [1, 1]);
            else {
                if (selectedI === 1) validMoves.push([2, 0]);
                validMoves.push([1, 0]);
            }
        } else if (type === "king") {
            for (var k = -1; k < 2; k++) {
                for (var l = -1; l < 2; l++) {
                    if (k !== 0 || l !== 0) validMoves.push([k, l]);
                }
            }
        } else if (type === "knight") {
            validMoves.push(
                [1, 2],
                [-1, 2],
                [1, -2],
                [-1, -2],
                [2, 1],
                [-2, 1],
                [2, -1],
                [-2, -1]
            );
        } else if (type === "bishop") {
            selectedPiece.getColor();
            for (k = 1; k <= 8; k++) {
                validMoves.push([k, k]);
                validMoves.push([k, -k]);
                validMoves.push([-k, k]);
                validMoves.push([-k, -k]);
            }
        } else if (type === "rook") {
            for (k = 1; k <= 8; k++) {
                validMoves.push([k, 0]);
                validMoves.push([-k, 0]);
                validMoves.push([0, k]);
                validMoves.push([0, -k]);
            }
        } else if (type === "queen") {
            for (k = 1; k <= 8; k++) {
                validMoves.push([k, 0]);
                validMoves.push([-k, 0]);
                validMoves.push([0, k]);
                validMoves.push([0, -k]);
                validMoves.push([k, k]);
                validMoves.push([k, -k]);
                validMoves.push([-k, k]);
                validMoves.push([-k, -k]);
            }
        }

        // check all valid moves
        for (k = 0; k < validMoves.length; k++) {
            if (
                i === selectedI + validMoves[k][0] &&
                j === selectedJ + validMoves[k][1]
            )
                return true;
        }
        return false;
    }

    handleClick(i, j) {
        // slice() performs a deep copy
        // all arrays in javascript are pointers, therefore const will not prevent you from changing its values
        const squares = this.state.squares.slice();
        let { whiteIsNext, selectedPiece, selectedI, selectedJ } = this.state;

        if (
            calculateWinner(squares) || // calculate winner is not done yet
            (!selectedPiece && !squares[i][j])
        ) {
            // if nothing was selected and the selected square is empty, do nothing
            return;
        }

        if (selectedPiece && !this.isValidMove(i, j)) {
            // if the selected square is invalid for the piece type, deselect that square
            this.setState({
                selectedI: null,
                selectedJ: null,
                selectedPiece: null
            });
            return;
        }

        // TODO limit movement of pieces
        if (!selectedPiece && squares[i][j]) {
            if (
                (whiteIsNext && squares[i][j].state.color === "white") ||
                (!whiteIsNext && squares[i][j].state.color === "black")
            ) {
                // if nothing was selected and the selected square is valid, save the selection
                this.setState({
                    selectedI: i,
                    selectedJ: j,
                    selectedPiece: squares[i][j]
                });
            }
            return;
        } else if (selectedPiece && selectedI === i && selectedJ === j) {
            // if something is selected and the selected square is the same, deselect that square
            this.setState({
                selectedI: null,
                selectedJ: null,
                selectedPiece: null
            });
            return;
        }

        squares[i][j] = selectedPiece;
        squares[selectedI][selectedJ] = null;

        squares[i][j].setState({
            moved: true
        });

        this.setState({
            squares: squares,
            whiteIsNext: !this.state.whiteIsNext,
            selectedPiece: null,
            selectedI: null,
            selectedJ: null
        });
        this.render();
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

        const { squares, selectedI, selectedJ } = this.state;

        if (i === selectedI && j === selectedJ) {
            color = "selected";
        }

        var square = squares[i][j] ? squares[i][j].render() : squares[i][j];
        return (
            <Square
                value={square}
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
