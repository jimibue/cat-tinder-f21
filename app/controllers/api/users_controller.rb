class Api::UsersController < ApplicationController
  before_action :authenticate_user!
  def user
    puts 'params'

    current_user.email = 'xxxchangedxxxx'
    if(current_user.save)
      render json:  current_user
    else
      render json: {errors: current_user.errors}, status: 422
    end
    # current_user.update(name: params[:name])
    #  # this is working, but should it?
    #  current_user.update({email: 'changeds email'})
    #  # this is working, but should it?
    #  current_user.update(password: '654321')
    # render json:  current_user
  end
end
