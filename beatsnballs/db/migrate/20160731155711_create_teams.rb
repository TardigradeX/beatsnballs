class CreateTeams < ActiveRecord::Migration[5.0]
  def change
    create_table :teams do |t|
      t.timestamps
      t.string     :team_name
      t.string     :uuid
      t.boolean    :active
      t.integer    :rank
    end
    add_index :teams, :uuid, unique: true
  end
end

