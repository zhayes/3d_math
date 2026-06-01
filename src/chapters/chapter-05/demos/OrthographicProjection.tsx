import {
  Scene,
  Engine,
  MeshBuilder,
  StandardMaterial,
  Color3,
  Color4,
  Vector3,
  CreateLines,
  DynamicTexture,
} from "babylonjs"
import {
  createArcRotateCamera,
  setupDefaultLighting,
} from "@/utils/babylon-helpers"

export const demoId = "orthographic-projection"
export const title = "正交投影演示：投影到坐标平面"

/** Billboard label with transparent background */
function makeLabel(
  scene: Scene, name: string, position: Vector3, text: string,
  colorHex: string, size: number = 0.7,
) {
  const tw = 256; const th = 52
  const tex = new DynamicTexture(`tex_${name}`, { width: tw, height: th }, scene, false)
  const ctx = tex.getContext()
  ctx.clearRect(0, 0, tw, th)
  ctx.fillStyle = "rgba(8,8,14,0.55)"
  ctx.beginPath()
  ctx.roundRect(tw * 0.05, th * 0.15, tw * 0.9, th * 0.7, th * 0.35)
  ctx.fill()
  ctx.fillStyle = colorHex
  ctx.font = "bold 22px system-ui, sans-serif"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(text, tw / 2, th / 2)
  tex.update()
  const plane = MeshBuilder.CreatePlane(`plane_${name}`, { width: size, height: size * 0.32 }, scene)
  plane.position = position
  plane.billboardMode = 7
  const mat = new StandardMaterial(`mat_${name}`, scene)
  mat.diffuseTexture = tex
  mat.opacityTexture = tex
  mat.useAlphaFromDiffuseTexture = true
  mat.backFaceCulling = false
  plane.material = mat
}

/**
 * Draw a semi-transparent coordinate plane with grid lines.
 */
function drawPlane(
  scene: Scene, center: Vector3, normal: Vector3,
  size: number, color: Color3, alpha: number,
) {
  // Determine the two axes spanning the plane
  const up = new Vector3(0, 1, 0)
  const u = Vector3.Cross(normal, up).normalize()
  // If normal is parallel to up, use a different up
  const uLenSq = u.lengthSquared()
  const uDir = uLenSq < 0.01
    ? Vector3.Cross(normal, new Vector3(1, 0, 0)).normalize()
    : u
  const vDir = Vector3.Cross(normal, uDir).normalize()

  const half = size / 2
  // Create grid lines within the plane
  const lines: Vector3[][] = []
  const step = size / 10
  for (let i = -5; i <= 5; i++) {
    const offset = i * step
    const p1 = center.add(uDir.scale(offset)).add(vDir.scale(-half))
    const p2 = center.add(uDir.scale(offset)).add(vDir.scale(half))
    lines.push([p1, p2])
    const p3 = center.add(vDir.scale(offset)).add(uDir.scale(-half))
    const p4 = center.add(vDir.scale(offset)).add(uDir.scale(half))
    lines.push([p3, p4])
  }
  const grid = MeshBuilder.CreateLineSystem(
    `grid_plane_${Math.random().toString(36).slice(2)}`,
    { lines, colors: lines.map(() => [new Color4(color.r, color.g, color.b, alpha * 0.6),
      new Color4(color.r, color.g, color.b, alpha * 0.6)]) },
    scene,
  )
  return grid
}

/**
 * Project a point orthographically onto a plane along the plane's normal.
 */
function projectPointOntoPlane(point: Vector3, planeCenter: Vector3, normal: Vector3): Vector3 {
  const v = point.subtract(planeCenter)
  const dist = Vector3.Dot(v, normal)
  return point.subtract(normal.scale(dist))
}

export function setupScene(scene: Scene, engine: Engine) {
  scene.clearColor.set(0.07, 0.08, 0.13, 1)

  // Ground reference grid
  const groundLines: Vector3[][] = []
  for (let i = -6; i <= 6; i++) {
    groundLines.push([new Vector3(i, -3, -6), new Vector3(i, -3, 6)])
    groundLines.push([new Vector3(-6, -3, i), new Vector3(6, -3, i)])
  }
  const ground = MeshBuilder.CreateLineSystem("ground", { lines: groundLines }, scene)
  ground.color = new Color3(0.22, 0.22, 0.3)

  setupDefaultLighting(scene)

  // ── 3 Color-coded coordinate planes ──
  const xyCenter = new Vector3(-4, -0.5, -2.5)
  const xzCenter = new Vector3(0, -0.5, -2.5)
  const yzCenter = new Vector3(4, -0.5, -2.5)

  drawPlane(scene, xyCenter, new Vector3(0, 0, 1), 4, new Color3(0.22, 0.48, 0.85), 0.35)
  drawPlane(scene, xzCenter, new Vector3(0, 1, 0), 4, new Color3(0.18, 0.62, 0.49), 0.35)
  drawPlane(scene, yzCenter, new Vector3(1, 0, 0), 4, new Color3(0.89, 0.35, 0.28), 0.35)

  makeLabel(scene, "label_xy", xyCenter.add(new Vector3(0, 2.3, 0)), "xy 平面投影", "#3b82f6", 1.1)
  makeLabel(scene, "label_xz", xzCenter.add(new Vector3(0, 2.3, 0)), "xz 平面投影", "#2e9978", 1.1)
  makeLabel(scene, "label_yz", yzCenter.add(new Vector3(0, 2.3, 0)), "yz 平面投影", "#e35947", 1.1)

  // ── Build a 3D object: a small house-like shape (cube + pyramid roof) ──
  // We'll create a collection of vertices and lines to represent the object
  const objCenter = new Vector3(0, 1.5, 3)

  // Main body (cube) vertices
  const b = 0.65 // half-size
  const bodyVerts: Vector3[] = [
    new Vector3(-b, -b, -b), new Vector3(b, -b, -b),
    new Vector3(b, -b, b), new Vector3(-b, -b, b),
    new Vector3(-b, b, -b), new Vector3(b, b, -b),
    new Vector3(b, b, b), new Vector3(-b, b, b),
  ].map(v => v.add(objCenter))

  // Roof (pyramid) apex
  const apex = objCenter.add(new Vector3(0, b + 0.55, 0))
  const roofBase = bodyVerts.slice(4) // top face vertices

  // Draw body edges
  const bodyEdges: Vector3[][] = [
    // bottom face
    [bodyVerts[0], bodyVerts[1]], [bodyVerts[1], bodyVerts[2]],
    [bodyVerts[2], bodyVerts[3]], [bodyVerts[3], bodyVerts[0]],
    // top face
    [bodyVerts[4], bodyVerts[5]], [bodyVerts[5], bodyVerts[6]],
    [bodyVerts[6], bodyVerts[7]], [bodyVerts[7], bodyVerts[4]],
    // vertical edges
    [bodyVerts[0], bodyVerts[4]], [bodyVerts[1], bodyVerts[5]],
    [bodyVerts[2], bodyVerts[6]], [bodyVerts[3], bodyVerts[7]],
  ]
  // Roof edges
  const roofEdges: Vector3[][] = roofBase.map(v => [v, apex])

  const objColor = new Color4(0.98, 0.78, 0.15, 0.9)

  for (const edge of bodyEdges) {
    CreateLines("bodyEdge", { points: edge, colors: [objColor, objColor] }, scene)
  }
  for (const edge of roofEdges) {
    CreateLines("roofEdge", { points: edge, colors: [new Color4(0.95, 0.55, 0.2, 0.9), new Color4(0.95, 0.55, 0.2, 0.9)] }, scene)
  }

  makeLabel(scene, "obj_label", apex.add(new Vector3(0, 0.5, 0)), "3D 物体", "#f59e0b", 0.85)

  // ── Projection drop lines (orthogonal projection onto each plane) ──
  const normals = {
    xy: new Vector3(0, 0, 1),
    xz: new Vector3(0, 1, 0),
    yz: new Vector3(1, 0, 0),
  }
  const centers = { xy: xyCenter, xz: xzCenter, yz: yzCenter }
  type PlaneKey = keyof typeof normals

  const projColors: Record<PlaneKey, [Color3, number]> = {
    xy: [new Color3(0.22, 0.48, 0.85), 0.7],
    xz: [new Color3(0.18, 0.62, 0.49), 0.7],
    yz: [new Color3(0.89, 0.35, 0.28), 0.7],
  }

  // For each plane, project each body vertex and draw
  for (const key of (["xy", "xz", "yz"] as PlaneKey[])) {
    const normal = normals[key]
    const planeCenter = centers[key]
    const [color, alpha] = projColors[key]

    // Project all body vertices
    const projectedVerts = bodyVerts.map(v => projectPointOntoPlane(v, planeCenter, normal))

    // Drop lines from vertices to projection
    for (let i = 0; i < bodyVerts.length; i++) {
      CreateLines(`drop_${key}_${i}`, {
        points: [bodyVerts[i], projectedVerts[i]],
        colors: [
          new Color4(color.r, color.g, color.b, 0.25),
          new Color4(color.r, color.g, color.b, 0.25),
        ],
      }, scene)
    }

    // Draw projected edges (same topology as body)
    const projEdges: Vector3[][] = [
      [projectedVerts[0], projectedVerts[1]], [projectedVerts[1], projectedVerts[2]],
      [projectedVerts[2], projectedVerts[3]], [projectedVerts[3], projectedVerts[0]],
      [projectedVerts[4], projectedVerts[5]], [projectedVerts[5], projectedVerts[6]],
      [projectedVerts[6], projectedVerts[7]], [projectedVerts[7], projectedVerts[4]],
      [projectedVerts[0], projectedVerts[4]], [projectedVerts[1], projectedVerts[5]],
      [projectedVerts[2], projectedVerts[6]], [projectedVerts[3], projectedVerts[7]],
    ]
    for (const edge of projEdges) {
      CreateLines(`proj_${key}`, {
        points: edge,
        colors: [new Color4(color.r, color.g, color.b, alpha), new Color4(color.r, color.g, color.b, alpha)],
      }, scene)
    }

    // Project apex
    const projApex = projectPointOntoPlane(apex, planeCenter, normal)
    CreateLines(`drop_apex_${key}`, {
      points: [apex, projApex],
      colors: [new Color4(color.r, color.g, color.b, 0.2), new Color4(color.r, color.g, color.b, 0.2)],
    }, scene)
    for (let i = 0; i < 4; i++) {
      CreateLines(`roof_proj_${key}_${i}`, {
        points: [projectedVerts[i + 4], projApex],
        colors: [new Color4(color.r, color.g, color.b, alpha * 0.8), new Color4(color.r, color.g, color.b, alpha * 0.8)],
      }, scene)
    }
  }

  // ── Camera ──
  const canvas = engine.getRenderingCanvas()
  if (canvas) {
    const cam = createArcRotateCamera(scene, canvas as HTMLCanvasElement, {
      alpha: -Math.PI / 2.5,
      beta: Math.PI / 3,
      radius: 14,
    })
    cam.lowerRadiusLimit = 5
    cam.upperRadiusLimit = 28
  }
}
