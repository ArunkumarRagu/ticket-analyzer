import { useState, useContext } from "react";
import api from "../api/client";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post("/register", form);
    login(res.data);
    navigate("/");
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-6">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              onChange={(e) => setForm({...form, name: e.target.value})}
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={(e) => setForm({...form, email: e.target.value})}
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={(e) => setForm({...form, password: e.target.value})}
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full">
          Register
        </button>
      </form>
      <p className="text-sm text-center text-gray-600 mt-6">
          New User?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline"
          >
            Login here
          </Link>
        </p>
    </div>
  );
}

export default Register;
