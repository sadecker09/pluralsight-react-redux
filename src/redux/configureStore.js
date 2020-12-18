import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers"; // note that index not needed, its implied
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

export default function configureStore(initialState) {
  // add support for Redux dev tools
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    initialState,
    // set up middleware that will issue a warning if try to mutate Redux state
    composeEnhancers(applyMiddleware(reduxImmutableStateInvariant())) // do not forget parens to invoke this fxn
  );
}
