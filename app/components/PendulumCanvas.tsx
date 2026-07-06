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
  const { pendulums, isRunning, resetTrigger, updateLivePhysics } =
    usePendulum();
  const canvas = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const isRunningRef = useRef(isRunning);

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  const pendulumStatesRef = useRef<
    {
      id: string | number;
      lengthPixels: number;
      gravityPixels: number;
      angle: number;
      initialAngle: number;
      angularVelocity: number;
      angularAcceleration: number;
    }[]
  >([]);

  function initializePendulums() {
    pendulumStatesRef.current = pendulums.map((p) => ({
      id: p.id,
      lengthPixels: metersToPixels(p.length),
      gravityPixels: gravityToPixels(p.gravitationalAcceleration),
      angle: degreesToRadians(p.angle),
      initialAngle: degreesToRadians(p.angle),
      angularVelocity: 0,
      angularAcceleration: 0,
    }));
  }

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

    initializePendulums();

    function update() {
      ctx.clearRect(0, 0, rect.width, rect.height);

      if (isRunningRef.current) {
        pendulumStatesRef.current.forEach((p) => {
          if (p.lengthPixels < 0.1) {
            p.angularVelocity = 0;
            p.angle = p.initialAngle;
            p.angularAcceleration = 0;
            return;
          }

          p.angularAcceleration =
            -(p.gravityPixels / p.lengthPixels) * Math.sin(p.angle);
          p.angularVelocity += p.angularAcceleration * dt;
          p.angle += p.angularVelocity * dt;
        });

        const liveData = pendulumStatesRef.current.map((p) => ({
          id: String(p.id),
          angle: p.angle,
          angularVelocity: p.angularVelocity,
          angularAcceleration: p.angularAcceleration,
        }));
        updateLivePhysics(liveData);
      }

      pendulumStatesRef.current.forEach((p) => {
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
        ctx.font = "20px monospace";
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

      animationRef.current = requestAnimationFrame(update);
    }

    update();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [pendulums]);

  useEffect(() => {
    initializePendulums();
  }, [resetTrigger]);

  return <canvas ref={canvas} className="h-full w-full bg-black"></canvas>;
}
