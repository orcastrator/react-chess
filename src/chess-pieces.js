import React from "react";

import white_king from "./chess-icons/king-50-white.png";
import black_king from "./chess-icons/king-50-black.png";
import white_queen from "./chess-icons/queen-50-white.png";
import black_queen from "./chess-icons/queen-50-black.png";
import white_rook from "./chess-icons/rook-50-white.png";
import black_rook from "./chess-icons/rook-50-black.png";
import white_bishop from "./chess-icons/bishop-50-white.png";
import black_bishop from "./chess-icons/bishop-50-black.png";
import white_knight from "./chess-icons/knight-50-white.png";
import black_knight from "./chess-icons/knight-50-black.png";
import white_pawn from "./chess-icons/pawn-50-white.png";
import black_pawn from "./chess-icons/pawn-50-black.png";

import * as Utilities from "./utils.js";

class ChessPiece {
    constructor() {
        // super(props);
        this.state = {
            moved: false,
            position: null,
        };
    }

    isSameColor(position, chessBoard) {
        return (
            chessBoard[position[0]][position[1]] &&
            chessBoard[position[0]][position[1]].state.color === this.state.color
        );
    }

    pieceExists(position, chessBoard) {
        if (chessBoard[position[0]] && chessBoard[position[0]][position[1]]) {
            // console.log(chessBoard[position[0]][position[1]], "exists on ", position);
            return true;
        }
        return false;
    }

    getValidMoves(possibleDirections, chessBoard) {
        let validSquares = [];
        // let possibleDirections = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        let validDirections = possibleDirections.map(() => { return true; });
        for (let i = 1; i <= 8; i++) {
            for (let j = 0; j < possibleDirections.length; j++) {
                if (validDirections[j]) {
                    let possibleSquare = possibleDirections[j].map((num, index) => { return num*i+this.state.position[index]; });
                    if (this.pieceExists(possibleSquare, chessBoard))
                        validDirections[j] = false;
                    validSquares.push(possibleSquare);
                }
            }
        }

        return validSquares;
    }

    render() {
        let { icon, name } = this.state;
        return <img src={icon} alt={name} />;
    }
}

class King extends ChessPiece {
    constructor(props) {
        super(props);

        this.state.type = "king";
    }

    isValidMove(position, chessBoard) {
        if (this.isSameColor(position, chessBoard)) return false;
        let validMoves = [];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i !== 0 || j !== 0) validMoves.push([i + this.state.position[0], j + this.state.position[1]]);
            }
        }
        // if (color === "white") {
        //     if (whiteCastleKingSide)
        //         validMoves.push([0, 2, SpecialMoves.Castle]);
        //     else if (whiteCastleQueenSide)
        //         validMoves.push([0, -2, SpecialMoves.Castle]);
        // } else if (color === "black") {
        //     if (blackCastleKingSide)
        //         validMoves.push([0, 2, SpecialMoves.Castle]);
        //     else if (blackCastleQueenSide)
        //         validMoves.push([0, -2, SpecialMoves.Castle]);
        // }

        for (let i = 0; i < validMoves.length; ++i) {
            if (Utilities.isEqual(position, validMoves[i]))
                return true;
        }

        return false;
    }
}

class Queen extends ChessPiece {
    constructor(props) {
        super(props);

        this.state.type = "queen";
    }

    isValidMove(position, chessBoard) {
        if (this.isSameColor(position, chessBoard)) return false;

        let possibleDirections = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
        let validSquares = this.getValidMoves(possibleDirections, chessBoard);

        for (let i = 0; i < validSquares.length; ++i) {
            if (Utilities.isEqual(position, validSquares[i]))
                return true;
        }

        return false;
    }
}

class Rook extends ChessPiece {
    constructor(props) {
        super(props);

        this.state.type = "rook";
    }

    isValidMove(position, chessBoard) {
        if (this.isSameColor(position, chessBoard)) return false;

        let possibleDirections = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        let validSquares = this.getValidMoves(possibleDirections, chessBoard);

        for (let i = 0; i < validSquares.length; ++i) {
            if (Utilities.isEqual(position, validSquares[i]))
                return true;
        }
        return false;
    }
}

class Bishop extends ChessPiece {
    constructor(props) {
        super(props);

        this.state.type = "bishop";
    }

    isValidMove(position, chessBoard) {
        if (this.isSameColor(position, chessBoard)) return false;

        let possibleDirections = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
        let validSquares = this.getValidMoves(possibleDirections, chessBoard);

        for (let i = 0; i < validSquares.length; ++i) {
            if (Utilities.isEqual(position, validSquares[i]))
                return true;
        }
        return false;
    }
}

class Knight extends ChessPiece {
    constructor(props) {
        super(props);

        this.state.type = "knight";
    }

    isValidMove(position, chessBoard) {
        if (this.isSameColor(position, chessBoard)) return false;
        let validSquares = [];
        let possibleDirections = [[1, 2], [-1, 2], [1, -2], [-1, -2], [2, 1], [-2, 1], [2, -1], [-2, -1]];
        let validDirections = possibleDirections.map(() => { return true; });
        for (let i = 1; i <= 8; i++) {
            for (let j = 0; j < possibleDirections.length; j++) {
                if (validDirections[j]) {
                    let possibleSquare = possibleDirections[j].map((num, index) => { return num*i + this.state.position[index]; });
                    if (this.pieceExists(possibleSquare, chessBoard))
                        validDirections[j] = false;
                    validSquares.push(possibleSquare);
                }
            }
        }

        for (let i = 0; i < validSquares.length; ++i) {
            if (Utilities.isEqual(position, validSquares[i]))
                return true;
        }

        return false;
    }
}

class Pawn extends ChessPiece {
    constructor(props) {
        super(props);

        this.state.type = "pawn";
    }
}

class WhitePawn extends Pawn {
    constructor(props) {
        super(props);

        this.state.icon = white_pawn;
        this.state.name = "white_pawn";
        this.state.color = "white";
        this.state.fen = "P";
    }

    isValidMove(position, chessBoard) {
        if (this.isSameColor(position, chessBoard)) return false;
        let validSquares = [];
        if (chessBoard[position[0]][position[1]]) validSquares.push([-1 + this.state.position[0], -1 + this.state.position[1]], [-1 + this.state.position[0], 1 + this.state.position[1]]);
        else {
            if (!this.state.moved && !chessBoard[position[0] + 1][position[1]])
            validSquares.push([-2 + this.state.position[0], 0 + this.state.position[1]]);
            validSquares.push([-1 + this.state.position[0], 0 + this.state.position[1]]);
        }

        for (let i = 0; i < validSquares.length; ++i) {
            if (Utilities.isEqual(position, validSquares[i])) {
                return true;
            }
        }
        return false;
    }
}

class BlackPawn extends Pawn {
    constructor(props) {
        super(props);

        this.state.icon = black_pawn;
        this.state.name = "black_pawn";
        this.state.color = "black";
        this.state.fen = "p";
    }

    isValidMove(position, chessBoard) {
        if (this.isSameColor(position, chessBoard)) return false;
        let validSquares = [];
        if (chessBoard[position[0]][position[1]]) validSquares.push([1 + this.state.position[0], -1 + this.state.position[1]], [1 + this.state.position[0], 1 + this.state.position[1]]);
        else {
            if (!this.state.moved && !chessBoard[position[0] - 1][position[1]])
                validSquares.push([2 + this.state.position[0], 0 + this.state.position[1]]);
            validSquares.push([1 + this.state.position[0], 0 + this.state.position[1]]);
        }


        for (let i = 0; i < validSquares.length; ++i) {
            if (Utilities.isEqual(position, validSquares[i]))
                return true;
        }
        return false;
    }
}

// fen is for Forsyth-Edwards Notation https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
class WhiteBishop extends Bishop {
    constructor(props) {
        super(props);

        this.state.icon = white_bishop;
        this.state.name = "white_bishop";
        this.state.color = "white";
        this.state.fen = "B";
    }
}

class WhiteKing extends King {
    constructor(props) {
        super(props);

        this.state.icon = white_king;
        this.state.name = "white_king";
        this.state.color = "white";
        this.state.fen = "K";
    }
}

class WhiteKnight extends Knight {
    constructor(props) {
        super(props);

        this.state.icon = white_knight;
        this.state.name = "white_knight";
        this.state.color = "white";
        this.state.fen = "N";
    }
}

class WhiteRook extends Rook {
    constructor(props) {
        super(props);

        this.state.icon = white_rook;
        this.state.name = "white_rook";
        this.state.color = "white";
        this.state.fen = "R";
    }
}

class WhiteQueen extends Queen {
    constructor(props) {
        super(props);
        this.state.icon = white_queen;
        this.state.name = "white_queen";
        this.state.color = "white";
        this.state.fen = "Q";
    }
}

class BlackBishop extends Bishop {
    constructor(props) {
        super(props);
        this.state.icon = black_bishop;
        this.state.name = "black_bishop";
        this.state.color = "black";
        this.state.fen = "b";
    }
}

class BlackKing extends King {
    constructor(props) {
        super(props);
        this.state.icon = black_king;
        this.state.name = "black_king";
        this.state.color = "black";
        this.state.fen = "k";
    }
}

class BlackKnight extends Knight {
    constructor(props) {
        super(props);
        this.state.icon = black_knight;
        this.state.name = "black_knight";
        this.state.color = "black";
        this.state.fen = "n";
    }
}

class BlackRook extends Rook {
    constructor(props) {
        super(props);
        this.state.icon = black_rook;
        this.state.name = "black_rook";
        this.state.color = "black";
        this.state.fen = "r";
    }
}

class BlackQueen extends Queen {
    constructor(props) {
        super(props);
        this.state.icon = black_queen;
        this.state.name = "black_queen";
        this.state.color = "black";
        this.state.fen = "q";
    }
}

export {
    ChessPiece,
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
};
