import type { ChapterContent } from "@/components/content/types"
const content: ChapterContent = { id: "13", title: "3D曲线", sections: [
  { title: "13.1 参数多项式曲线", blocks: [
    { type: "text", html: "<p><strong>曲线（Curve）</strong>在游戏开发中无处不在——摄像机路径、动画曲线、贝塞尔曲线、样条插值。参数曲线用参数 t（通常 0 ≤ t ≤ 1）来描述点沿曲线的运动：<strong>P(t) = (x(t), y(t), z(t))</strong>。</p>" },
    { type: "formula", latex: `\\mathbf{P}(t) = \\sum_{i=0}^{n} \\mathbf{c}_i t^i`, note: "n 次多项式曲线。c_i 是控制系数（向量）。" },
  ]},
  { title: "13.2 三次 Hermite 曲线", blocks: [
    { type: "text", html: "<p>Hermite 曲线由<strong>两个端点</strong>和<strong>两个端点的切线（速度）</strong>定义。非常适合做关键帧插值——位置和速度都连续。</p>" },
    { type: "formula", latex: `\\mathbf{P}(t) = (2t^3-3t^2+1)\\mathbf{P}_0 + (t^3-2t^2+t)\\mathbf{T}_0 + (-2t^3+3t^2)\\mathbf{P}_1 + (t^3-t^2)\\mathbf{T}_1`, note: "三次 Hermite 曲线。P₀, P₁=端点，T₀, T₁=端点切线。" },
  ]},
  { title: "13.3 贝塞尔曲线", blocks: [
    { type: "text", html: "<p><strong>贝塞尔曲线（Bezier Curve）</strong>由一组<strong>控制点</strong>定义，是最常用的曲线类型。n 次贝塞尔曲线有 n+1 个控制点。</p>" },
    { type: "definition", title: "二次贝塞尔（3 个控制点）", body: '<strong>P(t) = (1−t)²P₀ + 2(1−t)t P₁ + t²P₂</strong>。曲线经过 P₀ 和 P₂，P₁ 影响弯曲程度但曲线不经过它。' },
    { type: "definition", title: "三次贝塞尔（4 个控制点）", body: '<strong>P(t) = (1−t)³P₀ + 3(1−t)²t P₁ + 3(1−t)t² P₂ + t³P₃</strong>。最常用的贝塞尔曲线——Photoshop 的钢笔工具、CSS 动画的 cubic-bezier、TrueType 字体都用它。' },
    { type: "code", language: "typescript", code: `// De Casteljau 算法（贝塞尔曲线求值）
function bezier(t: number, points: Vec3[]): Vec3 {
  let pts = [...points]
  while (pts.length > 1) {
    const next: Vec3[] = []
    for (let i = 0; i < pts.length - 1; i++)
      next.push({ x: (1-t)*pts[i].x + t*pts[i+1].x, y: (1-t)*pts[i].y + t*pts[i+1].y, z: (1-t)*pts[i].z + t*pts[i+1].z })
    pts = next
  }
  return pts[0]
}` },
  ]},
  { title: "13.4 样条与连续性", blocks: [
    { type: "text", html: "<p>单一曲线段的能力有限。要描述复杂的形状，需要<strong>拼接多段曲线</strong>。曲线的拼接点处需要考虑<strong>连续性（Continuity）</strong>：</p>" },
    { type: "definition", title: "C0（位置连续）", body: '两段曲线在拼接点处<strong>位置相同</strong>。曲线不断开，但可能出现急弯。' },
    { type: "definition", title: "C1（切线连续）", body: '位置连续 + <strong>一阶导数相同</strong>。速度平滑过渡，视觉上更流畅。Hermite 曲线天然支持 C1。' },
    { type: "definition", title: "C2（曲率连续）", body: 'C1 + <strong>二阶导数相同</strong>。加速度也连续。常用于需要非常平滑运动的场景（如摄像机路径）。' },
  ]},
  { title: "本章小结", blocks: [
    { type: "text", html: "<ul><li>✅ 参数多项式曲线的通用形式</li><li>✅ Hermite 曲线——通过端点和切线定义</li><li>✅ 贝塞尔曲线——通过控制点定义（De Casteljau 算法）</li><li>✅ C0/C1/C2 连续性的区别和应用</li></ul>" },
  ]},
] }; export default content