import React from 'react';
import { GameState } from "../../Game/slice";
import './styles.scss';

interface SquareProps {
    markedByPlayer: GameState["player"],
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Square: React.FC<SquareProps> = ({ markedByPlayer, onClick }) => {

    const playerIcon = (markedByPlayer: GameState["player"]) => {
        switch (markedByPlayer) {
            case 1:
                return 'X';
            case 2:
                return 'O';
            default:
                return '';
        }
    };

    return (
        <button className="cell" onClick={onClick}>
            {playerIcon(markedByPlayer)}
        </button>
    )
}

export default Square;