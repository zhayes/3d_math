import type { ChapterContent } from "@/components/content/types"
const content: ChapterContent = { id: "11", title: "力学1: 线性运动学与微积分", sections: [
  { title: "11.1 运动学基础", blocks: [
    { type: "text", html: "<p><strong>运动学（Kinematics）</strong>研究物体的<strong>运动</strong>——位置、速度、加速度——而不考虑引起运动的<strong>力</strong>（那是动力学的范畴）。这是游戏物理模拟的数学基础。</p>" },
    { type: "definition", title: "位置、速度、加速度", body: '<strong>位置 p(t)</strong>：物体在时间 t 的 3D 坐标。<br/><strong>速度 v(t) = dp/dt</strong>：位置对时间的导数（变化率）。<br/><strong>加速度 a(t) = dv/dt = d²p/dt²</strong>：速度对时间的导数。<br/><br/>在游戏中，我们用<strong>离散时间步长 Δt</strong> 来近似连续的运动：<strong>p_{new} = p + v·Δt, v_{new} = v + a·Δt</strong>。' },
    { type: "formula", latex: `\\mathbf{p}(t) = \\mathbf{p}_0 + \\mathbf{v}_0 t + \\frac{1}{2}\\mathbf{a} t^2`, note: "匀加速运动的位移公式。当 a=0 时为匀速直线运动。" },
  ]},
  { title: "11.2 导数与积分", blocks: [
    { type: "text", html: "<p>微积分的两个核心操作在物理中反复出现：</p><ul><li><strong>微分（求导）</strong>：从位置 → 速度 → 加速度。告诉我们在某一瞬间的变化率。</li><li><strong>积分（求面积）</strong>：从加速度 → 速度 → 位置。累加变化得到新状态。</li></ul><p>游戏中的物理引擎本质上就是在每一帧执行<strong>数值积分</strong>（如欧拉积分、RK4 等）。</p>" },
    { type: "code", language: "typescript", code: `// 显式欧拉积分（最简单的数值积分）
function eulerStep(p: Vec3, v: Vec3, a: Vec3, dt: number): [Vec3, Vec3] {
  const newP = { x: p.x+v.x*dt, y: p.y+v.y*dt, z: p.z+v.z*dt }
  const newV = { x: v.x+a.x*dt, y: v.y+a.y*dt, z: v.z+a.z*dt }
  return [newP, newV]
}` },
  ]},
  { title: "11.3 匀速与匀加速运动", blocks: [
    { type: "text", html: "<p><strong>匀速运动</strong>（a = 0）：物体以恒定速度直线运动。p(t) = p₀ + v t。<strong>匀加速运动</strong>（a 恒定）：物体以恒定加速度运动——如自由落体、抛物线弹道。</p>" },
    { type: "formula", latex: `\\mathbf{v}(t) = \\mathbf{v}_0 + \\mathbf{a} t`, note: "匀加速运动的速度随时间线性变化。" },
  ]},
  { title: "11.4 圆周运动", blocks: [
    { type: "text", html: "<p>物体在圆周上运动时，虽然速率可能恒定，但<strong>方向不断变化</strong>——因此<strong>速度不是恒定的</strong>，存在向心加速度。</p>" },
    { type: "formula", latex: `a_c = \\frac{v^2}{r} = \\omega^2 r`, note: "向心加速度：指向圆心，大小 = v²/r = ω²r。" },
    { type: "text", html: "<p>在极坐标中，圆周运动简化为：r 固定，θ(t) = ω t（ω 为角速度）。这是极坐标优于笛卡尔坐标的典型场景。</p>" },
  ]},
  { title: "本章小结", blocks: [
    { type: "text", html: "<ul><li>✅ 位置、速度、加速度的关系</li><li>✅ 微分与积分在运动学中的应用</li><li>✅ 数值积分（欧拉方法）</li><li>✅ 匀速、匀加速和圆周运动的数学描述</li></ul>" },
  ]},
] }; export default content