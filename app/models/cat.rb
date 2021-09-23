class Cat < ApplicationRecord
  # liked_cats is store as text in db, doing this converts
  # to an array in our rails
  serialize :liked_cats, Array
  
  def self.unliked_cats(ids)
    ids = ( ids === nil || ids.empty? ) ? [0] : ids
    Cat.where("id NOT IN (?)", ids).order("RANDOM()")
  end

  def self.liked_cats(ids)
    ids = ids.empty? ? [0] : ids
    Cat.where("id IN (?)", ids).order("RANDOM()")
  end
end
