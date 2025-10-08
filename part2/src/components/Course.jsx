// App
//   Course
//     Header
//     Content
//       Part
//       Part
//       ...

// This component receives a course object as a prop from App.jsx
// and renders the course name and its parts with exercises.
// The subcomponents Header, Content, and Part are defined within Course.
// This structure helps in organizing the code and making it reusable.
// The Course component is exported for use in App.jsx.

const Course = ({ course }) => {
  const Header = ({ course }) => <h1>{course.name}</h1>;
  const Part = ({ part }) => (
    <p>
      {part.name} {part.exercises}
    </p>
  );
  const Content = ({ course }) => (
    <div>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
  const Total = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <p>Total of {Total} excercises </p>
    </div>
  );
};

export default Course;
