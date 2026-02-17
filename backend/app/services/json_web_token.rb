require 'jwt'

class JsonWebToken
  SECRET_KEY = ENV['SECRET_KEY_BASE']

  def self.encode(payload)
    JWT.encode(payload, SECRET_KEY, 'HS256')
  end

  def self.decode(token)
    body = JWT.decode(token, SECRET_KEY)[0]
    HashWithIndifferentAccess.new(body)
  rescue
    nil
  end
end
