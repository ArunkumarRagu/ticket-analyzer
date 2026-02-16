# app/jobs/analyze_ticket_job.rb
class AnalyzeTicketJob < ApplicationJob
  queue_as :default

  def perform(ticket_id)
    ticket = Ticket.find(ticket_id)
    response = HuggingFaceClient.new(ticket).analyze
    ticket.update!(
      category: response[:category],
      priority: response[:priority],
      summary: response[:summary],
      raw_ai_response: response[:raw],
      status: 'processed'
    )
  rescue StandardError => e
    ticket.update!(status: 'failed') if ticket
    Rails.logger.error("AI Analysis Failed: #{e.message}")
  end
end
