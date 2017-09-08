class RenameRoomId < ActiveRecord::Migration
  def change
    rename_column :tweets, :room_id, :company_id
  end
end
