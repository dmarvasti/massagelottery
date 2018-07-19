import { createAction } from "redux-act";

import { createActionFlow } from "../helpers";

// load lottery
export const loadLotteryFlow = createActionFlow("load lottery");

// load execute lottery
export const loadExecuteLotteryFlow = createActionFlow("load execute lottery");

// select slot
export const selectSlot = createActionFlow("select slot");

// load lottery selection state
export const loadLotterySelectionStateFlow = createActionFlow("load lottery selection state");
