class RemoveTweetsIdFromViolationReports < ActiveRecord::Migration
  def change
    remove_column :violation_reports, :tweets_id, :integer
  end
end
