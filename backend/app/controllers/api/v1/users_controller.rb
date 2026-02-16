class Api::V1::UsersController < ApplicationController
  def agents
    return render json: { error: "Forbidden" }, status: :forbidden unless @current_user.has_role?(:admin)

    agents = User.with_role(:agent)

    render json: agents.select(:id, :name, :email)
  end
end
