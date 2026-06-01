import type { ChapterContent } from "@/components/content/types"

const content: ChapterContent = {
  id: "9",
  title: "几何图元",
  sections: [
    {
      title: "9.1 表示方法与选择策略",
      blocks: [
        {
          type: "text",
          html: `
            <p><strong>几何图元（Geometric Primitives）</strong>是构成 3D 场景的基本几何元素。碰撞检测、射线拾取、空间查询——所有这些都依赖于对图元的精确表示和高效运算。</p>
          `,
        },
        {
          type: "definition",
          title: "参数形式 vs 隐式形式",
          body: '<strong>参数形式（Parametric）</strong>：用变量 t 表示图元上的点。如直线 P(t) = P₀ + t·d。便于<strong>生成</strong>点。<br/><br/><strong>隐式形式（Implicit）</strong>：用等式 f(P) = 0 定义。如球面 |P−C| − r = 0。便于<strong>测试</strong>点在不在图元上/内。<br/><br/>大多数碰撞检测库<strong>同时存储两种形式</strong>或按需转换。',
        },
        {
          type: "note",
          level: "tip",
          body: "<strong>选择原则：</strong>如果你需要\"遍历图元上的点\"（如生成贝塞尔曲线上的等距采样点）→ 用参数形式。如果你需要\"判断一个点是否在图元内部\"（如碰撞检测、点在 AABB 内吗？）→ 用隐式形式。",
        },
      ],
    },
    {
      title: "9.2 直线、射线与线段",
      blocks: [
        {
          type: "text",
          html: `
            <p>三种有向直线的参数方程统一为 <strong>P(t) = P₀ + t·d</strong>，区别仅在于 t 的取值范围：</p>
            <ul><li><strong>直线（Line）</strong>：t ∈ (−∞, +∞)——向两端无限延长</li><li><strong>射线（Ray）</strong>：t ≥ 0——从原点向一个方向延伸</li><li><strong>线段（Segment）</strong>：t ∈ [0, 1]（此时 d = P₁ − P₀）——两点之间</li></ul>
          `,
        },
        {
          type: "formula",
          latex: `\\mathbf{P}(t) = \\mathbf{P}_0 + t \\mathbf{d}`,
          note: "统一的参数直线方程。d 是方向向量（不必归一化）。改变 t 的范围即切换直线/射线/线段类型。",
        },
        {
          type: "text",
          html: `
            <h3>2D 直线的隐式形式</h3>
            <p>在 2D 中，直线也有隐式表示：<strong>ax + by + d = 0</strong>，其中 n=(a,b) 是直线的法向量。将点代入左边，结果的<strong>符号</strong>指示点在直线的哪一侧，结果的<strong>绝对值</strong>与点到直线的距离成正比。</p>
          `,
        },
        {
          type: "derivation",
          title: "推导：点到直线的最短距离",
          intro: "给定直线 L: P(t) = P₀ + t·d 和空间中的点 Q。将 Q 到直线上最近点的向量与 d 作叉积求面积，再除以 |d| 得距离。",
          steps: [
            { latex: '\\mathbf{v} = \\mathbf{Q} - \\mathbf{P}_0', note: '从直线上参考点 P₀ 到目标点 Q 的向量。', insight: '我们要找的是 v 在垂直于 d 的方向上的分量长度——即\"最短距离\"的方向。' },
            { latex: 't = \\frac{\\mathbf{v} \\cdot \\mathbf{d}}{\\mathbf{d} \\cdot \\mathbf{d}}', note: 'Q 到直线上最近点的参数值 = v 在 d 上的投影长度 ÷ |d|²。' },
            { latex: 'd_{\\min} = \\frac{|\\mathbf{v} \\times \\mathbf{d}|}{|\\mathbf{d}|}', note: '最短距离 = |v × d| / |d|。叉积的模长等于以 v 和 d 为边的平行四边形面积，÷底边 |d| = 高。', insight: '几何直觉：v 和 d 张成的平行四边形面积 = 底 × 高。底 = |d|，高 = 我们要求的最短距离。所以 高 = 面积 ÷ 底 = |v×d| / |d|。' },
          ],
        },
        {
          type: "code",
          language: "typescript",
          code: `// 点到直线/射线/线段的最短距离
function closestPointOnLine(Q: Vec3, P0: Vec3, d: Vec3, tMin: number, tMax: number) {
  const v = { x: Q.x-P0.x, y: Q.y-P0.y, z: Q.z-P0.z }
  let t = (v.x*d.x + v.y*d.y + v.z*d.z) / (d.x*d.x + d.y*d.y + d.z*d.z)
  t = Math.max(tMin, Math.min(t, tMax))  // 限制 t 范围
  return { x: P0.x + t*d.x, y: P0.y + t*d.y, z: P0.z + t*d.z }

// tMin=0, tMax=Infinity → 射线；tMin=0, tMax=1 → 线段；tMin=-Inf, tMax=Inf → 直线`,
        },
      ],
    },
    {
      title: "9.3 球体与包围球",
      blocks: [
        {
          type: "text",
          html: `<p>球体是最简单的 3D 图元——仅需<strong>球心 C</strong>和<strong>半径 r</strong>。它的相交测试极其廉价（一次距离比较），因此广泛用于<strong>快速剔除</strong>。</p>`,
        },
        {
          type: "definition",
          title: "球体的隐式与参数形式",
          body: '<strong>隐式</strong>：|P − C| ≤ r —— 点在球内。<br/><strong>参数</strong>（球面坐标）：P(θ,φ) = C + r·(sinφ·cosθ, cosφ, sinφ·sinθ)。',
        },
        {
          type: "derivation",
          title: "推导：射线与球体相交",
          intro: "这是射线拾取（鼠标点击→3D物体）的核心算法。将射线方程代入球的隐式方程，得到关于 t 的二次方程。解的数量决定相交情况。",
          steps: [
            { latex: '|(\\mathbf{P}_0 + t\\mathbf{d}) - \\mathbf{C}|^2 = r^2', note: '将射线方程 P(t)=P₀+t·d 代入球的隐式 |P−C|² = r²。', insight: '这是求\"射线上哪个 t 值的点刚好落在球面上\"。' },
            { latex: 'at^2 + bt + c = 0, \\\\quad a=\\mathbf{d}\\\\cdot\\mathbf{d}, b=2\\\\mathbf{d}\\\\cdot(\\\\mathbf{P}_0-\\\\mathbf{C}), c=|\\\\mathbf{P}_0-\\\\mathbf{C}|^2-r^2', note: '展开平方得到标准二次方程。a, b, c 都是标量。', insight: '二次项 a = |d|² 恒≥0。判别式 Δ=b²−4ac 决定相交情况：Δ<0→无交，Δ=0→相切，Δ>0→两个交点（穿入和穿出）。' },
            { latex: 't = \\\\frac{-b \\\\pm \\\\sqrt{b^2-4ac}}{2a}', note: '二次方程求根公式。取较小的正 t 值作为\"首次击中\"点。', insight: '两个 t 值中，较小的是射线进入球体的位置（near hit），较大的是离开位置（far hit）。如果两个 t 都 < 0，球在射线后方。' },
          ],
        },
        {
          type: "code",
          language: "typescript",
          code: `// 射线与球体相交
function raySphereIntersect(P0: Vec3, d: Vec3, C: Vec3, r: number): number | null {
  const v = { x: P0.x-C.x, y: P0.y-C.y, z: P0.z-C.z }
  const a = d.x*d.x + d.y*d.y + d.z*d.z
  const b = 2 * (v.x*d.x + v.y*d.y + v.z*d.z)
  const c = (v.x*v.x + v.y*v.y + v.z*v.z) - r*r
  const disc = b*b - 4*a*c
  if (disc < 0) return null  // 不相交
  const t = (-b - Math.sqrt(disc)) / (2*a)  // 取较近的交点
  return t > 0 ? t : null  // 交点必须在射线前方
}`,
        },
        {
          type: "text",
          html: `<h3>包围球的构造</h3><p>给定一组点，计算最小包围球：最简单的方法——球心 = 所有顶点的<strong>平均值</strong>（质心），半径 = 质心到最远顶点的距离。这不是最优解（Ritter算法更紧致），但计算极快且足够用于大多数情况。</p>`,
        },
      ],
    },
    {
      title: "9.4 AABB（轴对齐包围盒）",
      blocks: [
        {
          type: "definition",
          title: "AABB 定义",
          body: '<strong>Axis-Aligned Bounding Box</strong> 的各边平行于坐标轴。由两个对角点 p_min 和 p_max 定义。AABB 相交测试只需 <strong>6 次比较</strong>——每个轴独立判断区间是否重叠。',
        },
        {
          type: "code",
          language: "typescript",
          code: `// AABB 构造：从一组顶点计算 min/max
interface AABB { min: Vec3; max: Vec3 }
function buildAABB(vertices: Vec3[]): AABB {
  const min = { x: Infinity, y: Infinity, z: Infinity }
  const max = { x: -Infinity, y: -Infinity, z: -Infinity }
  for (const v of vertices) {
    if (v.x < min.x) min.x = v.x; if (v.x > max.x) max.x = v.x
    if (v.y < min.y) min.y = v.y; if (v.y > max.y) max.y = v.y
    if (v.z < min.z) min.z = v.z; if (v.z > max.z) max.z = v.z
  }
  return { min, max }
}
// AABB vs AABB 相交：每个轴独立比较
function aabbVsAabb(a: AABB, b: AABB): boolean {
  return a.min.x <= b.max.x && a.max.x >= b.min.x
      && a.min.y <= b.max.y && a.max.y >= b.min.y
      && a.min.z <= b.max.z && a.max.z >= b.min.z
}`,
        },
        {
          type: "text",
          html: `
            <h3>变换后的 AABB</h3>
            <p>AABB 经过旋转后<strong>不再轴对齐</strong>。如果仍用 AABB 做碰撞检测，需要重新计算包围盒：将原始 AABB 的 8 个角点乘以变换矩阵，再从结果中取 min/max。更高效的方案是改用 <strong>OBB（有向包围盒）</strong>。</p>
          `,
        },
      ],
    },
    {
      title: "9.5 OBB（有向包围盒）",
      blocks: [
        {
          type: "definition",
          title: "OBB — Oriented Bounding Box",
          body: '与 AABB 不同，OBB 的边<strong>不必平行于坐标轴</strong>——它可以随物体旋转。OBB 由<strong>中心点 C</strong>、<strong>三个正交轴向量 u/v/w</strong>（方向）和<strong>三个半边长 e₀/e₁/e₂</strong>（尺寸）定义。<br/><br/><strong>优势：</strong>比 AABB 更紧致地包围旋转物体，减少误判的相交检测。<br/><strong>劣势：</strong>OBB vs OBB 相交测试比 AABB 复杂（需用分离轴定理 SAT）。',
        },
        {
          type: "text",
          html: `
            <p><strong>何时用 OBB？</strong>当物体经常旋转且需要精确碰撞检测时（如赛车游戏中的车身）。对于不旋转的静态物体（建筑、地形），AABB 足够且更快。</p>
          `,
        },
      ],
    },
    {
      title: "9.6 平面",
      blocks: [
        {
          type: "text",
          html: `<p>3D 中的平面由<strong>法向量 n</strong>（单位向量，垂直于平面）和<strong>到原点的有向距离 d</strong> 定义。平面方程：<strong>n · P = d</strong>（或 n · P + d = 0，取决于 d 的符号约定）。</p>`,
        },
        {
          type: "derivation",
          title: "推导：从三个点计算平面",
          intro: "给定三角形三个顶点 v₀, v₁, v₂（不共线），可以唯一确定其所在平面。",
          steps: [
            { latex: '\\\\mathbf{e}_1 = \\\\mathbf{v}_1 - \\\\mathbf{v}_0, \\\\quad \\\\mathbf{e}_2 = \\\\mathbf{v}_2 - \\\\mathbf{v}_0', note: '取三角形的两条边作为平面上的两个向量。', insight: '只要 e₁ 和 e₂ 不共线（三角形不是退化的），它们就张成了三角形所在的平面。' },
            { latex: '\\\\mathbf{n} = \\\\frac{\\\\mathbf{e}_1 \\\\times \\\\mathbf{e}_2}{|\\\\mathbf{e}_1 \\\\times \\\\mathbf{e}_2|}', note: '法向量 = e₁ × e₂ 归一化。注意顺序——n 的方向遵循右手定则。' },
            { latex: 'd = \\\\mathbf{n} \\\\cdot \\\\mathbf{v}_0', note: '有向距离 d = n·v₀（或 n·v₁、n·v₂——三个点在同一平面上，结果相同）。', insight: 'd 是原点到平面的垂直距离（带符号）。如果 n 指向原点，d 为负值。' },
          ],
        },
        {
          type: "text",
          html: `
            <h3>点在平面的哪一侧？</h3>
            <p>将任意点 P 代入 <strong>n·P − d</strong>：</p>
            <ul>
              <li><strong>正值</strong>：P 在平面的<strong>前方</strong>（法向量指向的一侧）</li>
              <li><strong>零值</strong>：P 恰好在平面上</li>
              <li><strong>负值</strong>：P 在平面的<strong>后方</strong></li>
            </ul>
            <p>这是<strong>视锥体裁剪</strong>和<strong>背面剔除</strong>的基础——六个裁剪面每个都是一次这种判断。</p>
          `,
        },
      ],
    },
    {
      title: "9.7 三角形——渲染的基本单元",
      blocks: [
        {
          type: "text",
          html: `<p>三角形是 GPU 唯一\"理解\"的图元。所有 3D 模型最终都分解为三角形。三角形的核心运算包括重心坐标插值和射线相交测试。</p>`,
        },
        {
          type: "definition",
          title: "重心坐标（Barycentric Coordinates）",
          body: '三角形内任意点 P 可以表示为三个顶点的加权平均：<strong>P = u·v₀ + v·v₁ + w·v₂</strong>，其中 <strong>u + v + w = 1</strong> 且 u,v,w ≥ 0（点在三角形内部）。<br/><br/><strong>用途：</strong>光栅化时 GPU 对三角形内的每个片元计算其重心坐标，用来插值顶点属性（颜色、UV、法向量）。',
        },
        {
          type: "derivation",
          title: "推导：重心坐标的计算",
          intro: "重心坐标可以通过面积比来计算：u = 面积(P,v₁,v₂) / 面积(v₀,v₁,v₂)，即 P 与对边构成的小三角形面积占总面积的比例。",
          steps: [
            { latex: 'u = \\\\frac{\\\\text{Area}(P, v_1, v_2)}{\\\\text{Area}(v_0, v_1, v_2)}', note: 'u = P 的对边（v₁v₂）与 P 构成的小三角形面积 ÷ 总三角形面积。', insight: '在 v₀ 处 u=1（P 恰好在 v₀），在对边 v₁v₂ 上 u=0。v 和 w 同理。三个值之和 = 1 是因为三个小三角形面积之和 = 大三角形面积。' },
            { latex: '\\\\text{Area} = \\\\frac{1}{2}|(\\\\mathbf{v}_1-\\\\mathbf{v}_0) \\\\times (\\\\mathbf{v}_2-\\\\mathbf{v}_0)|', note: '三角形面积 = ½|两边叉积|。对每个小三角形重复此计算。', insight: '叉积的模长 = 平行四边形面积。三角形面积 = 平行四边形面积的一半。GPU 实际用边函数法计算重心坐标，比面积法更高效。' },
          ],
        },
        {
          type: "code",
          language: "typescript",
          code: `// 重心坐标计算 (边函数法)
function barycentric(P: Vec3, v0: Vec3, v1: Vec3, v2: Vec3) {
  const v0v1 = { x: v1.x-v0.x, y: v1.y-v0.y, z: v1.z-v0.z }
  const v0v2 = { x: v2.x-v0.x, y: v2.y-v0.y, z: v2.z-v0.z }
  const v0P  = { x: P.x-v0.x,  y: P.y-v0.y,  z: P.z-v0.z }
  const d00 = dot(v0v1, v0v1), d01 = dot(v0v1, v0v2)
  const d11 = dot(v0v2, v0v2), d20 = dot(v0P, v0v1), d21 = dot(v0P, v0v2)
  const denom = d00*d11 - d01*d01
  const v = (d11*d20 - d01*d21) / denom
  const w = (d00*d21 - d01*d20) / denom
  return { u: 1 - v - w, v, w }
}`,
        },
      ],
    },
    {
      title: "9.8 视锥体",
      blocks: [
        {
          type: "text",
          html: `<p><strong>视锥体（View Frustum）</strong>是摄像机可见区域的几何描述——由六个平面围成的截顶四棱锥。任何在视锥体外的物体都不需要渲染，这就是<strong>视锥体剔除（Frustum Culling）</strong>。</p>`,
        },
        {
          type: "definition",
          title: "六个裁剪面",
          body: '视锥体的六个面分别是：<strong>左、右、上、下、近、远</strong>。每个面是一个平面，法向量<strong>指向视锥体内部</strong>。这六个面可以从<strong>VP 组合矩阵</strong>（V=视图，P=投影）中提取：<br/><br/>将 VP 矩阵的 6 对行做加减组合，即可得到六个平面的法向量和 d 值。<br/><br/>剔除测试：将物体的包围球（或 AABB）依次对六个平面测试。如果对于<strong>任意一个平面</strong>，物体完全在其<strong>外侧</strong>（法向量背面），则该物体不可见。',
        },
        {
          type: "code",
          language: "typescript",
          code: `// 从 VP 矩阵提取视锥体六个平面（简化版）
function extractFrustumPlanes(VP: number[]): Plane[] {
  // VP 矩阵是 4×4 列主序：[col0, col1, col2, col3]
  // 六个平面 = 矩阵行的加减组合
  const planes: Plane[] = []
  // 左平面: row3 + row0
  planes.push(normalizePlane({ a: VP[3]+VP[0], b: VP[7]+VP[4], c: VP[11]+VP[8], d: VP[15]+VP[12] }))
  // 右平面: row3 - row0
  planes.push(normalizePlane({ a: VP[3]-VP[0], b: VP[7]-VP[4], c: VP[11]-VP[8], d: VP[15]-VP[12] }))
  // 下、上、近、远平面类似...
  return planes
}
// 球体 vs 视锥体剔除
function sphereInFrustum(C: Vec3, r: number, planes: Plane[]): boolean {
  for (const p of planes) {
    if (p.a*C.x + p.b*C.y + p.c*C.z + p.d <= -r) return false  // 球完全在平面外侧
  }
  return true  // 球与所有平面相交或在内侧
}`,
        },
      ],
    },
    {
      title: "9.9 多边形",
      blocks: [
        {
          type: "text",
          html: `<p>多边形在游戏中有两种角色：<strong>渲染多边形</strong>（几乎全是三角形——GPU 只认三角形）和<strong>逻辑多边形</strong>（如导航网格 NavMesh 中的凸多边形区域）。</p><p>多边形的关键属性：<strong>凸 vs 凹</strong>。凸多边形的任何内角都不超过 180°——这使得很多算法（如点在多边形内测试、裁剪）大大简化。大多数物理引擎要求碰撞体是凸的。</p>`,
        },
      ],
    },
    {
      title: "9.10 本章小结",
      blocks: [
        {
          type: "text",
          html: `
            <ul>
              <li>✅ 参数形式 vs 隐式形式——不同场景选择不同表示</li>
              <li>✅ 直线/射线/线段——统一公式，t 范围区分</li>
              <li>✅ 点到直线距离——叉积求面积的几何直觉</li>
              <li>✅ 球体——最简单的碰撞图元，射线-球体相交（二次方程）</li>
              <li>✅ AABB——6 次比较的相交测试，从点集构造</li>
              <li>✅ OBB——随物体旋转的更紧致包围盒</li>
              <li>✅ 平面——三点定面，n·P−d 判断点在平面哪一侧</li>
              <li>✅ 三角形——重心坐标插值原理与计算</li>
              <li>✅ 视锥体——六个裁剪面，VP 矩阵提取，球体剔除</li>
            </ul>
          `,
        },
      ],
    },
  ],
}

export default content