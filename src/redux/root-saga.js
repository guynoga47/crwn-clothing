/* 
Issues and calls all of our other sagas. 
the reason for this is that sagaMiddleware.run(fetchCollectionsStart) only runs
the fetchCollectionsStart saga and we want to utilize more then one saga, but dont want
to create multiple sagaMiddleware.run on each of the sagas.
we want to run all of them at once, in one large saga which is our reducer.
*/

import { all, call } from "redux-saga/effects";
import { fetchCollectionsStart } from "./shop/shop.sagas";
import { userSagas } from "./user/user.sagas";
import { cartSagas } from "./cart/cart.sagas";
import { shopSagas } from "./shop/shop.sagas";

export default function* rootSaga() {
  yield all([
    call(fetchCollectionsStart),
    call(userSagas),
    call(cartSagas),
    call(shopSagas),
  ]);
}

/* 
all keyword allows us to run multiple sagas concurrently at the start of the application.
if we would yield each saga one after another, it wouldn't be concurrently.
*/
