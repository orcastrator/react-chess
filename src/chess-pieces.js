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
            currentPosition: Array(2).fill(null),
        };
    }

    render() {
        let { icon, alt } = this.state;
        return <img src={icon} alt={alt} />;
    }
}

class WhiteBishop extends ChessPiece {
    constructor(props) {
        super(props);
        this.state = {
            icon: white_bishop,
            alt: "white_bishop",
            color: "white",
        }
    }
}

class WhiteKing extends ChessPiece {
    constructor(props) {
        super(props);
        this.state = {
            icon: white_king,
            alt: "white_king",
            color: "white",
        }
    }
}

class WhiteKnight extends ChessPiece {
    constructor(props) {
        super(props);
        this.state = {
            icon: white_knight,
            alt: "white_knight",
            color: "white",
        }
    }
}

class WhiteRook extends ChessPiece {
    constructor(props) {
        super(props);
        this.state = {
            icon: white_rook,
            alt: "white_rook",
            color: "white",
        }
    }
}

class WhiteQueen extends ChessPiece {
    constructor(props) {
        super(props);
        this.state = {
            icon: white_queen,
            alt: "white_queen",
            color: "white",
        }
    }
}

class WhitePawn extends ChessPiece {
    constructor(props) {
        super(props);
        this.state = {
            icon: white_pawn,
            alt: "white_pawn",
            color: "white",
        }
    }
}

class BlackBishop extends ChessPiece {
    constructor(props) {
        super(props);
        this.state = {
            icon: black_bishop,
            alt: "black_bishop",
            color: "black",
        }
    }
}

class BlackKing extends ChessPiece {
    constructor(props) {
        super(props);
        this.state = {
            icon: black_king,
            alt: "black_king",
            color: "black",
        }
    }
}

class BlackKnight extends ChessPiece {
    constructor(props) {
        super(props);
        this.state = {
            icon: black_knight,
            alt: "black_knight",
            color: "black",
        }
    }
}

class BlackRook extends ChessPiece {
    constructor(props) {
        super(props);
        this.state = {
            icon: black_rook,
            alt: "black_rook",
            color: "black",
        }
    }
}

class BlackQueen extends ChessPiece {
    constructor(props) {
        super(props);
        this.state = {
            icon: black_queen,
            alt: "black_queen",
            color: "black",
        }
    }
}

class BlackPawn extends ChessPiece {
    constructor(props) {
        super(props);
        this.state = {
            icon: black_pawn,
            alt: "black_pawn",
            color: "black",
        }
    }
}

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
