import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client";
import StatusBadge from "../components/StatusBadge";
import Badge from "../components/Badge";
import { AuthContext } from "../context/AuthContext";

function TicketDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [ticket, setTicket] = useState(null);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");

  useEffect(() => {
    fetchTicket();
    if (user?.roles?.includes("admin")) {
      fetchAgents();
    }
  }, []);

  const fetchTicket = async () => {
    const response = await api.get(`/tickets/${id}`);
    setTicket(response.data);
  };

  const fetchAgents = async () => {
    const response = await api.get("/agents");
    setAgents(response.data);
  };

  const assignAgent = async () => {
    await api.patch(`/tickets/${id}/assign`, {
      agent_id: selectedAgent,
    });
    fetchTicket();
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "yellow";
      case "Low":
        return "green";
      default:
        return "gray";
    }
  };

  if (!ticket) return <p>Loading...</p>;

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {ticket.title}
        </h2>
        <StatusBadge status={ticket.status} />
      </div>

      {/* Badges */}
      <div className="flex gap-3 mb-6">
        {ticket.category && (
          <Badge label={ticket.category} variant="blue" />
        )}

        {ticket.priority && (
          <Badge
            label={ticket.priority}
            variant={priorityColor(ticket.priority)}
          />
        )}

      {(user?.roles?.includes("admin") ||
        user?.roles?.includes("agent")) && (
        ticket.assigned_user ? (
          <Badge
            label={`Assignee: ${ticket.assigned_user.name}`}
            variant="green"
          />
        ) : (
          <Badge label="Unassigned" variant="gray" />
        )
      )}

      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">
          Description
        </h3>
        <p className="text-gray-700">{ticket.description}</p>
      </div>

      {/* AI Analysis */}
      {ticket.summary && (
        <div className="bg-gray-50 p-6 mb-6 rounded-lg border">
          <h3 className="font-medium mb-3 text-gray-800">
            AI Analysis
          </h3>
          <p className="text-gray-700">{ticket.summary}</p>
        </div>
      )}
      {/* Admin Assignment Section */}
        {user?.roles?.includes("admin") && (
        <div className="mb-6 p-4 bg-gray-50 border rounded-lg">
          <h3 className="text-sm font-medium mb-3">Assign Agent</h3>

          <div className="flex gap-3">
            <select
              className="border rounded-lg px-3 py-2"
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
            >
              <option value="">Select agent</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>

            <button
              onClick={assignAgent}
              disabled={!selectedAgent}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Assign
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketDetail;
