 class UsersController < ApplicationController
  before_action :move_to_index
  before_action :move_to_self, except: [:check_user_email, :check_user_nickname]
  def show
    @nickname = current_user.nickname
    @tweets = current_user.tweets.where('judge_flg IS NULL')
    @tweets_limited = @tweets.order("created_at DESC").limit(5)
    @companies = Company.all

    # counter
    @cr_counts = current_user.tweets.sum(:tweet_comments_count) + current_user.tweets.sum(:tweet_replies_count)
    @likes_counts = current_user.tweets.sum(:tweet_likes_count)
  end
  def update
    user = User.find(params[:id])
    if user.id == current_user.id
      user.update(user_params)
    end
    render json: {:code=>"200", :data=>{nickname: user.nickname, company_fullname: user.company.company_full_name, company_cd: user.company.company_cd}}
  end

  def check_user_nickname
    @users = User.where("nickname = ?", params[:nickname]).first
    if @users
      render :json =>  {:data => {flag: "1"}}
    else
      render :json =>  {:data => {flag: "0"}}
    end
  end
  def check_user_email
    @users = User.where("email = ?", params[:email]).first
    if @users
      render :json =>  {:data => {flag: "1"}}
    else
      render :json =>  {:data => {flag: "0"}}
    end
  end

  private
  def move_to_index
    redirect_to controller: 'welcome', action: 'index' unless user_signed_in?
  end
  def move_to_self
    user = User.find(params[:id])
    redirect_to "/users/#{current_user.id}" unless user.id == current_user.id
  end
  def user_params
    params.permit(:nickname, :company_id, :email, :company_updated_at )
  end

end
