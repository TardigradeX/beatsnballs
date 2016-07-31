class TeamsController < ApplicationController
  def index
    teams = Team.all
    render json: teams
  end

  def create
    team = Team.new(team_params)
    if team.save
      render json: team, status: :created
    else
      render_error(team, :unprocessable_entity)
    end
  end

  private
  def team_params
    ActiveModelSerializers::Deserialization.jsonapi_parse(params)
  end

end