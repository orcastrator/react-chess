import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { defaultStart/*, testEnPassant, testNoPawns*/ } from "./start-positions.js";

// var SpecialMoves = {
//     Normal: 0,
//     KnightNormal: 1,
//     EnPassant: 2,
//     Castle: 3,
//     Promotion: 4
// };

const iToNum = new Map();
// {0: 8}, {1: 7}, {2: 6}, {3: 5}, {4: 4}, {5: 3}, {6: 2}, {7: 1}
iToNum.set(0, 8);
iToNum.set(1, 7);
iToNum.set(2, 6);
iToNum.set(3, 5);
iToNum.set(4, 4);
iToNum.set(5, 3);
iToNum.set(6, 2);
iToNum.set(7, 1);
const jToAlpha = new Map();
jToAlpha.set(0, "a");
jToAlpha.set(1, "b");
jToAlpha.set(2, "c");
jToAlpha.set(3, "d");
jToAlpha.set(4, "e");
jToAlpha.set(5, "f");
jToAlpha.set(6, "g");
jToAlpha.set(7, "h");

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

// stockfish basic commands https://www.reddit.com/r/chess/comments/ad4h1k/stockfishs_basic_commands/
class Board extends React.Component {
    constructor(props) {
        super(props);

        this.isKingInCheck = this.isKingInCheck.bind(this);
        this.toFenNotation = this.toFenNotation.bind(this);
        this.findPieces = this.findPieces.bind(this);
        this.isKingInCheck = this.isKingInCheck.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.renderSquare = this.renderSquare.bind(this);

        this.state = {
            squares: defaultStart,
            whiteIsNext: true,
            selectedPiece: null,
            whiteCastleKingSide: true,
            whiteCastleQueenSide: true,
            blackCastleKingSide: true,
            blackCastleQueenSide: true,
            enPassantSquare: null,
        };
    }

    toFenNotation() {
        let {
            squares,
            whiteIsNext,
            whiteCastleKingSide,
            whiteCastleQueenSide,
            blackCastleKingSide,
            blackCastleQueenSide,
            enPassantSquare
        } = this.state;

        var fenNotation = "";
        for (var i = 0; i < squares.length; i++) {
            var concurrentEmptySquaresCount = 0;
            for (var j = 0; j < squares[i].length; j++) {
                if (squares[i][j] && squares[i][j].state.type) {
                    if (concurrentEmptySquaresCount !== 0) {
                        fenNotation += concurrentEmptySquaresCount;
                        concurrentEmptySquaresCount = 0;
                    }
                    fenNotation += squares[i][j].state.fen;
                } else {
                    concurrentEmptySquaresCount++;
                }
            }
            if (concurrentEmptySquaresCount !== 0) {
                fenNotation += concurrentEmptySquaresCount;
            }
            if (i !== squares.length - 1) fenNotation += "/";
        }

        fenNotation += whiteIsNext ? " w " : " b ";

        // TODO: implement castling
        fenNotation += whiteCastleKingSide ? "K" : "";
        fenNotation += whiteCastleQueenSide ? "Q" : "";
        fenNotation += blackCastleKingSide ? "k" : "";
        fenNotation += blackCastleQueenSide ? "q" : "";
        fenNotation +=
            !whiteCastleKingSide &&
            !whiteCastleQueenSide &&
            !blackCastleKingSide &&
            !blackCastleQueenSide
                ? "-"
                : "";
        fenNotation += enPassantSquare
            ? " " +
              jToAlpha.get(enPassantSquare[1]) +
              iToNum.get(enPassantSquare[0]) +
              " "
            : " - ";
        fenNotation += "0";
        return fenNotation;
    }

    findPieces(name) {
        let { squares } = this.state;
        var found = [];
        for (var k = 0; k < squares.length; k++) {
            for (var l = 0; l < squares[k].length; l++) {
                if (squares[k][l]) {
                    if (squares[k][l].state.name === name) {
                        found.push(squares[k][l]);
                    }
                }
            }
        }
        return found;
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

    handleClick(i, j) {
        // slice() performs a deep copy
        // all arrays in javascript are pointers, therefore const will not prevent you from changing its values
        const squares = this.state.squares.slice();

        let { whiteIsNext, selectedPiece } = this.state;

        if (!selectedPiece) {
            // if nothing was selected and the selected square is empty, do nothing
            if (!squares[i][j]) return;
            // if white is next and black is selected, do nothing
            if (whiteIsNext && squares[i][j].state.color !== "white") return;
            // if black is next and white is selected, do nothing
            if (!whiteIsNext && squares[i][j].state.color !== "black") return;

            squares[i][j].state.position = [i, j];

            // select the piece
            this.setState({
                selectedPiece: squares[i][j]
            });
            return;
        }

        if (squares[i][j]) {
            if (squares[i][j].state.color === "white" && whiteIsNext) {
                squares[i][j].state.position = [i, j];
                this.setState({ selectedPiece: squares[i][j] });
                return;
            }
            if (squares[i][j].state.color === "black" && !whiteIsNext) {
                squares[i][j].state.position = [i, j];
                this.setState({ selectedPiece: squares[i][j] });
                return;
            }
        }

        // check if valid move
        if (!selectedPiece.isValidMove([i, j], squares)) {
            console.log(
                selectedPiece.state.position[0] +
                    "," +
                    selectedPiece.state.position[1] +
                    " to " +
                    i +
                    "," +
                    j +
                    " is not a valid move for the " +
                    selectedPiece.state.name
            );

            this.setState({
                selectedPiece: null
            });
            return;
        }

        console.log(selectedPiece.state.name, "moves from", selectedPiece.state.position[0] + "," + selectedPiece.state.position[1], "to", i + "," + j);
        squares[selectedPiece.state.position[0]][selectedPiece.state.position[1]] = null;
        squares[i][j] = selectedPiece;

        this.setState({
            squares: squares,
            whiteIsNext: !whiteIsNext,
            selectedPiece: null
        });
        this.render();
    }

    renderSquare(i, j) {
        let color;

        if ((i + j) % 2 === 0) {
            color = "white";
        } else {
            color = "black";
        }

        const { squares, selectedPiece } = this.state;

        if (selectedPiece && selectedPiece === squares[i][j])
            color = "selected";

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
        let nextPlayer = this.state.whiteIsNext ? "White" : "Black";;

        let board = [];
        for (let i = 0; i < 8; i++) {
            let boardRow = [];
            for (let j = 0; j < 8; j++) {
                boardRow.push(this.renderSquare(i, j));
            }
            board.push(<div className="board-row">{boardRow}</div>);
        }

        const fenNotation = this.toFenNotation();

        return (
            <div>
                <div className="status">
                    <b>Next Player:</b> {nextPlayer}
                </div>
                <div className="status">
                    position fen {fenNotation}
                    <p />
                    go searchmoves
                </div>
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

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
