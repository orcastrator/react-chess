import React from "react";

import white_bishop from "./chess-icons/bishop-50-white.png";
import black_bishop from "./chess-icons/bishop-50-black.png";
import white_king from "./chess-icons/king-50-white.png";
import black_king from "./chess-icons/king-50-black.png";
import white_knight from "./chess-icons/knight-50-white.png";
import black_knight from "./chess-icons/knight-50-black.png";
import white_pawn from "./chess-icons/pawn-50-white.png";
import black_pawn from "./chess-icons/pawn-50-black.png";
import white_queen from "./chess-icons/queen-50-white.png";
import black_queen from "./chess-icons/queen-50-black.png";
import white_rook from "./chess-icons/rook-50-white.png";
import black_rook from "./chess-icons/rook-50-black.png";

class ChessPiece extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            possibleMoves: Array(1).fill(null),
            currentBlock: Array(2).fill(null),
            icon: props.icon,
            alt: props.alt,
            id: null
        };
    }

    render() {
        let { icon, alt } = this.state;
        return <img src={icon} alt={alt} />;
    }
}

const WhiteBishop = <ChessPiece icon={white_bishop} alt="white_bishop" />;
const BlackBishop = <ChessPiece icon={black_bishop} alt="black_bishop" />;
const WhiteKing = <ChessPiece icon={white_king} alt="white_king" />;
const BlackKing = <ChessPiece icon={black_king} alt="black_king" />;
const WhiteKnight = <ChessPiece icon={white_knight} alt="white_knight" />;
const BlackKnight = <ChessPiece icon={black_knight} alt="black_knight" />;
const WhitePawn = <ChessPiece icon={white_pawn} alt="white_pawn" />;
const BlackPawn = <ChessPiece icon={black_pawn} alt="black_pawn" />;
const WhiteQueen = <ChessPiece icon={white_queen} alt="white_queen" />;
const BlackQueen = <ChessPiece icon={black_queen} alt="black_queen" />;
const WhiteRook = <ChessPiece icon={white_rook} alt="white_rook" />;
const BlackRook = <ChessPiece icon={black_rook} alt="black_rook" />;

export {
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
