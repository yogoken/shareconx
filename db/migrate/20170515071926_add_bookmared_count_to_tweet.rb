class AddBookmaredCountToTweet < ActiveRecord::Migration
  def change
    add_column :tweets, :bookmarked_count, :integer
  end
end
