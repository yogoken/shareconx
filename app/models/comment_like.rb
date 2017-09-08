class CommentLike < ActiveRecord::Base
  belongs_to :user
  belongs_to :comment, counter_cache: :comment_likes_count
  belongs_to :tweet, counter_cache: :comment_likes_count
end
