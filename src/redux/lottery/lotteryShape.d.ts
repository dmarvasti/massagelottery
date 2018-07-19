import { FlowStep } from "../helpers";
import { Lottery } from "../../generated/api"

export interface LotteryShape {
  loadLotteryFlowStep: FlowStep,
  loadLotterySelectionStateFlowStep: FlowStep,
  loadExecuteLotteryFlowStep: FlowStep,
  lottery: Lottery,
  selectSlotFlowStep: FlowStep;
  selectedSlotId: string | null;
}
