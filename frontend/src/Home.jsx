import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "./api";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [userEntities, setUserEntities] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  const fetchEntitiesByUser = async (userId) => {
    if (!userId) {
      setUserEntities([]);
      return;
    }
    const res = await fetch(`http://localhost:3000/api/entities/by-user/${userId}`);
    const data = await res.json();
    setUserEntities(data.entities);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers(); // refresh list
  };

  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);
    fetchEntitiesByUser(userId);
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

      <hr className="my-6" />

      <h2 className="text-lg font-semibold mb-2">Show Entities Created by User</h2>
      <select value={selectedUser} onChange={handleUserChange} className="border p-2 mb-4 rounded">
        <option value="">-- Select a User --</option>
        {users.map(user => (
          <option key={user._id} value={user._id}>{user.name}</option>
        ))}
      </select>

      {userEntities.length > 0 && (
        <div>
          <h3 className="text-md font-semibold mb-2">Entities by {users.find(u => u._id === selectedUser)?.name}:</h3>
          <ul className="space-y-2">
            {userEntities.map(entity => (
              <li key={entity._id} className="border p-2 rounded shadow">
                <p><strong>Name:</strong> {entity.name}</p>
                <p><strong>Description:</strong> {entity.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
