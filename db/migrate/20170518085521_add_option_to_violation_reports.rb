class AddOptionToViolationReports < ActiveRecord::Migration
  def change
    add_column :violation_reports, :option, :string
  end
end
