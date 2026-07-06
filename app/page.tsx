import React from "react";
import Sidebar from "./components/Sidebar";
import PendulumCanvas from "./components/PendulumCanvas";
import ControlButton from "./components/ControlButton";

const page = () => {
  return (
    <div className="relative">
      <Sidebar />
      <ControlButton />
      <PendulumCanvas />
    </div>
  );
};

export default page;
