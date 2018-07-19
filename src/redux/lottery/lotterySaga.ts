
/* tslint:disable */

import { call, put, race, take, takeLatest } from "redux-saga/effects";
import { delay } from "redux-saga";

import { AdminsApi, UsersApi } from "../../utils/api";

import * as lotteryActions from "./lotteryActions";

const lotteryId = 11;



export function* doLoadLotteryFlow() {
  
  try {
    yield put(lotteryActions.loadLotteryFlow.start());
    yield put(lotteryActions.loadLotterySelectionStateFlow.try());

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
 */
export function* doLoadExecuteLotteryFlow() {
  
  try {
    yield put(lotteryActions.loadExecuteLotteryFlow.start());

    const response = yield call(AdminsApi.executeLottery, {
      "lotteryId": lotteryId,
      "lottery": {
        "isFinished": true
      }
    });
    yield put(lotteryActions.loadExecuteLotteryFlow.success(response));
    yield put(lotteryActions.loadLotteryFlow.try());
  } catch(e) {
    yield put(lotteryActions.loadExecuteLotteryFlow.failed());
  } finally {
    yield put(lotteryActions.loadExecuteLotteryFlow.done());
  }
};


/**
 * Poll lottery worker
 */
export function* doLotteryPolling(action) {
  while (true) {
    yield call(delay, 4000);
    yield put(lotteryActions.loadLotteryFlow.try());   
  }
}


/**
 * 
 * @param action 
 */
export function* doSelectSlotFlow(action) {
 
  const { slotId } = action.payload;
  
  try {
    yield put(lotteryActions.selectSlot.start());
    
    const response = yield call(UsersApi.registerSlot, {
      "slot": {
        "isSelected": true
      },  
      "slotId": slotId,
    });

    yield put(lotteryActions.selectSlot.success(slotId));
    yield put(lotteryActions.loadLotteryFlow.try());
  } catch(e) {
    yield put(lotteryActions.selectSlot.failed());
  } finally {
    yield put(lotteryActions.selectSlot.done());
  }
};


export function* doLoadLotterySelectionStateFlow(action) {
  
  try {
    yield put(lotteryActions.loadLotterySelectionStateFlow.start());

    const { selectedSlotId } = yield call(UsersApi.lotterySelectionState, {
      lotteryId
    });

    yield put(lotteryActions.loadLotterySelectionStateFlow.success( selectedSlotId ));
  } catch(e) {
    yield put(lotteryActions.loadLotterySelectionStateFlow.failed());
  } finally {
    yield put(lotteryActions.loadLotterySelectionStateFlow.done());
  }
}


export default function* lotterySaga() {
  yield [
    takeLatest(lotteryActions.loadLotteryFlow.try, doLoadLotteryFlow),
    takeLatest(lotteryActions.loadExecuteLotteryFlow.try, doLoadExecuteLotteryFlow),
    takeLatest(lotteryActions.selectSlot.try, doSelectSlotFlow),
    takeLatest(lotteryActions.loadLotterySelectionStateFlow.try, doLoadLotterySelectionStateFlow),
    takeLatest(lotteryActions.startLotteryPolling, doLotteryPolling),
  ];
}
