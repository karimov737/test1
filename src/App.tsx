import React from "react";
import Dashboard from "./components/Dashboard/dashboard";
import Navbar from "./components/Navbar/Navbar";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
        <Dashboard />
    </>
  );
};

export default App;
