class Comment < ActiveRecord::Base
  #callback
  after_create :create_feed_content

  belongs_to :tweet, counter_cache: :tweet_comments_count
  belongs_to :user
  has_many :replies, dependent: :destroy
  has_one :feed_content, as: :content, dependent: :destroy
  has_many :comment_likes, dependent: :destroy

  def comment_like_user(user_id)
   comment_likes.find_by(user_id: user_id)
  end

  private
  def create_feed_content
    self.feed_content = FeedContent.create(comment_id: self.id, tweet_id: tweet_id, created_at: created_at)
  end

end
