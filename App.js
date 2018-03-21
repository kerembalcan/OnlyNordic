/* @flow */
import React from 'react'
import { Provider } from 'react-redux'
import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk';
import MainNavigator from './src/navigation';
import { createLogger} from 'redux-logger';

import initialScreenReducer from './src/InitialScreen/reducer';
import type {State as initialScreenState} from "./src/InitialScreen/reducer";

import imageFeedReducer from './src/ImageFeed/reducer';
import type {State as imageFeedState} from "./src/ImageFeed/reducer";

import imageGalleryReducer from './src/ImageGallery/reducer';
import type {State as imageGalleryState} from "./src/ImageGallery/reducer";

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
  initialScreenReducer,
  imageFeedReducer,
  imageGalleryReducer
});

const rootReducer = ( state, action ) => {
  return appReducer(state, action);
};


export type GlobalState = {
  initialScreenReducer : initialScreenState,
  imageFeedReducer : imageFeedState,
  imageGalleryReducer: imageGalleryState
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