import { useState } from 'react';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const totalFeedback = good + neutral + bad;
  const averageScore = totalFeedback !== 0 ? (good - bad) / totalFeedback : 0;
  const averagePositive =
    totalFeedback !== 0 ? (good / totalFeedback) * 100 : 0;

  return (
    <>
      <div>
        <h1>Give Feedback</h1>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>

      <div>
        <h1>Statistics</h1>
        <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p>
        <p>All {totalFeedback}</p>
        <p>Average {averageScore}</p>
        <p>Positive {averagePositive}%</p>
      </div>
    </>
  );
};

export default App;
