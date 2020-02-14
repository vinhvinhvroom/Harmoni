class Comment < ApplicationRecord
  belongs_to :user

  validates :comment, presence: true
  validates :concert_name, presence: true
  validates :tm_id, presence: true

end
