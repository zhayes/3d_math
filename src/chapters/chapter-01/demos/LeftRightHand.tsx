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

export const demoId = "left-right-hand"
export const title = "左手系 vs 右手系 对比"

function drawCoordinateSystem(
  scene: any, origin: Vector3, size: number, rightHanded: boolean, labelSuffix: string,
) {
  const zDir = rightHanded ? 1 : -1
  const endX = origin.add(new Vector3(size, 0, 0))
  const endY = origin.add(new Vector3(0, size, 0))
  const endZ = origin.add(new Vector3(0, 0, size * zDir))

  const arrowSize = size * 0.12

  // X axis
  CreateLines(`axisX_${labelSuffix}`, {
    points: [origin, endX],
    colors: [new Color4(0.92, 0.3, 0.24, 1), new Color4(0.92, 0.3, 0.24, 1)],
  }, scene)
  CreateLines(`arrowX_${labelSuffix}`, {
    points: [
      endX,
      new Vector3(endX.x - arrowSize, endX.y + arrowSize * 0.6, endX.z),
      endX,
      new Vector3(endX.x - arrowSize, endX.y - arrowSize * 0.6, endX.z),
    ],
    colors: [new Color4(0.92, 0.3, 0.24, 1), new Color4(0.92, 0.3, 0.24, 1),
             new Color4(0.92, 0.3, 0.24, 1), new Color4(0.92, 0.3, 0.24, 1)],
  }, scene)

  // Y axis
  CreateLines(`axisY_${labelSuffix}`, {
    points: [origin, endY],
    colors: [new Color4(0.15, 0.62, 0.45, 1), new Color4(0.15, 0.62, 0.45, 1)],
  }, scene)
  CreateLines(`arrowY_${labelSuffix}`, {
    points: [
      endY,
      new Vector3(endY.x + arrowSize * 0.6, endY.y - arrowSize, endY.z),
      endY,
      new Vector3(endY.x - arrowSize * 0.6, endY.y - arrowSize, endY.z),
    ],
    colors: [new Color4(0.15, 0.62, 0.45, 1), new Color4(0.15, 0.62, 0.45, 1),
             new Color4(0.15, 0.62, 0.45, 1), new Color4(0.15, 0.62, 0.45, 1)],
  }, scene)

  // Z axis
  CreateLines(`axisZ_${labelSuffix}`, {
    points: [origin, endZ],
    colors: [new Color4(0.2, 0.45, 0.85, 1), new Color4(0.2, 0.45, 0.85, 1)],
  }, scene)
  CreateLines(`arrowZ_${labelSuffix}`, {
    points: [
      endZ,
      new Vector3(endZ.x + arrowSize * 0.6, endZ.y, endZ.z - arrowSize * zDir * 0.6),
      endZ,
      new Vector3(endZ.x - arrowSize * 0.6, endZ.y, endZ.z - arrowSize * zDir * 0.6),
    ],
    colors: [new Color4(0.2, 0.45, 0.85, 1), new Color4(0.2, 0.45, 0.85, 1),
             new Color4(0.2, 0.45, 0.85, 1), new Color4(0.2, 0.45, 0.85, 1)],
  }, scene)

  // Spheres + text labels at endpoints
  const labels = [
    { pos: endX, text: "X", color: new Color3(0.92, 0.3, 0.24) },
    { pos: endY, text: "Y", color: new Color3(0.15, 0.62, 0.45) },
    { pos: endZ, text: "Z", color: new Color3(0.2, 0.45, 0.85) },
  ]
  labels.forEach(({ pos, text, color }) => {
    // Sphere
    const sphere = MeshBuilder.CreateSphere(`lbl_${text}_${labelSuffix}`, { diameter: 0.26 }, scene)
    sphere.position = pos
    const sMat = new StandardMaterial(`sMat_${text}_${labelSuffix}`, scene)
    sMat.diffuseColor = color
    sMat.emissiveColor = color.scale(0.3)
    sphere.material = sMat

    // Text billboard with transparent bg
    const texW = 128; const texH = 64
    const tex = new DynamicTexture(`tex_${text}_${labelSuffix}`, { width: texW, height: texH }, scene, false)
    const ctx = tex.getContext()
    ctx.clearRect(0, 0, texW, texH)
    ctx.fillStyle = "rgba(8,8,14,0.55)"
    ctx.beginPath()
    ctx.roundRect(texW * 0.1, texH * 0.15, texW * 0.8, texH * 0.7, texH * 0.35)
    ctx.fill()
    ctx.fillStyle = `#${color.toHexString()}`
    ctx.font = "bold 32px system-ui, sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text, texW / 2, texH / 2)
    tex.update()

    const plane = MeshBuilder.CreatePlane(`pl_${text}_${labelSuffix}`, { width: 0.7, height: 0.3 }, scene)
    plane.position = pos.add(new Vector3(0, 0.35, 0))
    plane.billboardMode = 7
    const mat = new StandardMaterial(`m_${text}_${labelSuffix}`, scene)
    mat.diffuseTexture = tex
    mat.opacityTexture = tex
    mat.useAlphaFromDiffuseTexture = true
    mat.backFaceCulling = false
    plane.material = mat
  })
}

export function setupScene(scene: any, engine: any) {
  scene.clearColor.set(0.08, 0.08, 0.12, 1)

  const axisSize = 3.5
  drawCoordinateSystem(scene, new Vector3(-4.5, -0.5, 0), axisSize, true, "RH")
  drawCoordinateSystem(scene, new Vector3(4.5, -0.5, 0), axisSize, false, "LH")

  // Ground grid
  const gridLines: Vector3[][] = []
  for (let i = -6; i <= 6; i++) {
    gridLines.push([new Vector3(i, -1.5, -4), new Vector3(i, -1.5, 4)])
    gridLines.push([new Vector3(-6, -1.5, i), new Vector3(6, -1.5, i)])
  }
  const grid = MeshBuilder.CreateLineSystem("refGrid", { lines: gridLines }, scene)
  grid.color = new Color3(0.25, 0.25, 0.35)

  // Section title labels (transparent bg)
  function makeSectionLabel(text: string, position: Vector3, colorHex: string) {
    const texW = 256; const texH = 64
    const texture = new DynamicTexture(`secTex_${text}`, { width: texW, height: texH }, scene, false)
    const ctx = texture.getContext()
    ctx.clearRect(0, 0, texW, texH)
    ctx.fillStyle = "rgba(8,8,14,0.5)"
    ctx.beginPath()
    ctx.roundRect(texW * 0.05, texH * 0.12, texW * 0.9, texH * 0.76, texH * 0.38)
    ctx.fill()
    ctx.fillStyle = colorHex
    ctx.font = "bold 24px system-ui, sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text, texW / 2, texH / 2)
    texture.update()

    const plane = MeshBuilder.CreatePlane(`secPlane_${text}`, { width: 2.8, height: 0.7 }, scene)
    plane.position = position
    plane.billboardMode = 7
    const mat = new StandardMaterial(`secMat_${text}`, scene)
    mat.diffuseTexture = texture
    mat.opacityTexture = texture
    mat.useAlphaFromDiffuseTexture = true
    mat.backFaceCulling = false
    plane.material = mat
  }

  makeSectionLabel("右手系 Right-Handed", new Vector3(-4.5, 3.5, 0), "#eb6b5e")
  makeSectionLabel("左手系 Left-Handed", new Vector3(4.5, 3.5, 0), "#5b9bd5")

  // Subtle Z direction indicators
  const zAlpha = 0.1
  const rhMat = new StandardMaterial("rhPlaneMat", scene)
  rhMat.diffuseColor = new Color3(0.2, 0.45, 0.85)
  rhMat.alpha = zAlpha
  rhMat.backFaceCulling = false
  const rhPlane = MeshBuilder.CreatePlane("rhIndicator", { width: 3, height: 2 }, scene)
  rhPlane.position = new Vector3(-4.5, -0.5, 1.5)
  rhPlane.material = rhMat

  const lhMat = new StandardMaterial("lhPlaneMat", scene)
  lhMat.diffuseColor = new Color3(0.2, 0.45, 0.85)
  lhMat.alpha = zAlpha
  lhMat.backFaceCulling = false
  const lhPlane = MeshBuilder.CreatePlane("lhIndicator", { width: 3, height: 2 }, scene)
  lhPlane.position = new Vector3(4.5, -0.5, -1.5)
  lhPlane.rotation.y = Math.PI
  lhPlane.material = lhMat

  CreateLines("divider", {
    points: [new Vector3(0, -1.5, -3), new Vector3(0, 3.5, -3)],
    colors: [new Color4(0.3, 0.3, 0.4, 0.5), new Color4(0.3, 0.3, 0.4, 0.5)],
  }, scene)

  setupDefaultLighting(scene)

  const canvas = engine.getRenderingCanvas()
  if (canvas) {
    const cam = createArcRotateCamera(scene, canvas as HTMLCanvasElement, {
      alpha: -Math.PI / 2,
      beta: Math.PI / 4,
      radius: 16,
    })
    cam.lowerRadiusLimit = 6
    cam.upperRadiusLimit = 40
  }
}