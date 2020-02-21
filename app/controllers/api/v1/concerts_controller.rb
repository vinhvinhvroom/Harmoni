class Api::V1::ConcertsController < ApplicationController

  def index
    user = current_user
    state=""
    city = ""
    if user == nil
      city = "Boston"
      state = "MA"
    else
      city = current_user.city
      state = current_user.state
    end

    concerts_wrapper = ConcertsWrapper.retrieve_concerts(city, state)
    render json: concerts_wrapper
  end

  def show
    concert_wrapper = ConcertsWrapper.retrieve_specific_concert(params[:id])
    render json: concert_wrapper
  end

end
