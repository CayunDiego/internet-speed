import React from 'react'

const Search = ({ handleSearchChange }) => {
  return (
    <div className="search-section">
      <input
        type="text"
        id="search-input"
        placeholder="Search medical topics..."
        onChange={handleSearchChange}
      />
    </div>
  )
}

export default Search