// src/UserForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // POST the new user data to the backend
      await axios.post("http://localhost:3000/api/users", formData);
      navigate("/"); // Redirect to the user list after successful submission
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add New User</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          placeholder="Username"
          className="border p-2 w-full"
          required
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
          className="border p-2 w-full"
          required
        />
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add User
        </button>
      </form>
    </div>
  );
}
