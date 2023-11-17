const Person = ({ person }) => {
    return (
      <li className="person">
        {person.name} 
        {person.number}
      </li>
    )
  }

export default Person