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

export const demoId = "transform-pipeline"
export const title = "渲染管线全景：模型空间 → 世界空间 → 相机空间 → 屏幕"

// ── helpers ──

/** Draw a set of 3 local axes from an origin (already-rotated directions). */
function drawLocalAxes(
  scene: Scene,
  origin: Vector3,
  xDir: Vector3,
  yDir: Vector3,
  zDir: Vector3,
  size: number,
  colors: [Color3, Color3, Color3],
) {
  const drawOne = (dir: Vector3, color: Color3, label: string) => {
    const end = origin.add(dir.scale(size))
    CreateLines(`axis_${label}`, {
      points: [origin, end],
      colors: [new Color4(color.r, color.g, color.b, 1), new Color4(color.r, color.g, color.b, 1)],
    }, scene)

    // arrowhead
    const aSize = size * 0.18
    const perp = Vector3.Cross(dir, yDir).normalize()
    // fallback cross if parallel to yDir
    const px = perp.lengthSquared() < 0.001
      ? Vector3.Cross(dir, zDir).normalize()
      : perp
    const hs = end.subtract(dir.normalize().scale(aSize))
    CreateLines(`arrow_${label}`, {
      points: [
        hs.add(px.scale(aSize * 0.4)),
        end,
        hs.subtract(px.scale(aSize * 0.4)),
      ],
      colors: [
        new Color4(color.r, color.g, color.b, 1),
        new Color4(color.r, color.g, color.b, 1),
        new Color4(color.r, color.g, color.b, 1),
      ],
    }, scene)

    // tip sphere
    const s = MeshBuilder.CreateSphere(`tip_${label}`, { diameter: size * 0.06 }, scene)
    s.position = end
    const m = new StandardMaterial(`tm_${label}`, scene)
    m.diffuseColor = color
    m.emissiveColor = color.scale(0.3)
    s.material = m
  }
  drawOne(xDir, colors[0], "x")
  drawOne(yDir, colors[1], "y")
  drawOne(zDir, colors[2], "z")
}

/**
 * Billboard label – transparent background, just text.
 */
function makeLabel(
  scene: Scene,
  name: string,
  position: Vector3,
  text: string,
  colorHex: string,
  fontSize: number = 28,
  planeW: number = 1.4,
  planeH: number = 0.4,
) {
  const tw = 512
  const th = 128
  const tex = new DynamicTexture(`tex_${name}`, { width: tw, height: th }, scene, false)
  const ctx = tex.getContext() as CanvasRenderingContext2D
  ctx.clearRect(0, 0, tw, th)

  // subtle text shadow for readability
  ctx.shadowColor = "rgba(0,0,0,0.7)"
  ctx.shadowBlur = 6
  ctx.shadowOffsetX = 2
  ctx.shadowOffsetY = 2

  ctx.fillStyle = colorHex
  ctx.font = `bold ${fontSize}px system-ui, sans-serif`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(text, tw / 2, th / 2)

  // reset shadow so it doesn't apply to anything else
  ctx.shadowColor = "transparent"
  ctx.shadowBlur = 0

  tex.update()
  const plane = MeshBuilder.CreatePlane(`plane_${name}`, { width: planeW, height: planeH }, scene)
  plane.position = position
  plane.billboardMode = 7
  const mat = new StandardMaterial(`mat_${name}`, scene)
  mat.diffuseTexture = tex
  mat.opacityTexture = tex
  mat.useAlphaFromDiffuseTexture = true
  mat.backFaceCulling = false
  mat.emissiveColor = new Color3(1, 1, 1) // always lit
  plane.material = mat
}

// ── scene setup ──

export function setupScene(scene: Scene, engine: Engine) {
  scene.clearColor.set(0.07, 0.08, 0.13, 1)

  // ── ground grid ──
  const gridLines: Vector3[][] = []
  for (let i = -8; i <= 8; i++) {
    gridLines.push([new Vector3(i, 0, -8), new Vector3(i, 0, 8)])
    gridLines.push([new Vector3(-8, 0, i), new Vector3(8, 0, i)])
  }
  const grid = MeshBuilder.CreateLineSystem("grid", { lines: gridLines }, scene)
  grid.color = new Color3(0.2, 0.2, 0.28)

  setupDefaultLighting(scene)

  // ── constants ──
  const axisSize = 3.5

  const coral = new Color3(0.89, 0.35, 0.28)   // X
  const teal  = new Color3(0.18, 0.62, 0.49)   // Y
  const blue  = new Color3(0.22, 0.48, 0.85)   // Z

  const worldOrigin = new Vector3(0, 0, 0)

  // ══════════════════════════════════════════════
  // ① 世界空间 (World Space)
  // ══════════════════════════════════════════════
  drawLocalAxes(scene, worldOrigin,
    new Vector3(1, 0, 0),
    new Vector3(0, 1, 0),
    new Vector3(0, 0, 1),
    axisSize,
    [coral, teal, blue],
  )
  makeLabel(scene, "world_label", new Vector3(0, axisSize + 0.7, 0), "世界空间 (World Space)", "#ffffff", 32, 2.2, 0.5)

  // ══════════════════════════════════════════════
  // ② 模型空间 (Model Space) — object offset & rotated
  // ══════════════════════════════════════════════
  const objOrigin = new Vector3(3, 0.3, 1)
  const rotAngle = 0.5 // ~28 deg around Y

  const cosR = Math.cos(rotAngle)
  const sinR = Math.sin(rotAngle)
  const modelX = new Vector3(cosR, 0, sinR)
  const modelY = new Vector3(0, 1, 0)
  const modelZ = new Vector3(-sinR, 0, cosR)

  drawLocalAxes(scene, objOrigin, modelX, modelY, modelZ, 2.2,
    [coral.scale(0.7), teal.scale(0.7), blue.scale(0.7)],
  )
  makeLabel(scene, "model_label", objOrigin.add(new Vector3(0, 2.6, 0)), "模型空间 (Model Space)", "#fbbf24", 28, 2.0, 0.45)

  // Object: a small "house" = cube + pyramid roof (as a recognisable shape)
  const buildHouse = (center: Vector3, x: Vector3, y: Vector3, z: Vector3) => {
    const b = 0.55 // half-size
    // 8 corners of the box in local frame
    const v = (sx: number, sy: number, sz: number) =>
      center.add(x.scale(sx * b)).add(y.scale(sy * b)).add(z.scale(sz * b))

    const verts: Vector3[] = [
      v(-1, -1, -1), v( 1, -1, -1),
      v( 1, -1,  1), v(-1, -1,  1),
      v(-1,  1, -1), v( 1,  1, -1),
      v( 1,  1,  1), v(-1,  1,  1),
    ]
    const apex = center.add(y.scale(b + 0.5))
    const roofBase = verts.slice(4) // top 4

    // body edges
    const edges: Vector3[][] = [
      [verts[0], verts[1]], [verts[1], verts[2]],
      [verts[2], verts[3]], [verts[3], verts[0]],
      [verts[4], verts[5]], [verts[5], verts[6]],
      [verts[6], verts[7]], [verts[7], verts[4]],
      [verts[0], verts[4]], [verts[1], verts[5]],
      [verts[2], verts[6]], [verts[3], verts[7]],
    ]
    const objColor = new Color4(0.98, 0.78, 0.15, 0.85)
    const roofColor = new Color4(0.95, 0.5, 0.18, 0.85)

    for (const edge of edges) {
      CreateLines("houseEdge", {
        points: edge,
        colors: [objColor, objColor],
      }, scene)
    }
    for (const rb of roofBase) {
      CreateLines("roofEdge", {
        points: [rb, apex],
        colors: [roofColor, roofColor],
      }, scene)
    }

    // small spheres at corners for better visibility
    for (const vt of verts) {
      const s = MeshBuilder.CreateSphere("corner", { diameter: 0.08 }, scene)
      s.position = vt
      const m = new StandardMaterial("cm", scene)
      m.diffuseColor = new Color3(0.98, 0.78, 0.15)
      m.emissiveColor = new Color3(0.25, 0.15, 0)
      s.material = m
    }
    const sa = MeshBuilder.CreateSphere("apex_s", { diameter: 0.1 }, scene)
    sa.position = apex
    const ma = new StandardMaterial("apex_m", scene)
    ma.diffuseColor = new Color3(0.95, 0.5, 0.18)
    ma.emissiveColor = new Color3(0.25, 0.1, 0)
    sa.material = ma

    return { verts, apex }
  }

  const house = buildHouse(objOrigin, modelX, modelY, modelZ)

  // Dotted line from world origin to object origin (offset vector)
  CreateLines("offset", {
    points: [worldOrigin, objOrigin],
    colors: [new Color4(0.5, 0.5, 0.7, 0.45), new Color4(0.5, 0.5, 0.7, 0.45)],
  }, scene)

  // ══════════════════════════════════════════════
  // ③ 相机空间 (Camera Space) — camera frustum
  // ══════════════════════════════════════════════
  const camPos    = new Vector3(-4, 2.8, 5.5)
  const camTarget = objOrigin // camera looks at object center

  const camForward = camTarget.subtract(camPos).normalize()
  const worldUp = new Vector3(0, 1, 0)
  const camRight  = Vector3.Cross(worldUp, camForward).normalize()
  const camUp     = Vector3.Cross(camForward, camRight).normalize()

  // Camera-local axes
  drawLocalAxes(scene, camPos, camRight, camUp, camForward, 1.6,
    [coral, teal, blue],
  )
  makeLabel(scene, "cam_label", camPos.add(camUp.scale(1.9)), "相机空间 (Camera Space)", "#a78bfa", 28, 2.0, 0.45)

  // Camera sphere
  const camSphere = MeshBuilder.CreateSphere("cam", { diameter: 0.3 }, scene)
  camSphere.position = camPos
  const camMat = new StandardMaterial("camMat", scene)
  camMat.diffuseColor = new Color3(0.65, 0.55, 0.95)
  camMat.emissiveColor = new Color3(0.15, 0.1, 0.3)
  camSphere.material = camMat

  // Near & far plane
  const nearDist = 2.5
  const farDist  = 11
  const fovRad   = (55 * Math.PI) / 180 // 55° vertical FOV
  const aspect   = 1.6 // width/height

  const nearCenter = camPos.add(camForward.scale(nearDist))
  const farCenter  = camPos.add(camForward.scale(farDist))

  const nhh = Math.tan(fovRad / 2) * nearDist // near half-height
  const nhw = nhh * aspect                      // near half-width
  const fhh = Math.tan(fovRad / 2) * farDist
  const fhw = fhh * aspect

  // 4 corners of near/far plane (local right-up frame)
  const nc = (sr: number, su: number) =>
    nearCenter.add(camRight.scale(sr * nhw)).add(camUp.scale(su * nhh))
  const fc = (sr: number, su: number) =>
    farCenter.add(camRight.scale(sr * fhw)).add(camUp.scale(su * fhh))

  const nCorners = [nc(-1, -1), nc(1, -1), nc(1, 1), nc(-1, 1)]
  const fCorners = [fc(-1, -1), fc(1, -1), fc(1, 1), fc(-1, 1)]

  const frustrumAlpha = 0.45
  const fCol = (a: number = 1) => new Color4(0.65, 0.55, 0.95, a)

  // Near plane edges
  for (let i = 0; i < 4; i++) {
    const j = (i + 1) % 4
    CreateLines(`near_${i}`, {
      points: [nCorners[i], nCorners[j]],
      colors: [fCol(frustrumAlpha), fCol(frustrumAlpha)],
    }, scene)
  }
  // Far plane edges
  for (let i = 0; i < 4; i++) {
    const j = (i + 1) % 4
    CreateLines(`far_${i}`, {
      points: [fCorners[i], fCorners[j]],
      colors: [fCol(frustrumAlpha * 0.5), fCol(frustrumAlpha * 0.5)],
    }, scene)
  }
  // Frustum sides
  for (let i = 0; i < 4; i++) {
    CreateLines(`side_${i}`, {
      points: [nCorners[i], fCorners[i]],
      colors: [fCol(frustrumAlpha * 0.35), fCol(frustrumAlpha * 0.35)],
    }, scene)
  }
  // Camera to near corners (the "cone" lines)
  for (let i = 0; i < 4; i++) {
    CreateLines(`cam_ray_${i}`, {
      points: [camPos, nCorners[i]],
      colors: [fCol(frustrumAlpha * 0.6), fCol(frustrumAlpha * 0.6)],
    }, scene)
  }

  // Near plane semi-transparent quad
  const nearPlane = MeshBuilder.CreatePlane("nearPlane", { width: nhw * 2, height: nhh * 2 }, scene)
  nearPlane.position = nearCenter
  // Align plane to camera
  nearPlane.rotation = camForward.asArray().length
    ? Vector3.RotationFromAxis(camRight, camForward, camUp)
    : Vector3.Zero()
  const nearPlaneMat = new StandardMaterial("nearPlaneMat", scene)
  nearPlaneMat.diffuseColor = new Color3(0.55, 0.45, 0.85)
  nearPlaneMat.alpha = 0.08
  nearPlaneMat.backFaceCulling = false
  nearPlane.material = nearPlaneMat

  // ══════════════════════════════════════════════
  // ④ 透视投影 (Perspective Projection) — projection lines
  // ══════════════════════════════════════════════
  // Project object vertices onto the near plane along rays from camera
  const projectOntoNearPlane = (point: Vector3): Vector3 => {
    // ray from camera to point
    const dir = point.subtract(camPos).normalize()
    // distance along forward direction to near plane
    const t = nearDist / Vector3.Dot(dir, camForward)
    return camPos.add(dir.scale(t))
  }

  const projAlpha = 0.35
  const allVerts = [...house.verts, house.apex]
  for (const vt of allVerts) {
    const projPt = projectOntoNearPlane(vt)

    // projection line (dotted) from vertex to near plane
    CreateLines("projLine", {
      points: [vt, projPt],
      colors: [
        new Color4(0.75, 0.75, 0.95, projAlpha),
        new Color4(0.75, 0.75, 0.95, projAlpha),
      ],
    }, scene)

    // projected point on near plane
    const s = MeshBuilder.CreateSphere("projPt", { diameter: 0.07 }, scene)
    s.position = projPt
    const m = new StandardMaterial("projPtMat", scene)
    m.diffuseColor = new Color3(0.7, 0.7, 0.95)
    m.emissiveColor = new Color3(0.3, 0.3, 0.5)
    s.material = m
  }

  // Connect projected vertices to show the 2D shape on near plane
  // Body edges projected
  const projV = (v: Vector3) => projectOntoNearPlane(v)
  const pv = house.verts.map(projV)
  const pa = projV(house.apex)

  const projBodyEdges: Vector3[][] = [
    [pv[0], pv[1]], [pv[1], pv[2]], [pv[2], pv[3]], [pv[3], pv[0]],
    [pv[4], pv[5]], [pv[5], pv[6]], [pv[6], pv[7]], [pv[7], pv[4]],
    [pv[0], pv[4]], [pv[1], pv[5]], [pv[2], pv[6]], [pv[3], pv[7]],
  ]
  for (const edge of projBodyEdges) {
    CreateLines("projShape", {
      points: edge,
      colors: [
        new Color4(0.85, 0.85, 1.0, 0.6),
        new Color4(0.85, 0.85, 1.0, 0.6),
      ],
    }, scene)
  }
  for (const rb of pv.slice(4)) {
    CreateLines("projRoof", {
      points: [rb, pa],
      colors: [
        new Color4(0.85, 0.75, 0.9, 0.6),
        new Color4(0.85, 0.75, 0.9, 0.6),
      ],
    }, scene)
  }

  makeLabel(scene, "proj_label", nearCenter.add(camUp.scale(nhh + 0.6)), "透视投影 (Projection)", "#c4b5fd", 24, 2.2, 0.4)

  // ══════════════════════════════════════════════
  // ⑤ 屏幕空间 (Screen Space) — simplified billboard
  // ══════════════════════════════════════════════
  const screenPos = nearCenter.add(camForward.scale(1.2))
  const screenPlane = MeshBuilder.CreatePlane("screenPlane", { width: nhw * 2, height: nhh * 2 }, scene)
  screenPlane.position = screenPos
  screenPlane.rotation = nearPlane.rotation.clone()
  const screenMat = new StandardMaterial("screenMat", scene)
  screenMat.diffuseColor = new Color3(0.9, 0.9, 0.95)
  screenMat.alpha = 0.1
  screenMat.backFaceCulling = false
  screenPlane.material = screenMat

  // Screen border
  const screenCorners = nCorners.map(c => c.add(camForward.scale(1.2)))
  for (let i = 0; i < 4; i++) {
    const j = (i + 1) % 4
    CreateLines(`screen_${i}`, {
      points: [screenCorners[i], screenCorners[j]],
      colors: [
        new Color4(0.85, 0.85, 0.95, 0.5),
        new Color4(0.85, 0.85, 0.95, 0.5),
      ],
    }, scene)
  }

  // Remap projected shape to screen
  const projV2 = (v: Vector3) => projectOntoNearPlane(v).add(camForward.scale(1.2))
  const pv2 = house.verts.map(projV2)
  const pa2 = projV2(house.apex)

  const screenEdges: Vector3[][] = [
    [pv2[0], pv2[1]], [pv2[1], pv2[2]], [pv2[2], pv2[3]], [pv2[3], pv2[0]],
    [pv2[4], pv2[5]], [pv2[5], pv2[6]], [pv2[6], pv2[7]], [pv2[7], pv2[4]],
    [pv2[0], pv2[4]], [pv2[1], pv2[5]], [pv2[2], pv2[6]], [pv2[3], pv2[7]],
  ]
  for (const edge of screenEdges) {
    CreateLines("screenShape", {
      points: edge,
      colors: [
        new Color4(0.7, 0.7, 0.85, 0.5),
        new Color4(0.7, 0.7, 0.85, 0.5),
      ],
    }, scene)
  }
  for (const rb of pv2.slice(4)) {
    CreateLines("screenRoof", {
      points: [rb, pa2],
      colors: [
        new Color4(0.7, 0.65, 0.8, 0.5),
        new Color4(0.7, 0.65, 0.8, 0.5),
      ],
    }, scene)
  }

  makeLabel(scene, "screen_label", screenPos.add(camUp.scale(nhh + 0.7)), "屏幕空间 (Screen Space)", "#e0e7ff", 24, 2.2, 0.4)

  // ══════════════════════════════════════════════
  // Additional labels
  // ══════════════════════════════════════════════
  makeLabel(scene, "obj_label", objOrigin.add(modelY.scale(1.6)), "3D 物体", "#fde68a", 22, 1.2, 0.32)

  // ── camera ──
  const canvas = engine.getRenderingCanvas()
  if (canvas) {
    const cam = createArcRotateCamera(scene, canvas as HTMLCanvasElement, {
      alpha: -Math.PI / 2.8,
      beta: Math.PI / 3.5,
      radius: 15,
    })
    cam.lowerRadiusLimit = 4
    cam.upperRadiusLimit = 40
  }
}
