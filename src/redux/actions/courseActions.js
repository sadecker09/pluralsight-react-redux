import * as types from "./actionTypes";

export function createCourse(course) {
  return { type: types.CREATE_COURSE, course: course };
  // this object is an "action"
  // so the function is called the "action creator"
}
