/* @flow */

import {connect} from 'react-redux';
import ImageFeedComponent from './components';
import type {State} from "./reducer"
import type {Navigation} from "../utils/react-navigation-util";
import type {GlobalState} from "../../App";
import type {PhotoType} from "../types";
import {stateToLocalState as initialScreenStateGetter} from "../InitialScreen/containers"

export function stateToLocalState(state : GlobalState) : State {
  return state.imageFeedReducer;
}

export type StateProps = {
  photos : Array<PhotoType>,
  page: number
}

function mapStateToProps(state) : StateProps {
  const localState = stateToLocalState(state);
  const initialScreenState = initialScreenStateGetter(state);
  return {
    photos: initialScreenState.photos,
    page: initialScreenState.page
  }
}

type DispatchProps = {
}

function mapDispatchToProps(dispatch) : DispatchProps{
  return {

  }
}

type ImageFeedNavigation = {
  navigate: (path: string) => void,
}

type ExternalProps =  {
  navigation: Navigation,
}

export type CompleteProps = StateProps & DispatchProps & ExternalProps;

const ConnectedImageFeedComponent = connect(mapStateToProps, mapDispatchToProps)(ImageFeedComponent);
export default ConnectedImageFeedComponent;