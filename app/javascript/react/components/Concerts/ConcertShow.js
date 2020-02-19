import React from "react"
import SpotifyPlayer from "./SpotifyPlayer"

const ConcertShow = ({ concertObject, playlistObject, artistObject }) => {
  let { name, date, image, url, venue, address, city, state, genre, sub_genre, sale_date} = concertObject

  return(
    <div className="columns small-8 medium-6 large-4 show-wrapper" >
      <div className="show-tile">
        <img className="show show-img" src={image}/>
          <div className="columns small-10 medium-6 large-4 show show-content-wrapper">

            <div className="show info-wrapper">
              <h4 className="show show-name">{name}</h4>
              <p className="show show-genre">{genre}</p>
              <h6 className="show show-date">{date}</h6>
              <h6 className="show show-venue">{venue}</h6>
              <h6 className="show show-address">{address}, {city}, {state}</h6>
              <h6 className="show show-sale-date">On Sale: {sale_date}</h6>
              <a href={url} target="_blank" className="show-button">Tickets</a>
              <a href={playlistObject} target="_blank" className="show-button">Spotify</a>
            </div>

            <div className="show spotify-player">
              <SpotifyPlayer
                playlist={playlistObject}
              />
            </div>
        </div>
      </div>
    </div>
  )
}

export default ConcertShow
