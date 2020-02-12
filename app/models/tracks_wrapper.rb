require 'rspotify'
class TracksWrapper

  attr_reader :tracks_objects

  def initialize(tracks_objects)
      @tracks_objects = tracks_objects
  end

  def self.search(artist)
    track = RSpotify::Playlist.search(artist)
    artist_playlist = track[0].external_urls["spotify"]
    return artist_playlist
  end

end
