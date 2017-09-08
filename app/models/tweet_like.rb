class TweetLike < ActiveRecord::Base
  belongs_to :tweet, counter_cache: :tweet_likes_count
  belongs_to :user
end
