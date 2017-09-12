Rails.application.routes.draw do
  devise_for :users, :controllers => {
    :registrations => 'users/registrations',
    :sessions => 'users/sessions'
  }
  root to: 'tweets#show'
  resources :welcome, only: [:index]
  resources :tweets do
    resources :violation_reports, only: [:create]
    resources :pvs, only: [:create]
    resources :tweet_likes, only: [:create, :destroy]
    resources :comments do
      resources :comment_likes, only: [:create, :destroy]
      resources :replies
    end
    member do
      get 'add_to_cart'
      get 'remove_from_cart'
    end
  end
  resources :users, only: [:show, :update] do
    resources :bookmarks, only: [:create, :destroy, :index]
  end

  get 'comments/:id/likes_counts' => 'comments#likesCount'
  get '/check_user_nickname' =>"users#check_user_nickname"
  get '/check_user_email' =>"users#check_user_email"
  get '/check_violation_count' =>"tweets#check_violation_count"
end
