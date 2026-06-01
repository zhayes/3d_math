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

export const demoId = "coordinate-planes"
export const title = "坐标平面演示"

/** Create an X/Y/Z axis label at the endpoint */
function makeAxisLabel(
  scene: any,
  name: string,
  position: Vector3,
  text: string,
  colorHex: string,
) {
  // Colored sphere at tip
  const sphere = MeshBuilder.CreateSphere(`sphere_${name}`, { diameter: 0.28 }, scene)
  sphere.position = position
  const sMat = new StandardMaterial(`sMat_${name}`, scene)
  const c = Color3.FromHexString(colorHex)
  sMat.diffuseColor = c
  sMat.emissiveColor = c.scale(0.35)
  sphere.material = sMat

  // Small text label via DynamicTexture with transparent bg
  const texW = 128
  const texH = 64
  const texture = new DynamicTexture(`tex_${name}`, { width: texW, height: texH }, scene, false)
  const ctx = texture.getContext()
  // Fill with fully transparent background
  ctx.clearRect(0, 0, texW, texH)
  // Semi-transparent dark pill behind text for readability
  ctx.fillStyle = "rgba(8,8,16,0.55)"
  ctx.beginPath()
  ctx.roundRect(texW * 0.1, texH * 0.15, texW * 0.8, texH * 0.7, texH * 0.35)
  ctx.fill()
  // Text
  ctx.fillStyle = colorHex
  ctx.font = "bold 32px system-ui, sans-serif"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(text, texW / 2, texH / 2)
  texture.update()

  const plane = MeshBuilder.CreatePlane(`plane_${name}`, { width: 0.8, height: 0.35 }, scene)
  plane.position = position.add(new Vector3(0, 0.35, 0))
  plane.billboardMode = 7 // ALL_AXES

  const mat = new StandardMaterial(`mat_${name}`, scene)
  mat.diffuseTexture = texture
  mat.opacityTexture = texture // Use as opacity mask
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
  scene.clearColor.set(0.07, 0.08, 0.13, 1)

  const axisSize = 5
  const xColor = new Color3(0.89, 0.35, 0.28)
  const yColor = new Color3(0.18, 0.62, 0.49)
  const zColor = new Color3(0.22, 0.48, 0.85)

  drawAxis(scene, Vector3.Zero(), new Vector3(1, 0, 0), xColor, axisSize, "X")
  drawAxis(scene, Vector3.Zero(), new Vector3(0, 1, 0), yColor, axisSize, "Y")
  drawAxis(scene, Vector3.Zero(), new Vector3(0, 0, 1), zColor, axisSize, "Z")

  // Axis labels
  makeAxisLabel(scene, "X", new Vector3(axisSize, 0, 0), "X", "#e35947")
  makeAxisLabel(scene, "Y", new Vector3(0, axisSize, 0), "Y", "#2e9978")
  makeAxisLabel(scene, "Z", new Vector3(0, 0, axisSize), "Z", "#387ad9")

  setupDefaultLighting(scene)

  const planeSize = 3
  const alpha = 0.2

  const xyMat = new StandardMaterial("xyMat", scene)
  xyMat.diffuseColor = new Color3(0.85, 0.35, 0.3)
  xyMat.alpha = alpha
  xyMat.backFaceCulling = false
  xyMat.specularColor = new Color3(0, 0, 0)
  const xyPlane = MeshBuilder.CreatePlane("xyPlane", { size: planeSize * 2 }, scene)
  xyPlane.position.z = 0
  xyPlane.material = xyMat

  const xzMat = new StandardMaterial("xzMat", scene)
  xzMat.diffuseColor = new Color3(0.22, 0.48, 0.85)
  xzMat.alpha = alpha
  xzMat.backFaceCulling = false
  xzMat.specularColor = new Color3(0, 0, 0)
  const xzPlane = MeshBuilder.CreatePlane("xzPlane", { size: planeSize * 2 }, scene)
  xzPlane.rotation.x = Math.PI / 2
  xzPlane.position.y = 0
  xzPlane.material = xzMat

  const yzMat = new StandardMaterial("yzMat", scene)
  yzMat.diffuseColor = new Color3(0.18, 0.6, 0.4)
  yzMat.alpha = alpha
  yzMat.backFaceCulling = false
  yzMat.specularColor = new Color3(0, 0, 0)
  const yzPlane = MeshBuilder.CreatePlane("yzPlane", { size: planeSize * 2 }, scene)
  yzPlane.rotation.y = Math.PI / 2
  yzPlane.position.x = 0
  yzPlane.material = yzMat

  // Highlight point
  const pt = new Vector3(1.8, 2, 2.2)
  const sphere = MeshBuilder.CreateSphere("pt", { diameter: 0.28 }, scene)
  sphere.position = pt
  const sphereMat = new StandardMaterial("ptMat", scene)
  sphereMat.diffuseColor = new Color3(0.98, 0.78, 0.15)
  sphereMat.emissiveColor = new Color3(0.15, 0.1, 0)
  sphere.material = sphereMat

  const projAlpha = 0.65

  const projXY = new Vector3(pt.x, pt.y, 0)
  CreateLines("projXY", {
    points: [pt, projXY],
    colors: [new Color4(0.85, 0.35, 0.3, projAlpha), new Color4(0.85, 0.35, 0.3, projAlpha)],
  }, scene)
  const dotXY = MeshBuilder.CreateSphere("dotXY", { diameter: 0.12 }, scene)
  dotXY.position = projXY
  const dotXYMat = new StandardMaterial("dotXYMat", scene)
  dotXYMat.diffuseColor = new Color3(0.85, 0.35, 0.3)
  dotXY.material = dotXYMat

  const projXZ = new Vector3(pt.x, 0, pt.z)
  CreateLines("projXZ", {
    points: [pt, projXZ],
    colors: [new Color4(0.22, 0.48, 0.85, projAlpha), new Color4(0.22, 0.48, 0.85, projAlpha)],
  }, scene)
  const dotXZ = MeshBuilder.CreateSphere("dotXZ", { diameter: 0.12 }, scene)
  dotXZ.position = projXZ
  const dotXZMat = new StandardMaterial("dotXZMat", scene)
  dotXZMat.diffuseColor = new Color3(0.22, 0.48, 0.85)
  dotXZ.material = dotXZMat

  const projYZ = new Vector3(0, pt.y, pt.z)
  CreateLines("projYZ", {
    points: [pt, projYZ],
    colors: [new Color4(0.18, 0.6, 0.4, projAlpha), new Color4(0.18, 0.6, 0.4, projAlpha)],
  }, scene)
  const dotYZ = MeshBuilder.CreateSphere("dotYZ", { diameter: 0.12 }, scene)
  dotYZ.position = projYZ
  const dotYZMat = new StandardMaterial("dotYZMat", scene)
  dotYZMat.diffuseColor = new Color3(0.18, 0.6, 0.4)
  dotYZ.material = dotYZMat

  const canvas = engine.getRenderingCanvas()
  if (canvas) {
    createArcRotateCamera(scene, canvas as HTMLCanvasElement)
  }
}