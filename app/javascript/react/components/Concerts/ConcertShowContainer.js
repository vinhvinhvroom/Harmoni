import React, { useState, useEffect } from "react"
import ConcertShow from "./ConcertShow.js"

const ConcertShowContainer = (props) => {
  const[concert, setConcert] = useState([])
  const[playlist, setPlaylist] = useState(null)
  const[artistSpotify, setArtistSpotify] = useState(null)

  let concertId = props.match.params.id

  useEffect(() => {
    fetch(`/api/v1/concerts/${concertId}/tracks/${concertId}`)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        const error = new Error(`${response.status}: ${response.statusText}`);
        throw(error)
      }
    })
    .then(body => {
      setConcert(body.concert)
      setPlaylist(body.playlist)
      setArtistSpotify(body.artist_spotify_page)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }, [])

  return(
    <div>
      <ConcertShow
        key={concert.id}
        concertObject={concert}
        playlistObject={playlist}
        artistObject={artistSpotify}
      />
    </div>
  )
}


export default ConcertShowContainer
