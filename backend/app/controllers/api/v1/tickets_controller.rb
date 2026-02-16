# app/controllers/api/v1/tickets_controller.rb
module Api
  module V1
    class TicketsController < ApplicationController
      def index
        tickets = if @current_user.has_role?(:admin)
                    Ticket.includes(:assigned_user).order(created_at: :desc)
                  elsif @current_user.has_role?(:agent)
                    Ticket.where(assigned_to: @current_user.id)
                          .includes(:assigned_user)
                          .order(created_at: :desc)
                  else
                    @current_user.tickets
                                 .includes(:assigned_user)
                                 .order(created_at: :desc)
                  end

        render json: tickets.as_json(
          include: {
            assigned_user: { only: %i[id name email] }
          }
        )
      end

      def show
        ticket = Ticket.includes(:assigned_user).find(params[:id])

        render json: ticket.as_json(
          include: {
            assigned_user: { only: %i[id name email] }
          }
        )
      end

      def create
        return render json: { error: 'Not allowed' }, status: :forbidden unless @current_user.has_role?(:customer)

        ticket = @current_user.tickets.create!(
          ticket_params.merge({ status: 'pending', user_id: @current_user.id })
        )
        AnalyzeTicketJob.perform_later(ticket.id)

        render json: ticket, status: :created
      end

      def assign
        return render json: { error: 'Forbidden' }, status: :forbidden unless @current_user.has_role?(:admin)

        ticket = Ticket.find(params[:id])
        agent = User.find(params[:agent_id])

        unless agent.has_role?(:agent)
          return render json: { error: 'User is not an agent' }, status: :unprocessable_entity
        end

        ticket.update!(assigned_user: agent)

        render json: { message: 'Ticket assigned successfully' }
      end

      private

      def ticket_params
        params.require(:ticket).permit(:title, :description)
      end
    end
  end
end
