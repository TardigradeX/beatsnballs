# Require the bundler gem and then call Bundler.require to load in all gems
# listed in Gemfile.
require 'bundler'
Bundler.require

set :environment, :development

if (ENV == 'production')
  DataMapper.setup(:default, 'sqlite://#{Dir.pwd}/production.sqlite')
else
  DataMapper.setup(:default, 'sqlite::memory:')
end

#DATA Models
class Team
  include DataMapper::Resource

  property :id, Serial, :key => true
  property :created_at, DateTime
  property :team_name, String, :length => 255
  property :email, String
  property :activated, Boolean, :default => false
  property :uuid, String

  has n, :players
end

class Player
  include DataMapper::Resource
  property :id, Serial, :key => true
  property :created_at, DateTime
  property :player_name, String, :length => 255

  belongs_to :team
end

# Finalize the DataMapper models.
DataMapper.finalize

# Tell DataMapper to update the database according to the definitions above.
DataMapper.auto_upgrade!

get '/' do
  send_file './public/index.html'
end

# Route to show all Things, ordered like a blog
get '/teams' do
  content_type :json
  @teams = Team.all(:order => :created_at.desc)
  @teams.each do |team|
    puts team.players.inspect
  end
  #@thing = Team.get(0)
  @teams.to_json(methods:[:players])
end

# CREATE: Route to create a new Team
post '/teams' do
  content_type :json

  params_json = JSON.parse(request.body.read)

  @thing = Team.new(params_json)

  if @thing.save
    response.status = 201
    @thing.to_json(methods:[:players])
  else
    halt 500
  end
end

# DELETE: Route to delete a Thing
delete '/things/:id/delete' do
  content_type :json
  @thing = Team.get(params[:id].to_i)

  if @thing.destroy
    {:success => "ok"}.to_json
  else
    halt 500
  end
end

# If there are no Things in the database, add a few.
if Team.count == 0
  team1 = Team.create(:team_name => "Winners", :email => "test@hello.com")
  team1.players << Player.create(:player_name => "Helle")
  team1.players << Player.create(:player_name => "Franz")
  team1.save
end
