import Course from "./Course";

const Courses = ({ courses }) => {
  // const Course = ({ courses }) => courses.map((i) => <Course key={i.id} courses={courses} />);
  return (
    <div>
      <h2>Web development curriculum</h2>
      {courses.map((course) => (
        <Course key={course.id} courses={[course]} />
      ))}
    </div>
  );
};
export default Courses;
