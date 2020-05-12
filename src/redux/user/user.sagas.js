import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";

import {
  signInFailure,
  signInSuccess,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
} from "./user.actions";

export function* onEmailSignInStart() {
  //watcher
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

/*
  the takeLatest chains the action to the function we state in the second parameter
of takeLatest, so we can destructure our payload from it, and from the payload we
can destructor email and password. 
*/

export function* signInWithEmail({ payload: { email, password } }) {
  //worker

  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    //getting back userAuth object and destructures the user property from it, which contains the info we need.
    yield getUserSnapShotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  //watcher
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signInWithGoogle() {
  //worker
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    //getting back userAuth object and destructures the user property from it, which contains the info we need.
    yield getUserSnapShotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

/*
we are wrapping this in try catch because it's a different API call then
what we have on the signInStart generator functions. and we want to wrap
each api call with its own try catch block
*/

function* getUserSnapShotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

/*
 put is our way to dispatch actions with yield keyword and we are also telling
    redux-sagas to manage this action that we are taking. 
    */

/*
signInSuccess expects to get user object, which it then assigns to it's
    payload. then we get an action object type back that we can dispatch, it's type is
    SIGN_IN_SUCCESS, and it's payload is user. 
    */

export function* onCheckUserSession() {
  /* Note: we haven't added this action to our user-reducer, maybe because it doesn't effect
  the state directly, but we do fire another action that changes the state in
  getUserSnapShotFromUserAuth that triggers the rerendering and persistence 
  (signInSuccess action). 
  */
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* isUserAuthenticated() {
  //API call, so we wrap it in try catch block
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) {
      //no session
      return;
    } else {
      yield getUserSnapShotFromUserAuth(userAuth);
    }
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* signUp({ payload: { displayName, email, password } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getUserSnapShotFromUserAuth(user, additionalData);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}
