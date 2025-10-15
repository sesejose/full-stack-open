const Course = ({ courses }) => {
  const Headline = () => courses.map((i) => <h2 key={i.id}>{i.name}</h2>);
  const Parts = () =>
    courses.map((i) =>
      i.parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))
    );
  const Total = courses.map((course) => course.parts.reduce((sum, part) => sum + part.exercises, 0));

  return (
    <>
      <Headline></Headline>
      <Parts></Parts>
      <p>Total of {Total} excercises </p>
    </>
  );
};

export default Course;
