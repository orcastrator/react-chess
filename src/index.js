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

        this.handleClick = this.handleClick.bind(this);
        this.renderSquare = this.renderSquare.bind(this);
        
        this.state = {
            squares: [
                [
                    <BlackRook/>,
                    <BlackKnight/>,
                    <BlackBishop/>,
                    <BlackQueen/>,
                    <BlackKing/>,
                    <BlackBishop/>,
                    <BlackKnight/>,
                    <BlackRook/>
                ],
                Array(8).fill(<BlackPawn/>),
                Array(8).fill(null),
                Array(8).fill(null),
                Array(8).fill(null),
                Array(8).fill(null),
                Array(8).fill(<WhitePawn/>),
                [
                    <WhiteRook/>,
                    <WhiteKnight/>,
                    <WhiteBishop/>,
                    <WhiteQueen/>,
                    <WhiteKing/>,
                    <WhiteBishop/>,
                    <WhiteKnight/>,
                    <WhiteRook/>
                ]
            ],
            whiteIsNext: true,
            selectedPiece: null,
            selectedI: null,
            selectedJ: null
        };
    }

    handleClick(i, j) {
        // slice() performs a deep copy
        // all arrays in javascript are pointers, therefore const will not prevent you from changing its values
        const squares = this.state.squares.slice();
        let {whiteIsNext, selectedPiece, selectedI, selectedJ} = this.state;

        // if nothing was selected and the selected square is empty, do nothing
        if (calculateWinner(squares) || (!selectedPiece && !squares[i][j])) {
            return;
        }

        // TODO prevent white from moving black pieces and vice versa
        // TODO limit movement of pieces
        // TODO prevent white from taking white pieces
        if (!selectedPiece && squares[i][j]) {
            // if nothing was selected and the selected square is valid, save the selection
            this.setState({
                selectedI: i,
                selectedJ: j,
                selectedPiece: squares[i][j]
            });
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

        this.setState({
            squares: squares,
            whiteIsNext: !this.state.whiteIsNext,
            selectedPiece: null,
            selectedI: null,
            selectedJ: null
        });
        this.render()
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

        const {squares, selectedI, selectedJ} = this.state;

        if (i === selectedI && j === selectedJ) {
            color = "selected";
        }

        return (
            <Square
                value={squares[i][j]}
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
