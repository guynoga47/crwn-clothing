import { takeLatest, delay, put } from "redux-saga/effects";

export function* onIncrement() {
  yield console.log("I am incremented");
  yield delay(3000);
  yield put({ type: "INCREMENT_FROM_SAGA" });
}

export function* incrementSaga() {
  yield takeLatest("INCREMENT", onIncrement);
}

/*
takeEvery: 
we are dispatching every action of the type we are listening to completely, 
and creating multiple instances of the relevant generator function (the saga).

takeLatest:
we are dispatching every action of the type we are listening to, and creating multiple instances of the relevant generator function (the saga)
but we are only resolving the latest action we dispatched, canceling the previous dispatched actions (function calls).

take:
both takeEvery and takeLatest are based on take. 
what take does is listening to an action of a certain type, but the function we are executing in response to that action are the following lines
after "yield take ('INCREMENT)". so we are only yielding control to redux-saga once, and that is in the "yield take ('INCREMENT)" line. after that, dispatching the same
action would not invoke another instance of the generator function which yield take is in.
*/
