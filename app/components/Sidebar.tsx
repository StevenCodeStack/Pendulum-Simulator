"use client";
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Minus,
  Plus,
} from "lucide-react";
import React, { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <button className={`absolute top-2 ${open ? "left-103" : "left-2"}`}>
        {open ? (
          <ArrowLeftFromLine
            className="bg-white rounded p-1 w-8 h-8"
            onClick={() => setOpen(false)}
          />
        ) : (
          <ArrowRightFromLine
            className="bg-white rounded p-1 w-8 h-8"
            onClick={() => setOpen(true)}
          />
        )}
      </button>
      <div
        className={`w-100 px-5 py-2 absolute top-0 transition-all h-full bg-white flex flex-col ${open ? "left-0" : "-left-full"} opacity-80`}
      >
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Pendulum Calculator</h1>
          <Plus className="w-8 h-8" />
        </header>

        {/* Container */}
        <div className="mt-6 h-full w-full overflow-y-auto flex flex-col gap-2">
          {/* Item */}
          <div className="w-full h-12 border border-slate-900 flex items-center justify-between px-3">
            <div className="flex justify-between items-center gap-3">
              <div className="flex justify-between items-center gap-2">
                <p>l :</p>
                <input
                  type="number"
                  className="border border-slate-800 w-12 px-3"
                />
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>a :</p>
                <input
                  type="number"
                  className="border border-slate-800 w-12 px-3"
                />
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>g :</p>
                <input
                  type="number"
                  className="border border-slate-800 w-12 px-3"
                />
              </div>
            </div>

            <Minus />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
