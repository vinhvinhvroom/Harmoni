import React from "react"
import { Link } from "react-router-dom"

const ConcertTile = ({ concert }) => {
  let { name, date, image, url, venue, city, state, address, id } = concert

  return (
    <div className="columns small-8 large-4 tile-wrapper">
      <div className="concert-tile">
            <img className="tile-img" src={image} />
          <div className="tile-info-wrapper">
            <h4 className="concert-name">{name}</h4>
            <h6 className="date">{date}</h6>
            <h6 className="venue">{venue} - {city}, {state}</h6>
            <Link to={`/concerts/${id}`}>
              <input className="button" type="button" value="More Info"/>
            </Link>
          </div>
      </div>
    </div>
  )
}

export default ConcertTile
