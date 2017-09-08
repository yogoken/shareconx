class AddCommentLikesCountToTweets < ActiveRecord::Migration
  def change
    add_column :tweets, :comment_likes_count, :integer
  end
end
