import { FlowStep } from "../helpers";
import { Lottery } from "../../generated/api"

export interface LotteryShape {
  loadLotteryFlowStep: FlowStep,
  lottery: Lottery,
  selectSlotFlowStep: FlowStep;
  selectedSlotId: string | null;
}
