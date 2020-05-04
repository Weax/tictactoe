import React from 'react';
import Board from "../components/Board";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { selectGameState, selectBoard, playTurn, newGame } from "./slice";
import './styles.scss';

const Game: React.FC = () => {
    const dispatch = useDispatch();

    const board = useSelector(selectBoard);
    const { player, gameover, winner } = useSelector(selectGameState);    

    const boardOnMove = (row: number, col: number) => {
        dispatch(playTurn(row, col));
    }

    return (
        <div className="game">
            <Header buttonAction={() => dispatch(newGame())} />
            <Board board={board} onMove={boardOnMove} />
            <Footer {...{ player, gameover, winner }} />
        </div>
    );
}

export default Game;