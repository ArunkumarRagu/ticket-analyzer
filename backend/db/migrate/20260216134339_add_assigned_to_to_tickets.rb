class AddAssignedToToTickets < ActiveRecord::Migration[7.1]
  def change
    add_column :tickets, :assigned_to, :integer
  end
end
