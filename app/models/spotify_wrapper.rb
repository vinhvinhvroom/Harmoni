require 'rspotify'
class SpotifyWrapper

  attr_reader :tracks_objects

  def initialize(tracks_objects)
      @tracks_objects = tracks_objects
  end

  def self.search(artist)
    track = RSpotify::Playlist.search(artist)
    artist_playlist = track[0].external_urls["spotify"]
    return artist_playlist
  end

  def self.artist_search(artist)
    artist = RSpotify::Artist.search(artist)

    if artist[0] == nil
      artist_page = nil
      artist_id = nil
    else
      artist_page = artist[0].external_urls["spotify"]
      artist_id = artist[0].id
    end
    artist_object = {
      artist_page: artist_page,
      artist_id: artist_id
    }
    return artist_object
  end

  def self.related_artists(artist)
    artist = RSpotify::Artist.search(artist)

    if artist[0] == nil
      return nil
    else
      artist_name = artist[0].name
      id = artist[0].id

      response = RSpotify.get("artists/#{id}/related-artists")["artists"]

      related_artists = []
      response.each do |artist|
        related_artist_object = {
          name: artist["name"],
          spotify_id: artist["id"],
          spotify_link: artist["external_urls"]["spotify"]
        }

        related_artists << related_artist_object
      end
      return related_artists
    end
  end

end
