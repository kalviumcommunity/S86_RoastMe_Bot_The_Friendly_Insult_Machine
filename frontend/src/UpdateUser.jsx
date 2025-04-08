// src/UpdateUser.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { updateUser } from "./api";

export default function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    // Fetch existing user data
    axios.get(`https://your-backend-url.com/users/${id}`).then((res) => {
      setFormData({ name: res.data.name, email: res.data.email });
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(id, formData);
    navigate("/"); // go back to user list
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
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}
