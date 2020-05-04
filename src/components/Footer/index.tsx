import React from 'react';
import { Winner, GameState } from "../../Game/slice";
import './styles.scss';

const Footer: React.FC<Partial<GameState>> = ({ player, gameover, winner }) => {

  return (
    <>
      <h2>{gameover && "Game Over!"}</h2>
      <h2>{winner !== Winner.No && (winner === Winner.Draw ? "Draw!" : `Player ${winner} Wins!`)}</h2>
      <h2>{!gameover && `Player: ${player}`}</h2>
    </>
  );
};

export default Footer;