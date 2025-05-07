import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserList from "./pages/UserList";
import AddEntity from "./pages/AddEntity";
import UpdateEntity from "./pages/UpdateEntity";
import EntitiesByUser from "./pages/EntitiesByUser";
import Login from "./components/Login";  // Import Login component
import Logout from "./components/Logout"; // Import Logout component
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [entities, setEntities] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [currentUser, setCurrentUser] = useState(null); // Store the logged-in user's data

  // Fetch users from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users") // Adjust URL based on your server
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Fetch entities by selected user
  useEffect(() => {
    if (selectedUser) {
      axios
        .get(`http://localhost:5000/api/entities/by-user/${selectedUser}`)
        .then((response) => {
          setEntities(response.data.entities);
        })
        .catch((error) => {
          console.error("Error fetching entities:", error);
        });
    }
  }, [selectedUser]);

  // Fetch current login status and user details (if any)
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/check-status")
      .then((response) => {
        if (response.data.loggedIn) {
          setIsLoggedIn(true);
          setCurrentUser(response.data.user);
        }
      })
      .catch((error) => {
        console.error("Error checking login status:", error);
      });
  }, []);

  // Handle logout (to remove cookie)
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout");
      setIsLoggedIn(false);
      setCurrentUser(null);
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <BrowserRouter>
      <div>
        <h1>Welcome to the Entity Management</h1>

        {/* Show login/logout based on user status */}
        <div>
          {!isLoggedIn ? (
            <Link to="/login">Login</Link>
          ) : (
            <>
              <span>Welcome, {currentUser?.username}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>

        {/* Dropdown to select a user */}
        {isLoggedIn && (
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        )}

        {/* Display entities created by the selected user */}
        {selectedUser && (
          <div>
            <h2>Entities Created by {users.find((user) => user.id === selectedUser)?.username}</h2>
            <ul>
              {entities.length > 0 ? (
                entities.map((entity) => (
                  <li key={entity.id}>
                    {entity.name} - {entity.description}
                  </li>
                ))
              ) : (
                <p>No entities found for this user.</p>
              )}
            </ul>
          </div>
        )}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add" element={<AddEntity />} />
          <Route path="/update/:id" element={<UpdateEntity />} />
          <Route path="/entities-by-user" element={<EntitiesByUser />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
