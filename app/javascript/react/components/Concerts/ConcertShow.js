import React from "react"

const ConcertShow = ({ concertObject }) => {
  let { name, date, image, url, venue, address, city, state, genre, sub_genre, sale_date} = concertObject

  return(
    <div>
      <img src={image}/>
      <h3>{name}</h3>
      <p>{genre}</p>
      <h5>{date}</h5>
      <h5>{venue}</h5>
      <h5>{address}, {city}, {state}</h5>
      <h5>On Sale: {sale_date}</h5>
      <a href={url} className="button">Tickets</a>
    </div>
  )
}

export default ConcertShow
