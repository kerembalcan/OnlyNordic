/* @flow */
import type {getStateFun, dispatchFun} from "./reduxFlowTypes"
type responseHandlerFun = (responseBody: any, dispatcher: dispatchFun, stateGetter: getStateFun) => void;
type urlAndParamsGetter = ((getState: getStateFun) => string);
type ErrorHandler = {noInternet: ?(() => void), fiveHundred: ?(() => void), otherError: ?(() => void)}
type ThunkLike = (dispatchFun, getStateFun) => void;
import {HOST} from "./constants";
import {showErrorDialog} from "./validation-util";

function createRequestAction(requestTypeStr) {
  return {
    type: requestTypeStr
  };
}

function createErrorAction(errorTypeStr, statusCode, responseBody) {
  return {
    type: errorTypeStr,
    statusCode: statusCode,
    responseBody: responseBody
  }
}

//todo: consider adding /api/ as default for all paths. Would make it easier to change to e.g. /api2/ .
function getDefaultErrorHandler(retryCall) : ErrorHandler{
  const noInternet = () => {
    showErrorDialog("No internet", "There is no internet connection", () => {}, retryCall, null, "Try again");
  };
  const fiveHundred = () => {
    showErrorDialog("Something goes wrong", "We are working on the issue", () => {}, retryCall, null, "Try again");
  };
  const otherError = () => {
    showErrorDialog("Something fail", "We are working on the issue", () => {}, retryCall, null, "Try again");
  };

  return {noInternet, fiveHundred, otherError};
}
const NUMBER_OF_ERROR_HANDLING_LIMIT = 3;
const doNothingErrorHandler = {noInternet: null, otherError: null, fiveHundred: null};

function limitErrorHandler(createApiCall : (errorHandler : ErrorHandler) => void) : ErrorHandler {
  const innerMostErrorHandler = () => createApiCall(doNothingErrorHandler);
  let outMostErrorHandler = innerMostErrorHandler;
  for (let i= 0; i< NUMBER_OF_ERROR_HANDLING_LIMIT; i++) {
    outMostErrorHandler = () => createApiCall(getDefaultErrorHandler(outMostErrorHandler));
  }
  return getDefaultErrorHandler(outMostErrorHandler);
}

export function callGetAuth(getUrlAndParamsWithoutHost : urlAndParamsGetter, reduxRequestType : string, reduxErrorType : string, responseHandler: responseHandlerFun, errorHandler? : ErrorHandler) : ThunkLike {
  return (dispatch : dispatchFun, getState : getStateFun) => {
    const errorHandlerToUse = errorHandler ? errorHandler : limitErrorHandler((eh) => dispatch(callApiFromRedux(getUrlAndParamsWithoutHost, "GET", statusCode => statusCode < 400, reduxRequestType, reduxErrorType, responseHandler, null, eh)));
    return dispatch(callApiFromRedux(getUrlAndParamsWithoutHost, "GET", statusCode => statusCode < 400, reduxRequestType, reduxErrorType, responseHandler, null, errorHandlerToUse));
  }
}

export function callPostAuth(getUrlAndParamsWithoutHost: urlAndParamsGetter, jsonBody: Object, reduxRequestType: string, reduxErrorType: string, responseHandler: responseHandlerFun, errorHandler? : ErrorHandler) : ThunkLike {
  return (dispatch : dispatchFun, getState : getStateFun) => {
    const errorHandlerToUse = errorHandler ? errorHandler : limitErrorHandler((eh) => dispatch(callApiFromRedux(getUrlAndParamsWithoutHost, "POST", statusCode => statusCode == 201 || statusCode ==  200, reduxRequestType, reduxErrorType, responseHandler, jsonBody, eh)));
    return dispatch(callApiFromRedux(getUrlAndParamsWithoutHost, "POST", statusCode => statusCode == 201 || statusCode ==  200, reduxRequestType, reduxErrorType, responseHandler, jsonBody, errorHandlerToUse))
  }
}

export function callPutAuth(getUrlAndParamsWithoutHost : urlAndParamsGetter, jsonBody: Object, reduxRequestType: string, reduxErrorType: string, responseHandler: responseHandlerFun, errorHandler? : ErrorHandler) : ThunkLike {
  return (dispatch : dispatchFun, getState : getStateFun) => {
    const errorHandlerToUse = errorHandler ? errorHandler : limitErrorHandler((eh) => dispatch(callApiFromRedux(getUrlAndParamsWithoutHost, "PUT", statusCode => statusCode == 201 || statusCode ==  200, reduxRequestType, reduxErrorType, responseHandler, jsonBody, eh)));
    return dispatch(callApiFromRedux(getUrlAndParamsWithoutHost, "PUT", statusCode => statusCode == 201 || statusCode ==  200, reduxRequestType, reduxErrorType, responseHandler, jsonBody, errorHandlerToUse))
  }

}

export function callPatchAuth(getUrlAndParamsWithoutHost : urlAndParamsGetter, jsonBody: Object, reduxRequestType: string, reduxErrorType: string, responseHandler: responseHandlerFun, errorHandler? : ErrorHandler) : ThunkLike {
  return (dispatch : dispatchFun, getState : getStateFun) => {
    const errorHandlerToUse = errorHandler ? errorHandler : limitErrorHandler((eh) => dispatch(callApiFromRedux(getUrlAndParamsWithoutHost, "PATCH", statusCode => statusCode == 201 || statusCode ==  200, reduxRequestType, reduxErrorType, responseHandler, jsonBody, eh)));
    return dispatch(callApiFromRedux(getUrlAndParamsWithoutHost, "PATCH", statusCode => statusCode == 201 || statusCode ==  200, reduxRequestType, reduxErrorType, responseHandler, jsonBody, errorHandlerToUse))
  }
}

export function callDeleteAuth(getUrlAndParamsWithoutHost : urlAndParamsGetter, jsonBody: Object, reduxRequestType: string, reduxErrorType: string, responseHandler: responseHandlerFun, errorHandler? : ErrorHandler) : ThunkLike {
  return (dispatch : dispatchFun, getState : getStateFun) => {
    const errorHandlerToUse = errorHandler ? errorHandler : limitErrorHandler((eh) => dispatch(callApiFromRedux(getUrlAndParamsWithoutHost, "DELETE", statusCode => statusCode == 201 || statusCode ==  200, reduxRequestType, reduxErrorType, responseHandler, jsonBody, eh)));
    return dispatch(callApiFromRedux(getUrlAndParamsWithoutHost, "DELETE", statusCode => statusCode == 201 || statusCode ==  200, reduxRequestType, reduxErrorType, responseHandler, jsonBody, errorHandlerToUse));
  }
}

//At the moment there is no difference with or without auth. The session cookie is provided automatically if it is available.
//However, we might change auth scheme later on, so splitting "with" and "without auth" now makes it easier accommodate such a change later on.
export const callGetNoAuth = callGetAuth;
export const callPostNoAuth = callPostAuth;
export const callPutNoAuth = callPostAuth;
export const callDeleteNoAuth = callDeleteAuth;

function callApiFromRedux(getUrlAndParamsWithoutHost : urlAndParamsGetter, httpMethod : string, statusCodePredicate, reduxRequestType : string, reduxErrorType, responseHandler : responseHandlerFun, jsonBody : ?Object, errorHandler : ErrorHandler) {
  let fetchBlockCreator = generateFetchCallingFunction(getUrlAndParamsWithoutHost, httpMethod, jsonBody);
  return callHelper(fetchBlockCreator, statusCodePredicate, reduxRequestType, reduxErrorType, responseHandler, errorHandler);
}

function addHost(relativePath) {
  return HOST + relativePath;
}

function generateFetchCallingFunction(getUrlAndParamsWithoutHost : urlAndParamsGetter, httpMethod : string, jsonBody : ?Object) { //the MethodType type is known by Flow
  const base = {
    credentials: 'same-origin',
    method: httpMethod,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  };

  let requestBody =  jsonBody ? {...base, body: JSON.stringify(jsonBody)} : base;
  return (getState : getStateFun) => {
    let endpoint = addHost(getUrlAndParamsWithoutHost(getState));
    console.log(httpMethod, endpoint);
    return fetch(endpoint, requestBody);
  }
}

type ErrorType = "Five Hundred" | "No Internet" | "Other";
function detectErrorType(err, isNetworkError) : ErrorType {
  if (isNetworkError) {
    return "No Internet"
  } else {
    //todo: consider to have a loggin mechanism
    console.log(err);
    return "Other"
  }
}

function genericErrorHandler(err, errorHandler) {
  let isNetworkError = "Network request failed" === err.message;
  switch (detectErrorType(err, isNetworkError)) {
    case "Five Hundred":
      errorHandler.fiveHundred && errorHandler.fiveHundred();
      break;
    case "No Internet":
      errorHandler.noInternet && errorHandler.noInternet();
      break;
    case "Other":
      errorHandler.otherError && errorHandler.otherError();
      break;
  }
}

function callHelper(fetchBlockCreator, statusCodePredicate, reduxRequestType, reduxErrorType, responseHandler, errorHandler) {
  return function (dispatch: dispatchFun, getState: getStateFun) {
    dispatch(createRequestAction(reduxRequestType));
    fetchBlockCreator(getState)
      .then(response => Promise.all([response, response.json()]))
      .then(function ([response, responseBody]) {
        if (!statusCodePredicate(response.status)) {
          if(response.status >= 500 && response.status < 600 && errorHandler.fiveHundred) {
            errorHandler.fiveHundred();
            //todo: consider to have a loggin mechanism
          }
          return {responseBody: responseBody, badRequest: response.status};
        }
        return {responseBody: responseBody, badRequest: false};
      })
      .then(function (parsed) {
        if (parsed.badRequest) {
          setTimeout(() => dispatch(createErrorAction(reduxErrorType, parsed.badRequest, parsed.responseBody)), 0);
        } else {
          setTimeout(() => responseHandler(parsed.responseBody, dispatch, getState), 0);
        }
      })
      .catch(err => genericErrorHandler(err, errorHandler));
  }
}