import React from "react";

import white_bishop from "./chess-icons/icons8-bishop-50-2.png";
import black_bishop from "./chess-icons/icons8-bishop-50.png";
// import white_king from "./chess-icons/icons8-king-50-2.png";
// import black_king from "./chess-icons/icons8-king-50.png";
// import white_knight from "./chess-icons/icons8-knight-50-2.png";
// import black_knight from "./chess-icons/icons8-knight-50.png";
// import white_pawn from "./chess-icons/icons8-pawn-50-2.png";
// import black_pawn from "./chess-icons/icons8-pawn-50.png";
// import white_queen from "./chess-icons/icons8-queen-50-2.png";
// import black_queen from "./chess-icons/icons8-queen-50.png";
// import white_rook from "./chess-icons/icons8-rook-50-2.png";
// import black_rook from "./chess-icons/icons8-rook-50.png";

class ChessPiece extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            possibleMoves: Array(null).fill(null),
            icon: null
        };
    }
}

class WhiteBishop extends ChessPiece {
    constructor(props) {
        super(props);
        this.state = {
            possibleMoves: Array(null).fill(null),
            icon: white_bishop
        };
    }
}

class BlackBishop extends ChessPiece {
    constructor(props) {
        super(props);
        this.state = {
            possibleMoves: Array(null).fill(null),
            icon: black_bishop
        };
    }
}

export { ChessPiece, WhiteBishop, BlackBishop };
