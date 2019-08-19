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

export const defaultStart = [
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
    [
        new BlackPawn(),
        new BlackPawn(),
        new BlackPawn(),
        new BlackPawn(),
        new BlackPawn(),
        new BlackPawn(),
        new BlackPawn(),
        new BlackPawn()
    ],
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    [
        new WhitePawn(),
        new WhitePawn(),
        new WhitePawn(),
        new WhitePawn(),
        new WhitePawn(),
        new WhitePawn(),
        new WhitePawn(),
        new WhitePawn()
    ],
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
]

export const testNoPawns = [
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
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
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
]

export const testEnPassant = [
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
    [
        new BlackPawn(),
        new BlackPawn(),
        new BlackPawn(),
        new BlackPawn(),
        new BlackPawn(),
        null,
        new BlackPawn(),
        new BlackPawn()
    ],
    Array(8).fill(null),
    [
        null,
        null,
        null,
        null,
        null,
        new BlackPawn(),
        new WhitePawn(),
        null,
    ],
    Array(8).fill(null),
    Array(8).fill(null),
    [
        new WhitePawn(),
        new WhitePawn(),
        new WhitePawn(),
        new WhitePawn(),
        new WhitePawn(),
        null,
        new WhitePawn(),
        new WhitePawn()
    ],
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
]