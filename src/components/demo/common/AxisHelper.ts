import { Scene } from "babylonjs";
import { createAxisSystem } from "@/utils/babylon-helpers";

/**
 * Adds visible XYZ axis lines to a scene.
 * X = Red, Y = Green, Z = Blue.
 * This is a thin wrapper around createAxisSystem for component clarity.
 *
 * @param scene - The Babylon.js scene
 * @param size - Length of each axis arm (default 5)
 */
export function addAxisHelper(scene: Scene, size: number = 5): void {
  createAxisSystem(scene, size);
}