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
    render() {
        let { icon, name } = this.state;
        return <img src={icon} alt={name} />;
    }
}

class WhiteBishop extends ChessPiece {
    constructor(props) {
        super(props);
        this.state = {
            icon: white_bishop,
            name: "white_bishop",
            color: "white",
            type: "bishop"
        };
    }
}

class WhiteKing extends ChessPiece {
    constructor(props) {
        super(props);
        this.state = {
            icon: white_king,
            name: "white_king",
            color: "white",
            type: "king"
        };
    }
}

class WhiteKnight extends ChessPiece {
    constructor(props) {
        super(props);
        this.state = {
            icon: white_knight,
            name: "white_knight",
            color: "white",
            type: "knight"
        };
    }
}

class WhiteRook extends ChessPiece {
    constructor(props) {
        super(props);
        this.state = {
            icon: white_rook,
            name: "white_rook",
            color: "white",
            type: "rook"
        };
    }
}

class WhiteQueen extends ChessPiece {
    constructor(props) {
        super(props);
        this.state = {
            icon: white_queen,
            name: "white_queen",
            color: "white",
            type: "queen"
        };
    }
}

class WhitePawn extends ChessPiece {
    constructor(props) {
        super(props);

        this.state = {
            icon: white_pawn,
            name: "white_pawn",
            color: "white",
            type: "pawn"
        };
    }
}

class BlackBishop extends ChessPiece {
    constructor(props) {
        super(props);
        this.state = {
            icon: black_bishop,
            name: "black_bishop",
            color: "black",
            type: "bishop"
        };
    }
}

class BlackKing extends ChessPiece {
    constructor(props) {
        super(props);
        this.state = {
            icon: black_king,
            name: "black_king",
            color: "black",
            type: "king"
        };
    }
}

class BlackKnight extends ChessPiece {
    constructor(props) {
        super(props);
        this.state = {
            icon: black_knight,
            name: "black_knight",
            color: "black",
            type: "knight"
        };
    }
}

class BlackRook extends ChessPiece {
    constructor(props) {
        super(props);
        this.state = {
            icon: black_rook,
            name: "black_rook",
            color: "black",
            type: "rook"
        };
    }
}

class BlackQueen extends ChessPiece {
    constructor(props) {
        super(props);
        this.state = {
            icon: black_queen,
            name: "black_queen",
            color: "black",
            type: "queen"
        };
    }
}

class BlackPawn extends ChessPiece {
    constructor(props) {
        super(props);
        this.state = {
            icon: black_pawn,
            name: "black_pawn",
            color: "black",
            type: "pawn"
        };
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
