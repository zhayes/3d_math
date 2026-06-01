import type { ChapterContent } from "@/components/content/types"

const content: ChapterContent = {
  id: "1",
  title: "笛卡尔坐标系",
  sections: [
    {
      title: "1.1 一维数学",
      blocks: [
        {
          type: "text",
          html: `
            <p>在计算机图形学和游戏开发中，数学是描述和操纵三维空间的基础工具。我们从最简单的维度开始——<strong>一维（1D）</strong>。</p>
            <p>一维空间可以想象为一条无限延伸的直线。在数学上，我们使用<strong>实数轴（数轴）</strong>来建模一维空间：选择直线上的一个点作为<strong>原点</strong>（0），选择一个方向作为<strong>正方向</strong>（通常向右），再选择一个单位长度。这样，直线上的每一个点都对应一个唯一的实数坐标。</p>
          `,
        },
        {
          type: "definition",
          title: "定义: 数轴 (Number Line)",
          body: "数轴是一条直线上建立坐标系的数学模型，由三个要素确定：<strong>原点</strong> O、<strong>正方向</strong>和<strong>单位长度</strong>。任意点 P 的坐标 <em>x</em> 等于该点到原点 O 的有向距离。",
        },
        {
          type: "formula",
          latex: `\\text{coord}(P) = x \\quad \\text{（有向距离）}`,
          note: "一维空间中点的坐标表示",
        },
        {
          type: "text",
          html: `
            <p>数轴上的一些基本概念：</p>
            <ul>
              <li><strong>区间 (Interval)</strong>：两个端点之间的所有点。例如，闭区间 [a, b] 包含两个端点，开区间 (a, b) 不包含端点。</li>
              <li><strong>有向距离 (Signed Distance)</strong>：从点 A 到点 B 的有向距离为 b - a。结果为正值表示 B 在 A 的正方向，负值表示在反方向。</li>
              <li><strong>绝对值距离</strong>：|<em>b - a</em>| 表示两点间的绝对距离，永远是正值。</li>
            </ul>
          `,
        },
        {
          type: "note",
          level: "tip",
          body: "一维数学是所有高维空间的基础。理解了 1D 中的概念（点、距离、区间、有向距离），就可以自然地推广到 2D 和 3D。例如，2D 中的两点距离公式 <em>d = √((x₂-x₁)² + (y₂-y₁)²)</em> 就是一维绝对值距离 <em>|b-a|</em> 的自然推广。",
        },
        {
          type: "code",
          language: "typescript",
          code: `// 一维空间中的距离计算
function signedDistance(a: number, b: number): number {
  return b - a  // 有向距离，可正可负
}

function absoluteDistance(a: number, b: number): number {
  return Math.abs(b - a)  // 无方向距离，始终非负
}

// 判断点是否在区间内
function inInterval(x: number, min: number, max: number, closed = true): boolean {
  if (closed) return x >= min && x <= max
  return x > min && x < max
}`,
        },
      ],
    },
    {
      title: "1.2 二维笛卡尔空间",
      blocks: [
        {
          type: "text",
          html: `
            <p><strong>笛卡尔坐标系</strong>（Cartesian Coordinate System）由法国数学家兼哲学家勒内·笛卡尔（René Descartes, 1596–1650）在 17 世纪提出。他首次将代数与几何统一起来，这是数学史上的一个里程碑——也是图形学和游戏开发的数学基础。</p>
            <p>在二维空间中，我们使用<strong>两条互相垂直的坐标轴</strong>：</p>
            <ul>
              <li><strong>x 轴</strong>：水平轴，正方向通常向右</li>
              <li><strong>y 轴</strong>：垂直轴，正方向通常向上</li>
            </ul>
            <p>两轴交于 <strong>原点</strong> O(0, 0)。平面上的任意点 P 都可以用<strong>有序对</strong> (x, y) 表示，其中 x 是 P 到 y 轴的有向距离，y 是 P 到 x 轴的有向距离。</p>
          `,
        },
        {
          type: "formula",
          latex: `P = (x, y)`,
          note: "二维笛卡尔空间中点的坐标表示",
        },
        {
          type: "definition",
          title: "定义: 2D 笛卡尔坐标",
          body: '在二维笛卡尔平面上，点 <em>P</em> 的坐标 (x, y) 表示：<br/><br/><strong>x 坐标</strong> = P 到 y 轴的有向距离（正值在 y 轴右侧，负值在左侧）<br/><strong>y 坐标</strong> = P 到 x 轴的有向距离（正值在 x 轴上方，负值在下方）',
        },
        {
          type: "text",
          html: `
            <h3>四个象限</h3>
            <p>坐标轴将平面分为四个<strong>象限（quadrants）</strong>，按逆时针方向编号：</p>
            <ul>
              <li><strong>第一象限（I）</strong>：x > 0, y > 0 — 右上区域</li>
              <li><strong>第二象限（II）</strong>：x < 0, y > 0 — 左上区域</li>
              <li><strong>第三象限（III）</strong>：x < 0, y < 0 — 左下区域</li>
              <li><strong>第四象限（IV）</strong>：x > 0, y < 0 — 右下区域</li>
            </ul>
            <p>在计算机图形学中，屏幕坐标系的 y 轴通常向下（原点在屏幕左上角），这与数学中的标准笛卡尔坐标系有所不同。</p>
          `,
        },
        {
          type: "illustration",
          caption: "图 1.1 — 二维笛卡尔平面：四个象限、坐标轴与示例点",
          width: 560,
          height: 420,
          svg: `<svg viewBox="0 0 560 420" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,sans-serif">
  <defs>
    <marker id="arrowR" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#e35947"/></marker>
    <marker id="arrowG" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#2e9978"/></marker>
  </defs>
  <!-- background -->
  <rect width="560" height="420" fill="#faf8f5" rx="8"/>
  <!-- Grid -->
  <g stroke="#e8e4de" stroke-width="0.5">
    <line x1="80" y1="40" x2="80" y2="360"/><line x1="160" y1="40" x2="160" y2="360"/><line x1="240" y1="40" x2="240" y2="360"/><line x1="320" y1="40" x2="320" y2="360"/><line x1="400" y1="40" x2="400" y2="360"/><line x1="480" y1="40" x2="480" y2="360"/>
    <line x1="40" y1="80" x2="520" y2="80"/><line x1="40" y1="160" x2="520" y2="160"/><line x1="40" y1="240" x2="520" y2="240"/><line x1="40" y1="320" x2="520" y2="320"/>
  </g>
  <!-- Axes -->
  <line x1="40" y1="200" x2="520" y2="200" stroke="#e35947" stroke-width="2" marker-end="url(#arrowR)"/>
  <line x1="280" y1="380" x2="280" y2="20" stroke="#2e9978" stroke-width="2" marker-end="url(#arrowG)"/>
  <!-- Axis labels -->
  <text x="510" y="195" fill="#e35947" font-size="14" font-weight="700">x</text>
  <text x="290" y="30" fill="#2e9978" font-size="14" font-weight="700">y</text>
  <!-- Origin -->
  <circle cx="280" cy="200" r="3" fill="#555"/><text x="270" y="195" fill="#555" font-size="11">O</text>
  <!-- Quadrant labels -->
  <text x="215" y="100" fill="#bbb" font-size="28" font-weight="800" opacity="0.6">I</text>
  <text x="345" y="100" fill="#bbb" font-size="28" font-weight="800" opacity="0.6">II</text>
  <text x="345" y="340" fill="#bbb" font-size="28" font-weight="800" opacity="0.6">III</text>
  <text x="215" y="340" fill="#bbb" font-size="28" font-weight="800" opacity="0.6">IV</text>
  <!-- Tick marks -->
  <g font-size="9" fill="#999">
    <text x="196" y="214">-1</text><text x="117" y="214">-2</text>
    <text x="356" y="214">1</text><text x="435" y="214">2</text>
    <text x="284" y="124">1</text><text x="284" y="284">-1</text>
  </g>
  <!-- Sample point (2, 1.5) -->
  <circle cx="440" cy="80" r="5" fill="#3b6fd4"/>
  <!-- Dashed lines from point to axes -->
  <line x1="280" y1="80" x2="440" y2="80" stroke="#3b6fd4" stroke-width="0.8" stroke-dasharray="4,3"/>
  <line x1="440" y1="80" x2="440" y2="200" stroke="#3b6fd4" stroke-width="0.8" stroke-dasharray="4,3"/>
  <text x="448" y="72" fill="#1d4ed8" font-size="12" font-weight="600">P(2, 1.5)</text>
  <!-- Distance annotation -->
  <text x="355" y="76" fill="#3b6fd4" font-size="10">y=1.5</text>
  <text x="446" y="188" fill="#3b6fd4" font-size="10">x=2</text>
</svg>`,
        },
        {
          type: "formula",
          latex: `d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}`,
          note: "二维平面上两点 P₁(x₁, y₁) 和 P₂(x₂, y₂) 之间的欧几里得距离",
        },
        {
          type: "text",
          html: `
            <p>距离公式是<strong>勾股定理</strong>的直接应用。考虑两点构成的直角三角形：水平直角边长为 <em>|x₂ - x₁|</em>，垂直直角边长为 <em>|y₂ - y₁|</em>，斜边就是两点间的距离。</p>
          `,
        },
        {
          type: "formula",
          latex: `M = \\left( \\frac{x_1 + x_2}{2},\\ \\frac{y_1 + y_2}{2} \\right)`,
          note: "二维线段的中点坐标 — 两端点坐标的算术平均值",
        },
        {
          type: "note",
          level: "info",
          body: "<strong>注意：</strong>计算机屏幕中的坐标系通常以<strong>左上角为原点</strong>，y 轴<strong>向下</strong>为正方向。这是因为早期 CRT 显示器从上往下扫描。在游戏引擎中（如 Unity, Babylon.js），数学坐标系（y 轴向上）和屏幕坐标系（UI）同时存在，需要根据上下文切换思维方式。",
        },
        {
          type: "code",
          language: "typescript",
          code: `// 2D 空间中的距离和计算
interface Point2D {
  x: number
  y: number
}

function distance2D(a: Point2D, b: Point2D): number {
  const dx = b.x - a.x
  const dy = b.y - a.y
  return Math.sqrt(dx * dx + dy * dy)
}

function midpoint2D(a: Point2D, b: Point2D): Point2D {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  }
}

// 判断点所在象限
function quadrant(p: Point2D): string {
  if (p.x > 0 && p.y > 0) return "第一象限"
  if (p.x < 0 && p.y > 0) return "第二象限"
  if (p.x < 0 && p.y < 0) return "第三象限"
  if (p.x > 0 && p.y < 0) return "第四象限"
  if (p.x === 0 && p.y === 0) return "原点"
  if (p.x === 0 && p.y !== 0) return "y 轴上"
  return "x 轴上"
}`,
        },
      ],
    },
    {
      title: "1.3 三维笛卡尔空间",
      blocks: [
        {
          type: "text",
          html: `
            <p>三维笛卡尔空间是在二维基础上增加<strong>第三个坐标轴 z</strong>。三条轴互相垂直、交于同一点（原点），构成三维空间的完整骨架。</p>
            <p>在 3D 游戏和图形学中，三维坐标系是核心工具。场景中的每个物体、每个顶点、每个光源的位置都由一个 (x, y, z) 三元组确定。</p>
          `,
        },
        {
          type: "formula",
          latex: `P = (x, y, z)`,
          note: "三维空间中任意点的坐标表示",
        },
        {
          type: "definition",
          title: "左手坐标系 vs 右手坐标系",
          body: '三维笛卡尔坐标系有两种约定——<strong>左手坐标系（Left-Handed）</strong>和<strong>右手坐标系（Right-Handed）</strong>。两者的核心区别在于 <strong>z 轴的正方向恰好相反</strong>：在左手系中 +z 指向屏幕内，在右手系中 +z 指向屏幕外。',
        },
        {
          type: "text",
          html: `
            <h3>如何确定坐标系手性</h3>
            <p>伸出你的手，让拇指指向 <strong>+x</strong>，食指指向 <strong>+y</strong>，然后自然弯曲中指——中指所指的方向就是当前约定下的 <strong>+z</strong> 方向。</p>
            <div style="display: flex; gap: 1.5rem; margin: 1.5rem 0; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 220px; background: linear-gradient(135deg, #eff6ff, #dbeafe); border: 1px solid #93c5fd; border-radius: 10px; padding: 1.2rem; text-align: center;">
                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🫲</div>
                <h4 style="font-weight: 700; color: #1e40af; margin: 0 0 0.3rem;">左手坐标系 (Left-Handed)</h4>
                <p style="font-size: 0.9rem; color: #3b82f6; margin: 0;">+X 向右 · +Y 向上 · <strong>+Z 指向屏幕内</strong></p>
                <p style="font-size: 0.8rem; color: #6b7280; margin: 0.5rem 0 0;">DirectX · Unity · Unreal</p>
              </div>
              <div style="flex: 1; min-width: 220px; background: linear-gradient(135deg, #fef3c7, #fde68a); border: 1px solid #fbbf24; border-radius: 10px; padding: 1.2rem; text-align: center;">
                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🫱</div>
                <h4 style="font-weight: 700; color: #92400e; margin: 0 0 0.3rem;">右手坐标系 (Right-Handed)</h4>
                <p style="font-size: 0.9rem; color: #b45309; margin: 0;">+X 向右 · +Y 向上 · <strong>+Z 指向屏幕外</strong></p>
                <p style="font-size: 0.8rem; color: #6b7280; margin: 0.5rem 0 0;">OpenGL · Vulkan · Babylon.js · Three.js</p>
              </div>
            </div>
          `,
        },
        {
          type: "demo",
          demoId: "left-right-hand",
        },
        {
          type: "note",
          level: "warning",
          body: "<strong>⚠️ 重要：</strong>在处理 3D 数据（模型导入、物理计算、渲染管线）时，务必了解当前使用的坐标系约定。最常见的坑：从右手系的建模软件（如 Blender）导出的模型，导入到左手系引擎（如 Unity）时需要翻转 z 轴，否则模型的法线和面朝向会出错。",
        },
        {
          type: "demo",
          demoId: "cartesian-3d",
        },
        {
          type: "text",
          html: `
            <h3>三个坐标平面与八象限</h3>
            <p>三维空间被三个<strong>坐标平面（Coordinate Planes）</strong>分割为 8 个<strong>八分象限（Octants）</strong>，类似于二维中的四个象限：</p>
            <ul>
              <li><strong>xy 平面</strong>：z = 0（将空间分为前半和后半）</li>
              <li><strong>xz 平面</strong>：y = 0（将空间分为上半和下半）</li>
              <li><strong>yz 平面</strong>：x = 0（将空间分为左半和右半）</li>
            </ul>
            <p>在游戏开发中，坐标平面经常作为<strong>对称面</strong>或<strong>地平面</strong>使用。例如，xz 平面（y = 0）通常用作行走地面，xy 平面（z = 0）用作镜面反射平面。</p>
          `,
        },
        {
          type: "demo",
          demoId: "coordinate-planes",
        },
        {
          type: "code",
          language: "typescript",
          code: `// 将 2D 距离公式推广到 3D
interface Point3D {
  x: number
  y: number
  z: number
}

function distance3D(a: Point3D, b: Point3D): number {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const dz = b.z - a.z
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

// 判断点所在八象限（右手坐标系）
function octant(p: Point3D): string {
  const sx = p.x > 0 ? "+" : "-"
  const sy = p.y > 0 ? "+" : "-"
  const sz = p.z > 0 ? "+" : "-"
  if (p.x === 0 || p.y === 0 || p.z === 0) return "坐标平面上"
  return \`八象限(\${sx}x, \${sy}y, \${sz}z)\`
}`,
        },
      ],
    },
    {
      title: "1.4 坐标系在实际应用中的考量",
      blocks: [
        {
          type: "text",
          html: `
            <p>在前面的内容中，我们始终假定 x 轴向右、y 轴向上。但在实际的游戏开发中，情况可能会有所不同：</p>
          `,
        },
        {
          type: "text",
          html: `
            <h3>世界坐标系中各引擎的约定</h3>
            <table style="width:100%; border-collapse: collapse; margin: 1em 0;">
              <tr style="background: #f3f4f6;">
                <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">引擎/API</th>
                <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">向上轴</th>
                <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">前方轴</th>
                <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">坐标系</th>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;">Babylon.js / Three.js</td>
                <td style="padding: 8px; border: 1px solid #ddd;">+Y</td>
                <td style="padding: 8px; border: 1px solid #ddd;">+Z</td>
                <td style="padding: 8px; border: 1px solid #ddd;">右手系</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 8px; border: 1px solid #ddd;">Unity</td>
                <td style="padding: 8px; border: 1px solid #ddd;">+Y</td>
                <td style="padding: 8px; border: 1px solid #ddd;">+Z</td>
                <td style="padding: 8px; border: 1px solid #ddd;">左手系</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;">Unreal Engine</td>
                <td style="padding: 8px; border: 1px solid #ddd;">+Z</td>
                <td style="padding: 8px; border: 1px solid #ddd;">+X</td>
                <td style="padding: 8px; border: 1px solid #ddd;">左手系</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 8px; border: 1px solid #ddd;">OpenGL / Vulkan</td>
                <td style="padding: 8px; border: 1px solid #ddd;">+Y</td>
                <td style="padding: 8px; border: 1px solid #ddd;">-Z</td>
                <td style="padding: 8px; border: 1px solid #ddd;">右手系</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;">DirectX</td>
                <td style="padding: 8px; border: 1px solid #ddd;">+Y</td>
                <td style="padding: 8px; border: 1px solid #ddd;">+Z</td>
                <td style="padding: 8px; border: 1px solid #ddd;">左手系</td>
              </tr>
            </table>
            <p>本书采用与 <strong>Babylon.js</strong> 一致的坐标系约定：x 轴向右，y 轴向上，z 轴指向屏幕外（右手坐标系）。本章的所有 3D 交互演示都遵循这一约定。</p>
          `,
        },
        {
          type: "note",
          level: "info",
          body: "<strong>为什么存在多种约定？</strong><br/><br/>主要原因有：<br/>1. <strong>历史原因</strong>：不同团队在不同时期设计了各自的系统。<br/>2. <strong>应用场景差异</strong>：建筑设计软件（如 AutoCAD）习惯 z 轴朝上，因为在平面图上俯视时 x 和 y 描述平面。<br/>3. <strong>渲染管线考虑</strong>：左手系在深度缓冲方面有某些简化。<br/><br/>实际开发中，最重要的是<strong>保持一致</strong>，并在导入/导出资源时注意坐标系转换。",
        },
        {
          type: "text",
          html: `
            <h3>坐标空间的层次结构</h3>
            <p>在游戏引擎中，通常存在多个嵌套的坐标空间：</p>
            <ul>
              <li><strong>模型空间（Model Space）</strong>：以模型自身原点为基准的局部坐标系。</li>
              <li><strong>世界空间（World Space）</strong>：整个场景的全局坐标系，所有物体的世界坐标都相对于此。</li>
              <li><strong>视图空间/摄像机空间（View Space）</strong>：以摄像机为原点的坐标系，摄像机朝向为 z 轴（或 -z 轴）。</li>
              <li><strong>屏幕空间（Screen Space）</strong>：将 3D 场景投影到 2D 屏幕上的最终坐标系，x 向右、y 向下。</li>
            </ul>
            <p>这些坐标空间之间的转换由矩阵来实现（我们将在第 4-6 章详细讨论）。</p>
          `,
        },
      ],
    },
    {
      title: "1.5 距离公式与重要恒等式",
      blocks: [
        {
          type: "text",
          html: `
            <p>掌握坐标空间后，我们需要一些基本工具在空间中做计算。以下是最常用的公式：</p>
          `,
        },
        {
          type: "formula",
          latex: `d_{2D} = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}`,
          note: "二维空间中两点距离（勾股定理）",
        },
        {
          type: "formula",
          latex: `d_{3D} = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}`,
          note: "三维空间中两点间的欧几里得距离公式",
        },
        {
          type: "text",
          html: `
            <p>三维距离公式是二维距离公式的自然推广——只需多加上 z 坐标差的平方。这个模式可以推广到任意维度：n 维空间中的欧几里得距离为各坐标差平方之和的平方根。</p>
          `,
        },
        {
          type: "formula",
          latex: `M = \\left( \\frac{x_1 + x_2}{2},\\ \\frac{y_1 + y_2}{2},\\ \\frac{z_1 + z_2}{2} \\right)`,
          note: "三维线段的中点坐标",
        },
        {
          type: "definition",
          title: "定义: 欧几里得距离（Euclidean Distance）",
          body: '两点 P₁(x₁, y₁, z₁) 和 P₂(x₂, y₂, z₂) 之间的<strong>欧几里得距离</strong>（也称直线距离）是连接两点的线段长度。它是空间中两点间最短路径的长度，直接应用了 n 维勾股定理。',
        },
        {
          type: "note",
          level: "tip",
          body: "<strong>计算技巧：</strong><br/><br/>在许多情况下（如碰撞检测），你只需要<strong>比较距离的大小</strong>而无需精确值。这时可以省略开平方运算，直接比较距离的平方（squared distance）：<br/><br/><em>d² = (x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²</em><br/><br/>这能显著提升性能，因为乘法比开平方快得多。许多游戏引擎的 API 都提供了 <code>distanceSquared()</code> 方法。",
        },
        {
          type: "code",
          language: "typescript",
          code: `// 高效距离比较：比较平方距离以省去 sqrt
interface Vec3 { x: number; y: number; z: number }

function distance(a: Vec3, b: Vec3): number {
  return Math.sqrt(squaredDistance(a, b))
}

function squaredDistance(a: Vec3, b: Vec3): number {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const dz = b.z - a.z
  return dx * dx + dy * dy + dz * dz
}

// 使用场景：判断两点是否在某个半径范围内
function isWithinRadius(a: Vec3, b: Vec3, radius: number): boolean {
  return squaredDistance(a, b) <= radius * radius
  //            ^^^^^^^^^^^^^^^^ 不需要 sqrt，直接比较平方值
}`,
        },
        {
          type: "text",
          html: `
            <h3>本章小结</h3>
            <p>本章介绍了笛卡尔坐标系的基础知识，涵盖了一维、二维和三维空间中的坐标表示。重点概念回顾：</p>
            <ul>
              <li>✅ 数轴上的点和坐标</li>
              <li>✅ 二维笛卡尔平面、象限、坐标表示</li>
              <li>✅ 三维笛卡尔空间、坐标平面、八象限</li>
              <li>✅ 左手坐标系与右手坐标系的区别</li>
              <li>✅ 不同游戏引擎的坐标系约定</li>
              <li>✅ 两点距离公式（2D 和 3D）</li>
              <li>✅ 中点公式</li>
              <li>✅ 平方距离的性能优化技巧</li>
            </ul>
            <p>在下一章中，我们将引入<strong>向量</strong>的概念——它是描述方向和位移的强大数学工具，也是 3D 图形编程中最常用的抽象之一。</p>
          `,
        },
        {
          type: "note",
          level: "info",
          body: "本章为全书的基础。坐标系是描述 3D 世界的语言——在今后的每一章中，我们都会反复使用坐标、距离和空间概念。如果你对某个概念还不确定，建议回顾一下前面的内容。现在你可以通过右侧面板的 3D 交互演示来直观感受这些概念。",
        },
      ],
    },
  ],
}

export default content
