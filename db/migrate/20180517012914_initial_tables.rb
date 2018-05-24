class InitialTables < ActiveRecord::Migration[5.2]
  def change
    create_table :selfies do |t|
      t.string :ip_address # only show 1 selfie per ip
      t.string :token
      t.string :selfie_url
      t.datetime :created_at 
    end
  end
end
