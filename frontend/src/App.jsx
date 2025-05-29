import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      setError("Failed to get users");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/user", {
        name,
        email,
      });
      setUsers([...users, res.data]);
      setName("");
      setEmail("");
      setError("");
    } catch (error) {
      setError("Failed to create user");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-700">
          User Management
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm">
            {error}
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">User List</h2>
          <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg">
            {users.map((user) => (
              <li
                key={user.id}
                className="p-4 flex justify-between items-center hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-800">{user.name}</p>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>
              </li>
            ))}
            {users.length === 0 && (
              <li className="p-4 text-gray-400 text-sm text-center">No users found.</li>
            )}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Add New User</h2>
          <form onSubmit={createUser} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Add User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
