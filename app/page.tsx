import React from "react";
import Sidebar from "./components/Sidebar";
import PendulumCanvas from "./components/PendulumCanvas";

const page = () => {
  return (
    <div className="relative">
      <Sidebar />
      <PendulumCanvas />
    </div>
  );
};

export default page;
