/* @flow */

export type State = {

}

export const initialScreenInitialState : State = {

};

export default function initialScreenReducer(state : State = initialScreenInitialState, action: Object) {
  switch (action.type) {
    default:
      return state;
  }
}