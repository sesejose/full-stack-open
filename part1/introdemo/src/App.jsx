import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  console.log("Selected", selected);
  // the votes state is an array of 8 elements, each initialized to 0
  // the length of the array of votes is equal to the number of anecdotes
  // the votes state is used to keep track of the number of votes for each anecdote
  // the initial state of "votes" is set to an array of 8 elements, each initialized to 0
  // the votes state is updated when the vote button is clicked

  const vote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
    // I created a copy of the votes array using the spread operator
    // the spread operator (...) is used to create a new array with the same values as the previous state
    // the copy array is updated by incrementing the value at the index of the selected anecdote by 1
    // the copy array uses the selected (anecdote) state to determine which vote (index in the array) to increment
    // The addition assignment (+=) operator performs addition / It could also be ++
  };

  const otherAnecdote = () => {
    // there are 8 anecdotes in total // the initial state is set to 0
    setSelected(Math.floor(Math.random() * anecdotes.length));
    // the state is updated to a random number between 0 and 7 when the button is clicked
    // the random number is generated using Math.random() and Math.floor()
    // the Math.random() function generates a random number between 0 and 1
    // the Math.floor() function rounds the number down to the nearest integer
    // the random number is multiplied by the length of the anecdotes array to get a number between 0 and 7
  };

  const mostVotedAnecdote = (votes, anecdotes) => {
    const maxVotes = Math.max(...votes);
    const index = votes.indexOf(maxVotes);
    return anecdotes[index];
  };
  // the mostVotedAnecdote function takes two arguments: votes and anecdotes
  // Math.max(...votes) returns the maximum value in the votes array
  // votes.indexOf(maxVotes) returns the index of that value in the votes array
  // the index is used to get the corresponding anecdote from the anecdotes array
  // the mostVotedAnecdote function returns that index from the anecdotes array

  return (
    <>
      <h1>Anecdote of the day</h1>
      <h3>{anecdotes[selected]}</h3>
      <p>This anecdote has {votes[selected]} votes</p>
      <Button onClick={otherAnecdote} text="Next anecdote" />
      <Button onClick={vote} text="Vote" />
      <h1>Anecdote with most votes</h1>
      <h3>{mostVotedAnecdote(votes, anecdotes)}</h3>
      <p>This anecdote has {Math.max(...votes)} votes</p>
      {/* the Math.max() function returns the largest number in a set of numbers */}
      {/* the spread operator (...) is used to pass the elements of the votes array as individual arguments to the Math.max() function */}
      {/* the mostVotedAnecdote function is called with the votes and anecdotes arrays (states) as arguments - it will use them */}
      {/* in h3 the mostVotedAnecdote function returns the anecdote with the most votes */}
    </>
  );
};

export default App;
