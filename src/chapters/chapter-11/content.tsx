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
  { title: "11.3 数值积分方法对比", blocks: [
    { type: "text", html: `<p>物理引擎每帧需要从加速度更新速度和位置（<strong>数值积分</strong>）。不同方法在精度、稳定性和计算量之间权衡：</p>` },
    { type: "definition", title: "显式欧拉（Forward Euler）", body: '<strong>最简单但不稳定。v += a·Δt, p += v·Δt。</strong><br/><br/>问题：能量会"漂移"——弹簧振荡振幅逐渐增大，轨道运动半径逐渐膨胀。原因是它用<strong>当前速度</strong>更新位置，但速度在整个 Δt 内实际在变化。' },
    { type: "definition", title: "半隐式欧拉（Symplectic Euler）", body: '<strong>v += a·Δt, p += v_new·Δt</strong> —— 先更新速度，再用<strong>新速度</strong>更新位置。<br/><br/>比显式欧拉稳定得多，能量近似守恒。是大多数简单物理引擎的默认选择。额外成本几乎为零（只是变量使用顺序不同）。' },
    { type: "definition", title: "Verlet 积分", body: '<strong>p_next = 2p - p_prev + a·Δt²</strong> —— 不需要显式存储速度。<br/><br/>优势：速度隐式包含在前后位置差中，约束（如距离约束、碰撞）处理极为方便。布料、绳索、分子动力学模拟首选。' },
    { type: "definition", title: "RK4（四阶龙格-库塔）", body: '每步计算<strong>4 次</strong>加速度（在 t, t+Δt/2, t+Δt 各算一次），取加权平均。<br/><br/>精度最高，但计算量是欧拉的 4 倍。用于需要高精度的场景（如太空轨道模拟），游戏中<strong>极少使用</strong>。' },
    { type: "code", language: "typescript", code: `// 四种积分方法的对比
// 显式欧拉 (危险——能量漂移)
function euler(p: Vec3, v: Vec3, a: Vec3, dt: number) {
  p.x+=v.x*dt; p.y+=v.y*dt; p.z+=v.z*dt  // 用旧速度
  v.x+=a.x*dt; v.y+=a.y*dt; v.z+=a.z*dt
}
// 半隐式欧拉 (推荐——游戏物理默认)
function semiEuler(p: Vec3, v: Vec3, a: Vec3, dt: number) {
  v.x+=a.x*dt; v.y+=a.y*dt; v.z+=a.z*dt  // 先更新速度
  p.x+=v.x*dt; p.y+=v.y*dt; p.z+=v.z*dt  // 用新速度
}
// Verlet (约束友好)
function verlet(p: Vec3, prev: Vec3, a: Vec3, dt: number): Vec3 {
  return { x: 2*p.x-prev.x+a.x*dt*dt, y: 2*p.y-prev.y+a.y*dt*dt, z: 2*p.z-prev.z+a.z*dt*dt }
}` },
    { type: "note", level: "tip", body: `<strong>选择指南：</strong>普通运动→半隐式欧拉。弹簧/约束→Verlet。高精度轨道→RK4。不要用显式欧拉——它和半隐式欧拉成本相同但稳定性差得多，唯一的"优势"是它被写进了更多教科书。` },
  ]},
  { title: "11.4 角速度", blocks: [
    { type: "text", html: `<p>旋转运动的"速度"不能用标量描述——需要知道<strong>绕哪个轴旋转、多快</strong>。<strong>角速度 ω</strong>是一个向量：方向 = 旋转轴（右手定则），长度 = 角速率（弧度/秒）。</p>` },
    { type: "formula", latex: `\\mathbf{v} = \\boldsymbol{\\omega} \\times \\mathbf{r}`, note: "切向速度 = 角速度向量 × 位置向量。方向：右手定则，大小：v = ω·r·sinθ。" },
  ]},
  { title: "11.5 匀速与匀加速运动", blocks: [
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
