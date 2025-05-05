import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEntityForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    created_by: "",
  });
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users");
        // Log response to verify structure
        console.log("Fetched users:", res.data);
        setUsers(res.data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/entities", formData);
      setMessage("Entity added!");
      setFormData({ name: "", description: "", created_by: "" });
      setTimeout(() => navigate("/entities-by-user"), 1000);

    } catch (err) {
      console.error(err);
      setMessage("Error adding entity.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add New Entity</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Entity Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <select
          name="created_by"
          value={formData.created_by}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select User</option>
          {users.length === 0 && <option disabled>Loading users...</option>}
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username || user.name || user.email}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Entity
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default AddEntityForm;
