import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace this with your actual backend URL
    axios.get("https://your-backend-api.com/users/1")
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Information</h1>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <UserCard user={user} />
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
}

export default App;
