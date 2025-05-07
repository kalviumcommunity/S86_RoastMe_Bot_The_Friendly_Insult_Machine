// src/UpdateUser.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { updateUser } from "./api"; // Import the updateUser function

export default function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", role: "" }); // Add role

  useEffect(() => {
    // Fetch existing user data
    axios.get(`http://localhost:3000/api/users/${id}`).then((res) => {
      setFormData({ 
        name: res.data.name, 
        email: res.data.email, 
        role: res.data.role || "" // Add role if available
      });
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(id, formData);  // Call the updateUser function to update the user
    navigate("/"); // go back to user list after update
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Update User</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="Name"
          className="border p-2 w-full"
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="Email"
          className="border p-2 w-full"
        />
        <input
          type="text"
          value={formData.role}
          onChange={(e) => setFormData({...formData, role: e.target.value})}
          placeholder="Role (optional)"
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}
