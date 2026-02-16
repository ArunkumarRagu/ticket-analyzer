# config/routes.rb
Rails.application.routes.draw do
  
  namespace :api do
    namespace :v1 do
      get "agents", to: "users#agents"
      post 'register', to: 'auth#register'
      post 'login', to: 'auth#login'
      resources :tickets do
        member do
          patch :assign
        end
      end
    end
  end
end
