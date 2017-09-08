class CreateTweets < ActiveRecord::Migration
  def change
    create_table :tweets do |t|
      t.string        :nickname
      t.integer       :user_id
      t.integer       :room_id
      t.text          :text
      t.timestamps
    end
  end
end
