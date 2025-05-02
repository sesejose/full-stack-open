const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

const Content = (props) => {
  console.log("Content", props);
  return (
    <div>
      <Part part={props.course.parts[0].name} exercises={props.course.parts[0].exercises} />
      <Part part={props.course.parts[1].name} exercises={props.course.parts[1].exercises} />
      <Part part={props.course.parts[2].name} exercises={props.course.parts[2].exercises} />
    </div>
  );
};

const Part = (props) => {
  return (
    <>
      <br></br>
      {props.part} {props.exercises} <br></br>
    </>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;

// Exercise 2: App declare the variables and pass them as props to the Content component;
// Content pass them to the Part component - vary the values from on instance to another;
// Part just gives the name to two props, defines the place where to put the variables that comes from top;
// Remember the values comes as prop={value} from the Part component in Content component, Part just defines where to put them!
