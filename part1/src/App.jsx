const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      }
    ]
  }

  const exercisesArray = course.parts.map(part => part.exercises);

  return (
    <div>
      <Header course={course}/>
      <Content parts={course['parts']}/>
      <Total exercises={exercisesArray} />
    </div>
  )
}

const Header = ({course}) => {
  return (
    <h1>
     {course['name']} 
    </h1>
  )
}

const Part1 = ({parts}) => {
  return (
    <p>
      {parts[0].name} {parts[0].exercises}
    </p>
  );
}

const Part2 = ({parts}) => {
  return (
    <p>
      {parts[1].name} {parts[1].exercises}
    </p>
  );
}

const Part3 = ({parts}) => {
  return (
    <p>
      {parts[2].name} {parts[2].exercises}
    </p>
  );
}

const Content = ({parts}) => {

  return (
    <div>
      <Part1 parts = {parts}/>
      <Part2 parts = {parts}/>
      <Part3 parts = {parts}/>
    </div>
  );
}

// 

const Total = ({exercises}) => {
console.log(exercises)
console.log(exercises[0])

  return (
    <p>Number of exercises {exercises[0] + exercises[1] + exercises[2]}</p>
  )
}


export default App