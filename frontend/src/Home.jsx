// src/Home.jsx
import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "./api";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers(); // refresh list
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User List</h1>
      {users.map(user => (
        <div key={user._id} className="border p-2 mb-2 rounded shadow flex justify-between items-center">
          <div>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
          <div className="space-x-2">
            <button onClick={() => navigate(`/update/${user._id}`)} className="bg-blue-500 text-white px-3 py-1 rounded">Update</button>
            <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
