class ConcertsWrapper < ApplicationController
  BASE_URL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=#{ENV["TICKET_KEY"]}"

  attr_reader :concerts_objects

  def initialize(concerts_objects)
    @concerts_objects = concerts_objects
  end

  def self.retrieve_concerts(query)
    concertsData = concerts_request(query)
    concerts = concerts(concertsData)
    ConcertsWrapper.new(concerts)
  end

  def self.concerts_request(query)
    parsed_response = JSON.parse(Faraday.get("#{BASE_URL}&keyword=#{query}").env["response_body"])
    return parsed_response
  end

  def self.concerts(parsed_concerts_array)
    concerts_list=[]
    parsed_concerts_array.each do |concert|
      concerts_list << concert
    end
    return concerts_list
  end
end
