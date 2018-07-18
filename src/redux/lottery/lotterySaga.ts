/* tslint:disable */

import { call, put, takeLatest } from "redux-saga/effects";
import { AdminsApi, UsersApi } from "../../utils/api";

import * as lotteryActions from "./lotteryActions";




export function* doLoadLotteryFlow() {
  
  const lotteryId = 3;

  try {
    yield put(lotteryActions.loadLotteryFlow.start());

    const response = yield call(UsersApi.getLottery, {
      lotteryId
    });
    yield put(lotteryActions.loadLotteryFlow.success(response));
  } catch(e) {
    yield put(lotteryActions.loadLotteryFlow.failed());
  } finally {
    yield put(lotteryActions.loadLotteryFlow.done());
  }
};

/**
 * 
 * @param action 
 */
export function* doSelectSlotFlow(action) {
 
  const { slotId } = action.payload;

  try {
    yield put(lotteryActions.selectSlot.start());

    const response = yield call(UsersApi.registerSlot, {
      slotId
    });

    yield put(lotteryActions.selectSlot.success(slotId));
  } catch(e) {
    yield put(lotteryActions.selectSlot.failed());
  } finally {
    yield put(lotteryActions.selectSlot.done());
  }
};






export default function* lotterySaga() {
  yield [
    takeLatest(lotteryActions.loadLotteryFlow.try, doLoadLotteryFlow),
    takeLatest(lotteryActions.selectSlot.try, doSelectSlotFlow),
    
  ];
}
