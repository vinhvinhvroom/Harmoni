class CreateConcertsTable < ActiveRecord::Migration[5.2]
  def change
    create_table :concerts do |t|
      t.string :name, null: false
      t.string :tm_id, null: false
      t.string :image, null: false
      t.string :venue, null: false
      t.string :genre, null: false
      t.string :subgenre

      t.timestamps null: false
    end
  end
end
