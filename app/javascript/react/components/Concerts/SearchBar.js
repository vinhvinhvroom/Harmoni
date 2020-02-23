import React, { useState } from "react"

const SearchBar = (props) => {
  const [search, setSearch] = useState({
    probe: ""
  })
  const[loading, setLoading] = useState(false)

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
    setLoading(true)
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
        debugger
        props.noConcerts();
        setLoading(false);
        setSearch({
          probe: ""
        })
        throw new Error(response.status + ": " + response.statusText);
      }
    })
    .then(body => {
      props.searchResults(body)
      setLoading(false)
      setSearch({
        probe: ""
      })
    })
    .catch(error => {console.error("Error searching show: " + error.message)})
  }

  return(
    <>
      <form onSubmit={handleSubmit} className="search-bar-wrapper" autoComplete="off">
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
            <div className="search-submit-container">
              <input type="submit" value="Search" className="button search-submit"/>
            </div>
        </div>
      </form>
      {loading &&
        <div className="loader"></div>
      }
    </>
  )
}

export default SearchBar
