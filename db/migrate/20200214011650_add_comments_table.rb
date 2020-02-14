class AddCommentsTable < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.belongs_to :user, null: false

      t.text :comment, null: false
      t.string :concert_name, null: false
      t.string :tm_id, null: false
      t.string :spotify_id

      t.timestamps null:false
    end
  end
end
