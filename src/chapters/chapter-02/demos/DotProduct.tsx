import {
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

export const demoId = "dot-product"
export const title = "点积：夹角与投影"

export function setupScene(scene: any, engine: any) {
  scene.clearColor.set(0.07, 0.08, 0.13, 1)

  // Ground reference grid
  const gridLines: Vector3[][] = []
  for (let i = -5; i <= 5; i++) {
    gridLines.push([new Vector3(i, 0, -5), new Vector3(i, 0, 5)])
    gridLines.push([new Vector3(-5, 0, i), new Vector3(5, 0, i)])
  }
  const grid = MeshBuilder.CreateLineSystem("grid", { lines: gridLines }, scene)
  grid.color = new Color3(0.25, 0.25, 0.35)

  setupDefaultLighting(scene)

  function drawVector(
    name: string, origin: Vector3, v: Vector3, color: Color3, alpha: number = 1,
  ) {
    const end = origin.add(v)
    CreateLines(`${name}_line`, {
      points: [origin, end],
      colors: [
        new Color4(color.r, color.g, color.b, alpha),
        new Color4(color.r, color.g, color.b, alpha),
      ],
    }, scene)

    const len = v.length()
    if (len < 0.01) return
    const dir = v.normalize()
    const arrowSize = 0.22
    const perp1 = new Vector3(-dir.z, 0, dir.x).scale(arrowSize * 0.35)
    const headStart = end.subtract(dir.scale(arrowSize * 0.7))
    CreateLines(`${name}_arrow`, {
      points: [headStart.add(perp1), end, headStart.subtract(perp1)],
      colors: [
        new Color4(color.r, color.g, color.b, alpha),
        new Color4(color.r, color.g, color.b, alpha),
        new Color4(color.r, color.g, color.b, alpha),
      ],
    }, scene)

    const sphere = MeshBuilder.CreateSphere(`${name}_tip`, { diameter: 0.14 }, scene)
    sphere.position = end
    const mat = new StandardMaterial(`${name}_tipMat`, scene)
    mat.diffuseColor = color
    mat.emissiveColor = color.scale(0.3)
    sphere.material = mat
  }

  function createBillboardLabel(name: string, pos: Vector3, text: string, colorHex: string) {
    const texW = 256; const texH = 64
    const tex = new DynamicTexture(`tex_${name}`, { width: texW, height: texH }, scene, false)
    const ctx = tex.getContext()
    ctx.clearRect(0, 0, texW, texH)
    ctx.fillStyle = "rgba(8,8,14,0.55)"
    ctx.beginPath()
    ctx.roundRect(texW * 0.08, texH * 0.12, texW * 0.84, texH * 0.76, texH * 0.38)
    ctx.fill()
    ctx.fillStyle = colorHex
    ctx.font = "bold 28px system-ui, sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text, texW / 2, texH / 2)
    tex.update()
    const plane = MeshBuilder.CreatePlane(`plane_${name}`, { width: 1.0, height: 0.4 }, scene)
    plane.position = pos
    plane.billboardMode = 7
    const mat = new StandardMaterial(`mat_${name}`, scene)
    mat.diffuseTexture = tex
    mat.opacityTexture = tex
    mat.useAlphaFromDiffuseTexture = true
    mat.backFaceCulling = false
    plane.material = mat
  }

  const origin = Vector3.Zero()

  // Two vectors at ~60 degree angle for clear demonstration
  const a = new Vector3(4, 0, 0)        // Along X axis
  const b = new Vector3(1.5, 0, 2.6)    // Roughly 60 degrees from X

  const coral = new Color3(0.89, 0.35, 0.28)
  const teal = new Color3(0.18, 0.62, 0.49)
  const gold = new Color3(0.95, 0.72, 0.15)

  // Draw vectors a and b
  drawVector("a", origin, a, coral)
  drawVector("b", origin, b, teal)

  // Calculate projection of b onto a
  const aUnit = a.normalize()
  const dotVal = Vector3.Dot(b, aUnit)
  const proj = aUnit.scale(dotVal)

  // Draw projection vector (gold, semi-transparent)
  drawVector("proj", origin, proj, gold, 0.7)

  // Draw the perpendicular component (dotted)
  const perp = b.subtract(proj)
  CreateLines("perp_line", {
    points: [proj, b],
    colors: [
      new Color4(teal.r, teal.g, teal.b, 0.35),
      new Color4(teal.r, teal.g, teal.b, 0.35),
    ],
  }, scene)

  // Small sphere at projection point
  const projSphere = MeshBuilder.CreateSphere("proj_pt", { diameter: 0.12 }, scene)
  projSphere.position = proj
  const projMat = new StandardMaterial("proj_pt_mat", scene)
  projMat.diffuseColor = gold
  projMat.emissiveColor = gold.scale(0.3)
  projSphere.material = projMat

  // Arc from a to b showing angle
  const arcRadius = 0.9
  const angle = Math.acos(Vector3.Dot(a.normalize(), b.normalize()))
  const arcPoints: Vector3[] = []
  const segments = 30
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * angle
    const pt = new Vector3(Math.cos(t) * arcRadius, 0, Math.sin(t) * arcRadius)
    arcPoints.push(pt)
  }
  CreateLines("angle_arc", {
    points: arcPoints,
    colors: Array(arcPoints.length).fill(new Color4(1, 1, 1, 0.5)),
  }, scene)

  createBillboardLabel("labelA", a.scale(0.5).add(new Vector3(0, 0.5, 0)), "a", "#e35947")
  createBillboardLabel("labelB", b.scale(0.55).add(new Vector3(0, 0.5, 0)), "b", "#2e9978")
  createBillboardLabel("labelProj", proj.scale(0.4).add(new Vector3(0, -0.6, 0)), "proj_b a", "#f2b813")

  const canvas = engine.getRenderingCanvas()
  if (canvas) {
    const cam = createArcRotateCamera(scene, canvas as HTMLCanvasElement, {
      alpha: -Math.PI / 2,
      beta: Math.PI / 3,
      radius: 12,
    })
    cam.lowerRadiusLimit = 3
    cam.upperRadiusLimit = 25
  }
}