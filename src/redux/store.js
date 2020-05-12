import { createStore, applyMiddleware } from "redux";
import rootSaga from "./root-saga";
import logger from "redux-logger";
import rootReducer from "./root-reducer";
import { persistStore } from "redux-persist";
//import thunk from 'redux-thunk', switched to saga
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

//the rootReducer here is the persistedReducer that we
//export default from the root-reducer after applying
//persist

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistor };
