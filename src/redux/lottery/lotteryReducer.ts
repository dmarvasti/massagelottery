import { createReducer, Handlers } from "redux-act";

import { Lottery } from "../../generated/api";
import { FlowStep, mergeState } from "../helpers";
import * as actions from "./lotteryActions";
import { LotteryShape } from "./lotteryShape";


const handlers: Handlers<Partial<LotteryShape>> = {

  [actions.loadLotteryFlow.start.toString()]: (state) => {
    return mergeState(state, {
      loadLotteryFlowStep: FlowStep.Started
    });
  },

  [actions.loadLotteryFlow.success.toString()]: (state, lottery: Lottery) => {
    return mergeState(state, {
      loadLotteryFlowStep: FlowStep.Success,
      lottery
    });
  },

  [actions.loadLotteryFlow.failed.toString()]: (state) => {
    return mergeState(state, {
      loadLotteryFlowStep: FlowStep.Failed
    });
  },
};

const initialState: Partial<LotteryShape> = {
  loadLotteryFlowStep: FlowStep.Unknown
};

export default createReducer<Partial<LotteryShape>>(handlers, initialState);
