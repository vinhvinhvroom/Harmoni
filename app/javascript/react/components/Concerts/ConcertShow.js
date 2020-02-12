import React from "react"

const ConcertShow = ({ concertObject }) => {
  let { name, date, image, url, venue, address, city, state, genre, sub_genre, sale_date} = concertObject

  return(
    <div className="columns small-8 medium-6 large-4 show-wrapper" >
      <div className="show-tile">
        <img className="show show-img" src={image}/>
        <h3 className="show show-name">{name}</h3>
        <p className="show show-genre">{genre}</p>
        <h5 className="show show-date">{date}</h5>
        <h5 className="show show-venue">{venue}</h5>
        <h5 className="show show-address">{address}, {city}, {state}</h5>
        <h5 className="show show-sale-date">On Sale: {sale_date}</h5>
        <a href={url} className="button">Tickets</a>
      </div>
    </div>
  )
}

export default ConcertShow
