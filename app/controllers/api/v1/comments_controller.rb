class Api::V1::CommentsController < ApplicationController

  def index
    comments = Comment.all
    render json: comments
  end

  def create
    concert = ConcertsWrapper.retrieve_specific_concert(params[:concert_id])
    comment = Comment.new(
      comment: params[:comment],
      tm_id: concert[:id],
      concert_name: concert[:name],
      user_id: current_user.id
    )

    if comment.save
      render json: comment, serializer: CommentSerializer
    else
      render json: { error: review.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
