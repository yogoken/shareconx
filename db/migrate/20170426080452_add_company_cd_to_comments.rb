class AddCompanyCdToComments < ActiveRecord::Migration
  def change
    add_column :comments, :company_cd, :string
  end
end
