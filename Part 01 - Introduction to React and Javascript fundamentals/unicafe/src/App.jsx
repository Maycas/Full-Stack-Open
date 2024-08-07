import { useState } from 'react';

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad;
  const averageScore = (good * 1 + neutral * 0 + bad * -1) / totalFeedback;
  const averagePositive = (good / totalFeedback) * 100;

  return (
    <>
      <h1>Statistics</h1>
      {totalFeedback === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine text='Good' value={good} />
            <StatisticLine text='Neutral' value={neutral} />
            <StatisticLine text='Bad' value={bad} />
            <StatisticLine text='All' value={totalFeedback} />
            <StatisticLine text='Average' value={averageScore} />
            <StatisticLine text='Positive' value={averagePositive + ' %'} />
          </tbody>
        </table>
      )}
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>Give Feedback</h1>
      <Button text='Good' handleClick={() => setGood(good + 1)} />
      <Button text='Neutral' handleClick={() => setNeutral(neutral + 1)} />
      <Button text='Bad' handleClick={() => setBad(bad + 1)} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
