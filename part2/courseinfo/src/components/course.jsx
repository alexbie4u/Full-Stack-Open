const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ course }) => {
  const sum = course.parts.reduce((total, part) => total + part.exercises, 0);
  return <p>Number of exercises {sum}</p>
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <ul style={{ listStyleType: 'none', padding: 6}}>
    {parts.map((part) =>
    <li key={part.id}>
      {part.name} {part.exercises}
    </li>
    )}
  </ul>

const Course = ({ course }) => (
  <div>
    <Header course={course.name} /> 
    <Content parts={course.parts} />
    <Total course={course}/>
  </div>
)

export default Course