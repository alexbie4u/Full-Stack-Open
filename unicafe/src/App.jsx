import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // console.log(good)
  // console.log(neutral)
  // console.log(bad)
  
  return (
    <div>
      <GiveFeedback />
      <button onClick={() => setGood(good + 1)}>
      Good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
      Neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
      Bad
      </button>
      

      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

const feedbackButton = () => {
  
}

const GiveFeedback = () => {
  return (
    <h1>
      Give feedback, mate:
    </h1>
  )
}

const StatisticLine = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
);

const Statistics = ({good, neutral, bad}) => {
  let totalFeedback = good+neutral+bad

  if (totalFeedback === 0) {
    return (
      <div>
      <h1>
        Statistics:
      </h1>
        <p>No feedback given.</p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>
          Statistics:
        </h1>
        <StatisticLine text="Good:" value={good}/>
        <StatisticLine text="Neutral:" value={neutral}/>
        <StatisticLine text="Bad:" value={bad}/>
        <StatisticLine text="Total Feedback:" value={totalFeedback}/>
        <StatisticLine text="Average:" value={(good-bad)/totalFeedback}/>
        <StatisticLine text="Positive %:" value={good/totalFeedback * 100}/>
      </div>
    )
  }
}

export default App

