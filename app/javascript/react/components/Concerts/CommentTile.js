import React from "react"

const CommentTile = ({ commentData }) => {
  let { comment, user_name, comment_time } = commentData

  return(
    <div className="row">
      <li>
        <div className="columns small-12, medium-10, large-10 comments-all-wrapper">
          <div className="comment-tile-wrapper">
            <h5 className="comment-text">{user_name}</h5>
            <p className="comment-text">{comment}</p>
            <p className="comment-text">{comment_time}</p>
          </div>
        </div>
      </li>
    </div>
  )
}

export default CommentTile
