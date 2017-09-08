class AddTweetCommentsCountToTweets < ActiveRecord::Migration
  def change
    add_column :tweets, :tweet_comments_count, :integer
  end
end
