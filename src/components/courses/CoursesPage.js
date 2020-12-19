import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class CoursesPage extends React.Component {
  render() {
    return (
      <>
        <h2>Courses</h2>
        {this.props.courses.map((course) => (
          <div key={course.title}>{course.title}</div>
        ))}
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    courses: state.courses, // expose only whats needed by the component
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //createCourse: (course) => dispatch(courseActions.createCourse(course)),  // less preferred option
    actions: bindActionCreators(courseActions, dispatch),
  };
}
// by declaring mapDispatchToProps and calling it in connect(), the dispatch is no longer injected
// into the container; instead only the actions we specify in mapDispatchToProps are available

// connect returns a function which then calls the CoursesPage component
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
