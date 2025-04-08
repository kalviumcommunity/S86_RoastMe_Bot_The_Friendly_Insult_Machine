import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./components/UserCard";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/api/users")
      .then((res) => {
        console.log("Response:", res.data);
        setUsers(res.data.data); // ✅ only the 'data' array from the response
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>User List</h1>
      {users.length > 0 ? (
        users.map((user) => <UserCard key={user._id} user={user} />)
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default App;
