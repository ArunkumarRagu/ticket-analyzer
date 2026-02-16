# app/models/ticket.rb
class Ticket < ApplicationRecord
  enum status: {
    pending: 'pending',
    processed: 'processed',
    failed: 'failed'
  }
  belongs_to :assigned_user,
  class_name: "User",
  foreign_key: "assigned_to",
  optional: true

  validates :title, :description, presence: true
end
