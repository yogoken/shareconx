class AddNicknameToTweets < ActiveRecord::Migration
  def change
    add_column :tweets, :nickname, :string
  end
end
