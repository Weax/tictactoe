import React from 'react';
import { GameState } from "../../Game/slice";
import './styles.scss';

const Footer: React.FC<Partial<GameState>> = ({ player, gameover, winner }) => {

  return (
      <>
        <h2>{gameover && "Game Over!"}</h2>
        <h2>{winner && winner > 0 ? `Player ${winner} Wins!` : winner === 0 && "Draw!"}</h2>
        <h2>{!gameover && `Player: ${player}`}</h2>
    </>
  );
};

export default Footer;