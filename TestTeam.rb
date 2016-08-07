ENV['RACK_ENV'] = 'test'

require './app'
require 'test/unit'
require 'rack/test'

class TestTeam < Test::Unit::TestCase

  def test_there_is_one_in_db
    browser = Rack::Test::Session.new(Rack::MockSession.new(Sinatra::Application))
    browser.get '/teams'
    assert browser.last_response.ok?
    assert browser.last_response.body.include?('Winners')

    browser = Rack::Test::Session.new(Rack::MockSession.new(Sinatra::Application))
    data = '{"uuid":"testuuid"}'
    browser.delete '/teams/1', data
    assert browser.last_response.ok?
  end

  def test_can_post_new_team
    browser = Rack::Test::Session.new(Rack::MockSession.new(Sinatra::Application))
    data = '{"team_name":"Losers", "email": "test@ultra.com", "players": [{"player_name" : "koko"}, {"player_name" : "lolo"}]}'
    browser.post '/teams', data
    assert browser.last_response.created?
    assert browser.last_response.body.include?('Losers')
    assert browser.last_response.body.include?('lolo')
  end

end
