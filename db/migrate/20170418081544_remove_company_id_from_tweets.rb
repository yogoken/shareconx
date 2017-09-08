class RemoveCompanyIdFromTweets < ActiveRecord::Migration
  def change
    remove_column :tweets, :company_id, :integer
  end
end
