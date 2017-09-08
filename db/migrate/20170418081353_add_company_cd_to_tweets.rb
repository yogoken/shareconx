class AddCompanyCdToTweets < ActiveRecord::Migration
  def change
    add_column :tweets, :company_cd, :string
  end
end
