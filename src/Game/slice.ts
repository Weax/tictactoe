import { createSlice } from "@reduxjs/toolkit";
import { RootState, StoreDispatch } from "../store/store";
import { isWinner, isDraw } from "./utils";

const STORAGE_KEY = "tic-tac-toe";

const emptyBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

enum Winner {
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

const initialState: GameState = {
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
            const updated = state.board.slice();
            const { player, row, col } = action.payload;
            updated[row][col] = player;

            state.board = updated;
            state.player = player;
        },
        switchPlayer: (state, action) => {
            state.player = action.payload;
        },
        winner: (state, action) => {
            state.winner = action.payload
        }
    },
});

export const { newGame, gameOver, movePlayer, switchPlayer, winner } = slice.actions;

const checkWinner = () => (dispatch: StoreDispatch, getState: () => RootState) => {    
    const { board, player } = getState().game;

    if (isWinner(board, player)) {
        dispatch(winner(player));
        dispatch(gameOver());
    } else if (isDraw(board)) {
        dispatch(winner(Winner.Draw));
        dispatch(gameOver());
    }
};

export const playTurn = (row: number, col: number) => (dispatch: StoreDispatch, getState: () => RootState) => {
    const { board, player, gameover } = getState().game;

    //play only if the game is still in progress and the square is empty
    if (gameover || board[row][col] !== 0) {
        return;
    }

    const nextPlayer = player === 1 ? 2 : 1;

    dispatch(movePlayer({ player, row, col }));
    dispatch(checkWinner());
    dispatch(switchPlayer(nextPlayer));    
};

export function loadState(): GameState {
    const loadedState = localStorage.getItem(STORAGE_KEY);
    return loadedState ? { ...initialState, ...JSON.parse(loadedState) } : initialState;
}

export function saveState(gameState: GameState): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
}

export const gameState = (state: RootState) => state.game;

export default slice.reducer;
