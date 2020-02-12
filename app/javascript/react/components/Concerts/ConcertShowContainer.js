import React, { useState, useEffect } from "react"
import ConcertShow from "./ConcertShow.js"

const ConcertShowContainer = (props) => {
  const[concert, setConcert] = useState([])
  const[playlist, setPlaylist] = useState(null)

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
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }, [])

  return(
    <div>
      <ConcertShow
        key={concert.id}
        concertObject={concert}
        playlistObject={playlist}
        />
    </div>
  )
}


export default ConcertShowContainer
