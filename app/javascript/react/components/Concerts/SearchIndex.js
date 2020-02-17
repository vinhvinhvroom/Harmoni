import React, { useState } from "react"
import SearchBar from "./SearchBar"
import SearchTile from "./SearchTile"

const SearchIndex = (props) => {
  const[relatedArtists, setRelatedArtists] = useState([])

  const searchResults = (results) => {
    setRelatedArtists(results)
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
        />
      <div className="row tile-container">
        {relatedArtistsMap}
      </div>
    </div>
  )
}

export default SearchIndex
