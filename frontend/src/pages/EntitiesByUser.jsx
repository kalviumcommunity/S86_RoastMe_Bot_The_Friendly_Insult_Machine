import React, { useEffect, useState } from "react";
import axios from "axios";

const EntitiesByUser = () => {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/entities");
        setEntities(res.data.entities || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching entities:", error);
        setLoading(false);
      }
    };

    fetchEntities();
  }, []);

  if (loading) return <p>Loading...</p>;

  const filteredEntities = entities.filter((entity) => entity.created_by);

  return (
    <div>
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Entities By User</h2>
      {filteredEntities.length > 0 ? (
        filteredEntities.map((entity) => (
          <div
            key={entity._id}
            style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px" }}
          >
            <h3>{entity.name}</h3>
            <p>{entity.description}</p>
            <p>
              <strong>Created by:</strong>{" "}
              {entity.created_by.name
                ? `${entity.created_by.name} (${entity.created_by.email})`
                : entity.created_by.email}
            </p>
          </div>
        ))
      ) : (
        <p>No entities found.</p>
      )}
    </div>
  );
};

export default EntitiesByUser;
