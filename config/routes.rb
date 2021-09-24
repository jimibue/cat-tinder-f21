Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    get 'things', to: 'things#index'
    resources :cats, only:[:index, :update]
    get 'cats_all', to: "cats#all"
    get 'my_cat', to: "cats#my_cats"
    get 'user', to: "cats#user"
    # put 'dummy_update', to:"users#user"
    put 'dummy_update', to:"cats#update_dummy"
  end
end
  