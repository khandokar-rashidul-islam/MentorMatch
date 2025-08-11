// src/context/RoleProvider.jsx
import { useState } from "react";
import { RoleContext } from "./RoleContext";

export default function RoleProvider({ children }) {
  const [role, setRole] = useState("learner");

  const toggleRole = () => {
    setRole((prev) => (prev === "learner" ? "mentor" : "learner"));
  };

  return (
    <RoleContext.Provider value={{ role, toggleRole }}>
      {children}
    </RoleContext.Provider>
  );
}
