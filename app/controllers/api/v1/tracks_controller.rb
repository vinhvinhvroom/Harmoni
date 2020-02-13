class Api::V1::TracksController < ApplicationController
RSpotify.authenticate("#{ENV["SPOTIFY_CLIENT_ID"]}", "#{ENV["SPOTIFY_CLIENT_SECRET_ID"]}")

  def show
    concert = ConcertsWrapper.retrieve_specific_concert(params[:id])
    playlist = TracksWrapper.search(concert[:name])
    artist_spotify_page = TracksWrapper.artist_search(concert[:artist_name])
    show_tracks = {
      concert: concert,
      playlist: playlist,
      artist_spotify_page: artist_spotify_page
    }
    render json: show_tracks
  end

end
