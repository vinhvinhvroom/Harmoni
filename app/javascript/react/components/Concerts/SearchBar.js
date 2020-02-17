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
        throw new Error(response.status + ": " + response.statusText)
      }
    })
    .then(body => {
      props.searchResults(body)
    })
    .catch(error => console.error("Error searching show: " + error.message))
  }

  return(
    <form onClick={handleSubmit} className="search">
      <div className="row medium-unstack">
        <label htmlFor="probe" className="medium-2 columns">
          Type your favorite artist and see upcoming shows from other artists you may like!
        </label>
          <input
            name="probe"
            onChange={handleInput}
            value={search.probe}
            placeholder="Find new music by typing your favorite Artist"
            type="text"
            className="medium-8 columns"
            />
        <input type="submit" value="Search" className="medium-2 columns button primary"/>
      </div>
    </form>
  )
}

export default SearchBar
