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

export const demoId = "vector-basics"
export const title = "向量基础：加法、减法与标量乘法"

export function setupScene(scene: any, engine: any) {
  scene.clearColor.set(0.07, 0.08, 0.13, 1)

  // Reference XZ ground grid
  const gridLines: Vector3[][] = []
  for (let i = -5; i <= 5; i++) {
    gridLines.push([new Vector3(i, 0, -5), new Vector3(i, 0, 5)])
    gridLines.push([new Vector3(-5, 0, i), new Vector3(5, 0, i)])
  }
  const grid = MeshBuilder.CreateLineSystem("grid", { lines: gridLines }, scene)
  grid.color = new Color3(0.25, 0.25, 0.35)

  setupDefaultLighting(scene)

  function drawVector(name: string, origin: Vector3, v: Vector3, color: Color3, alpha: number = 1) {
    const end = origin.add(v)
    CreateLines(`${name}_line`, {
      points: [origin, end],
      colors: [new Color4(color.r, color.g, color.b, alpha), new Color4(color.r, color.g, color.b, alpha)],
    }, scene)

    // Arrowhead
    const len = v.length()
    if (len < 0.01) return
    const dir = v.normalize()
    const arrowSize = 0.25
    const perp1 = new Vector3(-dir.z, 0, dir.x).scale(arrowSize * 0.4)
    const headStart = end.subtract(dir.scale(arrowSize * 0.8))
    CreateLines(`${name}_arrow`, {
      points: [
        headStart.add(perp1),
        end,
        headStart.subtract(perp1),
      ],
      colors: [
        new Color4(color.r, color.g, color.b, alpha),
        new Color4(color.r, color.g, color.b, alpha),
        new Color4(color.r, color.g, color.b, alpha),
      ],
    }, scene)

    // Small sphere at tip
    const sphere = MeshBuilder.CreateSphere(`${name}_tip`, { diameter: 0.15 }, scene)
    sphere.position = end
    const mat = new StandardMaterial(`${name}_tipMat`, scene)
    mat.diffuseColor = color
    mat.emissiveColor = color.scale(0.3)
    sphere.material = mat
  }

  // Two vectors to demonstrate
  const a = new Vector3(3, 0, 1.5)
  const b = new Vector3(1.5, 0, 3)

  const coral = new Color3(0.89, 0.35, 0.28)
  const teal = new Color3(0.18, 0.62, 0.49)

  // Draw vector a (coral) from origin
  drawVector("a", Vector3.Zero(), a, coral)

  // Draw vector b (teal) from origin
  drawVector("b", Vector3.Zero(), b, teal)

  // Draw a + b (gold) from origin - parallelogram diagonal
  const sum = a.add(b)
  drawVector("a_plus_b", Vector3.Zero(), sum, new Color3(0.95, 0.72, 0.15))

  // Dotted lines for parallelogram
  const dashedAlpha = 0.35
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

  // Label for a + b
  function createBillboardLabel(name: string, position: Vector3, text: string, color: string) {
    const texW = 256; const texH = 64
    const tex = new DynamicTexture(`tex_${name}`, { width: texW, height: texH }, scene, false)
    const ctx = tex.getContext() as CanvasRenderingContext2D
    ctx.clearRect(0, 0, texW, texH)
    ctx.fillStyle = "rgba(8,8,14,0.55)"
    ctx.beginPath()
    ctx.roundRect(texW * 0.08, texH * 0.12, texW * 0.84, texH * 0.76, texH * 0.38)
    ctx.fill()
    ctx.fillStyle = color
    ctx.font = "bold 28px system-ui, sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text, texW / 2, texH / 2)
    tex.update()
    const plane = MeshBuilder.CreatePlane(`plane_${name}`, { width: 1.2, height: 0.45 }, scene)
    plane.position = position
    plane.billboardMode = 7
    const mat = new StandardMaterial(`mat_${name}`, scene)
    mat.diffuseTexture = tex
    mat.opacityTexture = tex
    mat.useAlphaFromDiffuseTexture = true
    mat.backFaceCulling = false
    plane.material = mat
  }

  createBillboardLabel("labelA", a.scale(0.5).add(new Vector3(0, 0.5, 0)), "a", "#e35947")
  createBillboardLabel("labelB", b.scale(0.5).add(new Vector3(0, 0.5, 0)), "b", "#2e9978")
  createBillboardLabel("labelSum", sum.scale(0.5).add(new Vector3(0, 1.0, 0)), "a + b", "#f2b813")

  const canvas = engine.getRenderingCanvas()
  if (canvas) {
    const cam = createArcRotateCamera(scene, canvas as HTMLCanvasElement, {
      alpha: -Math.PI / 2,
      beta: Math.PI / 3,
      radius: 14,
    })
    cam.lowerRadiusLimit = 4
    cam.upperRadiusLimit = 30
  }
}