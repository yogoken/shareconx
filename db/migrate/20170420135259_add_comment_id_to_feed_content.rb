class AddCommentIdToFeedContent < ActiveRecord::Migration
  def change
    add_column :feed_contents, :comment_id, :integer
  end
end
