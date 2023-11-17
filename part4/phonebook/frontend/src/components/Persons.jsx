const Persons = ({person, filteredPersons, deletePerson}) => {
    return (
    <ul>
        <div className="user-list">
            {filteredPersons && filteredPersons.length > 0 ? (
            filteredPersons.map((person) => (
                <li key={person.id} className="person">
                    <span className="person-name">{person.name} </span>
                    <span className="person-number">{person.number}</span>
                    <button onClick={() => {
                        if (window.confirm(`Are you sure you want to delete ${person.name}`)) {
                            deletePerson(person.id);
                        }
                    }}
                    >Delete</button>
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