import React from "react"

const CommentTile = ({ commentData }) => {
  let { comment, user_name, comment_time } = commentData

  return(
    <div className="row">
      <li>
        <div className="columns small-10, medium-6, large-10">
          <div className="comment-tile-wrapper">
            <h5>{user_name}</h5>
            <p>{comment}</p>
            <p>{comment_time}</p>
          </div>
        </div>
      </li>
    </div>
  )
}

export default CommentTile
