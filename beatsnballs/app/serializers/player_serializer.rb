class PlayerSerializer < ActiveModel::Serializer
  attributes :skill_level, :player_name, :created_at

  belongs_to :team
end