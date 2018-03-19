/* @flow */

import {connect} from 'react-redux';
import InitialScreenComponent from './components';
import type {State} from "./reducer"
import type {Navigation} from "../utils/react-navigation-util";
import type {GlobalState} from "../../App";

export function stateToLocalState(state : GlobalState) : State {
  return state.initialScreenReducer;
}

export type StateProps = {
//   employers: ?Array<Employer>,
//   selectedEmployer: ?Employer,
//   requestingEmployers: boolean,
//   shouldTryAgain: boolean,
}

function mapStateToProps(state) : StateProps {
  const localState = stateToLocalState(state);
  return {
    // employers: localState.employers,
    // selectedEmployer: localState.selectedEmployer,
    // requestingEmployers: localState.requestingEmployers,
    // shouldTryAgain: localState.shouldTryAgain,
  }
}

type DispatchProps = {
  // loadEmployers: () => void,
  // selectEmployer: (employer : Employer) => void,
  // handleLogOut: () => void,
  // handleTimeout: () => void
}

function mapDispatchToProps(dispatch) : DispatchProps{
  return {
    // loadEmployers: () => dispatch(createLoadEmployersThunk()),
    // selectEmployer: (employer : Employer) => dispatch(createSelectEmployerThunk(employer)),
    // handleLogOut: () => {
    //   dispatch(createLogOutAction());
    // },
    // handleTimeout: () => {dispatch(getGetEmployersTimeoutError())}
  }
}

type SelectEmployerNavigation = {
  navigate: (path: string) => void,
}

type ExternalProps =  {
  navigation: Navigation,
}

export type CompleteProps = StateProps & DispatchProps & ExternalProps;

const ConnectedInitialScreenComponent = connect(mapStateToProps, mapDispatchToProps)(InitialScreenComponent);
export default ConnectedInitialScreenComponent;