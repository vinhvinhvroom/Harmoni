import React from "react"
import { Link } from "react-router-dom"

const ConcertTile = ({ concert }) => {
  let { name, images, url, id, dates, } = concert

  return (
    <div>
      <li>
        <img src={images[0].url} />
        <h4>{name}</h4>
        <h6>{dates.start.localDate}</h6>
      </li>
    </div>
  )
}

export default ConcertTile
