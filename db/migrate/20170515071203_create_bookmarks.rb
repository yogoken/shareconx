class CreateBookmarks < ActiveRecord::Migration
  def change
    create_table :bookmarks do |t|
      t.integer   :tweet_id
      t.integer   :user_id
      t.timestamps
    end
    add_index :bookmarks, :user_id #インデックス
    add_index :bookmarks, :tweet_id #インデックス
  end
end
