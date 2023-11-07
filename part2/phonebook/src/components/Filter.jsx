const Filter = ({filterText, handleFilterChange}) => {
    return (
    <div>
        <p>Filter shown with </p>
        <input
            type="search"
            value={filterText}
            onChange={handleFilterChange}
            className="input"
            placeholder="Filter"
            />
    </div>
    )
}

export default Filter;