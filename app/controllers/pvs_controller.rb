class PvsController < ApplicationController
  def create
    @pv = Pv.create(user_id: current_user.id, tweet_id: pv_params[:tweet_id])
    @pvs = Pv.where(tweet_id: pv_params[:tweet_id])
    render json: {:code=>"200"}
  end

  private
    def pv_params
      params.permit(:tweet_id)
    end
end
