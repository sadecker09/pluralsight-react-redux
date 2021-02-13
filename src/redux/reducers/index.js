import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  // the key names supplied here will be the key names of the store's state object
  courses,
  authors,
  apiCallsInProgress,
});

export default rootReducer;
