/* tslint:disable */


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


  [actions.loadLotterySelectionStateFlow.start.toString()]: (state) => {
    return mergeState(state, {
      loadLotterySelectionStateFlowStep: FlowStep.Started
    });
  },

  [actions.loadLotterySelectionStateFlow.success.toString()]: (state, selectedSlotId) => {
    return mergeState(state, {
      loadLotterySelectionStateFlowStep: FlowStep.Success,
      selectedSlotId
    });
  },

  [actions.loadLotterySelectionStateFlow.failed.toString()]: (state) => {
    return mergeState(state, {
      loadLotterySelectionStateFlowStep: FlowStep.Failed,
    });
  },

  [actions.loadExecuteLotteryFlow.start.toString()]: (state) => {
    return mergeState(state, {
      loadExecuteLotteryFlowStep: FlowStep.Started
    });
  },

  [actions.loadExecuteLotteryFlow.success.toString()]: (state) => {
    return mergeState(state, {
      loadExecuteLotteryFlowStep: FlowStep.Success,
    });
  },

  [actions.loadExecuteLotteryFlow.failed.toString()]: (state) => {
    return mergeState(state, {
      loadExecuteLotteryFlowStep: FlowStep.Failed
    });
  },
};

const initialState: Partial<LotteryShape> = {
  loadLotteryFlowStep: FlowStep.Unknown,
  loadLotterySelectionStateFlowStep: FlowStep.Unknown,  
  loadExecuteLotteryFlowStep: FlowStep.Unknown,
  selectSlotFlowStep: FlowStep.Unknown,
  selectedSlotId: null
};

export default createReducer<Partial<LotteryShape>>(handlers, initialState);
