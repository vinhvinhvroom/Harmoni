require "rails_helper"

RSpec.describe Api::V1::CommentsController, type: :controller do

  let!(:first_user) { User.create(
    id: 1,
    email: "hello@world.com",
    username: "hello",
    city: "Boston",
    state: "MA",
    zip: "02116",
    role: "member",
    password: "password"
  ) }

  let!(:second_user) { User.create(
    id: 2,
    email: "helloworld@world.com",
    username: "helloWorld",
    city: "Boston",
    state: "MA",
    zip: "02116",
    role: "member",
    password: "password"
  ) }

  let!(:first_comment) { Comment.create(
    id: 1,
    comment: "What an awesome band!",
    user: second_user,
    tm_id: "Z7r9jZ1Ae0Nob",
    concert_name: "Guns N' Roses 2020 Tour",
    spotify_id: nil
  ) }

  let!(:second_comment) { Comment.create(
    id: 2,
    comment: "Cool!",
    user: first_user,
    tm_id: "Z7r9jZ1Ae0Nob",
    concert_name: "Guns N' Roses 2020 Tour",
    spotify_id: nil
  ) }

  describe "GET#index" do
    it "should return the concert and their comments" do
      sign_in first_user

      get :index, params: {
        concert_id: first_comment.tm_id
      }
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["comments"].length).to be 2

      expect(returned_json["comments"][0].length).to be 8
      expect(returned_json["comments"][1].length).to be 9

      expect(returned_json["comments"][0]["comment"]).to eq "What an awesome band!"
      expect(returned_json["comments"][0]["id"]).to eq 1
      expect(returned_json["comments"][0]["user_name"]).to eq "helloWorld"

      expect(returned_json["comments"][1]["comment"]).to eq "Cool!"
      expect(returned_json["comments"][1]["id"]).to eq 2
      expect(returned_json["comments"][1]["user_name"]).to eq "hello"
    end
  end
end
