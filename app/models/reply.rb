class Reply < ActiveRecord::Base
    #callback
  after_create :create_feed_content

  #validation
  validates_presence_of :user_id, :text

  private
  def create_feed_content
    self.feed_content = FeedContent.create(comment_id: comment.id, tweet_id: comment.tweet_id, created_at: created_at)
  end

  belongs_to  :user
  belongs_to  :comment, counter_cache: :comment_replies_count
  belongs_to :tweet, counter_cache: :tweet_replies_count
  has_one :feed_content, as: :content, dependent: :destroy

end
