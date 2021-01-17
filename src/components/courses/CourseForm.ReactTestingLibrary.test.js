// Compare this to CourseForm.Enzyme.test.js alternative
// with React Testing Library, there is no shallow rendering;
// components are always mounted
import React from "react";
import { cleanup, render } from "react-testing-library";
import CourseForm from "./CourseForm";

afterEach(cleanup);

// factory function
function renderCourseForm(args) {
  let defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {},
  };

  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}

it("should render Add Course header", () => {
  const { getByText } = renderCourseForm();
  getByText("Add Course"); // assertion built-in, dont need to call expect
});

it('should label save button as "Save" when not saving', () => {
  const { getByText } = renderCourseForm();
  getByText("Save");
});

it('should label save button as "Saving..." when saving', () => {
  const { getByText, debug } = renderCourseForm({ saving: true });
  // debug();
  getByText("Saving...");
});
