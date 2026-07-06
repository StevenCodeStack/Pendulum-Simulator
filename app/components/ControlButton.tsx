"use client";
import { Pause, Play, RefreshCcw } from "lucide-react";
import React from "react";
import { usePendulum } from "../context/PendulumProvider";

const ControlButton = () => {
  const { isRunning, setIsRunning, triggerReset } = usePendulum();
  return (
    <div className="text-white absolute bottom-10 z-1 left-0 w-full border-b border-t border-gray-800 h-10 flex justify-center items-center gap-5">
      {isRunning ? (
        <Pause onClick={() => setIsRunning(false)} />
      ) : (
        <Play className="" onClick={() => setIsRunning(true)} />
      )}

      <RefreshCcw onClick={triggerReset} />
    </div>
  );
};

export default ControlButton;
