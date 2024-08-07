import { useState } from 'react';

const AnecdoteInfo = ({ text, votes }) => (
  <>
    <div>{text}</div>
    <div>Has {votes} votes</div>
  </>
);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length));

  const mostVotedIndex = points.reduce(
    (maxIndex, currentValue, currentIndex, arr) =>
      currentValue > arr[maxIndex] ? currentIndex : maxIndex,
    0
  );

  const handleNextAnecdoteClick = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const handleVote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <AnecdoteInfo text={anecdotes[selected]} votes={points[selected]} />
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleNextAnecdoteClick}>Next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <AnecdoteInfo
        text={anecdotes[mostVotedIndex]}
        votes={points[mostVotedIndex]}
      />
    </>
  );
};

export default App;
