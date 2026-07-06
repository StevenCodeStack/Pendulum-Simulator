export const METERS_TO_PIXELS = 200;
export function metersToPixels(meters: number): number {
  return meters * METERS_TO_PIXELS;
}

export function gravityToPixels(g: number): number {
  return g * METERS_TO_PIXELS;
}

export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const centiseconds = Math.floor((seconds % 1) * 100);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(
    2,
    "0",
  )}.${String(centiseconds).padStart(2, "0")}`;
};
