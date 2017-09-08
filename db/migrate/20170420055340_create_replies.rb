class CreateReplies < ActiveRecord::Migration
  def change
    create_table :replies do |t|
      t.integer :comment_id
      t.integer :user_id
      t.string  :user_nickname
      t.text    :text
      t.timestamps
    end
  end
end
