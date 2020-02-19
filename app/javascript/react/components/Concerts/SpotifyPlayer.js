import React from "react"

const SpotifyPlayer = (props) => {

  return(
    <iframe src={props.playlist} width="350" height="400" frameBorder="0" allowtransparency="true" allow="encrypted-media">Hi</iframe>
  )
}

export default SpotifyPlayer
