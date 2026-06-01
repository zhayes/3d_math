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

export const demoId = "cross-product"
export const title = "叉积：法向量与平行四边形面积"

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
    const ctx = tex.getContext() as CanvasRenderingContext2D
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
    const plane = MeshBuilder.CreatePlane(`plane_${name}`, { width: 1.2, height: 0.45 }, scene)
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

  // Two vectors on the XZ plane
  const a = new Vector3(3, 0, 0.5)
  const b = new Vector3(0.8, 0, 2.5)

  const coral = new Color3(0.89, 0.35, 0.28)
  const teal = new Color3(0.18, 0.62, 0.49)

  // Draw vectors a and b
  drawVector("a", origin, a, coral)
  drawVector("b", origin, b, teal)

  // Calculate cross product a × b (should point mostly +Y)
  const crossVec = Vector3.Cross(a, b)
  const crossLen = crossVec.length()

  // Draw cross product vector (purple, starting from origin)
  if (crossLen > 0.01) {
    const purple = new Color3(0.65, 0.35, 0.95)
    drawVector("cross", origin, crossVec, purple, 0.85)
    createBillboardLabel(
      "labelCross",
      crossVec.scale(0.55).add(new Vector3(0.3, 0, 0)),
      "a × b",
      "#a659db",
    )
  }

  // Parallelogram: dashed lines showing the other two sides
  const dashedAlpha = 0.3
  CreateLines("para_a", {
    points: [a, a.add(b)],
    colors: [
      new Color4(coral.r, coral.g, coral.b, dashedAlpha),
      new Color4(coral.r, coral.g, coral.b, dashedAlpha),
    ],
  }, scene)
  CreateLines("para_b", {
    points: [b, b.add(a)],
    colors: [
      new Color4(teal.r, teal.g, teal.b, dashedAlpha),
      new Color4(teal.r, teal.g, teal.b, dashedAlpha),
    ],
  }, scene)

  // Semi-transparent plane for the parallelogram (on XZ plane)
  const paraCenter = a.add(b).scale(0.5)
  const paraMat = new StandardMaterial("paraMat", scene)
  paraMat.diffuseColor = new Color3(0.35, 0.35, 0.55)
  paraMat.alpha = 0.12
  paraMat.backFaceCulling = false
  const paraPlane = MeshBuilder.CreatePlane("paraPlane", { width: 3.5, height: 3 }, scene)
  paraPlane.rotation.x = Math.PI / 2
  paraPlane.position = new Vector3(paraCenter.x, 0.01, paraCenter.z)
  paraPlane.material = paraMat

  createBillboardLabel("labelA", a.scale(0.5).add(new Vector3(0, 0.5, 0)), "a", "#e35947")
  createBillboardLabel("labelB", b.scale(0.55).add(new Vector3(0, 0.5, 0)), "b", "#2e9978")

  const canvas = engine.getRenderingCanvas()
  if (canvas) {
    const cam = createArcRotateCamera(scene, canvas as HTMLCanvasElement, {
      alpha: -(Math.PI / 2 + 0.4),
      beta: Math.PI / 3.5,
      radius: 12,
    })
    cam.lowerRadiusLimit = 3
    cam.upperRadiusLimit = 25
  }
}