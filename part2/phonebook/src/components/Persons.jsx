const Persons = ({person, filteredPersons}) => {
    return (
    <ul>
        <div className="user-list">
            {filteredPersons && filteredPersons.length > 0 ? (
            filteredPersons.map((person) => (
                <li key={person.id} className="person">
                <span className="person-name">{person.name} </span>
                <span className="person-number">{person.number}</span>
                </li>
            ))
            ) : (
            <h3>No results found!</h3>
            )}
        </div>
    </ul>
    )
}

export default Persons