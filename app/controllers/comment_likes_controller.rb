class CommentLikesController < ApplicationController
  before_action :set_comment_likes
  def create
    @comment_like = CommentLike.create(user_id: current_user.id, tweet_id: comment_like_params[:tweet_id], comment_id: comment_like_params[:comment_id])
    render json: {comment_likes_count: @comment_likes.count}
  end

  def destroy
    @comment_like = current_user.comment_likes.find_by(comment_id: comment_like_params[:comment_id])
    @comment_like.destroy
    render json: {comment_likes_count: @comment_likes.count}
  end

  private
    def comment_like_params
      params.permit(:comment_id, :tweet_id)
    end

    def set_comment_likes
      @comment_likes = CommentLike.where(comment_id: comment_like_params[:comment_id])
    end
end
