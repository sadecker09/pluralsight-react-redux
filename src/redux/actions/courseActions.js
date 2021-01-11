import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

// action creators that get called by thunks further below
export function loadCourseSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses: courses };
  // this object is an "action"
  // so the function is called the "action creator"
}
// in real app, also create loadCoursesError action

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course: course}
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course: course}
}


// thunks below - function that returns a function that accepts dispatch as an argument
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

export function saveCourse(course) {
  return function (dispatch, getState) {
    // getState (optional) allows you to access data from Redux store 
    // here we are not using it b/c we are passing coursein directly to the thunk
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        throw error;
      });
  };
}
