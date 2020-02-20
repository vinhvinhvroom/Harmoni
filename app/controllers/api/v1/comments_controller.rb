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

  def destroy
    concert = ConcertsWrapper.retrieve_specific_concert(params[:concert_id])

    comments = Comment.all
    specific_concert_comments = []
    comment = Comment.find(params[:id])

    if current_user == comment.user
      comment.destroy
      comments.each do |comment|
        if comment.tm_id == params[:concert_id]
          specific_concert_comments << comment
        end
      end
      
      render json: specific_concert_comments.reverse
    else
      render json: { message: "Could not delete comment. Please try again later."}
    end
  end

  private

  def authorize_user
    if !user_signed_in?
      raise ActionController::RoutingError.new("Sign In Please")
    end
  end

end
