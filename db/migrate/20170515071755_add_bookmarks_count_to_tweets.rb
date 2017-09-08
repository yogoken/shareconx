class AddBookmarksCountToTweets < ActiveRecord::Migration
  def change
    add_column :tweets, :bookmarks_count, :integer
  end
end
