/* @flow */
import React from 'react'
import { Provider } from 'react-redux'
import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk';
import MainNavigator from './src/navigation';
import { createLogger} from 'redux-logger';

import initialScreenReducer from './src/InitialScreen/reducer';
import type {State as initialScreenState} from "./src/InitialScreen/reducer";

import FutureView from "./src/futureView";

const logger = createLogger({
  predicate: () => __DEV__
});

//todo: remove mainReducer
function mainReducer(state={}, action) {
  return state;
}

const appReducer = combineReducers({
  mainReducer,
  initialScreenReducer
});

const rootReducer = ( state, action ) => {
  // if ( action.type === LOG_OUT ) {
  //   state = undefined; //https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store/35641992#35641992
  // }
  return appReducer(state, action);
};


export type GlobalState = {
  initialScreenReducer : initialScreenState,
}

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

class App extends React.Component {
  render(){
    return(
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    )
  }
}

export default App;