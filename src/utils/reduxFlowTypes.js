/* @flow */
import type {GlobalState} from "./../../App";

export type getStateFun = () => GlobalState;
export type dispatchFun = ((actionValue: Object) => void);