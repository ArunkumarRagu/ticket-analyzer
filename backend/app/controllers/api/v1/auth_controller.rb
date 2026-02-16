class Api::V1::AuthController < ApplicationController
  skip_before_action :authorize_request, only: [:register, :login]

  def register
    user = ::User.create!(user_params)
    user.add_role(:customer)
    token = JsonWebToken.encode(user_id: user.id)

    render json: {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles.pluck(:name)
      }
    }
  end

  def login
    user = ::User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: user.id)
      render json: {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles.pluck(:name)
      }
    }
    else
      render json: { error: "Invalid credentials" }, status: :unauthorized
    end
  end

  private

  def user_params
    params.permit(:name, :email, :password)
  end
end
