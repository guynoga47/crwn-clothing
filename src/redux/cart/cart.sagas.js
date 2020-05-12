import { all, call, takeLatest, put } from "redux-saga/effects";

import UserActionTypes from "../user//user.types";
import { clearCart } from "./cart.action";

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignout);
}

export function* clearCartOnSignout() {
  yield put(clearCart());
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}
