import * as H from "history";
import {routerMiddleware, routerReducer} from "react-router-redux";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./rootReducer";
import {rootSaga} from "./rootSaga";
import {StoreShape} from "./shape/storeShape";

function configureStore(history: H.History, initialState?: StoreShape) {

  // Enables react-router-redux
  const routerMiddlewareWithHistory = routerMiddleware(history);

  // Enables redux-saga
  const sagaMiddleware = createSagaMiddleware();

  // Combines our middlewares all together
  const combinedMiddlewares = [routerMiddlewareWithHistory, sagaMiddleware];

  const enhancers = compose(
    // Middleware store enhancer.
    applyMiddleware(
      ...combinedMiddlewares,
    ),
    // Redux Dev Tools store enhancer.
    // @see https://github.com/zalmoxisus/redux-devtools-extension
    // We only want this enhancer enabled for development and when in a browser
    // with the extension installed.
    typeof window !== "undefined"
    && typeof (window as any).devToolsExtension !== "undefined"
      // Call the brower extension function to create the enhancer.
      ? (window as any).devToolsExtension()
      // Else we return a no-op function.
      : (f) => f,
    );

  // Combine our reducers
  const combinedReducers = combineReducers({
    ...reducers,
    routerReducer
  });

  const store = initialState
  ? createStore(combinedReducers, initialState, enhancers)
  : createStore(combinedReducers, enhancers);

  if (process.env.NODE_ENV === "development" && (module as any).hot) {
    // Enable Webpack hot module replacement for reducers. This is so that we
    // don't lose all of our current application state during hot reloading.
    (module as any).hot.accept("./rootReducer", () => {
      const nextRootReducer = require("./rootReducer").rootReducer; // eslint-disable-line global-require

      store.replaceReducer(nextRootReducer);
    });
  }

  // Start the Saga
  sagaMiddleware.run(rootSaga);

  return store;
}

export default configureStore;
