class Pv < ActiveRecord::Base
  belongs_to :tweet, counter_cache: :pvs
  belongs_to :user
end
