import React, { useState } from "react"
import _ from "lodash"
import ErrorsList from "./ErrorsList"

const CommentForm = (props) => {
  const[commentRecord, setCommentRecord] = useState({
    comment: ""
  })
  const[errors, setErrors] = useState({})

  const handleChange = (event) => {
    setCommentRecord({
      ...commentRecord,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const validFormSubmission = () => {
    let submitErrors = {}
      if(commentRecord["comment"].trim() === ""){
        submitErrors = {
          ...submitErrors,
          ["Comment"]: "is blank"
        }
      }
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let formPayload = commentRecord;
    if(validFormSubmission()){
      props.onSubmit(formPayload);
      setCommentRecord({
        comment: ""
      })
    }
  }

  return(
    <div className="row">
      <div className="columns small-10 medium-6 large-4 comment-form-wrapper">

        <form className="comments-form" onSubmit={handleSubmit}>

          <ErrorsList errors={errors} />

          <label>Comment
            <textarea
              type="textarea"
              className="comment-box"
              name="comment"
              onChange={handleChange}
              value={commentRecord.comment}
              />
          </label>

          <input
            type="hidden"
            name="concertId"
            value={props.concertId}
            />

          <input
            type="submit"
            className="button comment-submit"
            value="Submit Comment"
            />

        </form>
      </div>
    </div>
  )
}

export default CommentForm
