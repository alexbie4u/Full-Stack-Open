import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  // State of the votes
  const initialPoints = new Uint8Array(8); // Creating a new array with zeros.
  const [copy, setCopy] = useState([...initialPoints]);

  // Currently selected anecdota
  const [selected, setSelected] = useState(0);


  // Find the highest number of votes and its index
  const highestVote = Math.max(...copy);
  const highestVoteIndex = copy.indexOf(highestVote);
  console.log(highestVote)
  console.log(highestVoteIndex)

  const AnecdoteButton = ({ text }) => {
    return (
      <button onClick={() => setSelected(Math.floor(Math.random() * 8))}>
        {text}
      </button>
    );
  };

  const VoteButton = ({ text }) => {
    return (
      <button onClick={() => handleVote()}>
        {text}
      </button>
    );
  };

const handleVote = () => {
  const copyArray = [...copy];
  copyArray[selected] += 1;
  setCopy(copyArray);
}

  return (
    <div>
      <div>
        {anecdotes[selected]}
        <p>has {copy[selected]} votes</p>
      </div>
      <div>
        <VoteButton text="Vote" />
        <AnecdoteButton text="New anecdote"/>
      </div>
      <div>
        <h1>Anecdote with most votes:</h1>
        {anecdotes[highestVoteIndex]}
      </div>
    </div>
  )
}

// Generate a random number: Math.floor(Math.random() * 8);

export default App