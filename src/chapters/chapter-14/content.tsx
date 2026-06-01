import type { ChapterContent } from "@/components/content/types"
const content: ChapterContent = { id: "14", title: "后记", sections: [
  { title: "后续学习方向", blocks: [
    { type: "text", html: "<p>恭喜你完成了这本书的学习！你现在掌握了 3D 游戏开发的全部核心数学基础。以下是进一步学习的推荐方向：</p>" },
    { type: "text", html: `<ul><li><strong>实时渲染</strong>：<em>Real-Time Rendering</em> (Akenine-Moller 等)——渲染技术的百科全书</li><li><strong>物理模拟</strong>：<em>Game Physics Engine Development</em> (Ian Millington)——深入了解碰撞检测和刚体动力学</li><li><strong>图形 API</strong>：学习 OpenGL / Vulkan / DirectX / Metal 的实践使用</li><li><strong>引擎源码</strong>：阅读 Babylon.js、Three.js 或 Godot 的源码，看数学如何在引擎中落地</li><li><strong>着色器编程</strong>：GLSL / HLSL——把数学直接写在 GPU 上</li><li><strong>几何处理</strong>：网格简化、细分曲面、程序化生成</li></ul>` },
  ]},
  { title: "附录A: 几何测试", blocks: [
    { type: "text", html: "<p>以下是常用几何测试的快速参考：</p>" },
    { type: "code", language: "typescript", code: `// 点到平面距离（有符号）
function pointToPlaneDist(p: Vec3, n: Vec3, d: number): number { return n.x*p.x + n.y*p.y + n.z*p.z - d }
// 射线与球体相交
function raySphereIntersect(o: Vec3, d: Vec3, c: Vec3, r: number): number | null { /* 解二次方程 t² + 2bt + c = 0 */ }
// AABB vs 平面（用于视锥体裁剪）
function aabbPlaneTest(box: AABB, n: Vec3, d: number): number { /* 返回 -1/0/1 表示在后面/相交/前面 */ }` },
  ]},
  { title: "附录B: 习题答案", blocks: [
    { type: "text", html: `<p>各章习题答案请参考原书附录。本书网站提供的交互演示本身也是一种"活的习题"——调整参数、旋转视角、观察变化，是最有效的学习方式。</p>` },
  ]},
  { title: "致谢", blocks: [
    { type: "text", html: "<p>感谢 Fletcher Dunn 和 Ian Parberry 编写了这本优秀的教材。感谢 Babylon.js 团队提供的强大 3D 引擎。感谢所有为这个学习网站贡献代码和反馈的开发者。</p><p style='text-align:center; padding:2rem 0;'><strong>Happy Coding! 🎮</strong></p>" },
  ]},
] }; export default content
