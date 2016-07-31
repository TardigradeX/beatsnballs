class CreatePlayers < ActiveRecord::Migration[5.0]
  def change
    create_table :players do |t|
      t.timestamps
      t.integer    :team_id
      t.string     :player_name
      t.integer    :skill_level
    end
  end
end

