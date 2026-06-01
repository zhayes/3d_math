import type { ChapterContent } from "@/components/content/types"
const content: ChapterContent = { id: "12", title: "力学2: 线性与旋转动力学", sections: [
  { title: "12.1 牛顿定律", blocks: [
    { type: "text", html: "<p><strong>动力学（Dynamics）</strong>研究<strong>力</strong>如何影响物体的运动。牛顿三定律是经典力学的基石：</p>" },
    { type: "definition", title: "牛顿第一定律（惯性定律）", body: '物体在不受外力时，保持<strong>静止</strong>或<strong>匀速直线运动</strong>状态。在游戏中，这意味着物体的速度不会自己改变。' },
    { type: "definition", title: "牛顿第二定律（F = ma）", body: '物体所受的<strong>合外力 F</strong>等于其<strong>质量 m</strong>乘以<strong>加速度 a</strong>：<strong>F = ma</strong>。这是游戏物理引擎的核心方程。给定力，计算加速度 a = F/m，然后积分求速度和位置。' },
    { type: "definition", title: "牛顿第三定律（作用与反作用）", body: '两个物体之间的作用力与反作用力<strong>大小相等、方向相反</strong>。A 对 B 的力 = −(B 对 A 的力)。在碰撞检测和响应中至关重要。' },
  ]},
  { title: "12.2 动量与冲量", blocks: [
    { type: "text", html: "<p><strong>动量 P = mv</strong> 是描述物体运动状态的量。动量守恒是物理学最基本的守恒律之一。</p>" },
    { type: "definition", title: "冲量（Impulse）", body: '<strong>冲量 J = F·Δt</strong> 是力在时间上的累积效果。冲量等于动量的变化：<strong>J = ΔP = m(v_new − v_old)</strong>。<br/><br/>在游戏碰撞响应中，通常使用<strong>基于冲量的方法</strong>——直接修改碰撞瞬间的速度，而非在每一帧施加力。' },
    { type: "code", language: "typescript", code: `// 弹性碰撞响应（一维简化）
function collisionResponse(m1: number, v1: number, m2: number, v2: number, e: number) {
  const v1New = (m1*v1 + m2*v2 + m2*e*(v2 - v1)) / (m1 + m2)
  const v2New = (m1*v1 + m2*v2 + m1*e*(v1 - v2)) / (m1 + m2)
  return [v1New, v2New]  // e = 恢复系数 (1 = 完全弹性, 0 = 完全非弹性)
}` },
  ]},
  { title: "12.3 旋转动力学", blocks: [
    { type: "text", html: "<p>旋转动力学是线性动力学的<strong>旋转版本</strong>，每个概念都有对应：</p>" },
    { type: "text", html: `<table style="width:100%; border-collapse: collapse; margin: 1em 0; font-size: 0.92em;">
      <tr style="background: #f3f4f6;"><th style="padding: 6px 10px; border: 1px solid #ddd;">线性量</th><th style="padding: 6px 10px; border: 1px solid #ddd;">旋转量</th><th style="padding: 6px 10px; border: 1px solid #ddd;">关系</th></tr>
      <tr><td style="padding: 6px 10px; border: 1px solid #ddd;">质量 m</td><td style="padding: 6px 10px; border: 1px solid #ddd;">转动惯量 I</td><td style="padding: 6px 10px; border: 1px solid #ddd;">I = Σ mr²</td></tr>
      <tr style="background: #f9fafb;"><td style="padding: 6px 10px; border: 1px solid #ddd;">力 F</td><td style="padding: 6px 10px; border: 1px solid #ddd;">力矩 τ = r × F</td><td style="padding: 6px 10px; border: 1px solid #ddd;">τ = Iα</td></tr>
      <tr><td style="padding: 6px 10px; border: 1px solid #ddd;">速度 v</td><td style="padding: 6px 10px; border: 1px solid #ddd;">角速度 ω</td><td style="padding: 6px 10px; border: 1px solid #ddd;">v = ω × r</td></tr>
      <tr style="background: #f9fafb;"><td style="padding: 6px 10px; border: 1px solid #ddd;">动量 P = mv</td><td style="padding: 6px 10px; border: 1px solid #ddd;">角动量 L = Iω</td><td style="padding: 6px 10px; border: 1px solid #ddd;">守恒</td></tr>
    </table>` },
  ]},
  { title: "12.4 刚体模拟", blocks: [
    { type: "text", html: "<p><strong>刚体（Rigid Body）</strong>是不会变形的物体。在游戏物理中，刚体有两个状态向量：<strong>线速度 v</strong> 和<strong>角速度 ω</strong>。每帧更新：</p><ul><li>位置 += v·Δt</li><li>朝向（由四元数表示）按角速度 ω 旋转</li></ul><p>现代游戏引擎（PhysX、Havok、Bullet）已经实现了完整的刚体动力学，开发者通常只需配置参数。</p>" },
  ]},
  { title: "本章小结", blocks: [
    { type: "text", html: "<ul><li>✅ 牛顿三定律及其在游戏中的应用</li><li>✅ 动量与冲量——碰撞响应的数学基础</li><li>✅ 旋转动力学与线性动力学的对应关系</li><li>✅ 刚体模拟的基本原理</li></ul>" },
  ]},
] }; export default content