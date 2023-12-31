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
      <FeedbackButton buttonType={good} setButtonType={setGood} text="Good" />
      <FeedbackButton buttonType={neutral} setButtonType={setNeutral} text="Neutral" />
      <FeedbackButton buttonType={bad} setButtonType={setBad} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const FeedbackButton = ({buttonType, setButtonType, text}) => {
  return (
    <button onClick={() => setButtonType(buttonType + 1)}>
    {text}
    </button>
  )
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
        {/* <StatisticLine text="Good:" value={good}/>
        <StatisticLine text="Neutral:" value={neutral}/>
        <StatisticLine text="Bad:" value={bad}/>
        <StatisticLine text="Total Feedback:" value={totalFeedback}/>
        <StatisticLine text="Average:" value={(good-bad)/totalFeedback}/>
        <StatisticLine text="Positive %:" value={good/totalFeedback * 100}/> */}
      <table>
        <tr>
          <td>Good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>Neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>Bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>Total Feedback</td>
          <td>{totalFeedback}</td>
        </tr>
        <tr>
          <td>Average</td>
          <td>{(good-bad)/totalFeedback}</td>
        </tr>
        <tr>
          <td>Positive %</td>
          <td>{good/totalFeedback * 100}</td>
        </tr>
      </table>
        

      </div>
    )
  }
}

export default App

