import React from 'react';
import Square from "../Square/index";
import { GameState } from "../../Game/slice";
import './styles.scss';

interface BoardProps {
    board: GameState["board"];
    onMove: (row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onMove }) => {

    return (
        <div className="board">
            {board.map((row, rIdx) => (
                <div className="board-row" key={rIdx}>
                    {row.map((col, cIdx) => (
                        <Square markedByPlayer={col as GameState["player"]} key={cIdx} onClick={() => onMove(rIdx, cIdx)} />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Board;