import { useEffect, useState } from "react";

function UserEntityFilter() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/users");
        const data = await res.json();
        setUsers(data.data);
      } catch (err) {
        setError("Failed to fetch users");
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const fetchEntitiesByUser = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:3000/api/entities/by-user/${userId}`);
      const data = await res.json();
      setEntities(data.entities);
    } catch (err) {
      setError("Failed to fetch entities");
      console.error(err);
    }
    setLoading(false);
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

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul>
        {entities.map((entity) => (
          <li key={entity._id}>
            <h3>{entity.name}</h3>
            <p>{entity.description}</p>
          </li>
        ))}
      </ul>

      {entities.length === 0 && !loading && !error && selectedUser && <p>No entities found for this user.</p>}
    </div>
  );
}

export default UserEntityFilter;
