class AddUserNicknameToComments < ActiveRecord::Migration
  def change
    add_column :comments, :user_nickname, :string
  end
end
