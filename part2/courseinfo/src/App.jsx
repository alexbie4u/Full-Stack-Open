const Sum = ({ courses }) => {
  const parts = courses['parts']

  const sum = parts.reduce((total, part) => total + part.exercises, 0)

  console.log(sum);

  return (
    <div>
      {sum}
    </div>
  )
  // let exerciseArray = exercises.map((exercise) => )
}

const Courses = ({ courses }) => {
  const parts = courses['parts']

    return (
      <div>
        <h1>
          {courses['name']}
        </h1>
        <ul>
          {parts.map(part =>
            <li key={part.id}>
              {part['name'] + ' ' + part['exercises']}
            </li>
          )}
          
        </ul>
      </div>
    )
  }

const App = () => {
  
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  return (
    <div>
    <Courses courses={courses} />
    <Sum courses={courses} />
    </div>
  )
}


// Div containing the individual parts with their [name] and [exercises] from the object

export default App