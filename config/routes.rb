Rails.application.routes.draw do
  root 'homes#index'

  get "/concerts", to: "homes#index"
  get "/concerts/:id", to: "homes#index"

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :concerts, only: [:index, :show] do
        resources :comments, only: [:index, :create]
        resources :tracks, only: [:show]
      end
        post '/concerts/search', to: 'concerts#search'
    end
  end

  # namespace :api do
  #   namespace :v1 do
  #     resources :comments, only: [:index]
  #   end
  # end

end
