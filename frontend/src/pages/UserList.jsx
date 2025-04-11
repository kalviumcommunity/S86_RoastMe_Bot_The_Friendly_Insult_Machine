import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../components/UserCard";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    axios.get("http://localhost:3000/api/users")
      .then((res) => {
        setUsers(res.data.users); // ✅ fixed this line
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <Link to="/add">
        <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">
          Add New User
        </button>
      </Link>
      {users.length > 0 ? (
        users.map((user) => (
          <UserCard key={user._id} user={user} onDelete={handleDelete} />
        ))
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserList;
