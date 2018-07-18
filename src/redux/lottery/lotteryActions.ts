import { createAction } from "redux-act";

import { createActionFlow } from "../helpers";

// load lottery
export const loadLotteryFlow = createActionFlow("load lottery");

// select slot
export const selectSlot = createActionFlow("select slot");

