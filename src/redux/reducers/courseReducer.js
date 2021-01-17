import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
  // initialize state to empty array
  switch (action.type) {
    case types.CREATE_COURSE_SUCCESS:
      // do not push directly onto state; return updated copy of state
      return [...state, { ...action.course }];
    case types.UPDATE_COURSE_SUCCESS:
      // map over state which creates a new array; replace element w/ matching id
      return state.map((course) =>
        course.id === action.course.id ? action.course : course
      );
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.DELETE_COURSE_OPTIMISTIC:
      return state.filter((course) => course.id !== action.course.id);
    default:
      // if reducer receive action it doesn't care about, return unchanged state
      return state;
  }
}
