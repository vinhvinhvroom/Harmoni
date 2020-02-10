import React, { useState, useEffect } from "react"
import ConcertTile from "./ConcertTile"
import WelcomeTile from "./WelcomeTile"

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
        setConcerts(body)
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
    <div className="index-container">
      <h1 className="index-title">Harmoni</h1>
      <WelcomeTile />
      <div className="row tile-container">
        {concertsMap}
      </div>
    </div>
  )
}

export default ConcertsIndex
