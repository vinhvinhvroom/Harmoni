class Api::V1::TracksController < ApplicationController
RSpotify.authenticate("#{ENV["SPOTIFY_CLIENT_ID"]}", "#{ENV["SPOTIFY_CLIENT_SECRET_ID"]}")


  def show
    concert = ConcertsWrapper.retrieve_specific_concert(params[:id])

    if concert[:artist_name] == nil
      playlist = TracksWrapper.search(concert[:name])
      related_artists = nil
    else
      playlist = TracksWrapper.search(concert[:artist_name])
      related_artists = TracksWrapper.related_artists(concert[:artist_name])
    end
    show_tracks = {
      concert: concert,
      playlist: playlist,
      related_artists: related_artists
    }
    render json: show_tracks
  end

end
