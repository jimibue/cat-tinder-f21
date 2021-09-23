class Api::CatsController < ApplicationController
  #authenticate_user! this is a method from devise toke auth
  # this methods when called will give current_user , which is the logged in userd
  before_action :authenticate_user!, except:[:all]
 
  # unprotected (do not need to be logged in)
  def all
    render json: Cat.all
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
