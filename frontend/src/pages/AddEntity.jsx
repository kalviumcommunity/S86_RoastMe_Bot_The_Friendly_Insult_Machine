import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEntity = () => {
  const [formData, setFormData] = useState({ username: "", email: "", role: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/users", formData);
      setMessage("User added!");
      setFormData({ username: "", email: "", role: "" });
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setMessage("Error adding user.");
    }
  };

  return (
    <div>
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Role"
          required
        />
        <button type="submit">Add User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddEntity;
