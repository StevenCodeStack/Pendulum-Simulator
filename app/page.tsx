import React from "react";
import Sidebar from "./components/Sidebar";
import PendulumCanvas from "./components/PendulumCanvas";
import ControlButton from "./components/ControlButton";
import Infobar from "./components/Infobar";

const page = () => {
  return (
    <div className="relative overflow-hidden h-screen w-screen">
      <Sidebar />
      <Infobar />
      <ControlButton />
      <PendulumCanvas />
    </div>
  );
};

export default page;
