"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useRef,
} from "react";

export type PendulumState = {
  id: string;
  length: number;
  gravitationalAcceleration: number;
  angle: number;
};

export type LivePhysicsData = {
  id: string;
  angle: number;
  angularVelocity: number;
  angularAcceleration: number;
};

type PendulumContextType = {
  pendulums: PendulumState[];
  setPendulums: React.Dispatch<React.SetStateAction<PendulumState[]>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  resetTrigger: number;
  triggerReset: () => void;

  livePhysicsRef: React.MutableRefObject<LivePhysicsData[]>;
  updateLivePhysics: (data: LivePhysicsData[]) => void;
};

const PendulumContext = createContext<PendulumContextType | null>(null);

const PendulumProvider = ({ children }: { children: ReactNode }) => {
  const [pendulums, setPendulums] = useState<PendulumState[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  const livePhysicsRef = useRef<LivePhysicsData[]>([]);

  const updateLivePhysics = (data: LivePhysicsData[]) => {
    livePhysicsRef.current = data;
  };

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
        livePhysicsRef,
        updateLivePhysics,
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
