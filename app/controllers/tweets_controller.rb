class TweetsController < ApplicationController
  before_action :move_to_welcome
  before_action :move_to_top, only: [:show]

  def index
    @tweets_1 = Tweet.where('room_id = 1 AND judge_flg IS NULL').order('id desc')
    @tweets_x = []
    @tweets_y = Tweet.where('judge_flg IS NULL').order('id desc')
    @tweets_y.each do |tweet|
      if tweet.room_id == current_user.company_id
        @tweets_x << tweet
      end
    end
    # @pv = current_user.pvs.find_by(tweet_id: params[:id])
    @pvs = Pv.where(tweet_id: params[:id])
  end
  def new
  end
  def show
    @tweet = Tweet.find(params[:id])
    @tweet_like = current_user.tweet_likes.find_by(tweet_id: params[:id])
    @tweet_likes = TweetLike.where(tweet_id: params[:id])

    @tweet_bookmark = current_user.bookmarks.find_by(tweet_id: params[:id])

    @least_comments = Comment.where(tweet_id: params[:id]).order('id asc')

    @comment_likes = CommentLike.where(comment_id: params[:comment_id])

    @comments = Comment.where(tweet_id: params[:id]).includes(:tweet)
    @replies = Reply.where(tweet_id: params[:id])

    @comment_counts = @tweet.comments.count + @tweet.replies.count

    feed_contents = @tweet.feed_contents.includes(:content)
    @feed_contents = feed_contents.map(&:content)

  end
  def create
    Tweet.create(title: tweet_params[:title], company_cd: current_user.company.company_cd, nickname: current_user.nickname,room_id: tweet_params[:room_id], text: tweet_params[:text], user_id: current_user.id)
    redirect_to :root
   end
  def destroy
    tweet = Tweet.find(params[:id])
      if tweet.user_id == current_user.id
        tweet.destroy
      end
    redirect_to :root
  end
  def update
    tweet = Tweet.find(params[:id])
    if tweet.user_id == current_user.id
      tweet.update(tweet_params)
    end
    render json: {:code=>"200", :data=>{text: tweet.text, title: tweet.title}}
  end

  def check_violation_count
    @violated_tweet = Tweet.find(params[:id])
    violation_flg = @violated_tweet.violation_report_count
    if violation_flg == 10
      @violated_tweet.judge_flg = 1
      @violated_tweet.save
      render :json =>  {:data => {flag: "1"}}
    elsif violation_flg == 20
      @violated_tweet.judge_flg = 2
      @violated_tweet.save
      render :json =>  {:data => {flag: "2"}}
    else
      render :json =>  {:data => {flag: "0"}}
    end
  end

  private
    def tweet_params
      params.permit(:title, :room_id, :text)
    end
    def move_to_welcome
      redirect_to controller: 'welcome', action: 'index' unless user_signed_in?
    end
    def move_to_top
      violation_check = Tweet.find(params[:id])
      if (violation_check.judge_flg == 1 || violation_check.judge_flg == 2)
        redirect_to :root
      else
        return
      end
    end
end
