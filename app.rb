# Require the bundler gem and then call Bundler.require to load in all gems
# listed in Gemfile.
require 'bundler'
require './secret_constants'
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
  @team = Team.new(params_json)

  email_body = erb :mail, :locals => {name:@team.team_name, regURI: "https://www.google.de", delURI:"http://www.w3schools.com"}

  Pony.mail :to => "daniel@family-xander.de",
            :from => "beatsnballs@mail.de",
            :subject => "Beats n Balls Registrierung",
            :html_body => email_body


  if @team.save
    response.status = 201
    @team.to_json(methods:[:players])
  else
    halt 500
  end
end

# DELETE: Route to delete a Team
delete '/teams/:id' do
  content_type :json
  @team = Team.get(params[:id].to_i)

  if @team.destroy
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
