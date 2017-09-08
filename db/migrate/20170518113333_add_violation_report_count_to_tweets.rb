class AddViolationReportCountToTweets < ActiveRecord::Migration
  def change
    add_column :tweets, :violation_report_count, :integer
  end
end
