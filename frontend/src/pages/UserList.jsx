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
        setUsers(res.data.data);
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
    <div>
      <h1>User List</h1>
      <Link to="/add"><button>Add New User</button></Link>
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
