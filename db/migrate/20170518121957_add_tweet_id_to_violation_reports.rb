class AddTweetIdToViolationReports < ActiveRecord::Migration
  def change
    add_column :violation_reports, :tweet_id, :integer
  end
end
