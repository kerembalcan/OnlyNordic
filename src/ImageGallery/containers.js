/* @flow */
import {connect} from 'react-redux';
import ImageGalleryComponent from './components';
import type {State} from "./reducer"
import type {Navigation} from "../utils/react-navigation-util";
import type {GlobalState} from "../../App";
import type {PhotoType} from "../types";
import {stateToLocalState as initialScreenStateGetter} from "../InitialScreen/containers"
import {getPhotoUrl} from "../utils/imageUtil";

export function stateToLocalState(state : GlobalState) : State {
  return state.imageGalleryReducer;
}

export type StateProps = {
  photos : Array<toGalleryItemType>,
  page: number
}

type SourceType = {
  uri: string
}
type toGalleryItemType = {
  source: SourceType,
  title: string
}
function toGalleryItem(photo : PhotoType) : toGalleryItemType{
  return {
    source: {uri: getPhotoUrl(photo)},
    title: photo.title
  }
}
function toGalleryDataSource(photos : Array<PhotoType>) : Array<toGalleryItemType> {
  return photos.map(photo => toGalleryItem(photo));
}

function mapStateToProps(state) : StateProps {
  const localState = stateToLocalState(state);
  const initialScreenState = initialScreenStateGetter(state);
  return {
    photos: toGalleryDataSource(initialScreenState.photos),
    page: initialScreenState.page
  }
}

type DispatchProps = {
}

function mapDispatchToProps(dispatch) : DispatchProps{
  return {

  }
}

type ImageGalleryNavigation = {
  navigate: (path: string) => void,
}

type ExternalProps =  {
  navigation: Navigation,
}

export type CompleteProps = StateProps & DispatchProps & ExternalProps;

const ConnectedImageGalleryComponent = connect(mapStateToProps, mapDispatchToProps)(ImageGalleryComponent);
export default ConnectedImageGalleryComponent;