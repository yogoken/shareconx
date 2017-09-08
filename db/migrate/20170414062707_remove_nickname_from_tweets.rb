class RemoveNicknameFromTweets < ActiveRecord::Migration
  def change
    remove_column :tweets, :nickname, :string
  end
end
