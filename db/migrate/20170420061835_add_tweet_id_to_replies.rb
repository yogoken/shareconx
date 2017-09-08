class AddTweetIdToReplies < ActiveRecord::Migration
  def change
    add_column :replies, :tweet_id, :integer
  end
end
