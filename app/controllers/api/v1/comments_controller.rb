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
    # concert = ConcertsWrapper.retrieve_specific_concert(params[:concert_id])
    #
    # comments = Comment.all
    # specific_concert_comments = []
    #
    # comments.each do |comment|
    #   if comment.tm_id == params[:concert_id]
    #     comment_object = {
    #       id: comment.id,
    #       comment: comment.comment,
    #       concert_name: comment.concert_name,
    #       concert_id: comment.tm_id,
    #       user_name: comment.user.username,
    #       comment_time: "#{comment.created_at.strftime("%B %d, %Y - %I:%M%P")}",
    #       user: comment.user
    #     }
    #     specific_concert_comments << comment_object
    #   end
    # end
    # comment = Comment.find(params[:id])
    #
    # if current_user == comment.user
    #   comment.destroy
    #   # render json: specific_concert_comments
    #   render json: current_user.comments
    # else
    #   render json: { message: "Could not delete comment. Please try again later."}
    # end
  end

  private

  def authorize_user
    if !user_signed_in?
      raise ActionController::RoutingError.new("Sign In Please")
    end
  end

end
