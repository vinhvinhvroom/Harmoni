class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :concert_name, :tm_id, :spotify_id, :comment_time, :user_name

  belongs_to :user

  def user_name
    object.user.username
  end

  def comment_time
    "#{object.created_at.strftime("%B %d, %Y - %I:%M%P")}"
  end


end
