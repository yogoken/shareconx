class AddCompanyCdToReplies < ActiveRecord::Migration
  def change
    add_column :replies, :company_cd, :string
  end
end
