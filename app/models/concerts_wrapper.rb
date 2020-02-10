class ConcertsWrapper
  BASE_URL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=#{ENV["TICKET_KEY"]}"

  attr_reader :concerts_objects

  def initialize(concerts_objects)
    @concerts_objects = concerts_objects
  end

  def self.retrieve_concerts(query)
    concertsData = concerts_request(query)
    concerts = concerts(concertsData)
    concerts_array=[]
    concerts_wrapper = ConcertsWrapper.new(concerts).concerts_objects

    concerts_wrapper.each do |concert|
      concert_object = {
        name: concert["name"],
        date: Time.parse(concert["dates"]["start"]["localDate"]).strftime("%B %d, %Y - %I:%M%P"),
        image: concert["images"][0]["url"],
        url: concert["url"],
        venue: concert["_embedded"]["venues"][0]["name"],
        tm_id: concert["id"]
      }
      concerts_array << concert_object
    end
    return concerts_array
  end

  def self.concerts_request(query)
    parsed_response = JSON.parse(Faraday.get("#{BASE_URL}&city=#{query}").env["response_body"])
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
