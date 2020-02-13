class ConcertsWrapper
  BASE_URL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=#{ENV["TICKET_KEY"]}"

  attr_reader :concerts_objects

  def initialize(concerts_objects)
    @concerts_objects = concerts_objects
  end

  def self.retrieve_specific_concert(params)
    concert_url = "https://app.ticketmaster.com/discovery/v2/events/#{params}.json?/&apikey=#{ENV["TICKET_KEY"]}"
    concert = []
    response = Faraday.get(concert_url)
    parsed_response = JSON.parse(response.env["response_body"])

    concert_object = {
      name: parsed_response["name"],
      artist_name: parsed_response["_embedded"]["attractions"][0]["name"],
      artists:parsed_response["_embedded"]["attractions"],
      date: Time.parse(parsed_response["dates"]["start"]["localDate"]).strftime("%B %d, %Y "),
      image: parsed_response["images"][0]["url"],
      url: parsed_response["url"],
      venue: parsed_response["_embedded"]["venues"][0]["name"],
      id: parsed_response["id"],
      city: parsed_response["_embedded"]["venues"][0]["city"]["name"],
      state: parsed_response["_embedded"]["venues"][0]["state"]["stateCode"],
      address: parsed_response["_embedded"]["venues"][0]["address"]["line1"],
      genre: parsed_response["classifications"][0]["genre"]["name"],
      sub_genre: parsed_response["classifications"][0]["genre"]["name"],
      sale_date: Time.parse(parsed_response["sales"]["public"]["startDateTime"]).strftime("%B %d, %Y - %I:%M%P")
    }

    return concert_object
  end

  def self.retrieve_concerts(query)
    concertsData = concerts_request(query)
    concerts = concerts(concertsData)
    concerts_array=[]
    concerts_wrapper = ConcertsWrapper.new(concerts).concerts_objects

    concerts_wrapper.each do |concert|
      concert_object = {
        name: concert["name"],
        artist_name: concert["_embedded"]["attractions"][0]["name"],
        artists:concert["_embedded"]["attractions"],
        date: Time.parse(concert["dates"]["start"]["localDate"]).strftime("%B %d, %Y "),
        image: concert["images"][0]["url"],
        url: concert["url"],
        venue: concert["_embedded"]["venues"][0]["name"],
        id: concert["id"],
        city: concert["_embedded"]["venues"][0]["city"]["name"],
        state: concert["_embedded"]["venues"][0]["state"]["stateCode"],
        address: concert["_embedded"]["venues"][0]["address"]["line1"],
        genre: concert["classifications"][0]["genre"]["name"],
        sub_genre: concert["classifications"][0]["genre"]["name"],
        sale_date: Time.parse(concert["sales"]["public"]["startDateTime"]).strftime("%B %d, %Y - %I:%M%P")
      }
      concerts_array << concert_object
    end
    return concerts_array
  end

  def self.concerts_request(query)
    parsed_response = JSON.parse(Faraday.get("#{BASE_URL}&size=40&sort=relevance,desc&city=#{query}").env["response_body"])
    return parsed_response["_embedded"]["events"]
  end

  def self.concerts(parsed_concerts_array)
    concerts_list=[]
    parsed_concerts_array.each do |concert|
      concerts_list << concert
    end
    return concerts_list
  end
end
