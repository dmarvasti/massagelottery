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

  [actions.selectSlot.start.toString()]: (state) => {
    return mergeState(state, {
      selectSlotFlowStep: FlowStep.Started
    });
  },

  [actions.selectSlot.success.toString()]: (state, selectedSlotId) => {
    return mergeState(state, {
      selectSlotFlowStep: FlowStep.Success,
      selectedSlotId
    });
  },

  [actions.selectSlot.failed.toString()]: (state) => {
    return mergeState(state, {
      selectSlotFlowStep: FlowStep.Failed,
    });
  },
};

const initialState: Partial<LotteryShape> = {
  loadLotteryFlowStep: FlowStep.Unknown,
  selectSlotFlowStep: FlowStep.Unknown,
  selectedSlotId: null
};

export default createReducer<Partial<LotteryShape>>(handlers, initialState);
