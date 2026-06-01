import {
  MeshBuilder,
  StandardMaterial,
  Color3,
  Color4,
  Vector3,
  CreateLines,
  CreateLineSystem,
  DynamicTexture,
} from "babylonjs"
import {
  createArcRotateCamera,
  setupDefaultLighting,
} from "@/utils/babylon-helpers"

export const demoId = "cartesian-3d"
export const title = "3D 笛卡尔坐标系"

/** Create an X/Y/Z axis label */
function makeAxisLabel(
  scene: any, name: string, position: Vector3, text: string, colorHex: string,
) {
  const sphere = MeshBuilder.CreateSphere(`sphere_${name}`, { diameter: 0.3 }, scene)
  sphere.position = position
  const c = Color3.FromHexString(colorHex)
  const sMat = new StandardMaterial(`sMat_${name}`, scene)
  sMat.diffuseColor = c
  sMat.emissiveColor = c.scale(0.35)
  sphere.material = sMat

  const texW = 128
  const texH = 64
  const texture = new DynamicTexture(`tex_${name}`, { width: texW, height: texH }, scene, false)
  const ctx = texture.getContext()
  ctx.clearRect(0, 0, texW, texH)
  ctx.fillStyle = "rgba(8,8,16,0.55)"
  ctx.beginPath()
  ctx.roundRect(texW * 0.1, texH * 0.15, texW * 0.8, texH * 0.7, texH * 0.35)
  ctx.fill()
  ctx.fillStyle = colorHex
  ctx.font = "bold 32px system-ui, sans-serif"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(text, texW / 2, texH / 2)
  texture.update()

  const plane = MeshBuilder.CreatePlane(`plane_${name}`, { width: 0.8, height: 0.35 }, scene)
  plane.position = position.add(new Vector3(0, 0.38, 0))
  plane.billboardMode = 7
  const mat = new StandardMaterial(`mat_${name}`, scene)
  mat.diffuseTexture = texture
  mat.opacityTexture = texture
  mat.useAlphaFromDiffuseTexture = true
  mat.backFaceCulling = false
  plane.material = mat
}

function drawAxis(scene: any, origin: Vector3, dir: Vector3, color: Color3, size: number, name: string) {
  const end = origin.add(dir.scale(size))
  CreateLines(`axis_${name}`, {
    points: [origin, end],
    colors: [new Color4(color.r, color.g, color.b, 1), new Color4(color.r, color.g, color.b, 1)],
  }, scene)
  const arrowSize = size * 0.1
  const perp = new Vector3(0, arrowSize * 0.5, 0)
  CreateLines(`arrow_${name}`, {
    points: [
      end,
      end.add(perp).subtract(dir.scale(arrowSize)),
      end,
      end.subtract(perp).subtract(dir.scale(arrowSize)),
    ],
    colors: [
      new Color4(color.r, color.g, color.b, 1), new Color4(color.r, color.g, color.b, 1),
      new Color4(color.r, color.g, color.b, 1), new Color4(color.r, color.g, color.b, 1),
    ],
  }, scene)
}

export function setupScene(scene: any, engine: any) {
  scene.clearColor.set(0.08, 0.09, 0.14, 1)

  const axisSize = 5.5
  const origin = Vector3.Zero()
  const xColor = new Color3(0.89, 0.35, 0.28)
  const yColor = new Color3(0.18, 0.62, 0.49)
  const zColor = new Color3(0.22, 0.48, 0.85)

  drawAxis(scene, origin, new Vector3(1, 0, 0), xColor, axisSize, "X")
  drawAxis(scene, origin, new Vector3(0, 1, 0), yColor, axisSize, "Y")
  drawAxis(scene, origin, new Vector3(0, 0, 1), zColor, axisSize, "Z")

  // X, Y, Z labels at axis ends
  makeAxisLabel(scene, "X", new Vector3(axisSize, 0, 0), "X", "#e35947")
  makeAxisLabel(scene, "Y", new Vector3(0, axisSize, 0), "Y", "#2e9978")
  makeAxisLabel(scene, "Z", new Vector3(0, 0, axisSize), "Z", "#387ad9")

  const gridLines: Vector3[][] = []
  for (let i = -4; i <= 4; i++) {
    gridLines.push([new Vector3(i, 0, -4), new Vector3(i, 0, 4)])
    gridLines.push([new Vector3(-4, 0, i), new Vector3(4, 0, i)])
  }
  const grid = CreateLineSystem("groundGrid", { lines: gridLines }, scene)
  grid.color = new Color3(0.25, 0.25, 0.35)

  const xzMat = new StandardMaterial("xzHint", scene)
  xzMat.diffuseColor = new Color3(0.3, 0.3, 0.4)
  xzMat.alpha = 0.06
  xzMat.backFaceCulling = false
  const xzPlane = MeshBuilder.CreatePlane("xzHintPlane", { size: 8 }, scene)
  xzPlane.rotation.x = Math.PI / 2
  xzPlane.position.y = 0.01
  xzPlane.material = xzMat

  setupDefaultLighting(scene)

  const demoPoints = [
    { pos: new Vector3(2.5, 2, 2.5), color: new Color3(0.95, 0.55, 0.2) },
    { pos: new Vector3(-2, 2.5, -2), color: new Color3(0.3, 0.65, 0.7) },
    { pos: new Vector3(2, -2, -1.5), color: new Color3(0.55, 0.4, 0.85) },
  ]

  demoPoints.forEach((dp, i) => {
    const sphere = MeshBuilder.CreateSphere(`point${i}`, { diameter: 0.28 }, scene)
    sphere.position = dp.pos
    const mat = new StandardMaterial(`pointMat${i}`, scene)
    mat.diffuseColor = dp.color
    mat.emissiveColor = dp.color.scale(0.2)
    sphere.material = mat
    const dropColor = dp.color.scale(0.4)
    const dropY = new Vector3(dp.pos.x, 0, dp.pos.z)
    CreateLines(`dropY${i}`, {
      points: [dp.pos, dropY],
      colors: [new Color4(dropColor.r, dropColor.g, dropColor.b, 0.6), new Color4(dropColor.r, dropColor.g, dropColor.b, 0.6)],
    }, scene)
  })

  const canvas = engine.getRenderingCanvas()
  if (canvas) {
    createArcRotateCamera(scene, canvas as HTMLCanvasElement)
  }
}