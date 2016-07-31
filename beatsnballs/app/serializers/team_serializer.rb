class TeamSerializer < ActiveModel::Serializer
  attributes :team_name, :rank, :created_at

  has_many :players
end
