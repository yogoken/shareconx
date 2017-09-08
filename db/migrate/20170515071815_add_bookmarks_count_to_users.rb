class AddBookmarksCountToUsers < ActiveRecord::Migration
  def change
    add_column :users, :bookmarks_count, :integer
  end
end
