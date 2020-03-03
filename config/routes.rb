Rails.application.routes.draw do
  root 'homes#index'

  get "/concerts", to: "homes#index"
  get "/concerts/:id", to: "homes#index"
  get "/search", to: "homes#index"
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :concerts, only: [:index] do
        resources :comments, only: [:index, :create, :destroy]
        resources :tracks, only: [:show]
      end
        post '/tracks/search', to: 'tracks#search'
    end
  end

end
