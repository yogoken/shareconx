class TweetLikesController < ApplicationController
  before_action :set_tweet_likes
  def create
    @tweet_like = TweetLike.create(user_id: current_user.id, tweet_id: like_params[:tweet_id])
    render json: {count: @tweet_likes.count}
  end

  def destroy
    @tweet_like = current_user.tweet_likes.find_by(tweet_id: like_params[:tweet_id])
    @tweet_like.destroy
    render json: {count: @tweet_likes.count}
  end

  private
    def like_params
      params.permit(:tweet_id)
    end
    def set_tweet_likes
      @tweet_likes = TweetLike.where(tweet_id: like_params[:tweet_id])
    end
end
