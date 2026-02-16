class User < ApplicationRecord
  rolify
  has_secure_password

  has_many :tickets, dependent: :destroy
  belongs_to :assigned_to, class_name: "User", optional: true
  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }, if: -> { password.present? }
end
