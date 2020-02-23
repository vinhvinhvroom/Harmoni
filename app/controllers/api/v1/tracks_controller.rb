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
      playlist = SpotifyWrapper.search(concert[:name])
      related_artists = nil
    else
      playlist = SpotifyWrapper.search(concert[:artist_name])
      related_artists = SpotifyWrapper.related_artists(concert[:artist_name])
    end

    artist_spotify_object = SpotifyWrapper.artist_search(concert[:artist_name])
    recent_comments = specific_concert_comments.reverse

    show_tracks = {
      concert: concert,
      playlist: playlist,
      specific_concert_comments: recent_comments,
      artist_spotify_object: artist_spotify_object,
      related_artists: related_artists,
      current_user: current_user
    }

    render json: show_tracks
  end

  def search
    query = search_params
    related_artists = SpotifyWrapper.related_artists(query[:probe])
    state=""
    city = ""
    if current_user == nil
      city = "Boston"
      state = "MA"
    else
      city = current_user.city
      state = current_user.state
    end
    ticketmaster_url = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=#{ENV["TICKET_KEY"]}&size=40&city=#{city}&state=state=#{state}"
    searched_artist_response = JSON.parse(Faraday.get("#{ticketmaster_url}&keyword=#{query[:probe]}").env["response_body"])
    concert_list = []

    if searched_artist_response["_embedded"] != nil
      searched_artist_object = {
        name: searched_artist_response["_embedded"]["events"][0]["name"],
        date: Time.parse(searched_artist_response["_embedded"]["events"][0]["dates"]["start"]["localDate"]).strftime("%B %d, %Y "),
        image: searched_artist_response["_embedded"]["events"][0]["images"][0]["url"],
        url: searched_artist_response["_embedded"]["events"][0]["url"],
        venue: searched_artist_response["_embedded"]["events"][0]["_embedded"]["venues"][0]["name"],
        id: searched_artist_response["_embedded"]["events"][0]["id"],
        city: searched_artist_response["_embedded"]["events"][0]["_embedded"]["venues"][0]["city"]["name"],
        state: searched_artist_response["_embedded"]["events"][0]["_embedded"]["venues"][0]["state"]["name"],
        address: searched_artist_response["_embedded"]["events"][0]["_embedded"]["venues"][0]["address"]["line1"],
        genre: searched_artist_response["_embedded"]["events"][0]["classifications"][0]["genre"]["name"],
        sale_date: Time.parse(searched_artist_response["_embedded"]["events"][0]["sales"]["public"]["startDateTime"]).strftime("%B %d, %Y - %I:%M%P"),
        current_user: current_user
      }

      concert_list << searched_artist_object
    end

    related_artists.each do |artist|
      parsed_response = JSON.parse(Faraday.get("#{ticketmaster_url}&keyword=#{artist[:name]}").env["response_body"])

      if parsed_response["_embedded"] != nil
        artist_object = {
          name: parsed_response["_embedded"]["events"][0]["name"],
          date: Time.parse(parsed_response["_embedded"]["events"][0]["dates"]["start"]["localDate"]).strftime("%B %d, %Y "),
          image: parsed_response["_embedded"]["events"][0]["images"][0]["url"],
          url: parsed_response["_embedded"]["events"][0]["url"],
          venue: parsed_response["_embedded"]["events"][0]["_embedded"]["venues"][0]["name"],
          id: parsed_response["_embedded"]["events"][0]["id"],
          city: parsed_response["_embedded"]["events"][0]["_embedded"]["venues"][0]["city"]["name"],
          state: parsed_response["_embedded"]["events"][0]["_embedded"]["venues"][0]["state"]["name"],
          address: parsed_response["_embedded"]["events"][0]["_embedded"]["venues"][0]["address"]["line1"],
          genre: parsed_response["_embedded"]["events"][0]["classifications"][0]["genre"]["name"],
          sale_date: Time.parse(parsed_response["_embedded"]["events"][0]["sales"]["public"]["startDateTime"]).strftime("%B %d, %Y - %I:%M%P"),
          current_user: current_user
        }
        concert_list << artist_object
      end
    end

    if concert_list.length < 1
      render json: { error: "No upcoming concerts" }, status: :unprocessable_entity
    else
      render json: concert_list
    end
  end

  private

  def search_params
    params.require(:search).permit(:probe)
  end

end
