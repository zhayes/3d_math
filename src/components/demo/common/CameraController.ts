import { Scene, ArcRotateCamera } from "babylonjs";
import { createArcRotateCamera } from "@/utils/babylon-helpers";

/**
 * Creates an ArcRotateCamera with sensible defaults for math visualization.
 *
 * Defaults:
 *  - alpha = -PI/2  (camera starts on the negative X side)
 *  - beta  = PI/3   (camera is elevated ~60 degrees)
 *  - radius = 10     (camera is 10 units away)
 *  - target = origin (looks at (0,0,0))
 *
 * @param scene - The Babylon.js scene
 * @param canvas - The HTML canvas element
 * @returns The created ArcRotateCamera
 */
export function createCamera(
  scene: Scene,
  canvas: HTMLCanvasElement
): ArcRotateCamera {
  return createArcRotateCamera(scene, canvas, {
    alpha: -Math.PI / 2,
    beta: Math.PI / 3,
    radius: 10,
    target: undefined, // defaults to origin
  });
}