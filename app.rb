# Require the bundler gem and then call Bundler.require to load in all gems
# listed in Gemfile.
require 'bundler'
Bundler.require

# Setup DataMapper with a database URL. On Heroku, ENV['DATABASE_URL'] will be
# set, when working locally this line will fall back to using SQLite in the
# current directory.
DataMapper.setup(:default, ENV['DATABASE_URL'] || "sqlite://#{Dir.pwd}/development.sqlite")

# Define a simple DataMapper model.
class Team
  include DataMapper::Resource

  property :id, Serial, :key => true
  property :created_at, DateTime
  property :team_name, String, :length => 255

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
  @things = Team.all(:order => :created_at.desc)
  #@thing = Team.get(0)
  @things.to_json(methods:[:players])
end

# CREATE: Route to create a new Thing
post '/teams' do
  content_type :json

  # These next commented lines are for if you are using Backbone.js
  # JSON is sent in the body of the http request. We need to parse the body
  # from a string into JSON
  params_json = JSON.parse(request.body.read)

  # If you are using jQuery's ajax functions, the data goes through in the
  # params.
  @thing = Team.new(params_json)

  if @thing.save
    @thing.to_json
  else
    halt 500
  end
end

# READ: Route to show a specific Thing based on its `id`
get '/things/:id' do
  content_type :json
  @thing = Team.get(params[:id].to_i)

  if @thing
    @thing.to_json
  else
    halt 404
  end
end

# UPDATE: Route to update a Thing
put '/things/:id' do
  content_type :json

  # These next commented lines are for if you are using Backbone.js
  # JSON is sent in the body of the http request. We need to parse the body
  # from a string into JSON
  params_json = JSON.parse(request.body.read)

  @thing = Team.get(params_json[:id].to_i)
  @thing.update(params)

  if @thing.save
    @thing.to_json
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
  team1 = Team.create(:team_name => "Winners")
  team1.player = Player.create(player_name => "Helle")
  team1.player = Player.create(player_name => "Franz")
  team1.save
  team2 = Team.create(:team_name => "Losers")
  team2.player = Player.create(player_name => "sala")
  team2.player = Player.create(player_name => "gugu")
  team2.player = Player.create(player_name => "daniel")
  team2.save
end
