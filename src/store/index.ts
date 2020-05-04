import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import gameReducer, { loadState } from "../Game/slice";
import saveToLocalStorage from "../Game/saveToLocalStorage";

export const reducer = combineReducers({
    game: gameReducer,
})

const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), saveToLocalStorage],
    preloadedState: {
        game: loadState()
    }
})

export default store;