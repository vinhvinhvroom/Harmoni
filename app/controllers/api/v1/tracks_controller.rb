class Api::V1::TracksController < ApplicationController
RSpotify.authenticate("#{ENV["SPOTIFY_CLIENT_ID"]}", "#{ENV["SPOTIFY_CLIENT_SECRET_ID"]}")

  def show
    concert = ConcertsWrapper.retrieve_specific_concert(params[:id])
    playlist = TracksWrapper.search(concert[:name])
    show_tracks = {
      concert: concert,
      playlist: playlist
    }
    render json: show_tracks
  end

end
