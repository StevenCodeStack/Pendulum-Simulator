"use client";
import { Pause, Play, RefreshCcw } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { usePendulum } from "../context/PendulumProvider";
import { degreesToRadians, formatTime } from "@/utils";
import { orbitron } from "../fonts";

const ControlButton = () => {
  const {
    pendulums,
    isRunning,
    setIsRunning,
    resetTrigger,
    triggerReset,
    updateLivePhysics,
  } = usePendulum();

  const [time, setTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const elapsedTimeRef = useRef<number>(0);
  const isRunningRef = useRef(isRunning);

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedTimeRef.current * 1000;

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = (now - startTimeRef.current) / 1000;
        setTime(elapsed);
      }, 50);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      // Save elapsed time when pausing
      const now = Date.now();
      elapsedTimeRef.current = (now - startTimeRef.current) / 1000;
      setTime(elapsedTimeRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  useEffect(() => {
    updateLivePhysics(
      pendulums.map((e) => {
        return {
          id: e.id,
          angle: degreesToRadians(e.angle),
          angularAcceleration: 0,
          angularVelocity: 0,
        };
      }),
    );
    elapsedTimeRef.current = 0;
    setTimeout(() => setTime(0), 0);
    if (isRunningRef.current) {
      startTimeRef.current = Date.now();
    }
  }, [resetTrigger]);

  return (
    <div className="absolute bottom-10 z-10 left-0 w-full">
      <p
        className={`${orbitron.className} text-center font-mono tracking-wider text-xl text-slate-300`}
      >
        {formatTime(time)}
      </p>
      <div className="text-white border-b border-t border-gray-800 h-10">
        <div className="relative w-full h-full flex justify-center items-center gap-5">
          {isRunning ? (
            <Pause
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={() => setIsRunning(false)}
            />
          ) : (
            <Play
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={() => setIsRunning(true)}
            />
          )}

          <RefreshCcw
            className="cursor-pointer hover:text-blue-400 transition"
            onClick={triggerReset}
          />
        </div>
      </div>
    </div>
  );
};

export default ControlButton;
