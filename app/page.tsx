import React from "react";
import Sidebar from "./components/Sidebar";
import PendulumCanvas from "./components/PendulumCanvas";
import ControlButton from "./components/ControlButton";
import DetailBar from "./components/DetailBar";

const page = () => {
  return (
    <div className="relative overflow-hidden h-screen w-screen">
      <Sidebar />
      <DetailBar />
      <ControlButton />
      <PendulumCanvas />
    </div>
  );
};

export default page;
