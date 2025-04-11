import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./pages/UserList";
import AddEntity from "./pages/AddEntity";
import UpdateEntity from "./pages/UpdateEntity";
import EntitiesByUser from "./pages/EntitiesByUser";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<AddEntity />} />
        <Route path="/update/:id" element={<UpdateEntity />} />
        <Route path="/entities-by-user" element={<EntitiesByUser />} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
