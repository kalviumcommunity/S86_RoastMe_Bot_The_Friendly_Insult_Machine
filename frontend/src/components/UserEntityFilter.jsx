import { useEffect, useState } from "react";

function UserEntityFilter() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:3000/api/users");
      const data = await res.json();
      setUsers(data.data);
    };
    fetchUsers();
  }, []);

  const fetchEntitiesByUser = async (userId) => {
    const res = await fetch(`http://localhost:3000/api/entities/by-user/${userId}`);
    const data = await res.json();
    setEntities(data.entities);
  };

  return (
    <div>
      <select
        value={selectedUser}
        onChange={(e) => {
          setSelectedUser(e.target.value);
          fetchEntitiesByUser(e.target.value);
        }}
      >
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <ul>
        {entities.map((entity) => (
          <li key={entity._id}>
            <h3>{entity.name}</h3>
            <p>{entity.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserEntityFilter;
