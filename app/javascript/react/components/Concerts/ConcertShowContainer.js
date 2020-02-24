import React, { useState, useEffect } from "react"
import { Redirect } from 'react-router-dom'
import ConcertShow from "./ConcertShow"
import CommentTile from "./CommentTile"
import CommentForm from "./CommentForm"
import RelatedArtist from "./RelatedArtist"

const ConcertShowContainer = (props) => {
  const[concert, setConcert] = useState([])
  const[playlist, setPlaylist] = useState(null)
  const[artistSpotify, setArtistSpotify] = useState(null)
  const[comments, setComments] = useState([])
  const[loading, setLoading] = useState(false)
  const[currentUser, setCurrentUser] = useState(null)
  const[relatedArtists, setRelatedArtists] = useState([])

  let concertId = props.match.params.id

  useEffect(() => {
    setLoading(true)
    fetch(`/api/v1/concerts/${concertId}/tracks/${concertId}`)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        setLoading(false)
        const error = new Error(`${response.status}: ${response.statusText}`);
        throw(error)
      }
    })
    .then(body => {
      setLoading(false)
      setConcert(body.concert)
      setPlaylist(body.playlist)
      setArtistSpotify(body.artist_spotify_object.artist_page)
      setComments(body.specific_concert_comments)
      setCurrentUser(body.current_user.username)
      setRelatedArtists(body.related_artists)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }, [])

  const submitNewComment = (formPayload) => {
    setLoading(true)
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
        setLoading(false)
        let errorMessage = `${response.status} (${response.statusText})`,
         error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(body => {
      setComments([
        body.comment, ...comments
      ])
      setLoading(false)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  const deleteComment = (id) => {
    fetch(`/api/v1/concerts/${concertId}/comments/${id}`, {
    credentials: "same-origin",
    method: 'DELETE',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
  .then(response => {
    if (response.ok) {
      return response;
    } else {
      alert(response.message)
      let errorMessage = `${response.status} (${response.statusText})`,
       error = new Error(errorMessage)
      throw error
    }
  })
    .then(response => response.json())
    .then(body => {
      setComments(body.comments)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  const commentsMap = comments.map((comment) => {
    return(
      <CommentTile
        key={comment.id}
        commentData={comment}
        concertId={concertId}
        deleteComment={deleteComment}
        currentUser={currentUser}
      />
    )
  })

  const relatedArtistsMap = relatedArtists.map((artist) => {
    return(
      <RelatedArtist
        key={artist.id}
        name={artist.name}
        spotifyLink={artist.spotify_link}
        image={artist.image}
        genre={artist.genre}
      />
    )
  })

  return(
    <div>
      {
        loading &&
        <div className="loader"></div>
      }

      <ConcertShow
        key={concert.id}
        concertObject={concert}
        playlistObject={playlist}
        artistObject={artistSpotify}
      />

    <div className="related-comment-wrapper">
      <h6 className="show show-related-suggestion">You may like these artists too!</h6>
      <div className="columns small-10 medium-6 large-4 show show-related-wrapper">
      {relatedArtistsMap}
      </div>

      <div className="comment-form-tile-wrapper">
        <CommentForm
        onSubmit={submitNewComment}
        concertId={concertId}
        />
        {commentsMap}
      </div>
    </div>
    
    </div>
  )
}


export default ConcertShowContainer
