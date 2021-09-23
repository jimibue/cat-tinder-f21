# frozen_string_literal: true

class User < ActiveRecord::Base


  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

    # liked_cats is store as text in db, doing this converts
  # to an array in our rails

  serialize :liked_cats, Array

  def self.unliked_cats(ids)
    # another example of short circuit 
    ids = ids.empty?  ? [0] : ids
    Cat.where("id NOT IN (?)", ids).order("RANDOM()")
  end

  def self.liked_cats(ids)
    ids = ids.empty? ? [0] : ids
    Cat.where("id IN (?)", ids).order("RANDOM()")
  end


end
