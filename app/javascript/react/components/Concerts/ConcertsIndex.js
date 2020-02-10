import React, { useState, useEffect } from "react"
import ConcertTile from "./ConcertTile"

const ConcertsIndex = (props) => {
  const[concerts, setConcerts] = useState([])

  useEffect(() => {
    fetch('/api/v1/concerts')
      .then(response => {
        if(response.ok) {
          return response
        } else {
          throw new Error(`${response.status}: ${response.statusText}`)
        }
      })
      .then(response => response.json())
      .then(body => {
        setConcerts(body.events)
      })
      .catch(error => {
        console.log(`Error fetching concerts: ${error.message}`)
      })
  }, [])

  const concertsMap = concerts.map((concert) => {
    return(
      <ConcertTile
        key={concert.id}
        concert={concert}
        />
    )
  })

  return(
    <div>
      <h1>Concerts in your area!</h1>
      {concertsMap}
    </div>
  )
}

export default ConcertsIndex
