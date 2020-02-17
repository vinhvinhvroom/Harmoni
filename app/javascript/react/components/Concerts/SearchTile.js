import React from "react"
import { Link } from "react-router-dom"

const SearchTile = ({ artistData }) => {
  let { name, date, image, url, venue, id, city, state, address, genre, sale_date } = artistData

  return(
    <div className="columns small-10 medium-6 large-3 tile-wrapper">
      <div className="concert-tile">
            <img className="tile-img" src={image} />
          <div className="columns small-10 medium-6 large-3 tile-info-wrapper">
            <h4 className="concert-name">{name}</h4>
            <h6 className="date">{date}</h6>
            <h6 className="venue">{venue} - {city}, {state}</h6>
            <Link to={`/concerts/${id}`}>
              <input className="show button" type="button" value="More Info"/>
            </Link>
          </div>
      </div>
    </div>
  )
}

export default SearchTile
