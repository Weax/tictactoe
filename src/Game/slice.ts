import { createSlice } from "@reduxjs/toolkit";
import { RootState, StoreDispatch } from "../store/store";
import { isWinner, isDraw } from "./utils";

const STORAGE_KEY = "tic-tac-toe";

export const emptyBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

export enum Winner {
    No = -1,
    Draw = 0,
    Player1 = 1,
    Player2 = 2,
}

export interface GameState {
    board: typeof emptyBoard,
    gameover: boolean,
    player: 1 | 2,
    winner: Winner
}

export const initialState: GameState = {
    board: emptyBoard,
    gameover: false,
    player: 1,
    winner: Winner.No
}

export const slice = createSlice({
    name: "game",
    initialState,
    reducers: {
        newGame: () => ({...initialState}),
        gameOver: (state) => {
            state.gameover = true
        },
        movePlayer: (state, action) => {
            const updated = [...state.board];
            const { row, col } = action.payload;
        
            updated[row][col] = state.player;

            state.board = updated;            
        },
        switchPlayer: (state) => {
            state.player = state.player === 1 ? 2 : 1;
        },
        winner: (state, action) => {
            state.winner = action.payload
        }
    },
});

export const { newGame, gameOver, movePlayer, switchPlayer, winner } = slice.actions;

export const checkWinner = () => (dispatch: StoreDispatch, getState: () => RootState) => {    
    const { board, player } = getState().game;

    if (isWinner(board, player)) {
        dispatch(winner(player));
        dispatch(gameOver());
    } else if (isDraw(board)) {
        dispatch(winner(Winner.Draw));
        dispatch(gameOver());
    } else {
        dispatch(switchPlayer());
    }
};

export const playTurn = (row: number, col: number) => (dispatch: StoreDispatch, getState: () => RootState) => {
    const { board, gameover } = getState().game;

    //play only if the game is still in progress and the square is empty
    if (gameover || board[row][col] !== 0) {
        return;
    }

    dispatch(movePlayer({ row, col }));
    dispatch(checkWinner());
};

export function loadState(): GameState {
    const loadedState = localStorage.getItem(STORAGE_KEY);
    return loadedState ? { ...initialState, ...JSON.parse(loadedState) } : initialState;
}

export function saveState(gameState: GameState): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
}

export const selectGameState = (state: RootState) => state.game;
export const selectBoard = (state: RootState) => state.game.board;

export default slice.reducer;
