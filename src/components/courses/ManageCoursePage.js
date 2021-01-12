import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  // the rest operator used above to assign any left over props not explicitly destructured
  // to a variable called props
  // this allows us to reference props.course below in useState and avoid having
  // two variables named course (i.e. if we had destructured course)
  // another option is to alias course in the destructuring
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    } else {
      // this will copy the course passed in on props to state
      // anytime a new course is passed in on props since the useEffect hook
      // is watching for changes to props.course
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }, [props.course]);
  // empty array in this argument would mean the effect will run once when the component mounts
  // effectively same as componentDidMount()
  // but we should have it watch changes on props.course so that when a new course is
  // added on props, the effect will run and we can update state

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    saveCourse(course).then(() => {
      toast.success("Course Saved.");
      history.push("/courses");
      // can use <Redirect> or history.push to redirect
    });
    // saveCourse is passed in on props and already bound to dispatch
    // the bound saveCourse function on props takes precedence over the
    // unbound saveCourse thunk thats imported at the top
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

// called selector function since it selects data from Redux store
// could also place this in reducer for reusability
// for performance, could memoize by using Reselect library
export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  // ownProps automatically populated by Redux; allows access to components props
  // so can use this read URL data injected on props by React Router
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  // if slug not null and courses has been populated (by async api call),
  // find the course by using the slug
  // then this course will be mapped to course in props
  // otherwise, newCourse mapped to course
  // remember that mapStateToProps runs each time Redux store changes, so when
  // courses are available, getCourseBySlug will be called
  return {
    // expose only whats needed by the component
    course: course,
    courses: state.courses,
    authors: state.authors,
  };
}

// using object mapping form instead of bindActionCreators
const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse,
};
// Note that these names are the same as the unbound thunks imported at the top

// connect returns a function which then calls the ManageCoursePage component
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
