class AddCompanyUpdatedAtToUser < ActiveRecord::Migration
  def change
    add_column :users, :company_updated_at, :timestamp
  end
end
