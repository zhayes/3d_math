import type { ChapterContent } from "@/components/content/types"
const content: ChapterContent = { id: "9", title: "几何图元", sections: [
  { title: "9.1 表示方法", blocks: [
    { type: "text", html: `<p><strong>几何图元（Geometric Primitives）</strong>是构成 3D 场景的基本几何元素。高效的碰撞检测、射线拾取和空间查询都依赖于对这些图元的精确表示和高效运算。</p>` },
    { type: "definition", title: "表示方式的选择", body: '几何图元通常有两种表示方式：<strong>参数形式（Parametric）</strong>：用方程的参数来描述图元上的点（如直线的 P(t) = P₀ + t·d）；<strong>隐式形式（Implicit）</strong>：用等式 f(P) = 0 来定义图元（如球面的 |P − C| = r）。<br/><br/>参数形式便于<strong>生成</strong>图元上的点；隐式形式便于<strong>测试</strong>点是否在图元上/内。' },
    { type: "note", level: "tip", body: "大多数图形引擎使用<strong>混合表示</strong>——内部存储参数形式（便于变换），需要进行包含检测或相交测试时转为隐式形式判断。" },
  ]},
  { title: "9.2 直线与射线", blocks: [
    { type: "text", html: "<p>在 3D 图形学中，我们使用三种有向直线：</p><ul><li><strong>直线（Line）</strong>：向两端无限延伸。参数形式：P(t) = P₀ + t·d, t ∈ (−∞, +∞)。</li><li><strong>射线（Ray）</strong>：从起点向一个方向无限延伸。P(t) = P₀ + t·d, t ≥ 0。</li><li><strong>线段（Line Segment）</strong>：两个端点之间的有限部分。P(t) = P₀ + t·d, 0 ≤ t ≤ 1（此时 d = P₁ − P₀）。</li></ul>" },
    { type: "formula", latex: `\\mathbf{P}(t) = \\mathbf{P}_0 + t \\mathbf{d}`, note: "直线的参数方程。t 的范围决定是直线、射线还是线段。" },
    { type: "code", language: "typescript", code: `// 点到直线的最短距离
function pointToLineDist(point: Vec3, linePt: Vec3, lineDir: Vec3): number {
  const v = { x: point.x - linePt.x, y: point.y - linePt.y, z: point.z - linePt.z }
  const t = (v.x*lineDir.x + v.y*lineDir.y + v.z*lineDir.z) / (lineDir.x**2 + lineDir.y**2 + lineDir.z**2)
  const closest = { x: linePt.x + t*lineDir.x, y: linePt.y + t*lineDir.y, z: linePt.z + t*lineDir.z }
  return Math.sqrt((point.x-closest.x)**2 + (point.y-closest.y)**2 + (point.z-closest.z)**2)
}` },
  ]},
  { title: "9.3 球体与包围球", blocks: [
    { type: "text", html: "<p><strong>球体（Sphere）</strong>是碰撞检测中最常用的图元之一——它的相交测试极为廉价（只需一次距离比较）。</p>" },
    { type: "definition", title: "定义: 球体", body: '球体由<strong>球心 C</strong> 和<strong>半径 r</strong> 定义。点在球内的条件：<strong>|P − C| ≤ r</strong>。<br/><br/><strong>包围球（Bounding Sphere）</strong>：包围一组点的最小球体。常用于快速剔除——如果包围球不与视锥体相交，其内部的物体也一定不可见。' },
    { type: "code", language: "typescript", code: `// 球体相交检测
function sphereIntersect(c1: Vec3, r1: number, c2: Vec3, r2: number): boolean {
  const dx=c2.x-c1.x, dy=c2.y-c1.y, dz=c2.z-c1.z
  const distSq = dx*dx + dy*dy + dz*dz
  const rSum = r1 + r2
  return distSq <= rSum * rSum  // 比 sqrt 更快！
}` },
  ]},
  { title: "9.4 AABB 包围盒", blocks: [
    { type: "definition", title: "AABB（轴对齐包围盒）", body: '<strong>Axis-Aligned Bounding Box</strong> 的各边<strong>平行于坐标轴</strong>。由两个对角点 p_min = (x_min, y_min, z_min) 和 p_max = (x_max, y_max, z_max) 定义。<br/><br/>AABB 的相交测试极为高效——只需比较每个轴上的区间是否重叠。因此 AABB 是游戏引擎中最常用的包围体。' },
    { type: "code", language: "typescript", code: `// AABB 相交测试
function aabbIntersect(a: AABB, b: AABB): boolean {
  return a.min.x <= b.max.x && a.max.x >= b.min.x
      && a.min.y <= b.max.y && a.max.y >= b.min.y
      && a.min.z <= b.max.z && a.max.z >= b.min.z
}` },
  ]},
  { title: "9.5 平面", blocks: [
    { type: "text", html: `<p><strong>平面（Plane）</strong>在 3D 中由法向量 n 和到原点的有向距离 d 定义。平面的隐式方程：<strong>n · P + d = 0</strong>（或写为 n · P = d）。法向量指向平面的"前方"。</p>` },
    { type: "formula", latex: `\\mathbf{n} \\cdot \\mathbf{P} = d`, note: "平面方程。n 是单位法向量，d 是原点到平面的有向距离。" },
    { type: "text", html: "<p>给定三角形 (v₀, v₁, v₂)，其所在平面的法向量 = (v₁ − v₀) × (v₂ − v₀)，再归一化。</p>" },
    { type: "note", level: "info", body: `平面在图形学中无处不在：<strong>视锥体的六个裁剪面</strong>都是平面，<strong>反射面</strong>是平面，<strong>碰撞中的地面/墙壁</strong>也是平面。判断点在平面的哪一侧（n·P − d 的符号）是背面剔除的基础。` },
  ]},
  { title: "9.6 三角形", blocks: [
    { type: "text", html: "<p><strong>三角形</strong>是 3D 图形学中最基本的<strong>渲染图元</strong>——所有复杂的 3D 模型最终都由三角形网格组成。</p>" },
    { type: "definition", title: "三角形的重要属性", body: '• 面积 = ½ |(v₁−v₀) × (v₂−v₀)|<br/>• 重心坐标 (u, v, w)：三角形内任意点 P = u·v₀ + v·v₁ + w·v₂，其中 u+v+w=1<br/>• 法向量可通过两侧边的叉积得到<br/>• 通过重心坐标可以插值顶点属性（颜色、UV、法向量）' },
  ]},
  { title: "本章小结", blocks: [
    { type: "text", html: "<ul><li>✅ 直线/射线/线段的参数表示</li><li>✅ 球体与包围球——最简单高效的碰撞图元</li><li>✅ AABB——最常用的包围盒，O(1) 相交测试</li><li>✅ 平面的隐式方程及其在裁剪/剔除中的应用</li><li>✅ 三角形——渲染的基本单元，重心坐标插值</li></ul>" },
  ]},
] }; export default content
