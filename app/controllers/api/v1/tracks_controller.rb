class Api::V1::TracksController < ApplicationController
RSpotify.authenticate("#{ENV["SPOTIFY_CLIENT_ID"]}", "#{ENV["SPOTIFY_CLIENT_SECRET_ID"]}")


  def show
    concert = ConcertsWrapper.retrieve_specific_concert(params[:id])

    comments = Comment.all
    specific_concert_comments = []

    comments.each do |comment|
      if comment.tm_id == params[:concert_id]
        comment_object = {
          id: comment.id,
          comment: comment.comment,
          concert_name: comment.concert_name,
          concert_id: comment.tm_id,
          user_name: comment.user.username,
          comment_time: "#{comment.created_at.strftime("%B %d, %Y - %I:%M%P")}",
          user: comment.user
        }
        specific_concert_comments << comment_object
      end
    end

    if concert[:artist_name] == nil
      playlist = TracksWrapper.search(concert[:name])
      related_artists = nil
    else
      playlist = TracksWrapper.search(concert[:artist_name])
      related_artists = TracksWrapper.related_artists(concert[:artist_name])
    end

    artist_spotify_object = TracksWrapper.artist_search(concert[:artist_name])

    show_tracks = {
      concert: concert,
      playlist: playlist,
      specific_concert_comments: specific_concert_comments.reverse,
      artist_spotify_object: artist_spotify_object,
      related_artists: related_artists
    }

    render json: show_tracks
  end

end
