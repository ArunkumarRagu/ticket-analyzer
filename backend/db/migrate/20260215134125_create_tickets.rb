class CreateTickets < ActiveRecord::Migration[7.1]
  def change
    create_table :tickets do |t|
      t.string :title
      t.text :description
      t.string :category
      t.string :priority
      t.text :summary
      t.string :status
      t.text :raw_ai_response

      t.timestamps
    end
  end
end
