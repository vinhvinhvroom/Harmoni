class Concert < AppplicationRecord
  validates :name, presence: true
  validates :tm_id, presence: true
  validates :image, presence: true
  validates :venue, presence: true
  validates :genre, presence: true
end
