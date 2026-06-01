import type { ChapterContent } from "@/components/content/types"
const content: ChapterContent = { id: "10", title: "3D图形中的数学主题", sections: [
  { title: "10.1 渲染管线概述", blocks: [
    { type: "text", html: "<p>本章将之前六章的数学基础应用到<strong>实际的 3D 图形问题</strong>中。3D 渲染管线是一个将 3D 场景转换为 2D 图像的多阶段流程：</p><ol><li><strong>应用程序阶段</strong>（CPU）：设置图元、变换矩阵、光照参数</li><li><strong>几何处理阶段</strong>（GPU 顶点着色器）：顶点变换（模型→世界→摄像机→裁剪）</li><li><strong>光栅化阶段</strong>（GPU）：三角形→片元，透视校正插值</li><li><strong>像素处理阶段</strong>（GPU 片元着色器）：纹理采样、光照计算、混合输出</li></ol>" },
    { type: "formula", latex: `\\mathbf{v}_{\\text{clip}} = \\mathbf{P} \\cdot \\mathbf{V} \\cdot \\mathbf{M} \\cdot \\mathbf{v}_{\\text{model}}`, note: "顶点着色器中的完整变换链（MVP 矩阵）。" },
  ]},
  { title: "10.2 光照模型", blocks: [
    { type: "text", html: "<p><strong>光照（Lighting）</strong>决定了场景中物体表面的颜色和明暗。三种基本光照分量：</p>" },
    { type: "definition", title: "环境光（Ambient）", body: '模拟场景中弥漫的<strong>间接光照</strong>。所有表面均匀照亮，与光源方向和观察方向无关。防止未被直接照亮的区域完全变黑。' },
    { type: "definition", title: "漫反射（Diffuse / Lambert）", body: '光线照射到粗糙表面后<strong>均匀散射</strong>。亮度仅取决于<strong>法向量 N 与光线方向 L 的夹角</strong>：漫反射 = max(N·L, 0) × 光源颜色 × 材质颜色。<br/><br/>这是最重要的光照分量，决定了物体表面的<strong>基本明暗</strong>。' },
    { type: "definition", title: "镜面反射（Specular）", body: '模拟光滑表面的<strong>高光</strong>。取决于<strong>视线方向 V 与反射光线方向 R 的夹角</strong>。常用 Blinn-Phong 模型优化：用<strong>半向量 H = normalize(L+V)</strong> 替代反射向量。<br/><br/>镜面高光 = max(N·H, 0)^shininess × 光源颜色。' },
    { type: "code", language: "typescript", code: `// Blinn-Phong 光照模型
function blinnPhong(N: Vec3, L: Vec3, V: Vec3, shininess: number): number {
  const diffuse = Math.max(0, dot(N, L))
  const H = normalize({ x: L.x+V.x, y: L.y+V.y, z: L.z+V.z })
  const specular = Math.pow(Math.max(0, dot(N, H)), shininess)
  return 0.1 + diffuse * 0.6 + specular * 0.3  // ambient + diffuse + specular
}` },
  ]},
  { title: "10.3 纹理映射", blocks: [
    { type: "text", html: `<p><strong>纹理映射（Texture Mapping）</strong>将 2D 图像"贴"到 3D 模型表面。每个顶点存储<strong>UV 坐标</strong>（纹理空间中的 2D 坐标）。光栅化时 GPU 在三角形内插值 UV 坐标，然后用它们从纹理中采样颜色。</p>` },
    { type: "note", level: "warning", body: "<strong>⚠️ 透视校正：</strong>在 3D 透视投影下，UV 坐标不能简单线性插值——远处的像素应该用更密的纹理（透视收缩）。现代 GPU 在光栅化时自动执行<strong>透视校正插值</strong>，因此通常无需手动处理。但对于 2D 精灵渲染或正交投影，线性插值反而正确。" },
  ]},
  { title: "10.4 骨骼动画", blocks: [
    { type: "text", html: "<p><strong>骨骼动画（Skeletal Animation）</strong>是游戏中最常用的角色动画技术。角色由<strong>骨骼（骨骼层次结构）</strong>和<strong>蒙皮（三角形网格）</strong>组成。每根骨骼有一个相对于父骨骼的局部变换矩阵。动画时，骨骼的局部变换随时间变化，网格顶点跟随骨骼运动。</p>" },
    { type: "definition", title: "顶点混合（Vertex Blending）", body: '每个顶点可以受<strong>多个骨骼</strong>影响（通常最多 4 个），每个骨骼有一个权重值。顶点的最终位置 = Σ (权重_i × 骨骼_i 的世界矩阵 × 顶点初始位置)。<br/><br/>所有骨骼权重之和必须为 1。这一过程在<strong>顶点着色器</strong>中完成。' },
  ]},
  { title: "10.5 可见性判断", blocks: [
    { type: "text", html: "<p>在复杂场景中渲染所有物体是极大的浪费——大多数物体在摄像机视野之外。可见性判断技术从粗略到精细：</p><ul><li><strong>视锥体剔除（Frustum Culling）</strong>：用包围体测试物体是否在视锥体的六个裁剪面内</li><li><strong>遮挡剔除（Occlusion Culling）</strong>：被前方物体完全遮挡的物体不渲染</li><li><strong>背面剔除（Back-face Culling）</strong>：法向量朝向远离摄像机的三角形不渲染（可节省约 50% 的片元处理）</li></ul>" },
  ]},
  { title: "本章小结", blocks: [
    { type: "text", html: "<ul><li>✅ 渲染管线的四个阶段</li><li>✅ Blinn-Phong 光照模型（环境+漫反射+镜面）</li><li>✅ 纹理映射与 UV 坐标</li><li>✅ 骨骼动画的顶点混合原理</li><li>✅ 视锥体剔除、遮挡剔除、背面剔除</li></ul>" },
  ]},
] }; export default content
