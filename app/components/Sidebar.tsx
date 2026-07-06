"use client";
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Minus,
  Plus,
} from "lucide-react";
import React, { useState } from "react";
import { usePendulum } from "../context/PendulumProvider";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const { pendulums, setPendulums, setIsRunning } = usePendulum();
  return (
    <>
      <button className={`absolute top-2 ${open ? "left-103" : "left-2"}`}>
        {open ? (
          <ArrowLeftFromLine
            className="bg-gray-900 text-white rounded p-1.5 w-8 h-8"
            onClick={() => setOpen(false)}
          />
        ) : (
          <ArrowRightFromLine
            className="bg-gray-900 text-white rounded p-1.5 w-8 h-8"
            onClick={() => setOpen(true)}
          />
        )}
      </button>
      <div
        className={`z-100 w-100 px-5 py-2 absolute top-0 transition-all h-full bg-gray-950 border-r border-gray-800 text-white flex flex-col ${open ? "left-0" : "-left-full"} `}
      >
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Pendulum Calculator</h1>
          <Plus
            className="w-8 h-8"
            onClick={() => {
              setPendulums([
                ...pendulums,
                {
                  id: (Date.now() + Math.random() * 1000).toString(),
                  gravitationalAcceleration: 9.8,
                  length: 1,
                  angle: 30,
                  initialAngle: 30,
                  angularAcceleration: 0,
                  angularVelocity: 0,
                },
              ]);
              setIsRunning(true);
            }}
          />
        </header>

        {/* Container */}
        <div className="mt-6 h-full w-full overflow-y-auto flex flex-col gap-2">
          {/* Item */}
          {pendulums.map((e) => (
            <div
              key={e.id}
              className="w-full h-12 border border-slate-900 flex items-center justify-between px-3"
            >
              <div className="flex justify-between items-center gap-3">
                <div className="flex justify-between items-center gap-2">
                  <p>l :</p>
                  <input
                    type="number"
                    defaultValue={e.length}
                    onKeyDown={(event) => {
                      if (parseFloat(event.currentTarget.value) < 0)
                        event.currentTarget.value = "0";
                      else if (event.key === "Enter") {
                        const newValue = parseFloat(event.currentTarget.value);
                        if (!isNaN(newValue)) {
                          setPendulums((prev) =>
                            prev.map((item) =>
                              item.id === e.id
                                ? { ...item, l: newValue }
                                : item,
                            ),
                          );
                        }
                        event.currentTarget.blur();
                      }
                    }}
                    onBlur={(event) => {
                      const newValue = parseFloat(event.currentTarget.value);
                      if (!isNaN(newValue)) {
                        setPendulums((prev) =>
                          prev.map((item) =>
                            item.id === e.id
                              ? { ...item, length: newValue }
                              : item,
                          ),
                        );
                      }
                    }}
                    className="border border-slate-800 w-12 pl-1"
                  />
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p>a :</p>
                  <input
                    type="number"
                    defaultValue={e.angle}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        const newValue = parseFloat(event.currentTarget.value);
                        if (!isNaN(newValue)) {
                          setPendulums((prev) =>
                            prev.map((item) =>
                              item.id === e.id
                                ? { ...item, angle: newValue }
                                : item,
                            ),
                          );
                        }
                        event.currentTarget.blur();
                      }
                    }}
                    onBlur={(event) => {
                      const newValue = parseFloat(event.currentTarget.value);
                      if (!isNaN(newValue)) {
                        setPendulums((prev) =>
                          prev.map((item) =>
                            item.id === e.id
                              ? { ...item, angle: newValue }
                              : item,
                          ),
                        );
                      }
                    }}
                    className="border border-slate-800 w-12 pl-1"
                  />
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p>g :</p>
                  <input
                    type="number"
                    defaultValue={e.gravitationalAcceleration}
                    onKeyDown={(event) => {
                      if (parseFloat(event.currentTarget.value) < 0)
                        event.currentTarget.value = "0";
                      else if (event.key === "Enter") {
                        const newValue = parseFloat(event.currentTarget.value);
                        if (!isNaN(newValue)) {
                          setPendulums((prev) =>
                            prev.map((item) =>
                              item.id === e.id
                                ? {
                                    ...item,
                                    gravitationalAcceleration: newValue,
                                  }
                                : item,
                            ),
                          );
                        }
                        event.currentTarget.blur();
                      }
                    }}
                    onBlur={(event) => {
                      const newValue = parseFloat(event.currentTarget.value);
                      if (!isNaN(newValue)) {
                        setPendulums((prev) =>
                          prev.map((item) =>
                            item.id === e.id ? { ...item, g: newValue } : item,
                          ),
                        );
                      }
                    }}
                    className="border border-slate-800 w-12 pl-1"
                  />
                </div>
              </div>

              <Minus
                onClick={() =>
                  setPendulums(pendulums.filter((item) => item.id !== e.id))
                }
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
