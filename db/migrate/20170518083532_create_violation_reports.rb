class CreateViolationReports < ActiveRecord::Migration
  def change
    create_table :violation_reports do |t|
      t.integer   :tweets_id
      t.integer   :user_id
      t.text      :text
      t.timestamps null: false
    end
  end
end
