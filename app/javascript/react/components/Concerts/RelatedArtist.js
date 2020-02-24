import React from "react"

const RelatedArtist = (props) => {

  return(
    <div className="related-tile">
      <p className="show show-related-name">{props.name}</p>
      <img className="show show-related-img" src={props.image}/>
      <p className="show-related-genre">{props.genre}</p>
      <div className="related-button-wrapper">
      <a href={props.spotifyLink} target="_blank" className="related-link button">Spotify</a>
      </div>
    </div>
  )
}

export default RelatedArtist
