import { useEffect, useState, useContext } from "react";
import api from "../api/client";
import { Link } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import Badge from "../components/Badge";
import { AuthContext } from "../context/AuthContext";



function TicketList() {
  const [tickets, setTickets] = useState([]);
  const { user } = useContext(AuthContext);
  

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const response = await api.get("/tickets");
    setTickets(response.data);
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

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">All Tickets</h2>

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              {/* 🔵 Blue clickable title */}
              <Link
                to={`/tickets/${ticket.id}`}
                className="text-md font-semibold text-blue-600 hover:underline"
              >
                {ticket.title}
              </Link>

              <StatusBadge status={ticket.status} />
            </div>

            {(ticket.category || ticket.priority) && (
              <div className="mt-4 flex gap-3">
                {ticket.category && (
                  <Badge label={ticket.category} variant="blue" />
                )}

                {ticket && (
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicketList;
