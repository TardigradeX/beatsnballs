# Require the bundler gem and then call Bundler.require to load in all gems
# listed in Gemfile.
require 'bundler'
require './secret_constants'
Bundler.require

set :environment, :development

set :allow_origin, :any
set :allow_methods, [:get, :post, :options, :put]
set :expose_headers, ['Content-Type']

configure do
  enable :cross_origin
end

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
  property :rank, Integer

  has n, :players, :constraint => :destroy
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

Pony.options = {
    :via => :smtp,
    :via_options => {
        :address              => 'smtp.mail.de',
        :port                 => '587',
        :enable_starttls_auto => true,
        :headers => { 'Content-Type' => 'text/html' },
        :user_name            => SecretConstants::MAIL_USER,
        :password             => SecretConstants::MAIL_PASSWORD,
        :authentication       => :plain, # :plain, :login, :cram_md5, no auth by default
    }
}

before '/*' do
# return directly with 200 if request method is options
  halt 200 if request.request_method == 'OPTIONS'
end

get '/' do
  send_file './public/index.html'
end

get '/teams' do
  content_type :json
  @teams = Team.all(:order => :created_at.desc, :activated => true)
  @teams.each do |team|
    puts team.players.inspect
  end
  @teams.to_json(:only => [:team_name, :created_at, :rank], methods:[:players])
end

# CREATE: Route to create a new Team
post '/teams' do
  content_type :json

  params_json = JSON.parse(request.body.read)
  @team = Team.new(params_json)

  newID = SecureRandom.hex(10)
  @team.uuid = newID

  if @team.save

    @registerURL = SecretConstants::ANGULAR_SERVER  + "/activation;uuid="  + @team.uuid + ";id=" + @team.id.to_s

    @deleteURL = SecretConstants::ANGULAR_SERVER  + "/delete;uuid="  + @team.uuid + ";id="  + @team.id.to_s

    puts @registerURL
    puts @deleteURL

    email_body = erb :mail, :locals => {name:@team.team_name, regURI: @registerURL, delURI:@deleteURL}

    Pony.mail :to => "daniel.xander@fhnw.ch",
              :from => "beatsnballs@mail.de",
              :subject => "Beats n Balls Registrierung",
              :html_body => email_body


    response.status = 201
    @team.to_json(:only => [:team_name, :created_at, :rank], methods:[:players])
  else
    halt 500
  end
end

# DELETE: Route to delete a Team
delete '/teams/:id' do
  content_type :json
  @team = Team.get(params[:id])

  params_json = JSON.parse(request.body.read)

  @dead = false

  if params_json['uuid'] == @team.uuid
    @dead = @team.destroy
  end

  if @dead
    response.status = 200
    {:success => "ok"}.to_json
  else
    halt 500
  end
end



# PUT: Activate a Team
put '/teams/:id' do
  content_type :json
  @team = Team.get(params[:id])

  params_json = JSON.parse(request.body.read)


  if params_json['uuid'] == @team.uuid
    @team.activated = true;
  end

  if @team.activated and @team.save
    response.status = 200
    @team.to_json(:only => [:team_name, :created_at, :rank, :activated], methods:[:players])
  else
    halt 500
  end

end


# If there are no Things in the database, add a few.
if Team.count == 0
  team1 = Team.create(:team_name => "Winners", :email => "test@hello.com", :uuid =>"testuuid", :activated => true)
  team1.players << Player.create(:player_name => "Helle")
  team1.players << Player.create(:player_name => "Franz")
  team1.save
end
