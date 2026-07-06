"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

type PendulumState = {
  id: string;
  l: number;
  g: number;
  angle: number;
};
type PendulumContextType = {
  pendulums: PendulumState[];
  setPendulums: React.Dispatch<React.SetStateAction<PendulumState[]>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  resetTrigger: number;
  triggerReset: () => void;
};

const PendulumContext = createContext<PendulumContextType | null>(null);

const PendulumProvider = ({ children }: { children: ReactNode }) => {
  const [pendulums, setPendulums] = useState<PendulumState[]>([]);
  const [isRunning, setIsRunning] = useState(true);
  const [resetTrigger, setResetTrigger] = useState(0);
  const triggerReset = () => {
    setResetTrigger((prev) => prev + 1);
  };

  return (
    <PendulumContext.Provider
      value={{
        pendulums,
        setPendulums,
        isRunning,
        setIsRunning,
        resetTrigger,
        triggerReset,
      }}
    >
      {children}
    </PendulumContext.Provider>
  );
};
export function usePendulum() {
  const context = useContext(PendulumContext);
  if (!context) {
    throw new Error("usePendulum must be used within a PendulumProvider");
  }
  return context;
}

export default PendulumProvider;
