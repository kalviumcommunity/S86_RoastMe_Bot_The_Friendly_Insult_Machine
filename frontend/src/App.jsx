import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./pages/UserList";
import AddEntity from "./pages/AddEntity";
import UpdateEntity from "./pages/UpdateEntity";
import EntitiesByUser from "./pages/EntitiesByUser";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [entities, setEntities] = useState([]);

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

  return (
    <BrowserRouter>
      <div>
        <h1>Welcome to the Entity Management</h1>

        {/* Dropdown to select a user */}
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
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
