require 'test_helper'
require 'json'

class TeamsControllerTest < ActionController::TestCase

  test "Should get valid list of teams" do
    get :index
    assert_response :success
    assert_equal response.content_type, 'application/vnd.api+json'
    jdata = JSON.parse response.body
    assert_equal 6, jdata['data'].length
    assert_equal jdata['data'][0]['type'], 'teams'
  end

  test "Creating new team with valid data should create new team" do
    @request.headers["Content-Type"] = 'application/vnd.api+json'
    post :create, params: {
        data: {
            type: 'teams',
            attributes: {
                team_name: 'UltraWinners',
            }}}
    assert_response 201
    jdata = JSON.parse response.body
    assert_equal 'UltraWinners',
                 jdata['data']['attributes']['team-name']
  end

  # test "Creating new team with players" do
  #   @request.headers["Content-Type"] = 'application/vnd.api+json'
  #   post :create, params: {
  #       data: {
  #           type: 'teams',
  #           attributes: {
  #               team_name: 'yessss',
  #               players_attributes: [
  #                   {player_name: "Henry"},
  #                   {player_name: "Freddy"}
  #               ]
  #           }}}
  #   assert_response 201
  #   jdata = JSON.parse response.body
  #   assert_equal 'yessss',
  #                jdata['data']['attributes']['team-name']
  # end

end