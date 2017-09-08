class RemoveCompanyUpgratedAtFromUser < ActiveRecord::Migration
  def change
    remove_column :users, :company_upgraded_at, :timestamp
  end
end
