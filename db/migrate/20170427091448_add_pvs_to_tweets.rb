class AddPvsToTweets < ActiveRecord::Migration
  def change
    add_column :tweets, :pvs, :integer
  end
end
