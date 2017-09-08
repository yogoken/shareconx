class AddCommentLikesCountToComments < ActiveRecord::Migration
  def change
    add_column :comments, :comment_likes_count, :integer
  end
end
