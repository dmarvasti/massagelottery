import { AuthShape } from "../auth/authShape";
import { LotteryShape } from "../lottery/lotteryShape";


export interface StoreShape {
  auth: AuthShape;
  lottery: LotteryShape;
}
