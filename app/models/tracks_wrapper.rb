require 'rspotify'
class TracksWrapper

  attr_reader :tracks_objects

  def initialize(tracks_objects)
      @tracks_objects = tracks_objects
  end

  def self.search(playlist)
    track = RSpotify::Playlist.search(playlist)
    artist_playlist = track[0].external_urls["spotify"]
    return artist_playlist
  end

  def self.artist_search(artist)
    artist = RSpotify::Artist.search(artist)
    artist_page = artist[0].external_urls["spotify"]
    return artist_page
  end

end
