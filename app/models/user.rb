class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  belongs_to :company
  has_many :tweets, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :replies, dependent: :destroy
  has_many :tweet_likes, dependent: :destroy
  has_many :comment_likes, dependent: :destroy
  has_many :pvs, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :violation_reports

 validates :email,
    :format => {
      :with => /(r\.recruit\.co\.jp|waku\-2\.co\.jp)/,
      :message => 'は社用メールを利用してください。'},
    :presence => true
  validates :nickname, :presence => true
end
