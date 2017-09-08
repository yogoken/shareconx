class ViolationReport < ActiveRecord::Base
  belongs_to :tweet, counter_cache: :violation_report_count
  belongs_to :user
end
