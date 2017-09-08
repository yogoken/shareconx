class ViolationReportsController < ApplicationController
  def create
    @violation_report = ViolationReport.create(user_id: current_user.id, tweet_id: violation_report_params[:tweet_id], text: violation_report_params[:text], option: violation_report_params[:option])
    render json: {:code=>"200"}
  end
  private
  def violation_report_params
    params.permit(:tweet_id, :text, :option)
  end
end
