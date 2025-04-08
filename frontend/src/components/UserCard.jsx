import React from "react";

const UserCard = ({ user }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h2>{user.username}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role || "N/A"}</p>
    </div>
  );
};

export default UserCard;
