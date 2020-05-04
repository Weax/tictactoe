import { saveState } from "./slice";
import { Middleware } from 'redux';

const SaveGameStateToLocalStorage: Middleware = store => next => action => {
    let result = next(action);

    //save on any action
    saveState(store.getState().game);
  
    return result
  };
  
  export default SaveGameStateToLocalStorage;