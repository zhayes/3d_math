import type { ChapterContent } from "@/components/content/types"

const content: ChapterContent = {
  id: "13",
  title: "3D曲线",
  sections: [
    {
      title: "13.1 参数多项式曲线",
      blocks: [
        {
          type: "text",
          html: `<p>曲线在游戏中无处不在——摄像机飞行路径、动画缓动、粒子轨迹、贝塞尔工具。参数曲线用 <strong>P(t) = (x(t), y(t), z(t))</strong> 描述点随参数 t 的运动轨迹。</p>`,
        },
        {
          type: "formula",
          latex: `\\mathbf{P}(t) = \\sum_{i=0}^{n} \\mathbf{c}_i t^i`,
          note: "n 次多项式曲线的通用形式。c_i 是向量系数（控制系数）。",
        },
        {
          type: "text",
          html: `<h3>切线、速度与曲率</h3><p>一阶导数 P'(t) = 切线向量（速度方向），其模长 |P'(t)| = 瞬时速率。如果 t 代表时间，切线就是<strong>速度向量</strong>。二阶导数 P''(t) 与<strong>曲率</strong>相关——曲率越大，曲线弯得越急。</p>`,
        },
      ],
    },
    {
      title: "13.2 Hermite 曲线",
      blocks: [
        {
          type: "text",
          html: `<p>三次 Hermite 曲线由<strong>两个端点 P₀, P₁</strong>和<strong>两个端点处的切线 T₀, T₁</strong>定义。非常适合关键帧插值——位置和切线都连续。</p>`,
        },
        {
          type: "formula",
          latex: `\\mathbf{P}(t) = (2t^3-3t^2+1)\\mathbf{P}_0 + (t^3-2t^2+t)\\mathbf{T}_0 + (-2t^3+3t^2)\\mathbf{P}_1 + (t^3-t^2)\\mathbf{T}_1`,
          note: "三次 Hermite 曲线。四个基函数分别乘以 P₀, T₀, P₁, T₁。",
        },
        {
          type: "text",
          html: `<h3>矩阵形式</h3><p>写成矩阵形式后非常紧凑，适合 GPU 批量计算：<strong>P(t) = T · M_H · G</strong>，其中 T=[1, t, t², t³]，M_H 是 Hermite 基矩阵，G=[P₀, P₁, T₀, T₁]ᵀ 是几何约束。改变 G 改变曲线形状，改变 M 切换到其他曲线类型（如 Bezier）。</p>`,
        },
      ],
    },
    {
      title: "13.3 Bezier 曲线",
      blocks: [
        {
          type: "text",
          html: `<p>Bezier 曲线由<strong>控制点</strong>定义。n 次 Bezier 有 n+1 个控制点。曲线经过首尾控制点，中间控制点"拉"动曲线但曲线不经过它们。</p>`,
        },
        {
          type: "definition",
          title: "三次 Bezier（最常用）",
          body: '<strong>P(t) = (1−t)³P₀ + 3(1−t)²t P₁ + 3(1−t)t² P₂ + t³P₃</strong><br/><br/>切线：P\'(0) = 3(P₁−P₀)，P\'(1) = 3(P₃−P₂)。中间控制点 P₁ 和 P₂ 控制切线方向和"拉力"。<br/><br/>应用：Photoshop 钢笔工具、CSS cubic-bezier()、TrueType 字体轮廓。',
        },
        {
          type: "code",
          language: "typescript",
          code: `// de Casteljau 算法——求 Bezier 曲线上的点
function deCasteljau(points: Vec3[], t: number): Vec3 {
  let pts = points.map(p => ({...p}))
  while (pts.length > 1) {
    const next: Vec3[] = []
    for (let i = 0; i < pts.length - 1; i++)
      next.push({ x: (1-t)*pts[i].x + t*pts[i+1].x, y: (1-t)*pts[i].y + t*pts[i+1].y, z: (1-t)*pts[i].z + t*pts[i+1].z })
    pts = next
  }
  return pts[0]
}`,
        },
        {
          type: "text",
          html: `<p><strong>凸包性（Convex Hull）</strong>是 Bezier 最重要的性质：曲线始终被<strong>包含在其控制点构成的凸多边形内部</strong>。如果凸包不与某物体相交，曲线也必定不与之相交——这对碰撞检测极其有用。</p>`,
        },
      ],
    },
    {
      title: "13.4 Catmull-Rom 样条",
      blocks: [
        {
          type: "text",
          html: `<p><strong>Catmull-Rom 样条</strong>是游戏开发中最常用的路径曲线。与 Bezier 不同，曲线<strong>经过每一个控制点</strong>（插值样条），每段由<strong>四个连续控制点</strong> P_{i-1}, P_i, P_{i+1}, P_{i+2} 定义，在 P_i 处的切线 = (P_{i+1} − P_{i-1}) / 2。</p>`,
        },
        {
          type: "formula",
          latex: `\\mathbf{P}(t) = \\frac{1}{2} \\begin{bmatrix} 1 & t & t^2 & t^3 \\end{bmatrix} \\begin{bmatrix} 0 & 2 & 0 & 0 \\\\ -1 & 0 & 1 & 0 \\\\ 2 & -5 & 4 & -1 \\\\ -1 & 3 & -3 & 1 \\end{bmatrix} \\begin{bmatrix} \\mathbf{P}_{i-1} \\\\ \\mathbf{P}_i \\\\ \\mathbf{P}_{i+1} \\\\ \\mathbf{P}_{i+2} \\end{bmatrix}`,
          note: "Catmull-Rom 样条的矩阵形式。注意前面有 ½ 系数。",
        },
        {
          type: "code",
          language: "typescript",
          code: `// Catmull-Rom 样条——摄像机路径首选
function catmullRom(p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, t: number): Vec3 {
  const t2 = t*t, t3 = t2*t
  const b0 = 0.5 * (-t3 + 2*t2 - t)      // P_{i-1} 的权重
  const b1 = 0.5 * (3*t3 - 5*t2 + 2)     // P_i 的权重
  const b2 = 0.5 * (-3*t3 + 4*t2 + t)    // P_{i+1} 的权重
  const b3 = 0.5 * (t3 - t2)              // P_{i+2} 的权重
  return { x: b0*p0.x+b1*p1.x+b2*p2.x+b3*p3.x, y: b0*p0.y+b1*p1.y+b2*p2.y+b3*p3.y, z: b0*p0.z+b1*p1.z+b2*p2.z+b3*p3.z }
}
// 沿 Catmull-Rom 路径生成等距采样点（详见弧长参数化一节）`,
        },
      ],
    },
    {
      title: "13.5 弧长参数化",
      blocks: [
        {
          type: "text",
          html: `<p>参数曲线的一个常见陷阱：<strong>以恒定步长 Δt 采样，得到的点之间距离不均匀</strong>。在曲线弯曲处采样点更密集。如果摄像机沿参数化路径飞行，画面会<strong>忽快忽慢</strong>。</p><p><strong>弧长参数化</strong>解决了这个问题——以<strong>等距离</strong>而非等 Δt 来采样曲线。</p>`,
        },
        {
          type: "definition",
          title: "弧长参数化的步骤",
          body: '<strong>① 预计算：</strong>对曲线密集采样（如 1000 个点），计算每相邻两点间的距离，累加得到每个采样点的<strong>累积弧长</strong>，构建一张"弧长→参数 t"的查找表。<br/><br/><strong>② 运行时：</strong>给定目标弧长 s，二分查找表中弧长 ≤ s 的最大项，线性插值得到对应的参数 t，然后求 P(t)。<br/><br/>这确保<strong>恒定距离 = 恒定弧长变化</strong>，物体沿曲线匀速运动。',
        },
        {
          type: "code",
          language: "typescript",
          code: `// 弧长参数化——构建查找表
function buildArcLengthTable(curveFn: (t: number) => Vec3, samples = 500) {
  const table: { t: number; len: number }[] = [{ t: 0, len: 0 }]
  let total = 0, prev = curveFn(0)
  for (let i = 1; i <= samples; i++) {
    const t = i / samples
    const p = curveFn(t)
    total += Math.sqrt((p.x-prev.x)**2 + (p.y-prev.y)**2 + (p.z-prev.z)**2)
    table.push({ t, len: total })
    prev = p
  }
  return table
}
// 已知弧长 s，查表→线性插值→得到参数 t → P(t)`,
        },
      ],
    },
    {
      title: "13.6 Frenet 标架",
      blocks: [
        {
          type: "text",
          html: `<p>摄像机沿曲线飞行时，不仅需要位置 P(t)，还需要<strong>朝向</strong>——摄像机应该看向哪里？Frenet-Serret 标架提供了自然答案：由曲线的切线(T)、法线(N)、副法线(B)构成局部正交坐标系。</p>`,
        },
        {
          type: "formula",
          latex: `\\mathbf{T} = \\frac{\\mathbf{P}'(t)}{|\\mathbf{P}'(t)|}, \\quad \\mathbf{N} = \\frac{\\mathbf{T}'(t)}{|\\mathbf{T}'(t)|}, \\quad \\mathbf{B} = \\mathbf{T} \\times \\mathbf{N}`,
          note: "Frenet 标架：T=单位切线（向前），N=单位主法线（弯向），B=副法线（T×N）。",
        },
        {
          type: "note",
          level: "tip",
          body: "<strong>实践提示：</strong>摄像机沿路径飞行时，通常把 T 当作\"前方\"、N 当作\"上方\"（或\"看向方向\"）、B 当作\"右侧\"。但需要注意——在直线段（曲率=0），N 未定义（T 无变化）。实际引擎中通常用<strong>固定 up=(0,1,0)</strong> 加叉积来构建摄像机朝向，避免退化情况。",
        },
      ],
    },
    {
      title: "13.7 连续性详解",
      blocks: [
        {
          type: "text",
          html: `<p>多条曲线拼接时，连接点的光滑程度由<strong>连续性（Continuity）</strong>衡量：</p>`,
        },
        {
          type: "definition",
          title: "参数连续性 Cᵏ",
          body: '<strong>C⁰（位置连续）</strong>：两段在连接点相遇。P₁(1)=P₂(0)。不断开。<br/><br/><strong>C¹（切线连续）</strong>：位置+一阶导数相等。P₁\'(1)=P₂\'(0)。切线<strong>方向和大 小</strong>都匹配。<br/><br/><strong>C²（曲率连续）</strong>：位置+一阶+二阶导数相等。最光滑，摄像机路径的理想标准。',
        },
        {
          type: "definition",
          title: "几何连续性 Gᵏ",
          body: '<strong>G¹</strong>：切线<strong>方向</strong>相同，但大小可以不同。P₁\'(1)=α·P₂\'(0)，α>0。视觉上光滑，但可能有速度突变。<br/><br/><strong>G²</strong>：曲率连续（一阶和二阶导数满足特定关系）。<br/><br/>大多数视觉应用只需要 G¹——人眼对切线突变（尖角）很敏感，对曲率突变不明显。',
        },
        {
          type: "text",
          html: `
            <h3>C⁰ / C¹ / C² 直观对比</h3>
            <table style="width:100%; border-collapse: collapse; margin: 1em 0; font-size: 0.9em;">
              <tr style="background: #f3f4f6;"><th style="padding: 6px 8px; border: 1px solid #ddd;">级别</th><th style="padding: 6px 8px; border: 1px solid #ddd;">视觉效果</th><th style="padding: 6px 8px; border: 1px solid #ddd;">类比</th><th style="padding: 6px 8px; border: 1px solid #ddd;">典型应用</th></tr>
              <tr><td style="padding: 5px 8px; border: 1px solid #ddd;"><strong>C⁰</strong></td><td style="padding: 5px 8px; border: 1px solid #ddd;">有尖角 ✗</td><td style="padding: 5px 8px; border: 1px solid #ddd;">折线</td><td style="padding: 5px 8px; border: 1px solid #ddd;">AI 导航点</td></tr>
              <tr style="background: #f9fafb;"><td style="padding: 5px 8px; border: 1px solid #ddd;"><strong>C¹ / G¹</strong></td><td style="padding: 5px 8px; border: 1px solid #ddd;">视觉光滑 ✓</td><td style="padding: 5px 8px; border: 1px solid #ddd;">平滑转弯</td><td style="padding: 5px 8px; border: 1px solid #ddd;">角色移动路径</td></tr>
              <tr><td style="padding: 5px 8px; border: 1px solid #ddd;"><strong>C²</strong></td><td style="padding: 5px 8px; border: 1px solid #ddd;">加速度连续 ✓✓</td><td style="padding: 5px 8px; border: 1px solid #ddd;">无颠簸</td><td style="padding: 5px 8px; border: 1px solid #ddd;">摄像机路径</td></tr>
            </table>
          `,
        },
      ],
    },
    {
      title: "13.8 本章小结",
      blocks: [
        {
          type: "text",
          html: `
            <ul>
              <li>✅ 参数多项式曲线的通用形式与切线/曲率</li>
              <li>✅ Hermite 曲线——端点+切线，矩阵形式紧凑</li>
              <li>✅ Bezier 曲线——控制点+de Casteljau 算法+凸包性</li>
              <li>✅ Catmull-Rom 样条——经过控制点，摄像机路径首选</li>
              <li>✅ 弧长参数化——消除参数化导致的忽快忽慢</li>
              <li>✅ Frenet 标架——曲线上的局部坐标系（T, N, B）</li>
              <li>✅ C⁰/C¹/C² 与 G¹/G² 连续性的区别和应用场景</li>
            </ul>
          `,
        },
      ],
    },
  ],
}

export default content