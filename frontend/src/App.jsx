import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import CreateTicket from "./pages/CreateTicket";
import TicketList from "./pages/TicketList";
import TicketDetail from "./pages/TicketDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            AI Ticket Analyzer
          </h1>

          {user && (
            <nav className="flex gap-6 text-sm font-medium items-center">
              <Link className="hover:text-blue-600" to="/">
                Tickets
              </Link>

              {user && user.roles[0] === "customer" && (
                <Link to="/new">Create Ticket</Link>
              )}

              <span className="text-gray-500">{user.name}</span>

              <button
                onClick={logout}
                className="text-red-500 hover:underline"
              >
                Logout
              </button>
            </nav>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <Routes>
          {/* Public Routes */}
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}

          {/* Protected Routes */}
          {user && (
            <>
              <Route path="/" element={<TicketList />} />
              <Route path="/new" element={<CreateTicket />} />
              <Route path="/tickets/:id" element={<TicketDetail />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
}

export default App;
