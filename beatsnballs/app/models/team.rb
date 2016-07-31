class Team < ApplicationRecord
  has_many :players, dependent: :destroy
  validates :team_name, presence: true
end