/* @flow */

 import type {dispatchFun} from "./reduxFlowTypes";
import {NavigationActions} from 'react-navigation';

export type Navigation = {
  navigate: (path: string) => void,
  goBack: (pathToGoBackFrom: ?string) => void,
  dispatch: dispatchFun,
  state?: NavStateType
}
type NavParamsType = {
  companyName?: string
}
type NavStateType = {
  params: NavParamsType,
  key? : ?string
}

export function resetNavigationAction(navigation : Navigation, route : string, params : Object = {}) {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: route,
        params: params
      })
    ]
  });
  return navigation.dispatch(resetAction);
}

export function resetNavigationWithoutKeyAction(navigation : Navigation, route : string, params : Object = {}) {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: route,
        params: params
      })
    ],
    key: null
  });
  return navigation.dispatch(resetAction);
}

export function resetNavigationWithSpecificKeyAction(navigation : Navigation, route : string) {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: route
      })
    ],
    key: navigation.state && navigation.state.key
  });
  return navigation.dispatch(resetAction);
}