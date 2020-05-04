import reducer, { emptyBoard, Winner, initialState, newGame, checkWinner, playTurn, movePlayer, switchPlayer, gameOver, winner, selectBoard } from './slice';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

const drawBoard = [
  [2, 2, 1],
  [1, 1, 2],
  [2, 1, 1]
];

const player1WinBoard = [
  [2, 2, 0],
  [1, 1, 1],
  [2, 2, 0]
];

const inPlayBoard = [
  [2, 0, 2],
  [1, 1, 0],
  [1, 1, 0]
];

describe('Game slice', () => {
  describe('reducer, actions and selectors', () => {
    it('should return the initial state on first run', () => {
      // Arrange
      const nextState = initialState;
      // Act
      const result = reducer(undefined, {});
      // Assert
      expect(result).toEqual(nextState);
    });

    it('should create emptyBoard', () => {
      const nextState = reducer(initialState, newGame());
      const rootState = { game: nextState };
      expect(selectBoard(rootState)).toEqual(emptyBoard);
    });

    it('board cell should be changed by Player2', () => {
      const player = Winner.Player2;
      const nextState = reducer({ ...initialState, player, board: inPlayBoard }, movePlayer({ row: 0, col: 1 }));
      const rootState = { game: nextState };
      expect(selectBoard(rootState)).toEqual([[2, 2, 2], [1, 1, 0], [1, 1, 0]]);
    });

    //thunk:

    it('should set winner to Player1 and end a game', () => {
      const store = mockStore({ game: { ...initialState, board: player1WinBoard } });
      store.dispatch(checkWinner());

      const expectedActions = [winner(Winner.Player1), gameOver()];
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should set Draw and end a game', () => {
      const store = mockStore({ game: { ...initialState, board: drawBoard } });
      store.dispatch(checkWinner());

      const expectedActions = [winner(Winner.Draw), gameOver()];
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should not dispatch actions on already set square', () => {
      const player = Winner.Player1;
      const store = mockStore({ game: { ...initialState, player, board: inPlayBoard } });
      store.dispatch(playTurn(0, 0));

      expect(store.getActions()).toEqual([]);
    });

    it('should switch player after turn', () => {
      //initialState has Player1
      const store = mockStore({ game: initialState });
      store.dispatch(playTurn(0, 0));
      //check actions
      const expectedActions = [movePlayer( { row: 0, col: 0 }), switchPlayer()];
      expect(store.getActions()).toEqual(expectedActions);
      //check reducer
      expect(reducer(initialState, expectedActions[1])).toEqual({ ...initialState, player: Winner.Player2 })
    });

  })
})