/* tslint:disable */

import { call, put, takeLatest } from "redux-saga/effects";
import { AdminsApi, UsersApi } from "../../utils/api";

import * as lotteryActions from "./lotteryActions";




export function* doLoadLotteryFlow() {
  
  const lotteryId = "3";

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












export default function* lotterySaga() {
  yield [
    takeLatest(lotteryActions.loadLotteryFlow.try, doLoadLotteryFlow),
  ];
}
