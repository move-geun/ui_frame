import { useRef } from "react";

export function useWaveAnimation(isActive: boolean) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return canvasRef;
}
