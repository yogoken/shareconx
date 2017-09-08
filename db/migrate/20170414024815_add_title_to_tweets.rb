class AddTitleToTweets < ActiveRecord::Migration
  def change
    add_column :tweets, :title, :text
  end
end
