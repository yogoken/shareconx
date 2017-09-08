class CreateCommentLikes < ActiveRecord::Migration
  def change
    create_table :comment_likes do |t|
      t.integer   :user_id
      t.integer   :comment_id
      t.integer   :tweet_id
      t.timestamps
    end
  end
end
