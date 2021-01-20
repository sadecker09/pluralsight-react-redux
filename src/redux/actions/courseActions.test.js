// Per course instructor: testing action creator may not be very useful
import * as courseActions from "./courseActions";
import * as types from "./actionTypes";
import { courses } from "../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

// testing a thunk requires mocking two things:
// 1) store - by using redux-mock-store
// 2) http calls - by using fetch-mock

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Load Courses Thunk", () => {
    it("should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS when loading courses", () => {
      // configure fetchMock; this captures all fetch calls and reponds w/ mock data
      fetchMock.mock("*", {
        body: courses,
        headers: { "content-type": "application/json" }
      });

      // goal is to assert that these actions are created
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_COURSES_SUCCESS, courses }
      ];

      // mock redux store, initialized w/ empty array of courses
      const store = mockStore({ courses: [] });
      // dispatch loadCourses action which returns promise
      return store.dispatch(courseActions.loadCourses()).then(() => {
        // calling getActions will return a list of actions that have occurred
        // assert that these match the expectation 
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe("createCourseSuccess", () => {
  it("should create a CREATE_COURSE_SUCCESS action", () => {
    //arrange
    const course = courses[0];
    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS,
      course
    };

    //act
    const action = courseActions.createCourseSuccess(course);

    //assert
    expect(action).toEqual(expectedAction);
  });
});
