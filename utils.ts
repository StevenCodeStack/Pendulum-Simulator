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
