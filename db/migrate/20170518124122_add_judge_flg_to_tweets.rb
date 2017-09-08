class AddJudgeFlgToTweets < ActiveRecord::Migration
  def change
    add_column :tweets, :judge_flg, :integer
  end
end
