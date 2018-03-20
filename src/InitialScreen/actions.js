/* @flow */

import type {dispatchFun, getStateFun} from "../utils/reduxFlowTypes";
import {stateToLocalState} from "./containers";
import {getSearchRoute} from "../apiRoutes";
import {GET_IMAGES_ERROR, GET_IMAGES_REQUEST, GET_IMAGES_RESPONSE} from "./actionTypes";
import {callGetAuth} from "../utils/apiCall";

function createLoadImagesResponseAction(photos : Array<PhotoType>, page: number) {
  return {
    type: GET_IMAGES_RESPONSE,
    photos,
    page
  }
}

type PhotoType = {
  id: string,
  owner: string,
  title: string
}
type PhotosObjectType = {
  page: number,
  photo: Array<PhotoType>
}
type ResponseType = {
  photos: Array<PhotosObjectType>
}

function getLoadImagesResponseHandlerFunction() {
  return (response : ResponseType, dispatch) => {
    const photos = response.photos;
    if(photos && photos.photo) {
      dispatch(createLoadImagesResponseAction(photos.photo, photos.page));
    }
  }

}

export function createLoadImagesThunk() {
  return function (dispatch : dispatchFun, getState : getStateFun) {
    dispatch(callGetAuth(() => getSearchRoute("nordic"), GET_IMAGES_REQUEST, GET_IMAGES_ERROR, getLoadImagesResponseHandlerFunction()));
  }
}