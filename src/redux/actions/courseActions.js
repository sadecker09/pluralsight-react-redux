import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

export function createCourse(course) {
  return { type: types.CREATE_COURSE, course: course };
  // this object is an "action"
  // so the function is called the "action creator"
}

// action creator that gets called by below thunk
export function loadCourseSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses: courses };
}
// in real app, also create loadCoursesError action

// thunk - function that returns a function that accepts dispatch as an argument
export function loadCourses() {
  // redux-thunk middleware passes (injects) dispatch as an argument to the thunk which is
  // how this inner function can accept dispatch as an argument
  // this is beneficial b/c we don't have to pass dispatch in ourselves and therefore our
  // calling code can look the same for both sync and async calls
  return function (dispatch) {
    return courseApi
      .getCourses()
      .then((courses) => {
        // dispatch the action
        dispatch(loadCourseSuccess(courses));
      })
      .catch((error) => {
        throw error;
        // in real app, dispatch another action that lets the app
        // know the request failed
      });
  };
}
