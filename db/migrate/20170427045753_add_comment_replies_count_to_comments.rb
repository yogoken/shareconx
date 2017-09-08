class AddCommentRepliesCountToComments < ActiveRecord::Migration
  def change
    add_column :comments, :comment_replies_count, :integer
  end
end
