class CommentsController < ApplicationController
  def create
    comment = Comment.create(text: comment_params[:text], tweet_id: comment_params[:tweet_id], user_id: current_user.id, user_nickname: current_user.nickname, company_cd: current_user.company.company_cd)
    @comments = Comment.where(tweet_id: comment_params[:tweet_id])
    render json: {:code=>"200", :data=>{text: comment.text, company_cd: comment.company_cd, user_nickname: comment.user_nickname, tweet_id: comment.tweet_id, comment_id: comment.id, comment_likes_count: comment.comment_likes_count}}
  end
  def update
    comment = Comment.find(params[:id])
    if comment.user_id == current_user.id
      comment.update(comment_params)
    end
    render json: {:code=>"200", :data=>{text: comment.text}}
  end
  def likesCount
    likesCount = Comment.find(params[:id]).comment_likes_count
    render json: {:data=>{likesCount: likesCount}}
  end
  def destroy
    comment = Comment.find(params[:id])
      if comment.user_id == current_user.id
        comment.destroy
      end
    redirect_to "/tweets/#{comment.tweet.id}"
  end
  private
  def comment_params
    params.permit(:text, :tweet_id)
  end
end
