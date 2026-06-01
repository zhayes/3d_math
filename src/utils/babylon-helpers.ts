import {
  Scene,
  ArcRotateCamera,
  Vector3,
  Color3,
  Color4,
  CreateLines,
  CreateLineSystem,
  HemisphericLight,
} from "babylonjs";

/**
 * Creates an ArcRotateCamera with sensible defaults for math visualization.
 * The camera orbits around the origin.
 *
 * @param scene - The Babylon.js scene
 * @param canvas - The HTML canvas element
 * @param options - Optional overrides
 */
export function createArcRotateCamera(
  scene: Scene,
  canvas: HTMLCanvasElement,
  options?: {
    alpha?: number;
    beta?: number;
    radius?: number;
    target?: Vector3;
  }
): ArcRotateCamera {
  const alpha = options?.alpha ?? -Math.PI / 2;
  const beta = options?.beta ?? Math.PI / 3;
  const radius = options?.radius ?? 10;
  const target = options?.target ?? Vector3.Zero();

  const camera = new ArcRotateCamera(
    "orbitCamera",
    alpha,
    beta,
    radius,
    target,
    scene
  );
  camera.attachControl(canvas, true);
  camera.lowerRadiusLimit = 2;
  camera.upperRadiusLimit = 50;
  camera.wheelPrecision = 2; // Sensible zoom speed

  return camera;
}

/**
 * Draws XYZ axis lines at the origin.
 * X = Red, Y = Green, Z = Blue.
 *
 * @param scene - The Babylon.js scene
 * @param size - Length of each axis arm (default 5)
 */
export function createAxisSystem(scene: Scene, size: number = 5): void {
  const origin = Vector3.Zero();

  // X axis - Red
  CreateLines("axisX", {
    points: [
      origin,
      new Vector3(size, 0, 0),
      new Vector3(size * 0.85, size * 0.1, 0),
      new Vector3(size, 0, 0),
      new Vector3(size * 0.85, -size * 0.1, 0),
    ],
    colors: [
      new Color4(1, 0, 0, 1),
      new Color4(1, 0, 0, 1),
      new Color4(1, 0, 0, 1),
      new Color4(1, 0, 0, 1),
      new Color4(1, 0, 0, 1),
    ],
  }, scene);

  // Y axis - Green
  CreateLines("axisY", {
    points: [
      origin,
      new Vector3(0, size, 0),
      new Vector3(0, size * 0.85, size * 0.1),
      new Vector3(0, size, 0),
      new Vector3(0, size * 0.85, -size * 0.1),
    ],
    colors: [
      new Color4(0, 1, 0, 1),
      new Color4(0, 1, 0, 1),
      new Color4(0, 1, 0, 1),
      new Color4(0, 1, 0, 1),
      new Color4(0, 1, 0, 1),
    ],
  }, scene);

  // Z axis - Blue
  CreateLines("axisZ", {
    points: [
      origin,
      new Vector3(0, 0, size),
      new Vector3(0, size * 0.1, size * 0.85),
      new Vector3(0, 0, size),
      new Vector3(0, -size * 0.1, size * 0.85),
    ],
    colors: [
      new Color4(0, 0, 1, 1),
      new Color4(0, 0, 1, 1),
      new Color4(0, 0, 1, 1),
      new Color4(0, 0, 1, 1),
      new Color4(0, 0, 1, 1),
    ],
  }, scene);
}

/**
 * Creates a reference grid on the XZ plane (ground).
 *
 * @param scene - The Babylon.js scene
 * @param size - Total width/depth of the grid (default 20)
 * @param divisions - Number of subdivisions (default 20)
 */
export function createGroundGrid(
  scene: Scene,
  size: number = 20,
  divisions: number = 20
): void {
  const half = size / 2;
  const step = size / divisions;
  const lines: Vector3[][] = [];

  // Lines parallel to X
  for (let i = 0; i <= divisions; i++) {
    const z = -half + i * step;
    lines.push([
      new Vector3(-half, 0, z),
      new Vector3(half, 0, z),
    ]);
  }

  // Lines parallel to Z
  for (let i = 0; i <= divisions; i++) {
    const x = -half + i * step;
    lines.push([
      new Vector3(x, 0, -half),
      new Vector3(x, 0, half),
    ]);
  }

  // Create all grid lines in a single LineSystem
  CreateLineSystem("groundGrid", { lines }, scene);
}

/**
 * Sets up default lighting for a scene: a hemispheric key light and a
 * directional fill light.
 *
 * @param scene - The Babylon.js scene
 */
export function setupDefaultLighting(scene: Scene): void {
  // Hemispheric light for ambient fill
  const hemi = new HemisphericLight(
    "hemiLight",
    new Vector3(0, 1, 0),
    scene
  );
  hemi.intensity = 0.7;
  hemi.diffuse = new Color3(1, 1, 1);
  hemi.specular = new Color3(0.1, 0.1, 0.1);
  hemi.groundColor = new Color3(0.2, 0.2, 0.3);
}