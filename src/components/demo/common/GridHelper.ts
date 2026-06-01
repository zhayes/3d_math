import { Scene } from "babylonjs";
import { createGroundGrid } from "@/utils/babylon-helpers";

/**
 * Creates a reference grid on the ground plane (XZ) showing unit markings.
 * This is a thin wrapper around createGroundGrid for component clarity.
 *
 * @param scene - The Babylon.js scene
 * @param size - Total width/depth of the grid (default 20)
 * @param divisions - Number of subdivisions (default 20)
 */
export function addGridHelper(
  scene: Scene,
  size: number = 20,
  divisions: number = 20
): void {
  createGroundGrid(scene, size, divisions);
}