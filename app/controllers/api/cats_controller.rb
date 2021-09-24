class Api::CatsController < ApplicationController
  #authenticate_user! this is a method from devise toke auth
  # this methods when called will give current_user , which is the logged in userd
  before_action :authenticate_user!, except:[:all, :update_dummy]
 
  # unprotected (do not need to be logged in)
  def all
    render json: Cat.all
  end

  def update_dummy
    puts 'params'
    # current_user.email = 'changed@test.com'
    current_user.password = '654321'
    if(current_user.save)
      render json:  current_user
    else
      render json: {errors: current_user.errors}, status: 422
    end

  end

  # should create a user controller but doing it here cuase it works
  def user
    render json: current_user
  end
  # users liked_cats (Logged in user)
  # needs to be protected (IE user on client must have valid token) 
  def index
    render json: User.unliked_cats(current_user.liked_cats)
  end

  def update
    # devise token auth is doing this for use
    # current_user = User.find(checktoken)
    if(!current_user.liked_cats) 
      current_user.liked_cats = []
    end
    current_user.liked_cats << params[:id].to_i
    ## liked_cats automitcally get converted to text in db when saved
    current_user.save
  end

  def my_cats
    render json: User.liked_cats(current_user.liked_cats)
  end

end




