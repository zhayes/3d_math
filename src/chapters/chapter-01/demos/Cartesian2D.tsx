import {
  MeshBuilder,
  StandardMaterial,
  Color3,
  Vector3,
} from "babylonjs"
import {
  createArcRotateCamera,
  setupDefaultLighting,
} from "@/utils/babylon-helpers"

export const demoId = "cartesian-2d"
export const title = "2D 笛卡尔平面"

export function setupScene(scene: any, engine: any) {
  // Warm off-white background like parchment
  scene.clearColor.set(0.96, 0.94, 0.89, 1)

  // Create a subtle ground plane as the "paper"
  const paper = MeshBuilder.CreatePlane("paper", { size: 12 }, scene)
  paper.rotation.x = Math.PI / 2
  const paperMat = new StandardMaterial("paperMat", scene)
  paperMat.diffuseColor = new Color3(0.98, 0.97, 0.95)
  paper.material = paperMat

  // Draw 2D axes: X (warm coral) and Y (teal green)
  const axisLen = 5
  const origin = Vector3.Zero()

  // X axis - warm coral
  const xLine = MeshBuilder.CreateLines("xAxis", {
    points: [origin, new Vector3(axisLen, 0, 0)],
  }, scene)
  xLine.color = new Color3(0.89, 0.35, 0.28)

  // Y axis in 2D → up = Z axis in Babylon (teal green)
  const yLine = MeshBuilder.CreateLines("yAxis", {
    points: [origin, new Vector3(0, 0, axisLen)],
  }, scene)
  yLine.color = new Color3(0.18, 0.6, 0.47)

  // Grid lines - soft warm gray
  const gridLines: Vector3[][] = []
  for (let i = -4; i <= 4; i++) {
    gridLines.push([new Vector3(i, 0.01, -4), new Vector3(i, 0.01, 4)])
    gridLines.push([new Vector3(-4, 0.01, i), new Vector3(4, 0.01, i)])
  }
  const grid = MeshBuilder.CreateLineSystem("grid", { lines: gridLines }, scene)
  grid.color = new Color3(0.82, 0.8, 0.78)

  // Plot some sample points with soft, harmonious colors
  const points = [
    { x: 2, y: 3, label: "(2, 3)", hue: 0.6 },
    { x: -1, y: 2, label: "(-1, 2)", hue: 0.75 },
    { x: 3, y: -1.5, label: "(3, -1.5)", hue: 0.45 },
    { x: -2, y: -2.5, label: "(-2, -2.5)", hue: 0.55 },
  ]

  points.forEach((p) => {
    const sphere = MeshBuilder.CreateSphere(
      `pt_${p.x}_${p.y}`,
      { diameter: 0.22 },
      scene,
    )
    sphere.position = new Vector3(p.x, 0.06, p.y)
    const mat = new StandardMaterial(`ptMat_${p.x}_${p.y}`, scene)
    mat.diffuseColor = new Color3(0.25, 0.45, 0.8)
    mat.emissiveColor = new Color3(0.05, 0.1, 0.2)
    mat.specularColor = new Color3(0.3, 0.3, 0.3)
    sphere.material = mat
  })

  setupDefaultLighting(scene)

  const canvas = engine.getRenderingCanvas()
  if (canvas) {
    const cam = createArcRotateCamera(scene, canvas as HTMLCanvasElement, {
      alpha: -Math.PI / 2,
      beta: 0.1,
      radius: 14,
    })
    cam.lowerRadiusLimit = 5
    cam.upperRadiusLimit = 30
    cam.lowerBetaLimit = 0.01
    cam.upperBetaLimit = Math.PI / 3
  }
}