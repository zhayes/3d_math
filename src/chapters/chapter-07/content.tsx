import type { ChapterContent } from "@/components/content/types"

const content: ChapterContent = {
  id: "7",
  title: "极坐标系统",
  sections: [
    {
      title: "7.1 2D 极坐标",
      blocks: [
        {
          type: "text",
          html: `
            <p>到目前为止，我们全部使用<strong>笛卡尔坐标</strong> (x, y, z) 来描述空间中的位置。但这不是唯一的方式。<strong>极坐标（Polar Coordinates）</strong>使用<strong>距离和角度</strong>来描述位置，在某些场景下更加直观和方便。</p>
          `,
        },
        {
          type: "definition",
          title: "定义: 2D 极坐标",
          body: '在 2D 极坐标中，一个点由两个值描述：<br/><br/><strong>r（半径 radial distance）</strong>：点到原点的距离，r ≥ 0。<br/><strong>θ（方位角 angular coordinate）</strong>：从正 x 轴逆时针旋转到该点的角度。通常以<strong>弧度</strong>表示，范围 [0, 2π) 或 (−π, π]。<br/><br/>记作 (r, θ) 或 r∠θ。',
        },
        {
          type: "formula",
          latex: `x = r \\cos\\theta \\qquad y = r \\sin\\theta`,
          note: "极坐标 → 笛卡尔坐标。",
        },
        {
          type: "formula",
          latex: `r = \\sqrt{x^2 + y^2} \\qquad \\theta = \\operatorname{atan2}(y, x)`,
          note: "笛卡尔坐标 → 极坐标。注意使用 atan2 而非 atan，以正确处理象限。",
        },
        {
          type: "illustration",
          caption: "图 7.1 — 2D 极坐标：r 是到原点的距离，θ 是从 +x 轴的角度",
          width: 450,
          height: 330,
          svg: `<svg viewBox="0 0 450 330" xmlns="http://www.w3.org/2000/svg"><defs><marker id="p1" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#e35947"/></marker></defs><rect width="450" height="330" fill="#faf8f5" rx="8"/><g stroke="#e8e4de" stroke-width="0.5"><line x1="40" y1="165" x2="410" y2="165"/><line x1="40" y1="55" x2="410" y2="55"/><line x1="40" y1="275" x2="410" y2="275"/><line x1="110" y1="30" x2="110" y2="300"/><line x1="225" y1="30" x2="225" y2="300"/><line x1="340" y1="30" x2="340" y2="300"/></g><line x1="40" y1="165" x2="410" y2="165" stroke="#e35947" stroke-width="2" marker-end="url(#p1)"/><line x1="225" y1="310" x2="225" y2="20" stroke="#2e9978" stroke-width="2"/><text x="400" y="160" fill="#e35947" font-size="14" font-weight="700">x</text><text x="235" y="30" fill="#2e9978" font-size="14" font-weight="700">y</text><circle cx="225" cy="165" r="3" fill="#555"/><!-- Point at (r=120, theta=50deg) --><circle cx="302" cy="73" r="5" fill="#387ad9"/><line x1="225" y1="165" x2="302" y2="73" stroke="#387ad9" stroke-width="2.5"/><text x="265" y="108" fill="#1d4ed8" font-size="13" font-weight="700">r</text><!-- Angle arc --><path d="M 285 165 A 60 60 0 0 0 269 119" fill="none" stroke="#888" stroke-width="1.3"/><text x="285" y="148" fill="#666" font-size="12">θ</text><text x="312" y="68" fill="#1d4ed8" font-size="12" font-weight="600">P (r, θ)</text><text x="240" y="280" fill="#666" font-size="11">r = sqrt(x^2 + y^2)</text><text x="240" y="298" fill="#666" font-size="11">θ = atan2(y, x)</text></svg>`,
        },
        {
          type: "code",
          language: "typescript",
          code: `// 2D 坐标转换
interface Polar2D { r: number; theta: number }
interface Cartesian2D { x: number; y: number }

function toPolar(p: Cartesian2D): Polar2D {
  return {
    r: Math.sqrt(p.x * p.x + p.y * p.y),
    theta: Math.atan2(p.y, p.x),
  }
}

function toCartesian(p: Polar2D): Cartesian2D {
  return {
    x: p.r * Math.cos(p.theta),
    y: p.r * Math.sin(p.theta),
  }
}`,
        },
      ],
    },
    {
      title: "7.2 为什么使用极坐标？",
      blocks: [
        {
          type: "text",
          html: `
            <p>极坐标在某些场景下比笛卡尔坐标<strong>更自然</strong>：</p>
            <ul>
              <li><strong>圆周运动</strong>：描述"在半径为 5 的圆上以每秒 2 弧度旋转"——极坐标只需要 θ += 2·dt。笛卡尔坐标需要 x = 5cos(ωt), y = 5sin(ωt)。</li>
              <li><strong>瞄准和朝向</strong>：炮塔"朝向 45° 方向"——直接用极坐标的 θ 表示。</li>
              <li><strong>径向对称</strong>：爆炸的冲击波从中心向外扩散——极坐标只改 r，θ 任意。</li>
              <li><strong>曲线表示</strong>：玫瑰线 r = cos(3θ)、心形线 r = 1+cos(θ) 等美轮美奂的曲线在极坐标下只需一行公式。</li>
            </ul>
          `,
        },
        {
          type: "note",
          level: "tip",
          body: "<strong>实践建议：</strong>在游戏开发中，<strong>内部存储通常使用笛卡尔坐标</strong>（方便与引擎交互），但在需要时<strong>即时转换</strong>为极坐标来处理角度相关的逻辑。不要全程使用极坐标——大多数引擎 API（碰撞检测、渲染）基于笛卡尔坐标系。",
        },
      ],
    },
    {
      title: "7.3 3D 球面坐标",
      blocks: [
        {
          type: "text",
          html: `
            <p>将 2D 极坐标推广到 3D，得到<strong>球面坐标（Spherical Coordinates）</strong>。一个点由两个角度和一个距离来描述，就像地球上的经纬度 + 海拔。</p>
          `,
        },
        {
          type: "definition",
          title: "定义: 3D 球面坐标",
          body: '在球面坐标中，点的位置由三个值描述：<br/><br/><strong>r（径向距离）</strong>：点到原点的距离。<br/><strong>θ（方位角 azimuth / heading）</strong>：在 xz 平面上从 +x 轴旋转的角度（类似 2D 极坐标的 θ）。<br/><strong>φ（极角 polar / pitch / inclination）</strong>：从 +y 轴向下的角度。<br/><br/>注意：不同领域对 θ 和 φ 的命名和测量方式<strong>不同</strong>！本书采用游戏开发中常见的约定（y 轴朝上）。',
        },
        {
          type: "formula",
          latex: `x = r \\sin\\phi \\cos\\theta \\qquad y = r \\cos\\phi \\qquad z = r \\sin\\phi \\sin\\theta`,
          note: "球面坐标 → 笛卡尔坐标（本书约定：y 轴朝上，φ 从 +y 轴测量）。",
        },
        {
          type: 'derivation',
          title: '推导：球面坐标转换公式',
          intro: '从 2D 极坐标推广到 3D 球面坐标——分两步投影来理解。',
          steps: [
            { latex: 'r_{xz} = r \\sin\\phi', note: '第一步：将径向距离 r 投影到 xz 水平面上。投影长度 = r·sinφ（φ 是从 y 轴测量的角度）。', insight: '想象从正上方俯视：球面上一点在 xz 平面的"影子"距离原点多远？——这就是 r·sinφ。' },
            { latex: 'x = r_{xz} \\cos\\theta = r \\sin\\phi \\cos\\theta', note: '第二步：将 xz 平面上的投影 r_xz 分解为 x 和 z 分量——这正是 2D 极坐标的分解方式。', insight: '球面坐标 = "先投影到水平面" + "在水平面上用 2D 极坐标分解"。两步结合就得到完整的 3D 坐标。' },
            { latex: 'z = r_{xz} \\sin\\theta = r \\sin\\phi \\sin\\theta', note: 'z 分量同理：r_xz 在 z 轴上的投影 = r_xz·sinθ。', insight: '注意：θ 是从 +x 轴测量的，所以 cosθ 对应 x，sinθ 对应 z——与 2D 极坐标一致。' },
            { latex: 'y = r \\cos\\phi', note: 'y 分量最简单：直接从 φ 角计算。当 φ=0 时，点在正上方 y=r；φ=π/2 时在水平面 y=0。', insight: '注意 φ 的约定差异——本书从 +y 轴测量 φ。数学书通常从 +z 轴测量，那时 y = r·sinφ，z = r·cosφ。公式不同但原理相同。' },
          ],
        },
        {
          type: "formula",
          latex: `r = \\sqrt{x^2 + y^2 + z^2} \\qquad \\theta = \\operatorname{atan2}(z, x) \\qquad \\phi = \\arccos\\left(\\frac{y}{r}\\right)`,
          note: "笛卡尔坐标 → 球面坐标。",
        },
        {
          type: "text",
          html: `
            <p><strong>球面坐标在游戏开发中的典型应用：</strong></p>
            <ul>
              <li><strong>第三人称摄像机</strong>：摄像机围绕角色旋转——用球面坐标描述摄像机位置（r=距离，θ=水平旋转，φ=俯仰）非常直观。</li>
              <li><strong>天空球/环境贴图</strong>：用球面坐标采样全景纹理。</li>
              <li><strong>生成球面上的点</strong>：粒子效果、星球表面装饰等。</li>
            </ul>
          `,
        },
        {
          type: "note",
          level: "warning",
          body: "<strong>⚠️ 注意约定差异：</strong>数学书上常见的球面坐标把 θ 当作极角（从 +z 轴测量），φ 当作方位角。<strong>游戏开发和物理学</strong>中通常反过来（如本书）。阅读不同来源的材料时，务必先确认他们的 θ 和 φ 各代表什么！",
        },
        {
          type: "code",
          language: "typescript",
          code: `// 球面坐标 (y-up convention) 转换
interface Spherical { r: number; theta: number; phi: number }
interface Vec3 { x: number; y: number; z: number }

function sphericalToCartesian(s: Spherical): Vec3 {
  return {
    x: s.r * Math.sin(s.phi) * Math.cos(s.theta),
    y: s.r * Math.cos(s.phi),
    z: s.r * Math.sin(s.phi) * Math.sin(s.theta),
  }
}

function cartesianToSpherical(v: Vec3): Spherical {
  const r = Math.sqrt(v.x**2 + v.y**2 + v.z**2)
  return {
    r,
    theta: Math.atan2(v.z, v.x),
    phi: Math.acos(v.y / r),
  }
}`,
        },
      ],
    },
    {
      title: "7.4 3D 柱面坐标",
      blocks: [
        {
          type: "text",
          html: `
            <p><strong>柱面坐标（Cylindrical Coordinates）</strong>是 2D 极坐标 + 一个高度轴的组合。它把 3D 空间描述为"在某个高度上、在 xy 平面的极坐标位置"。</p>
          `,
        },
        {
          type: "definition",
          title: "定义: 3D 柱面坐标",
          body: '由三个值描述：<br/><br/><strong>r（径向距离）</strong>：在 xz 平面上到 y 轴的距离。<br/><strong>θ（方位角）</strong>：在 xz 平面上从 +x 轴的角度。<br/><strong>y（高度）</strong>：沿 y 轴的高度（与笛卡尔坐标的 y 相同）。',
        },
        {
          type: "formula",
          latex: `x = r \\cos\\theta \\qquad y = y \\qquad z = r \\sin\\theta`,
          note: "柱面坐标 → 笛卡尔坐标。y 分量不变。",
        },
        {
          type: "text",
          html: `
            <p><strong>适用场景：</strong>柱面坐标在以下情况特别方便：</p>
            <ul>
              <li><strong>螺旋运动</strong>：物体在水平面上做圆周运动、同时上升（如螺旋楼梯、DNA 双螺旋）。</li>
              <li><strong>圆柱形关卡设计</strong>：如围绕塔楼旋转的楼梯、旋转迷宫。</li>
              <li><strong>粒子系统</strong>：龙卷风、漩涡等旋转 + 上升的效果。</li>
            </ul>
          `,
        },
      ],
    },
    {
      title: "7.5 坐标系对比与选择",
      blocks: [
        {
          type: "text",
          html: `
            <p>三种 3D 坐标系统各有优势，选择哪个取决于手头的问题：</p>
          `,
        },
        {
          type: "text",
          html: `
            <table style="width:100%; border-collapse: collapse; margin: 1em 0; font-size: 0.92em;">
              <tr style="background: #f3f4f6;">
                <th style="padding: 8px 12px; border: 1px solid #ddd;">坐标系</th>
                <th style="padding: 8px 12px; border: 1px solid #ddd;">参数</th>
                <th style="padding: 8px 12px; border: 1px solid #ddd;">最适合</th>
                <th style="padding: 8px 12px; border: 1px solid #ddd;">不适合</th>
              </tr>
              <tr>
                <td style="padding: 6px 12px; border: 1px solid #ddd;"><strong>笛卡尔</strong></td>
                <td style="padding: 6px 12px; border: 1px solid #ddd;">(x, y, z)</td>
                <td style="padding: 6px 12px; border: 1px solid #ddd;">通用、渲染、物理</td>
                <td style="padding: 6px 12px; border: 1px solid #ddd;">圆周/旋转描述</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 6px 12px; border: 1px solid #ddd;"><strong>球面</strong></td>
                <td style="padding: 6px 12px; border: 1px solid #ddd;">(r, θ, φ)</td>
                <td style="padding: 6px 12px; border: 1px solid #ddd;">摄像机环绕、天空球</td>
                <td style="padding: 6px 12px; border: 1px solid #ddd;">直线运动</td>
              </tr>
              <tr>
                <td style="padding: 6px 12px; border: 1px solid #ddd;"><strong>柱面</strong></td>
                <td style="padding: 6px 12px; border: 1px solid #ddd;">(r, θ, y)</td>
                <td style="padding: 6px 12px; border: 1px solid #ddd;">螺旋、圆柱关卡</td>
                <td style="padding: 6px 12px; border: 1px solid #ddd;">全方向运动</td>
              </tr>
            </table>
          `,
        },
        {
          type: "note",
          level: "info",
          body: "<strong>核心原则：</strong>内部存储统一使用笛卡尔坐标（方便与引擎交互），在逻辑层面需要时<strong>即时转换</strong>为极坐标/球面坐标处理角度/距离相关的计算，完成后<strong>立即转回笛卡尔坐标</strong>。这避免了浮点精度在角度上累积的问题。",
        },
        {
          type: "text",
          html: `
            <h3>本章小结</h3>
            <p>本章介绍了笛卡尔坐标的替代方案——极坐标系统：</p>
            <ul>
              <li>✅ 2D 极坐标 (r, θ) 及其与笛卡尔坐标的转换</li>
              <li>✅ 极坐标的使用场景（圆周运动、朝向、径向对称）</li>
              <li>✅ 3D 球面坐标 (r, θ, φ) — 摄像机环绕、天空球</li>
              <li>✅ 3D 柱面坐标 (r, θ, y) — 螺旋运动、圆柱关卡</li>
              <li>✅ 三种坐标系的选择原则</li>
            </ul>
            <p>下一章将讨论一个更复杂的主题——<strong>三维旋转</strong>的多种表示方法。</p>
          `,
        },
      ],
    },
  ],
}

export default content