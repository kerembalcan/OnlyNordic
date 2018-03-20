/* @flow */

import {connect} from 'react-redux';
import InitialScreenComponent from './components';
import type {State} from "./reducer"
import type {Navigation} from "../utils/react-navigation-util";
import type {GlobalState} from "../../App";
import {createLoadImagesThunk} from "./actions";

export function stateToLocalState(state : GlobalState) : State {
  return state.initialScreenReducer;
}

export type StateProps = {
  photos : Array<Object>,
  page: number,
  isRequestingPhotos: boolean
}

function mapStateToProps(state) : StateProps {
  const localState = stateToLocalState(state);
  return {
    photos : localState.photos,
    page: localState.page,
    isRequestingPhotos: localState.isRequestingPhotos
  }
}

type DispatchProps = {
  loadImages: () => void,
}

function mapDispatchToProps(dispatch) : DispatchProps{
  return {
    loadImages: () => dispatch(createLoadImagesThunk()),
  }
}

type InitialScreenNavigation = {
  navigate: (path: string) => void,
}

type ExternalProps =  {
  navigation: Navigation,
}

export type CompleteProps = StateProps & DispatchProps & ExternalProps;

const ConnectedInitialScreenComponent = connect(mapStateToProps, mapDispatchToProps)(InitialScreenComponent);
export default ConnectedInitialScreenComponent;