class AddRoomIdToTweets < ActiveRecord::Migration
  def change
    add_column :tweets, :room_id, :integer
  end
end
