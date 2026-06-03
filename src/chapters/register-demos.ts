import { registerDemo } from "@/chapters"

// Chapter 1: Cartesian Coordinate Systems
registerDemo("1", {
  id: "cartesian-2d",
  title: "2D 笛卡尔平面",
  loader: () => import("@/chapters/chapter-01/demos/Cartesian2D"),
})

registerDemo("1", {
  id: "cartesian-3d",
  title: "3D 笛卡尔坐标系",
  loader: () => import("@/chapters/chapter-01/demos/Cartesian3D"),
})

registerDemo("1", {
  id: "coordinate-planes",
  title: "坐标平面演示",
  loader: () => import("@/chapters/chapter-01/demos/CoordinatePlanes"),
})

registerDemo("1", {
  id: "left-right-hand",
  title: "左手系 vs 右手系 对比",
  loader: () => import("@/chapters/chapter-01/demos/LeftRightHand"),
})

// Chapter 2: Vectors
registerDemo("2", {
  id: "vector-basics",
  title: "向量基础：加法、减法与标量乘法",
  loader: () => import("@/chapters/chapter-02/demos/VectorBasics"),
})

registerDemo("2", {
  id: "dot-product",
  title: "点积：夹角与投影",
  loader: () => import("@/chapters/chapter-02/demos/DotProduct"),
})

registerDemo("2", {
  id: "cross-product",
  title: "叉积：法向量与平行四边形面积",
  loader: () => import("@/chapters/chapter-02/demos/CrossProduct"),
})

// Chapter 3: Multiple Coordinate Spaces
registerDemo("3", {
  id: "coordinate-spaces",
  title: "坐标空间演示：世界空间与模型空间",
  loader: () => import("@/chapters/chapter-03/demos/CoordinateSpaces"),
})

// Chapter 5: Matrices & Linear Transformations
registerDemo("5", {
  id: "orthographic-projection",
  title: "正交投影演示：投影到坐标平面",
  loader: () => import("@/chapters/chapter-05/demos/OrthographicProjection"),
})

// Chapter 6: More on Matrices
registerDemo("6", {
  id: "transform-pipeline",
  title: "渲染管线全景：模型空间 → 世界空间 → 相机空间 → 屏幕",
  loader: () => import("@/chapters/chapter-06/demos/TransformPipeline"),
})