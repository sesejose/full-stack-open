const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  console.log("Content", props);
  return (
    <div>
      <Part part={props.part1} exercises={props.exercises1} />
      <Part part={props.part2} exercises={props.exercises2} />
      <Part part={props.part3} exercises={props.exercises3} />
      {/* <p>
        {props.part1} {props.exercises1}
      </p>
      <p>
        {props.part2} {props.exercises2}
      </p>
      <p>
        {props.part3} {props.exercises3}
      </p> */}
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
  return <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  );
};

export default App;

// Exercise 2: App declare the variables and pass them as props to the Content component;
// Content pass them to the Part component - vary the values from on instance to another;
// Part just gives the name to two props, defines the place where to put the variables that comes from top;
// Remember the values comes as prop={value} from the Part component in Content component, Part just defines where to put them!
