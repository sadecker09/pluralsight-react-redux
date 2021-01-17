// Compare this to CourseForm.ReactTestingLibrary.test.js alternative
import React from "react";
import CourseForm from "./CourseForm";
import { shallow } from "enzyme";

// factory function
function renderCourseForm(args) {
  // defaultProps can be overwritten with args
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {},
  };

  const props = { ...defaultProps, ...args }; // blends default and args together
  return shallow(<CourseForm {...props} />);
}

it("renders form and header", () => {
  const wrapper = renderCourseForm();
  // console.log(wrapper.debug());
  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h2").text()).toEqual("Add Course");
});

// alternative way to test the same thing we're testing in the Snapshot test
it('labels save buttons as "Save" when not saving', () => {
  const wrapper = renderCourseForm();
  expect(wrapper.find("button").text()).toBe("Save");
});

it('labels save button as "Saving..." when saving', () => {
  const wrapper = renderCourseForm({ saving: true });
  expect(wrapper.find("button").text()).toBe("Saving...");
});
