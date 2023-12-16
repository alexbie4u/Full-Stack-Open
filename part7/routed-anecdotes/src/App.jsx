import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useMatch, useNavigate
} from 'react-router-dom'
import { useState } from 'react'
import PropTypes from 'prop-types';
import { useField } from './hooks';
import { Table } from 'react-bootstrap'

export const Menu = ({ anecdotes, addNew, createNotification }) => {
  const padding = {
    paddingRight: 5
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match 
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  return (
    <div>
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>
      
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes}/>} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} createNotification={createNotification}/>} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
        {anecdotes.map(anecdote => 
        <tr key={anecdote.id} >
          <td>
            <Link to={`/anecdotes/${anecdote.id}`}>
              {anecdote.content}
            </Link>
          </td>
        </tr>)}
      </tbody>
    </Table>
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>{anecdote.author}</div>
      <div>{anecdote.info}</div>
      <div>{anecdote.votes}</div>
    </div>
  )

}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = ({ addNew, createNotification }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
    createNotification(`Anecdote "${content.value}" created successfully!`)
  }

  const extractInputProps = (field) => ({ value: field.value, onChange: field.onChange });

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content:
          <input {...extractInputProps(content)} />
        </div>
        <div>
          author:
          <input {...extractInputProps(author)} />
        </div>
        <div>
          url for more info:
          <input {...extractInputProps(info)} />
        </div>
        <button>create</button>
      </form>
      <button onClick={() => { content.reset(); author.reset(); info.reset(); }}>reset</button>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const Notification = ({notification}) => {
    console.log(notification);
    return (
    <h3>{notification}</h3>
    )
  }

  const createNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div className="container">
      <h1>Software anecdotes</h1>
      <Notification notification={notification}/>
      <Menu anecdotes={anecdotes} addNew={addNew} createNotification={createNotification}/>
      <Footer />
    </div>
  )
}

AnecdoteList.propTypes = {
  anecdotes: PropTypes.array.isRequired,
};

Anecdote.propTypes = {
  anecdote: PropTypes.shape({
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }),
};


CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired,
};

Menu.propTypes = {
  addNew: PropTypes.func.isRequired,
  anecdotes: PropTypes.array.isRequired
};


export default App
