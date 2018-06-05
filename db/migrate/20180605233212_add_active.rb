class AddActive < ActiveRecord::Migration[5.2]
  def change
    add_column :selfies, :active, :boolean, default: true
  end
end
