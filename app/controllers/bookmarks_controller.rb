class BookmarksController < ApplicationController
  def index
    @bookmarks = Bookmark.where(user_id: current_user.id).all.order('id desc')
    @companies = Company.all
  end
  def create
    @bookmark = Bookmark.create(user_id: current_user.id, tweet_id: bookmarks_params[:tweet_id])
    @bookmarks = Bookmark.where(tweet_id: bookmarks_params[:tweet_id])
    render json: {:code=>"200"}
  end
  def destroy
    @bookmarks = Bookmark.where(tweet_id: bookmarks_params[:tweet_id])
    @bookmark = current_user.bookmarks.find_by(tweet_id: bookmarks_params[:tweet_id])
    @bookmark.destroy
    render json: {:code=>"200"}
  end

  private
  def bookmarks_params
    params.permit(:tweet_id)
  end
end
