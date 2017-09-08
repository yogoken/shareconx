class AddTweetLikesCountToTweets < ActiveRecord::Migration
  def change
    add_column :tweets, :tweet_likes_count, :integer
  end
end
