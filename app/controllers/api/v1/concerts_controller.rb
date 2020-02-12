class Api::V1::ConcertsController < ApplicationController

  def index
    user = current_user
    query = ""
    if user == nil
      query = "Boston"
    else
      query = current_user.city
    end

    concerts_wrapper = ConcertsWrapper.retrieve_concerts(query)
    render json: concerts_wrapper
  end

  def show
    concert_wrapper = ConcertsWrapper.retrieve_specific_concert(params[:id])
    render json: concert_wrapper
  end

end
