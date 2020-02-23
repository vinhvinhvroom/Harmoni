import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ConcertTile from "./ConcertTile"
import SearchBar from "./SearchBar"

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
      <h4 className="welcome-text"><span className="harmoni">Harmoni</span> will find concerts in your city and introduce you to new music based on your favorite artists.</h4>
      <h4 className="welcome-text">Let <span className="harmoni">Harmoni</span> connect you with new live music near you</h4>
      <div className="search-link-wrapper">
        <Link to="/search" className="link-search">
          <input className="search-link button" type="button" value="Search for new live music"/>
        </Link>
      </div>
      <br/>
      <h4 className="upcoming-shows">Here are some popular upcoming shows:</h4>
      <div className="row tile-container">
        {concertsMap}
      </div>
    </div>
  )
}

export default ConcertsIndex
