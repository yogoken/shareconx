class AddCompanyCdToUsers < ActiveRecord::Migration
  def change
    add_column :users, :company_cd, :integer
  end
end
