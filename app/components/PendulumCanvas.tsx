"use client";
import { useRef, useEffect } from "react";

export default function PendulumCanvas() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvas.current) {
      const el = canvas.current;
      const ctx = el.getContext("2d")!;
      const rect = el.getBoundingClientRect();
      const dpr = window.devicePixelRatio;
      el.width = rect.width * dpr;
      el.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      const dt = 1 / 120;

      const g = 800;
      const pivotX = el.width / 2;
      const pivotY = 50;
      const length = 600;

      let angle = Math.PI / 1.1;
      let angularSpeed = 0;

      function update() {
        ctx.clearRect(0, 0, rect.width, rect.height);

        // Logic
        const angularAcceleration = -(g / length) * Math.sin(angle);
        angularSpeed = angularSpeed + angularAcceleration * dt;
        angle = angle + angularSpeed * dt;

        const xDisplacement = length * Math.sin(angle);
        const yDisplacement = length * Math.cos(angle);
        const massX = el.width / 2 + xDisplacement;
        const massY = pivotY + yDisplacement;

        // Drawing
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#0f3460";
        ctx.moveTo(pivotX, pivotY);
        ctx.lineTo(massX, massY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(pivotX, pivotY, 20, 0, Math.PI * 2);
        ctx.fillStyle = "blue";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(massX, massY, 30, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();

        requestAnimationFrame(update);
      }

      update();
    }
  }, []);

  return <canvas ref={canvas} className="h-full w-full bg-slate-200"></canvas>;
}
