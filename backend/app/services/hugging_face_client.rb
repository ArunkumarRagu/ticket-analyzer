# app/services/hugging_face_client.rb
require 'net/http'
require 'json'

class HuggingFaceClient
  HF_URL = URI('https://router.huggingface.co/v1/chat/completions')

  def initialize(ticket)
    @ticket = ticket
  end

  def analyze
    http = Net::HTTP.new(HF_URL.host, HF_URL.port)
    http.use_ssl = true

    request = Net::HTTP::Post.new(HF_URL)
    request['Authorization'] = "Bearer #{ENV['HUGGINGFACE_API_KEY']}"
    request['Content-Type'] = 'application/json'

    request.body = {
      model: 'meta-llama/Meta-Llama-3-8B-Instruct:featherless-ai',
      messages: [
        { role: 'system', content: 'You are an AI support ticket analyzer.' },
        { role: 'user', content: build_prompt }
      ],
      temperature: 0.2,
      max_tokens: 300
    }.to_json
    response = http.request(request)
    parsed = JSON.parse(response.body)
    ai_text = parsed.dig('choices', 0, 'message', 'content')

    clean_text = ai_text.gsub(/```json|```/, '').strip

    json_output = JSON.parse(clean_text)

    summary_value =
      if json_output['summary'].is_a?(Array)
        json_output['summary'].join(' ')
      else
        json_output['summary']
      end

    {
      category: json_output['category'],
      priority: json_output['priority'],
      summary: summary_value,
      raw: ai_text
    }
  end

  private

  def build_prompt
    <<~PROMPT
      Act as a triage agent.
      Rules:
      - Bug: Errors, crashes, or broken features.
      - Feature: New functionality or improvement requests.
      - Billing: Payments, refunds, or subscription issues.
      - High Priority: Critical downtime, security risks, or total blockers.
      - Medium Priority: Functional issues with workarounds.
      - Low Priority: General questions or cosmetic tweaks.

      Return raw JSON only.
      Schema: {"category":"Bug|Feature|Billing|Other","priority":"Low|Medium|High","summary":"2-line string"}
      Ticket: #{@ticket.description}
    PROMPT
  end

  def extract_json(text)
    json_string = text.match(/\{.*\}/m)[0]
    JSON.parse(json_string)
  end
end
