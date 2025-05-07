import React from "react";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user, onDelete }) => {
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/update/${user._id}`); // Navigate to the update page for the user
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h2>{user.username || "No Name"}</h2>
      <p>Email: {user.email || "No Email"}</p>
      <p>Role: {user.role || "N/A"}</p> {/* Display the role */}
      <button onClick={handleUpdate}>Update</button> {/* Update button */}
      <button onClick={() => onDelete(user._id)} style={{ marginLeft: "10px" }}>
        Delete
      </button> {/* Delete button */}
    </div>
  );
};

export default UserCard;
