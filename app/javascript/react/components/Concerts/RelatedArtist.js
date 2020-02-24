import React from "react"

const RelatedArtist = (props) => {

  return(
    <div className="related-tile">
      <h4 className="show show-related-name">{props.name}</h4>
      <img className="show show-related-img" src={props.image}/>
      <h5 className="show-related-genre">{props.genre}</h5>
      <div className="related-button-wrapper">
      <a href={props.spotifyLink} target="_blank" className="related-link button">Spotify</a>
      </div>
    </div>
  )
}

export default RelatedArtist
