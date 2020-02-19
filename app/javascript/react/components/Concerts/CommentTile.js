import React, { useState } from "react"
import { Redirect } from "react-router-dom"

const CommentTile = ({ commentData, concertId }) => {
  let { id, comment, user_name, user, comment_time, tm_id } = commentData

  const deleteComment = () => {
  fetch(`/api/v1/concerts/${concertId}/comments/${id}`, {
    credentials: "same-origin",
    method: 'DELETE',
    headers: {
      Accept: "application/json",
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
      alert(body.message)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  return(
    <div className="row comment-tile-container">
      <li>
        <div className="columns small-12, medium-10, large-10 comments-all-wrapper">
          <div className="comment-tile-wrapper">
            <h5 className="comment-text">{user_name}</h5>
            <p className="comment-text">{comment}</p>
            <p className="comment-text">{comment_time}</p>
            <input onClick={deleteComment} className="button delete-comment" type="submit" value="Delete Comment"/>
          </div>
        </div>
      </li>
    </div>
  )
}

export default CommentTile
