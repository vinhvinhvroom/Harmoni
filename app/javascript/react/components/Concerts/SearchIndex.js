import React, { useState } from "react"
import SearchBar from "./SearchBar"
import SearchTile from "./SearchTile"

const SearchIndex = (props) => {
  const[relatedArtists, setRelatedArtists] = useState([])
  const[noConcerts, setNoConcerts] = useState("")

  const searchResults = (results) => {
    setRelatedArtists(results)
    setNoConcerts("")
  }

  const noUpcomingConcerts = () => {
    setNoConcerts("There are no upcoming concerts based on your search.")
    setRelatedArtists([])
  }

  const relatedArtistsMap = relatedArtists.map((artist) => {
    return(
      <SearchTile
        key={artist.id}
        artistData={artist}
      />
    )
  })
debugger
  return(
    <div>
      <SearchBar
        searchResults={searchResults}
        noConcerts={noUpcomingConcerts}
        />
      <div className="row tile-container">
        {relatedArtistsMap}
        <div className="no-concerts">{noConcerts}</div>
      </div>
    </div>
  )
}

export default SearchIndex
