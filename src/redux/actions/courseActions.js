export function createCourse(course) {
  return { type: "CREATE_COURSE", course: course };
  // this object is an "action"
  // so the function is called the "action creator"
}
