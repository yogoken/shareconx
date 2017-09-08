class Bookmark < ActiveRecord::Base
  belongs_to :user, counter_cache: :bookmarks_count
  belongs_to :tweet, counter_cache: :bookmarked_count
end
