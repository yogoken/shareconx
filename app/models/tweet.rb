class Tweet < ActiveRecord::Base
  belongs_to :user
  belongs_to :company
  has_many :comments, dependent: :destroy
  has_many :replies, dependent: :destroy
  has_many :tweet_likes, dependent: :destroy
  has_many :comment_likes, dependent: :destroy
  has_many :pvs
  has_many :bookmarks, dependent: :destroy
  has_many :violation_reports

  def tweet_like_user(user_id)
   tweet_likes.find_by(user_id: user_id)
  end
  def tweet_bookmark_user(user_id)
   bookmarks.find_by(user_id: user_id)
  end
  def tweet_violation_flg(user_id)
   violation_reports.find_by(user_id: user_id)
  end

  # def tweet_pv_user(user_id)
  #   -if (Time.now - tweet.pvs.created_at)/1.day <= 1
  #     pvs.find_by(user_id: user_id)
  # end

  has_many :feed_contents, ->{ order("comment_id asc", "created_at ASC") }
end
