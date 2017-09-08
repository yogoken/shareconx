class RemoveBookmaresCountFromTweet < ActiveRecord::Migration
  def change
    remove_column :tweets, :bookmarks_count, :integer
  end
end
