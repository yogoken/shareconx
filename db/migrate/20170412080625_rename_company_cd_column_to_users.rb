class RenameCompanyCdColumnToUsers < ActiveRecord::Migration
  def change
    rename_column :users, :company_cd, :company_id
  end
end
