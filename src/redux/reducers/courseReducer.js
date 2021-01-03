import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
  // initialize state to empty array
  switch (action.type) {
    case types.CREATE_COURSE:
      // do not push directly onto state; return updated copy of state
      return [...state, { ...action.course }];
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    default:
      // if reducer receive action it doesn't care about, return unchanged state
      return state;
  }
}
