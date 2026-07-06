"use client";
import { useRef, useEffect } from "react";
import { usePendulum } from "../context/PendulumProvider";
import {
  degreesToRadians,
  gravityToPixels,
  METERS_TO_PIXELS,
  metersToPixels,
} from "@/utils";

export default function PendulumCanvas() {
  const { pendulums } = usePendulum();
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvas.current) return;

    const el = canvas.current;
    const ctx = el.getContext("2d")!;
    const rect = el.getBoundingClientRect();
    const dpr = window.devicePixelRatio;

    el.width = rect.width * dpr;
    el.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const dt = 1 / 120;
    const pivotX = rect.width / 2;
    const pivotY = 80;

    const pendulumStates = pendulums.map((p) => ({
      id: p.id,
      lengthPixels: metersToPixels(p.l || 1.0),
      gravityPixels: gravityToPixels(p.g || 9.81),
      angle: degreesToRadians(p.angle || 30),
      angularSpeed: 0,
    }));

    function update() {
      ctx.clearRect(0, 0, rect.width, rect.height);

      pendulumStates.forEach((p) => {
        const alpha = -(p.gravityPixels / p.lengthPixels) * Math.sin(p.angle);
        p.angularSpeed += alpha * dt;
        p.angle += p.angularSpeed * dt;

        const bobX = pivotX + p.lengthPixels * Math.sin(p.angle);
        const bobY = pivotY + p.lengthPixels * Math.cos(p.angle);

        ctx.beginPath();
        ctx.moveTo(pivotX, pivotY);
        ctx.lineTo(bobX, bobY);
        ctx.strokeStyle = "#0f3460";
        ctx.lineWidth = 3;
        ctx.stroke();

        const bobRadius = Math.max(10, p.lengthPixels / 20);
        ctx.beginPath();
        ctx.arc(bobX, bobY, bobRadius, 0, Math.PI * 2);
        const hue = (Number(p.id) * 60) % 360;
        ctx.fillStyle = `hsl(${hue}, 80%, 60%)`;
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = "#8899cc";
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.fillText(
          `${(p.lengthPixels / METERS_TO_PIXELS).toFixed(2)}m`,
          bobX,
          bobY - bobRadius - 8,
        );
      });

      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, 14, 0, Math.PI * 2);
      ctx.fillStyle = "#3b82f6";
      ctx.shadowColor = "#3b82f6";
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.shadowBlur = 0;

      requestAnimationFrame(update);
    }

    update();
  }, [pendulums]);

  return <canvas ref={canvas} className="h-full w-full bg-black"></canvas>;
}
