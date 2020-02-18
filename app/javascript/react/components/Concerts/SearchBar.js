import React, { useState } from "react"

const SearchBar = (props) => {
  const [search, setSearch] = useState({
    probe: ""
  })

  const handleInput = (event) => {
    let key = event.currentTarget.name
    let value = event.currentTarget.value
    setSearch({
      ...search,
      [key]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let body = new FormData()
    body.append("search[probe]", search.probe)
    fetch(`/api/v1/tracks/search`, {
      method: "POST",
      body: body,
      credentials: "same-origin",
      headers: {
        "Accept": "application/json"
      }
    })
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        props.noConcerts();
        setSearch({
          probe: ""
        })
        throw new Error(response.status + ": " + response.statusText);
      }
    })
    .then(body => {
      props.searchResults(body)
      setSearch({
        probe: ""
      })
    })
    .catch(error => console.error("Error searching show: " + error.message))
  }

  return(
    <form onSubmit={handleSubmit} className="search-bar-wrapper">
      <div className="row medium-unstack search-container">
        <label htmlFor="probe" className="columns small-10 medium-6 search-label">
          Type your favorite artist and see upcoming shows from related artists!
        </label>
          <input
            name="probe"
            onChange={handleInput}
            value={search.probe}
            placeholder="Find new music by typing your favorite Artist"
            type="text"
            className="medium-8 columns search-bar"
            />
          <input type="submit" value="Search" className="button search-submit"/>
      </div>
    </form>
  )
}

export default SearchBar
