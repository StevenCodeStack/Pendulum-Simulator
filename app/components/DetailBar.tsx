"use client";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import React, { useState, useEffect } from "react";
import { usePendulum } from "../context/PendulumProvider";

const DetailBar = () => {
  const [open, setOpen] = useState(true);
  const { pendulums, livePhysicsRef } = usePendulum();

  const [displayData, setDisplayData] = useState<
    {
      id: string;
      angle: number;
      angularVelocity: number;
      angularAcceleration: number;
    }[]
  >([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const live = livePhysicsRef.current;
      if (live.length > 0) {
        setDisplayData(live);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [livePhysicsRef]);

  return (
    <>
      <button
        className={`absolute top-2 z-50 ${open ? "right-105" : "right-2"}`}
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <ArrowRightFromLine className="bg-gray-900 text-white rounded p-1.5 w-8 h-8" />
        ) : (
          <ArrowLeftFromLine className="bg-gray-900 text-white rounded p-1.5 w-8 h-8" />
        )}
      </button>

      <div
        className={`z-40 w-100 px-5 py-4 absolute top-0 transition-all duration-300 h-full bg-gray-950 border-l border-gray-800 text-white flex flex-col ${
          open ? "right-0" : "-right-100"
        }`}
      >
        <h1 className="text-xl font-medium text-white mb-4 tracking-tight">
          Live Data
        </h1>

        {displayData.length === 0 ? (
          <p className="text-slate-500 text-sm">No pendulums to display</p>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {displayData.map((d) => {
              const pendulum = pendulums.find((p) => p.id === d.id)!;
              const angleDeg = (d.angle * 180) / Math.PI;
              const hue = (Number(d.id) * 60) % 360;
              const color = `hsl(${hue}, 80%, 60%)`;

              const KE = 0.5 * Math.pow(d.angularVelocity * pendulum.length, 2);
              const PE =
                pendulum.gravitationalAcceleration *
                pendulum.length *
                (1 - Math.cos(d.angle));

              return (
                <div
                  key={d.id}
                  className="bg-gray-900/60 border border-gray-800 rounded-lg p-3 hover:border-gray-700 transition"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm font-mono text-white">
                      {pendulum?.length?.toFixed(2)}m
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                        Angle
                      </p>
                      <p className="text-sm font-mono text-white">
                        {angleDeg.toFixed(1)}°
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                        Velocity
                      </p>
                      <p className="text-sm font-mono text-white">
                        {d.angularVelocity.toFixed(2)} rad/s
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                        Accel
                      </p>
                      <p className="text-sm font-mono text-white">
                        {d.angularAcceleration.toFixed(2)} rad/s²
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                        KE
                      </p>
                      <p className="text-sm font-mono text-white">
                        {KE.toFixed(2)} J
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                        PE
                      </p>
                      <p className="text-sm font-mono text-white">
                        {PE.toFixed(2)} J
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                        ME
                      </p>
                      <p className="text-sm font-mono text-white">
                        {(KE + PE).toFixed(2)} J
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-gray-800 text-xs text-slate-500">
          {displayData.length} pendulum{displayData.length !== 1 ? "s" : ""}{" "}
          active
        </div>
      </div>
    </>
  );
};

export default DetailBar;
