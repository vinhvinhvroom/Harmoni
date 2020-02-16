import React, { useState, useEffect } from "react"
import ConcertShow from "./ConcertShow"
import CommentTile from "./CommentTile"
import CommentForm from "./CommentForm"

const ConcertShowContainer = (props) => {
  const[concert, setConcert] = useState([])
  const[playlist, setPlaylist] = useState(null)
  const[artistSpotify, setArtistSpotify] = useState(null)
  const[comments, setComments] = useState([])

  let concertId = props.match.params.id

  useEffect(() => {
    fetch(`/api/v1/concerts/${concertId}/tracks/${concertId}`)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        const error = new Error(`${response.status}: ${response.statusText}`);
        throw(error)
      }
    })
    .then(body => {
      setConcert(body.concert)
      setPlaylist(body.playlist)
      setArtistSpotify(body.artist_spotify_page)
      setComments(body.specific_concert_comments)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }, [])

  const submitNewComment = (formPayload) => {
    fetch(`/api/v1/concerts/${concertId}/comments`, {
      credentials: "same-origin",
      method: 'POST',
      body: JSON.stringify(formPayload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
         error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(body => {
      setComments([
        ...comments,
        body.comment
      ])
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  const commentsMap = comments.map((comment) => {
    return(
      <CommentTile
        key={comment.id}
        commentData={comment}
      />
    )
  })

  return(
    <div>
      <ConcertShow
        key={concert.id}
        concertObject={concert}
        playlistObject={playlist}
        artistObject={artistSpotify}
      />
      <div className="comment-form-tile-wrapper">
        <CommentForm
        onSubmit={submitNewComment}
        concertId={concertId}
        />
        {commentsMap}
      </div>
    </div>
  )
}


export default ConcertShowContainer
