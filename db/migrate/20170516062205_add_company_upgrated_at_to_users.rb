class AddCompanyUpgratedAtToUsers < ActiveRecord::Migration
  def change
    add_column :users, :company_upgraded_at, :timestamp
  end
end
