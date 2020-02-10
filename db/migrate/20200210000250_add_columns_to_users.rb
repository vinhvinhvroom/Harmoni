class AddColumnsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :city, :string, null: false
    add_column :users, :username, :string, null: false
    add_column :users, :state, :string, null: false
    add_column :users, :zip, :string, null: false
    add_column :users, :role, :string, null: false, default: "member"
  end
end
