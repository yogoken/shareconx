class RepliesController < ApplicationController
  def create
    @reply = Reply.create(text: reply_params[:text], comment_id: reply_params[:comment_id], tweet_id: reply_params[:tweet_id], user_id: current_user.id, user_nickname: current_user.nickname, company_cd: current_user.company.company_cd)
    @replies = Reply.where(tweet_id: reply_params[:tweet_id])
    redirect_to "/tweets/#{@reply.tweet_id}"
  end
  def update
    reply = Reply.find(params[:id])
    if reply.user_id == current_user.id
      reply.update(reply_params)
    end
    render json: {:code=>"200", :data=>{text: reply.text}}
  end
  def destroy
    reply = Reply.find(params[:id])
      if reply.user_id == current_user.id
        reply.destroy
      end
    redirect_to "/tweets/#{reply.tweet.id}"
  end

  private
  def reply_params
    params.permit(:text, :comment_id, :tweet_id)
  end
end
