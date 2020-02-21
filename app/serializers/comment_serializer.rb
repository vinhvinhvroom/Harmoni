class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :concert_name, :tm_id, :spotify_id, :comment_time, :user_name, :current_username

  belongs_to :user, if: :current_user?

  def user_name
    object.user.username
  end

  def current_user?
    object.user == scope
  end

  def current_username
    if current_user?
      scope.username
    end
  end

  def comment_time
    "#{object.created_at.strftime("%B %d, %Y - %I:%M%P")}"
  end

end
