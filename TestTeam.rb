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
  end

end
