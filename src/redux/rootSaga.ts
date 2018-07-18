import { all, fork } from "redux-saga/effects";
import lotterySaga from "./lottery/lotterySaga"

export const rootSaga = function* mainSaga() {
  yield all([
    fork(lotterySaga)
  ]);
};
