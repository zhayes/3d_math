import {
  MeshBuilder,
  StandardMaterial,
  Color3,
  Color4,
  Vector3,
  DynamicTexture,
  CreateLines,
} from "babylonjs"
import {
  createArcRotateCamera,
  setupDefaultLighting,
} from "@/utils/babylon-helpers"

export const demoId = "coordinate-spaces"
export const title = "坐标空间演示：世界空间与模型空间"

/** Billboard label with transparent background */
function makeLabel(
  scene: any, name: string, position: Vector3, text: string, colorHex: string, size: number = 0.8,
) {
  const tw = 256; const th = 64
  const tex = new DynamicTexture(`tex_${name}`, { width: tw, height: th }, scene, false)
  const ctx = tex.getContext()
  ctx.clearRect(0, 0, tw, th)
  ctx.fillStyle = "rgba(8,8,14,0.5)"
  ctx.beginPath()
  ctx.roundRect(tw * 0.05, th * 0.12, tw * 0.9, th * 0.76, th * 0.38)
  ctx.fill()
  ctx.fillStyle = colorHex
  ctx.font = "bold 24px system-ui, sans-serif"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(text, tw / 2, th / 2)
  tex.update()
  const plane = MeshBuilder.CreatePlane(`plane_${name}`, { width: size, height: size * 0.35 }, scene)
  plane.position = position
  plane.billboardMode = 7
  const mat = new StandardMaterial(`mat_${name}`, scene)
  mat.diffuseTexture = tex
  mat.opacityTexture = tex
  mat.useAlphaFromDiffuseTexture = true
  mat.backFaceCulling = false
  plane.material = mat
}

function drawAxes(scene: any, origin: Vector3, size: number, rx: number, colors: [Color3, Color3, Color3]) {
  // Compute rotated basis vectors
  const rotate = (v: Vector3) => {
    const cos = Math.cos(rx), sin = Math.sin(rx)
    return new Vector3(v.x, v.y * cos - v.z * sin, v.y * sin + v.z * cos)
  }
  const xDir = rotate(new Vector3(1, 0, 0))
  const yDir = rotate(new Vector3(0, 1, 0))
  const zDir = rotate(new Vector3(0, 0, 1))

  const draw = (dir: Vector3, color: Color3, label: string) => {
    const end = origin.add(dir.scale(size))
    CreateLines(`axis_${label}`, {
      points: [origin, end],
      colors: [new Color4(color.r, color.g, color.b, 1), new Color4(color.r, color.g, color.b, 1)],
    }, scene)
    // Arrowhead
    const hl = size * 0.1
    const perp = Vector3.Cross(dir, Vector3.Up()).normalize().scale(hl * 0.4)
    const hs = end.subtract(dir.normalize().scale(hl))
    CreateLines(`arrow_${label}`, {
      points: [hs.add(perp), end, hs.subtract(perp)],
      colors: [new Color4(color.r, color.g, color.b, 1), new Color4(color.r, color.g, color.b, 1),
               new Color4(color.r, color.g, color.b, 1)],
    }, scene)
    // Sphere at tip
    const sphere = MeshBuilder.CreateSphere(`sph_${label}`, { diameter: 0.22 }, scene)
    sphere.position = end
    const m = new StandardMaterial(`sm_${label}`, scene)
    m.diffuseColor = color; m.emissiveColor = color.scale(0.3)
    sphere.material = m
  }
  draw(xDir, colors[0], "X"); draw(yDir, colors[1], "Y"); draw(zDir, colors[2], "Z")
}

export function setupScene(scene: any, engine: any) {
  scene.clearColor.set(0.07, 0.08, 0.13, 1)

  const gridLines: Vector3[][] = []
  for (let i = -6; i <= 6; i++) {
    gridLines.push([new Vector3(i, 0, -6), new Vector3(i, 0, 6)])
    gridLines.push([new Vector3(-6, 0, i), new Vector3(6, 0, i)])
  }
  const grid = MeshBuilder.CreateLineSystem("grid", { lines: gridLines }, scene)
  grid.color = new Color3(0.25, 0.25, 0.35)

  setupDefaultLighting(scene)

  // ── World space: at origin, no rotation ──
  const worldOrigin = new Vector3(-3.5, 0.5, 0)
  drawAxes(scene, worldOrigin, 3, 0,
    [new Color3(0.89, 0.35, 0.28), new Color3(0.18, 0.62, 0.49), new Color3(0.22, 0.48, 0.85)])
  makeLabel(scene, "ws", worldOrigin.add(new Vector3(0, 3.5, 0)), "世界空间", "#e35947", 1.4)

  // ── Model space: offset, rotated around X ──
  const modelOrigin = new Vector3(3.5, 0.5, 1.5)
  drawAxes(scene, modelOrigin, 2.5, 0.6,
    [new Color3(0.95, 0.55, 0.2), new Color3(0.3, 0.65, 0.7), new Color3(0.55, 0.4, 0.85)])
  makeLabel(scene, "ms", modelOrigin.add(new Vector3(0, 3, 0)), "模型空间", "#f59e0b", 1.4)

  // ── A point in model space, transformed to world space ──
  // Point in model space: (1.5, 1, 0.5)
  const modelPt = new Vector3(1.5, 1, 0.5)
  // Rotate by 0.6 rad around X
  const cos = Math.cos(0.6), sin = Math.sin(0.6)
  const rotatedPt = new Vector3(
    modelPt.x,
    modelPt.y * cos - modelPt.z * sin,
    modelPt.y * sin + modelPt.z * cos,
  )
  const worldPt = modelOrigin.add(rotatedPt)

  // Draw model-space point as a small orange sphere
  const mSphere = MeshBuilder.CreateSphere("modelPt", { diameter: 0.2 }, scene)
  mSphere.position = worldPt
  const mMat = new StandardMaterial("modelPtMat", scene)
  mMat.diffuseColor = new Color3(0.98, 0.78, 0.15)
  mMat.emissiveColor = new Color3(0.25, 0.15, 0)
  mSphere.material = mMat

  // Dashed line from model origin to point (in model space coords)
  CreateLines("modelLine", {
    points: [modelOrigin, worldPt],
    colors: [new Color4(0.98, 0.78, 0.15, 0.5), new Color4(0.98, 0.78, 0.15, 0.5)],
  }, scene)

  // Dashed line from world origin to model origin
  CreateLines("offsetLine", {
    points: [worldOrigin, modelOrigin],
    colors: [new Color4(0.5, 0.5, 0.6, 0.4), new Color4(0.5, 0.5, 0.6, 0.4)],
  }, scene)

  makeLabel(scene, "pt", worldPt.add(new Vector3(0, 0.4, 0)), "同一点", "#fbbf24", 0.9)

  const canvas = engine.getRenderingCanvas()
  if (canvas) {
    const cam = createArcRotateCamera(scene, canvas as HTMLCanvasElement, {
      alpha: -Math.PI / 2,
      beta: Math.PI / 3.5,
      radius: 16,
    })
    cam.lowerRadiusLimit = 5
    cam.upperRadiusLimit = 35
  }
}