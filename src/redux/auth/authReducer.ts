import * as includes from "lodash.includes";
import { createReducer, Handlers } from "redux-act";

import { mergeState } from "../helpers";
import * as actions from "./authActions";
import { AuthShape } from "./authShape";

const admins: string[] = [
  "david.marvasti@wework.com",
  "dmarvasti@gmail.com",
  
  "yoav.ilan@wework.com",
  "michael.smith@wework.com"
]

const handlers: Handlers<Partial<AuthShape>> = {

  [actions.updateAuthd.toString()]: (state, {isAuthd, user}) => {
    return mergeState(state, {
      isAdmin: isAuthd ? includes(admins, user.email) : false,     
      isAuthd,
      user: isAuthd ? user : null,
    });
  },

};

const initialState: Partial<AuthShape> = {
  isAdmin: false,
  isAuthd: false,
};

export default createReducer<Partial<AuthShape>>(handlers, initialState);
