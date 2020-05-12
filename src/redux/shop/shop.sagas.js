//this file will hold all of our saga code, related to our shop
import { takeEvery, call, put, all } from "redux-saga/effects";
/* 
Allows us to listen to every action of a specific type that we pass to it,
in this file: FETCH_COLLECTIONS_START action. 
*/
import ShopActionTypes from "./shop.types";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";

//all generator functions must have yield in them.

/*
  Saga implementation with yield takeEvery:

  it's going to pause whenever specific action we want comes in.
  second parameter to takeEvery is another generator function which will run
  as response to every action of the type we are listening to.
  takeEvery is making a nonblocking call so we can run another sagas or code without
  waiting for our fetchCollectionsAsync (the second parameter) to comeback.
   */

export function* fetchCollectionsStart() {
  //watcher-saga
  yield takeEvery(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* fetchCollectionsAsync() {
  //worker-saga
  yield console.log("I am fired");
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get(); //similair to async await
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}

/* 
  yield call is used when we want to call a function but we want to allow it to defer control 
  at the yield row in the execution, back to the saga middleware.
  This is in case it takes longer then expected, then we utilize the saga call effect. 
  first argument = the function we want to invoke, subsequent arguments = the function parameters.
  in this case it's not neccessary since convertCollectionsSnapshotToMap shouldn't take long.

  yield put instead of dispatching actions. every time we use yield keyword
  it's like asyncronous action because its non-blocking and we allow concurrency
  with other functions. 

  replaces:
  collectionRef
    .get()
    .then((snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      dispatch(fetchCollectionsSuccess(collectionsMap));
    })
    .catch((error) => dispatch(fetchCollectionsFailure(error.message)));

  */
