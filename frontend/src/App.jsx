import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
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
      console.log(response.data);
    } catch (error) {
      setError("Failed to get users", error);
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
      setUsers(...users, res.data);
    } catch (error) {
      setError("Failed to create user", error);
    }
  };

  console.log("users:", users);

  return (
    <>
      <div>
        <h2>User List</h2>
        <p className="text-red-400">{error}</p>
        <ul>
          {users.map((user) => {
            return (
              <li key={user.id}>
                {user.name} - {user.email}
              </li>
            );
          })}
        </ul>

        <h2 className="">Add User</h2>
        <div className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-2 py-1"
          />{" "}
          <br />
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-2 py-1"
          />{" "}
          <br />
          <button
            className="border bg-black text-white px-4 py-2"
            onClick={createUser}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
