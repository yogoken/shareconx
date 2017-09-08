class CreateCompanies < ActiveRecord::Migration
  def change
    create_table :companies do |t|
      t.string      :company_cd
      t.string      :company_full_name
      t.timestamps
    end
  end
end
