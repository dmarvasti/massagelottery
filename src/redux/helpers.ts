import * as reduce from "lodash.reduce";
import { Action } from "redux";
import { createAction } from "redux-act";

export enum FlowStep {
  Unknown = 0,
  Trying = 1,
  Started = 2,
  Failed = 4,
  Success = 8,
  Done = 16
}

/**
 *
 */
export interface IActionFlow {
  try: (args?) => Action;
  start: (args?) => Action;
  failed: (args?) => Action;
  success: (args?) => Action;
  done: (args?) => Action;
}

/**
 * Notification Action Flow
 */
export interface INotificationActionFlow {
  openError: (args?) => Action;
  openSuccess: (args?) => Action;
  openWarning: (args?) => Action;
  openInfo: (args?) => Action;
  open: (args?) => Action;
  close: (args?) => Action;
  success: (args?) => Action;
  done: (asgs?) => Action;
}

/**
 * Multi-Step Action Flow
 */
export interface IStepFlow {
  cancel: (args?) => Action;
  next: (args?) => Action;
  previous: (args?) => Action;
  load: (args?) => Action;
  restart: (args?) => Action;
  finish: (args?) => Action;
}

/**
 * Merges nextState into prevState and enforces type safety to ensure that there are no
 * missing properties added to the state that are not known to the interfaces.
 *
 * @param prevState
 * @param nextState
 * @returns {S}
 */
export function mergeState<STATE>(prevState: STATE, nextState: STATE): STATE {
  return {
    ...(prevState as {}), ...(nextState as {})
  } as STATE;
}

/**
 * Iterate the list of actions and creates an action with the flowName appended
 *
 * @param flowName
 * @param moreActions
 * @param actions
 * @returns {{}}
 */
export function createActions<T>(flowName: string, actions: string[]): T {
  return reduce(actions, (acc, action) => {
    acc[action] = createAction(`[${action.toUpperCase()}] ${flowName}`);
    return acc;
  }, {} as T);
}

/**
 * Creates the set of standard actions for an TryCatch flow
 *
 * @param actionName
 * @returns {any}
 */
export const createActionFlow = (actionName: string): IActionFlow =>
  createActions<IActionFlow>(actionName, ["try", "start", "failed", "success", "done"]);

/**
 * Creates the set of standard actions for a Notification flow
 *
 * @param actionName
 * @returns {any}
 */
export const createNotificationActionFlow = (actionName: string): INotificationActionFlow =>
  createActions<INotificationActionFlow>(actionName, ["open", "openError", "openSuccess", "openWarning", "openInfo", "close", "success", "done"]);


/**
 * Creates the set of standard actions for a series of steps (step flow)
 *
 * @param {string} actionName
 * @returns {IStepFlow}
 */
export const createStepFlow = (actionName: string): IStepFlow =>
createActions<IStepFlow>(actionName, ["cancel", "next", "previous", "load", "restart", "finish"]);
