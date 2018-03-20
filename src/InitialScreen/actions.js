/* @flow */

import type {dispatchFun, getStateFun} from "../utils/reduxFlowTypes";
import {getSearchRoute} from "../apiRoutes";
import {GET_IMAGES_ERROR, GET_IMAGES_REQUEST, GET_IMAGES_RESPONSE} from "./actionTypes";
import {callGetAuth} from "../utils/apiCall";
import type {PhotosObjectType, PhotoType, ResponseType} from "../types";

function createLoadImagesResponseAction(photos : Array<PhotoType>, page: number) {
  return {
    type: GET_IMAGES_RESPONSE,
    photos,
    page
  }
}
function getLoadImagesResponseHandlerFunction() {
  return (response : ResponseType, dispatch) => {
    const photos : PhotosObjectType = response.photos;
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