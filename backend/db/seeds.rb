# Create Admin User

admin = User.find_or_initialize_by(email: "admin@gmail.com")

admin.name = "System Admin"
admin.password = "password123"

admin.save!

admin.add_role(:admin) unless admin.has_role?(:admin)

puts "Admin user created: #{admin.email}"


agent = User.find_or_create_by!(email: "agent@gmail.com") do |u|
  u.name = "Support Agent"
  u.password = "password123"
end
agent.add_role(:agent)

customer = User.find_or_create_by!(email: "customer@gmail.com") do |u|
  u.name = "Test Customer"
  u.password = "password123"
end
customer.add_role(:customer)

