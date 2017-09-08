class AddTweetRepliesCountToTweets < ActiveRecord::Migration
  def change
    add_column :tweets, :tweet_replies_count, :integer
  end
end
