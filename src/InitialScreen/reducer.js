/* @flow */

import {GET_IMAGES_ERROR, GET_IMAGES_REQUEST, GET_IMAGES_RESPONSE} from "./actionTypes";
import type {PhotoType} from "../types";

export type State = {
  photos : Array<PhotoType>,
  page: number,
  isRequestingPhotos: boolean
}

export const initialScreenInitialState : State = {
  photos : [],
  page: 0,
  isRequestingPhotos: false
};

export default function initialScreenReducer(state : State = initialScreenInitialState, action: Object) {
  switch (action.type) {
    case GET_IMAGES_REQUEST:
      return {...state, isRequestingPhotos: true};
    case GET_IMAGES_RESPONSE:
      return {...state, isRequestingPhotos: false, photos: action.photos, page: action.page};
    case GET_IMAGES_ERROR:
      return {...state, isRequestingPhotos: false};
    default:
      return state;
  }
}