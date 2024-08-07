import { useState } from 'react';

const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad;
  const averageScore = (good * 1 + neutral * 0 + bad * -1) / totalFeedback;
  const averagePositive = (good / totalFeedback) * 100;

  return (
    <div>
      <h1>Statistics</h1>
      {totalFeedback === 0 ? (
        <p>No feedback given</p>
      ) : (
        <>
          <p>Good {good}</p>
          <p>Neutral {neutral}</p>
          <p>Bad {bad}</p>
          <p>All {totalFeedback}</p>
          <p>Average {averageScore}</p>
          <p>Positive {averagePositive}%</p>
        </>
      )}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <div>
        <h1>Give Feedback</h1>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
