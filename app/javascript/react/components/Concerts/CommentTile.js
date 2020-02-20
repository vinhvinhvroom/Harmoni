import React, { useState } from "react"
import { Redirect } from "react-router-dom"

const CommentTile = ({ commentData, concertId, deleteComment }) => {
  let { id, comment, user_name, user, comment_time, tm_id } = commentData

  const handleDelete = () => {
    deleteComment(id)
  }

  return(
    <div className="row comment-tile-container">
      <li>
        <div className="columns small-12, medium-10, large-10 comments-all-wrapper">
          <div className="comment-tile-wrapper">
            <h5 className="comment-text">{user_name}</h5>
            <p className="comment-text">{comment}</p>
            <p className="comment-text">{comment_time}</p>
            <input onClick={handleDelete} className="button delete-comment" type="submit" value="Delete Comment"/>
          </div>
        </div>
      </li>
    </div>
  )
}

export default CommentTile
