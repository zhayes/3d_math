import type { ChapterContent } from '@/components/content/types'

const content: ChapterContent = {
  id: '5',
  title: '矩阵与线性变换',
  sections: [
    {
      title: '5.1 旋转矩阵',
      blocks: [
        {
          type: 'text',
          html: `
            <p>旋转是 3D 图形学中最常见的变换之一——角色转身、摄像机环绕目标、车轮转动……所有这些都由<strong>旋转矩阵（Rotation Matrix）</strong>来实现。</p>
            <p>旋转是一种<strong>线性变换</strong>。它有两个关键性质：</p>
            <ul>
              <li><strong>保持长度不变</strong>：旋转后的向量长度与旋转前完全相同</li>
              <li><strong>保持角度不变</strong>：两个向量之间的夹角在旋转后不变</li>
            </ul>
            <p>先看简单的 2D 旋转，再推广到 3D。</p>
          `,
        },
        {
          type: 'definition',
          title: '定义: 2D 绕原点旋转',
          body: '在二维平面中，将点 <em>P</em> 绕原点 <strong>逆时针</strong>旋转 <em>θ</em> 角度后，其新坐标 (x\', y\') 由以下公式给出：<br/><br/><strong>x\' = x cosθ − y sinθ</strong><br/><strong>y\' = x sinθ + y cosθ</strong><br/><br/>写成矩阵形式：<strong>P\' = R(θ) P</strong>',
        },
        {
          type: 'formula',
          latex: `\\mathbf{R}(\\theta) = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}`,
          note: '2D 旋转矩阵（逆时针旋转 θ 角）。第1列=(cosθ, sinθ) = 旋转后的 x 轴；第2列=(-sinθ, cosθ) = 旋转后的 y 轴。',
        },
        {
          type: 'derivation',
          title: '推导：2D 旋转矩阵是如何得出的',
          intro: '核心思想：用极坐标表示原始点，旋转只需在角度上加 θ，然后用三角恒等式展开。',
          steps: [
            { latex: 'x = r\\cos\\alpha, \\quad y = r\\sin\\alpha', note: '将原始点 (x,y) 表示为极坐标形式。r 是点到原点的距离，α 是当前角度。', insight: '任何点都可以用距离和角度表示——这是极坐标（第7章）的核心思想。旋转只改变角度，不改变距离。', diagram: '<svg viewBox="0 0 260 180" width="260" height="180" xmlns="http://www.w3.org/2000/svg"><rect width="260" height="180" fill="#faf8f5" rx="4"/><line x1="40" y1="120" x2="220" y2="120" stroke="#e8e4de" stroke-width="1"/><line x1="80" y1="30" x2="80" y2="160" stroke="#e8e4de" stroke-width="1"/><circle cx="80" cy="120" r="3" fill="#555"/><text x="72" y="112" fill="#555" font-size="10">O</text><line x1="80" y1="120" x2="160" y2="60" stroke="#e35947" stroke-width="2.5"/><text x="125" y="85" fill="#c53030" font-size="11" font-weight="600">r</text><path d="M 110 120 A 30 30 0 0 0 105 95" fill="none" stroke="#888" stroke-width="1"/><text x="115" y="105" fill="#666" font-size="9">α</text><circle cx="160" cy="60" r="4" fill="#387ad9"/><text x="168" y="55" fill="#1d4ed8" font-size="11" font-weight="600">(x,y)</text><text x="140" y="150" fill="#666" font-size="10">极坐标: (r, α) = 笛卡尔: (x,y)</text></svg>' },
            { latex: 'x\' = r\\cos(\\alpha + \\theta), \\quad y\' = r\\sin(\\alpha + \\theta)', note: '旋转 θ 角度后，新角度 = α+θ，距离 r 不变。', insight: '旋转的本质：极角增加 θ，半径不变。这就是为什么旋转矩阵的行列式为 1——面积（r²）不变。', diagram: '<svg viewBox="0 0 260 180" width="260" height="180" xmlns="http://www.w3.org/2000/svg"><rect width="260" height="180" fill="#faf8f5" rx="4"/><line x1="40" y1="120" x2="220" y2="120" stroke="#e8e4de" stroke-width="1"/><circle cx="80" cy="120" r="3" fill="#555"/><text x="72" y="112" fill="#555" font-size="10">O</text><line x1="80" y1="120" x2="160" y2="60" stroke="#e35947" stroke-width="1.5" stroke-dasharray="5,3" opacity="0.5"/><line x1="80" y1="120" x2="115" y2="40" stroke="#387ad9" stroke-width="2.5"/><text x="90" y="68" fill="#1d4ed8" font-size="11" font-weight="600">r</text><path d="M 100 120 A 20 20 0 0 0 91 95" fill="none" stroke="#f59e0b" stroke-width="1.5"/><text x="105" y="100" fill="#b45309" font-size="10" font-weight="600">θ</text><path d="M 110 120 A 40 40 0 0 0 107 75" fill="none" stroke="#888" stroke-width="0.8" stroke-dasharray="4,2"/><text x="118" y="92" fill="#666" font-size="8">α+θ</text><circle cx="115" cy="40" r="4" fill="#387ad9"/><text x="123" y="35" fill="#1d4ed8" font-size="11" font-weight="600">(x\',y\')</text></svg>' },
            { latex: 'x\' = r(\\cos\\alpha\\cos\\theta - \\sin\\alpha\\sin\\theta)', note: '展开 cos(α+θ)，使用三角恒等式 cos(A+B) = cosA·cosB − sinA·sinB。', insight: '三角恒等式是旋转矩阵的"幕后英雄"。计算机不需要"知道"三角恒等式——它直接算矩阵乘法即可。' },
            { latex: 'x\' = x\\cos\\theta - y\\sin\\theta', note: '代入 x = r·cosα 和 y = r·sinα，得到 x\' 的最终公式。', insight: '将极坐标变量消去——最终公式只用笛卡尔坐标计算，不需要显式求 r 和 α。这是矩阵之所以高效的关键。' },
            { latex: 'y\' = r(\\sin\\alpha\\cos\\theta + \\cos\\alpha\\sin\\theta) = x\\sin\\theta + y\\cos\\theta', note: '同样展开 sin(α+θ) = sinα·cosθ + cosα·sinθ，代入后得到 y\' 的公式。', insight: 'sin 和 cos 互换了位置——这正体现了旋转 90° 的对称性：sin(θ+90°) = cosθ。' },
            { latex: '\\begin{bmatrix} x\' \\\\ y\' \\end{bmatrix} = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix}', note: '将 x\' 和 y\' 的公式写成矩阵形式，就得到了 2D 旋转矩阵。', insight: '矩阵的每一列 = 基向量旋转后的坐标。第一列是 (1,0) 旋转 θ 的结果，第二列是 (0,1) 旋转 θ 的结果。验证：(1,0) 旋转后 = (cosθ, sinθ) = 第1列。' },
          ],
        },
        {
          type: 'text',
          html: `
            <p>从矩阵列的角度理解 2D 旋转：</p>
            <ul>
              <li><strong>第1列 (cosθ, sinθ)</strong>：原来的 x 轴基向量 (1, 0) 旋转 θ 后变为 (cosθ, sinθ)。这是旋转后物体"右边"的方向。</li>
              <li><strong>第2列 (-sinθ, cosθ)</strong>：原来的 y 轴基向量 (0, 1) 旋转 θ 后变为 (-sinθ, cosθ)。这是旋转后物体"上方"的方向。</li>
            </ul>
            <p>顺时针旋转 θ 等价于逆时针旋转 −θ，即 cos(−θ)=cosθ, sin(−θ)=−sinθ，所以顺时针旋转矩阵就是逆时针矩阵的转置。</p>
          `,
        },
        {
          type: 'code',
          language: 'typescript',
          code: `// 2D 旋转（逆时针）
function rotate2D(x: number, y: number, theta: number): [number, number] {
  const cos = Math.cos(theta)
  const sin = Math.sin(theta)
  return [
    x * cos - y * sin,  // x'
    x * sin + y * cos,  // y'
  ]
}

// 构建 2D 旋转矩阵（列优先或行优先取决于约定）
function rotationMatrix2D(theta: number): number[] {
  const c = Math.cos(theta)
  const s = Math.sin(theta)
  return [
    c, s,   // 第1列
   -s, c,   // 第2列
  ]
}`,
        },
        {
          type: 'text',
          html: `
            <h3>3D 绕坐标轴旋转</h3>
            <p>在三维空间中，旋转发生在<strong>一个平面</strong>内。绕坐标轴的旋转是最基本的——它们保持该轴上的坐标不变，而另外两个坐标在该轴的垂直平面内做 2D 旋转。</p>
            <p>下面给出绕 x、y、z 三轴的旋转矩阵。注意每个矩阵中哪一行/列保持不变（全是 0 和 1），它指示了绕哪个轴旋转。</p>
          `,
        },
        {
          type: 'definition',
          title: '绕 X 轴旋转（pitch / 俯仰）',
          body: '绕 x 轴旋转时，<strong>x 坐标保持不变</strong>，y 和 z 在 yz 平面内做 2D 旋转。在飞行模拟中称为 <strong>pitch（俯仰）</strong>。',
        },
        {
          type: 'formula',
          latex: `\\mathbf{R}_x(\\theta) = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & \\cos\\theta & -\\sin\\theta \\\\ 0 & \\sin\\theta & \\cos\\theta \\end{bmatrix}`,
          note: '绕 x 轴旋转 θ 角。注意第1行和第1列除了 (1,1) 位置的 1 外全是 0——x 坐标不变。右下角 2×2 子矩阵 = 2D 旋转矩阵。',
        },
        {
          type: 'definition',
          title: '绕 Y 轴旋转（yaw / 偏航）',
          body: '绕 y 轴旋转时，<strong>y 坐标保持不变</strong>，x 和 z 在 xz 平面内做 2D 旋转。在飞行模拟中称为 <strong>yaw（偏航）</strong>。注意 sinθ 项的符号模式与绕 x、z 轴不同。',
        },
        {
          type: 'formula',
          latex: `\\mathbf{R}_y(\\theta) = \\begin{bmatrix} \\cos\\theta & 0 & \\sin\\theta \\\\ 0 & 1 & 0 \\\\ -\\sin\\theta & 0 & \\cos\\theta \\end{bmatrix}`,
          note: '绕 y 轴旋转 θ 角。第2行和第2列除了 (2,2) 位置的 1 外全是 0。注意 -sinθ 在左下角（与绕 x、z 轴不同的符号位置模式）。',
        },
        {
          type: 'definition',
          title: '绕 Z 轴旋转（roll / 滚转）',
          body: '绕 z 轴旋转时，<strong>z 坐标保持不变</strong>，x 和 y 在 xy 平面内做 2D 旋转。在飞行模拟中称为 <strong>roll（滚转）</strong>。左上角 2×2 子矩阵就是 2D 旋转矩阵。',
        },
        {
          type: 'formula',
          latex: `\\mathbf{R}_z(\\theta) = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta & 0 \\\\ \\sin\\theta & \\cos\\theta & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}`,
          note: '绕 z 轴旋转 θ 角。第3行和第3列除了 (3,3) 位置的 1 外全是 0。左上角是标准的 2D 旋转矩阵。',
        },
        {
          type: 'illustration',
          caption: '图 5.1 — 绕 Y 轴旋转的几何意义：鸟瞰 xz 平面，x 和 z 坐标做 2D 旋转，y 坐标不变',
          width: 520,
          height: 360,
          svg: `<svg viewBox="0 0 520 360" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,sans-serif">
  <defs>
    <marker id="ax" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#e35947"/></marker>
    <marker id="az" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#387ad9"/></marker>
    <marker id="ap" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#e35947"/></marker>
    <marker id="aq" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#387ad9"/></marker>
  </defs>
  <rect width="520" height="360" fill="#faf8f5" rx="8"/>
  <!-- Grid -->
  <g stroke="#e8e4de" stroke-width="0.5">
    <line x1="40" y1="40" x2="40" y2="320"/>
    <line x1="120" y1="40" x2="120" y2="320"/>
    <line x1="200" y1="40" x2="200" y2="320"/>
    <line x1="280" y1="40" x2="280" y2="320"/>
    <line x1="360" y1="40" x2="360" y2="320"/>
    <line x1="440" y1="40" x2="440" y2="320"/>
    <line x1="40" y1="60" x2="480" y2="60"/>
    <line x1="40" y1="140" x2="480" y2="140"/>
    <line x1="40" y1="220" x2="480" y2="220"/>
    <line x1="40" y1="300" x2="480" y2="300"/>
  </g>
  <!-- Axes x→right, z→up (xz plane top-down view) -->
  <text x="460" y="195" fill="#e35947" font-size="13" font-weight="700">x</text>
  <text x="245" y="50" fill="#387ad9" font-size="13" font-weight="700">z</text>
  <line x1="60" y1="180" x2="470" y2="180" stroke="#e35947" stroke-width="2" marker-end="url(#ax)"/>
  <line x1="240" y1="340" x2="240" y2="30" stroke="#387ad9" stroke-width="2" marker-end="url(#az)"/>
  <!-- Origin -->
  <circle cx="240" cy="180" r="3" fill="#555"/>
  <text x="225" y="196" fill="#555" font-size="11">O</text>
  <!-- Point P before rotation at (3, 1) in x-z -->
  <circle cx="384" cy="140" r="5" fill="#e35947"/>
  <text x="392" y="132" fill="#c53030" font-size="12" font-weight="600">P(x,z)</text>
  <!-- Point P after rotation 40deg -->
  <circle cx="309" cy="96" r="5" fill="#387ad9"/>
  <text x="260" y="85" fill="#1d4ed8" font-size="12" font-weight="600">P\'(x\',z\')</text>
  <!-- Rotation arc -->
  <path d="M384,140 A47,47 0 0,0 309,96" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="385" y="125" fill="#d97706" font-size="11">θ = 40°</text>
  <!-- Arrow from origin to P -->
  <line x1="240" y1="180" x2="380" y2="142" stroke="#e35947" stroke-width="1.5" stroke-dasharray="4,3"/>
  <!-- Arrow from origin to P' -->
  <line x1="240" y1="180" x2="307" y2="98" stroke="#387ad9" stroke-width="1.5" stroke-dasharray="4,3"/>
  <!-- Annotate Y axis (out of page) -->
  <text x="250" y="220" fill="#2e9978" font-size="11">绕 Y 轴旋转</text>
  <text x="250" y="235" fill="#888" font-size="10">（y 坐标保持不变）</text>
  <!-- Note the submatrix -->
  <text x="250" y="275" fill="#666" font-size="10">核心是 xz 平面内的 2D 旋转</text>
  <text x="250" y="290" fill="#666" font-size="10">x\' = x cosθ + z sinθ</text>
  <text x="250" y="305" fill="#666" font-size="10">z\' = -x sinθ + z cosθ</text>
  <!-- Matrix display -->
  <text x="70" y="310" fill="#444" font-size="10">R_y = [[c, 0, s], [0, 1, 0], [-s, 0, c]]</text>
</svg>`,
        },
        {
          type: 'note',
          level: 'tip',
          body: '<strong>记忆技巧：</strong>绕哪个轴旋转，就在该轴对应的行和列放置 1（保持该坐标不变），其余 4 个位置填入 \\cosθ 和 ±\\sinθ。对于绕 x 和 z 轴，-sinθ 在右上角；对于绕 y 轴，-sinθ 在左下角（因为 y 轴的特殊性——从 x 到 z 需要"翻转"方向以保持右手坐标系旋转方向的一致性）。',
        },
        {
          type: 'code',
          language: 'typescript',
          code: `// 3D 绕坐标轴旋转矩阵
function rotationX(theta: number): number[] {
  const c = Math.cos(theta), s = Math.sin(theta)
  return [
    1, 0, 0,   // 第1列
    0, c, s,   // 第2列
    0,-s, c,   // 第3列
  ]
}

function rotationY(theta: number): number[] {
  const c = Math.cos(theta), s = Math.sin(theta)
  return [
    c, 0,-s,   // 第1列
    0, 1, 0,   // 第2列
    s, 0, c,   // 第3列
  ]
}

function rotationZ(theta: number): number[] {
  const c = Math.cos(theta), s = Math.sin(theta)
  return [
    c, s, 0,   // 第1列
   -s, c, 0,   // 第2列
    0, 0, 1,   // 第3列
  ]
}`,
        },
      ],
    },
    {
      title: '5.2 缩放矩阵',
      blocks: [
        {
          type: 'text',
          html: `
            <p><strong>缩放（Scale）</strong>是改变物体大小的变换。在 3D 图形学中，缩放分为两种：<strong>均匀缩放（Uniform Scale）</strong>和<strong>非均匀缩放（Non-uniform Scale）</strong>。</p>
          `,
        },
        {
          type: 'definition',
          title: '均匀缩放（Uniform Scale）',
          body: '沿<strong>所有坐标轴</strong>以相同的因子 <em>k</em> 缩放。物体保持形状比例，只是整体变大或变小。矩阵形式：<strong>S = kI</strong>（标量乘单位矩阵）。<br/><br/>当 k > 1 时放大，0 < k < 1 时缩小，k < 0 时还会翻转方向（反射+缩放）。',
        },
        {
          type: 'formula',
          latex: `\\mathbf{S}_{\\text{uniform}}(k) = \\begin{bmatrix} k & 0 & 0 \\\\ 0 & k & 0 \\\\ 0 & 0 & k \\end{bmatrix} = k \\mathbf{I}`,
          note: '均匀缩放矩阵。所有方向以相同比例缩放。',
        },
        {
          type: 'definition',
          title: '非均匀缩放（Non-uniform Scale）',
          body: '沿<strong>各坐标轴以不同因子</strong>缩放：s<sub>x</sub> 沿 x 轴、s<sub>y</sub> 沿 y 轴、s<sub>z</sub> 沿 z 轴。常用来拉伸或挤压物体——例如将球体压成椭球体。非均匀缩放会<strong>改变角度</strong>，因此不属于刚体变换。',
        },
        {
          type: 'formula',
          latex: `\\mathbf{S}(s_x, s_y, s_z) = \\begin{bmatrix} s_x & 0 & 0 \\\\ 0 & s_y & 0 \\\\ 0 & 0 & s_z \\end{bmatrix}`,
          note: '非均匀缩放矩阵：对角线上各轴独立的缩放因子。',
        },
        {
          type: 'derivation',
          title: '推导：缩放矩阵的原理',
          intro: '缩放是最简单的线性变换——每个坐标独立乘以一个缩放因子。',
          steps: [
            { latex: 'x\' = s_x \\cdot x, \\quad y\' = s_y \\cdot y, \\quad z\' = s_z \\cdot z', note: '缩放变换的定义：每个坐标轴方向上的长度独立缩放。', insight: '线性变换的核心特征：每个新坐标 = 原始坐标的线性组合。这里的"线性组合"极其简单——只有一个项。' },
            { latex: '\\begin{bmatrix} x\' \\\\ y\' \\\\ z\' \\end{bmatrix} = \\begin{bmatrix} s_x & 0 & 0 \\\\ 0 & s_y & 0 \\\\ 0 & 0 & s_z \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\\\ z \\end{bmatrix}', note: '写成矩阵形式。注意：缩放矩阵是对角矩阵——非对角线元素全为 0。', insight: '为什么非对角线全是 0？因为 x\' 不依赖于 y 和 z——缩放是"轴对齐"的变换。如果非对角线有值，说明一个轴的缩放影响了另一个轴——那就变成了剪切（Shear）。' },
            { latex: '\\det(S) = s_x \\cdot s_y \\cdot s_z', note: '缩放矩阵的行列式 = 各轴缩放因子的乘积 = 体积缩放比。', insight: '如果某个 s=0，行列式=0——空间被"压扁"了一个维度（投影）。如果 s<0，产生镜像反射。行列式的绝对值 = 变换后的体积 ÷ 变换前的体积。' },
            { latex: '\\text{若 } s_x = s_y = s_z = k: \\quad S = k\\mathbf{I}', note: '均匀缩放的特例：S = k·I。所有方向统一缩放，形状保持不变。', insight: '均匀缩放矩阵 = 标量 × 单位矩阵。这意味着 (kI)v = k(Iv) = kv——就是标量乘法。均匀缩放不会影响法向量方向，非常安全。' },
          ],
        },
        {
          type: 'text',
          html: `
            <h3>缩放的几何意义</h3>
            <p>缩放矩阵是对角矩阵——矩阵的每一列就是原来基向量的缩放版本：</p>
            <ul>
              <li>第1列 (s<sub>x</sub>, 0, 0)：原来的 x 轴方向不变，长度变为原来的 s<sub>x</sub> 倍</li>
              <li>第2列 (0, s<sub>y</sub>, 0)：y 轴长度变为 s<sub>y</sub> 倍</li>
              <li>第3列 (0, 0, s<sub>z</sub>)：z 轴长度变为 s<sub>z</sub> 倍</li>
            </ul>
            <p>从代码角度来看，非均匀缩放就是分别乘以各分量：x\' = s<sub>x</sub>·x，y\' = s<sub>y</sub>·y，z\' = s<sub>z</sub>·z。</p>
          `,
        },
        {
          type: 'note',
          level: 'warning',
          body: '<strong>⚠️ 注意：</strong>非均匀缩放后，物体的<strong>法向量</strong>不再简单地通过变换矩阵来变换。例如，将球体沿 x 轴拉伸为椭球体后，表面法向量的方向不能简单地用同一缩放矩阵来计算——需要用<strong>逆转置矩阵</strong>（将在第 6 章中讨论逆矩阵后详解）。这是图形学中一个常见的坑。',
        },
        {
          type: 'code',
          language: 'typescript',
          code: `// 缩放矩阵
function scaleMatrix(sx: number, sy: number, sz: number): number[] {
  return [
    sx,  0,  0,   // 第1列
     0, sy,  0,   // 第2列
     0,  0, sz,   // 第3列
  ]
}

// 判断是否为均匀缩放
function isUniformScale(m: number[]): boolean {
  // 对角线外元素应为 0，对角线上元素应相等
  return m[0] === m[4] && m[4] === m[8]
      && m[1] === 0 && m[2] === 0
      && m[3] === 0 && m[5] === 0
      && m[6] === 0 && m[7] === 0
}

// 缩放因子为零时产生"压扁"效果（降维投影）
// 例如 sx=1, sy=0, sz=1 → 所有点的 y 坐标变为 0
// 整个物体被压扁到 xz 平面上`,
        },
      ],
    },
    {
      title: '5.3 投影矩阵',
      blocks: [
        {
          type: 'text',
          html: `
            <p><strong>投影（Projection）</strong>是将高维空间中的点"压扁"到低维子空间的操作——类似于用平行光将物体的影子投射到墙上。在 3D 图形学中，投影是渲染管线的核心步骤之一。</p>
            <p>我们先讨论<strong>正交投影（Orthographic Projection）</strong>——即沿着坐标轴方向将物体投影到坐标平面上。透视投影将在第 6 章讨论。</p>
          `,
        },
        {
          type: 'definition',
          title: '沿坐标轴的正交投影',
          body: '将 3D 空间中的点沿某个坐标轴的方向<strong>垂直投影</strong>到坐标平面上，本质上就是<strong>将该坐标分量置为零</strong>。<br/><br/>例如，投影到 <strong>xy 平面</strong>（z=0）相当于将每个点的 z 坐标设为 0，而 x 和 y 保持不变。对应的投影矩阵将<strong>第 3 列设为全零</strong>（或用第 3 行为全零的矩阵来表示）。',
        },
        {
          type: 'formula',
          latex: `\\mathbf{P}_{xy} = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix} \\quad \\text{——投影到 xy 平面（z=0）}`,
          note: '投影到 xy 平面：将 z 分量清零。注意第 3 行全为 0——任何向量的第 3 个分量（z\'）都是 0。',
        },
        {
          type: 'formula',
          latex: `\\mathbf{P}_{xz} = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix} \\quad \\text{——投影到 xz 平面（y=0）}`,
          note: '投影到 xz 平面：将 y 分量清零。第 2 行全为 0。',
        },
        {
          type: 'formula',
          latex: `\\mathbf{P}_{yz} = \\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix} \\quad \\text{——投影到 yz 平面（x=0）}`,
          note: '投影到 yz 平面：将 x 分量清零。第 1 行全为 0。',
        },
        {
          type: 'text',
          html: `
            <p>投影的关键特征是<strong>降维</strong>——将一个 3D 物体投影到 2D 平面上，所有信息被压缩，且过程<strong>不可逆</strong>。从矩阵的角度看，投影矩阵有<strong>全为零的行</strong>（使得矩阵的行列式为 0，因此不可逆）。</p>
            <h3>投影到任意平面</h3>
            <p>投影到任意平面（不限于坐标平面）可以通过以下步骤：</p>
            <ol>
              <li>使用旋转变换将目标平面旋转到与坐标平面对齐</li>
              <li>沿该坐标轴做标准投影（清零对应分量）</li>
              <li>反向旋转回来</li>
            </ol>
            <p>这些操作通过矩阵乘法组合——这是矩阵复合变换的典型应用。</p>
          `,
        },
        {
          type: 'demo',
          demoId: 'orthographic-projection',
        },
        {
          type: 'code',
          language: 'typescript',
          code: `// 正交投影矩阵：将物体投影到指定坐标平面
function projectToXY(): number[] {
  return [1,0,0, 0,1,0, 0,0,0]  // z→0
}

function projectToXZ(): number[] {
  return [1,0,0, 0,0,0, 0,0,1]  // y→0
}

function projectToYZ(): number[] {
  return [0,0,0, 0,1,0, 0,0,1]  // x→0
}

// 应用投影到向量
function applyProjection(m: number[], v: [number,number,number]): [number,number,number] {
  return [
    m[0]*v[0] + m[1]*v[1] + m[2]*v[2],
    m[3]*v[0] + m[4]*v[1] + m[5]*v[2],
    m[6]*v[0] + m[7]*v[1] + m[8]*v[2],
  ]
}`,
        },
      ],
    },
    {
      title: '5.4 反射矩阵',
      blocks: [
        {
          type: 'text',
          html: `
            <p><strong>反射（Reflection / Mirroring）</strong>将物体"镜像翻转"到某个平面的对面。最常见的反射是沿坐标轴或坐标平面的反射——本质上是将某个坐标分量取反。</p>
          `,
        },
        {
          type: 'definition',
          title: '沿坐标平面的反射',
          body: '反射到某个坐标平面的<strong>对面</strong>，相当于将<strong>垂直于该平面的坐标轴方向取反</strong>。<br/><br/>• 沿 <strong>yz 平面</strong>反射（x → −x）：物体"左右翻转"<br/>• 沿 <strong>xz 平面</strong>反射（y → −y）：物体"上下翻转"<br/>• 沿 <strong>xy 平面</strong>反射（z → −z）：物体"前后翻转"',
        },
        {
          type: 'formula',
          latex: `\\mathbf{F}_{yz} = \\begin{bmatrix} -1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix} \\quad \\text{——沿 yz 平面反射（x → -x）}`,
          note: '沿 yz 平面反射：将 x 分量取反。y 和 z 保持不变。',
        },
        {
          type: 'formula',
          latex: `\\mathbf{F}_{xz} = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & -1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix} \\quad \\text{——沿 xz 平面反射（y → -y）}`,
          note: '沿 xz 平面反射：将 y 分量取反。常用于将左手坐标系与右手坐标系之间进行 z 轴翻转。',
        },
        {
          type: 'formula',
          latex: `\\mathbf{F}_{xy} = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & -1 \\end{bmatrix} \\quad \\text{——沿 xy 平面反射（z → -z）}`,
          note: '沿 xy 平面反射：将 z 分量取反。常用于左手系与右手系的转换。',
        },
        {
          type: 'text',
          html: `
            <h3>反射与缩放的对比</h3>
            <p>反射可以看作<strong>负缩放</strong>的特例：沿某个轴以因子 −1 缩放，等同于沿垂直于该轴的平面做反射。例如，diag(−1, 1, 1) 既是"沿 x 轴缩放 −1 倍"也是"沿 yz 平面反射"。</p>
            <p>但反射和普通缩放有一个关键区别：<strong>反射会改变坐标系的"手性"（handedness）</strong>——将右手系变为左手系（或反之）。这可以通过行列式的符号来判断（第 6 章详解）。</p>
          `,
        },
        {
          type: 'note',
          level: 'info',
          body: '<strong>实际应用：</strong>反射在图形学中有多种用途：<br/>• <strong>镜像效果</strong>：水面倒影、镜子中的图像<br/>• <strong>坐标系转换</strong>：从 Blender（右手系）导出到 Unity（左手系）时，沿 yz 平面做一次反射（x 取反）<br/>• <strong>纹理映射</strong>：有时需要翻转纹理的 u 或 v 坐标<br/>• <strong>对称建模</strong>：创建对称网格时只需建一半，另一半通过反射生成',
        },
        {
          type: 'illustration',
          caption: '图 5.2 — 沿 yz 平面的反射（x → −x）：物体被镜像到平面的另一侧，坐标系手性反转',
          width: 500,
          height: 320,
          svg: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,sans-serif">
  <defs>
    <marker id="mx" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#e35947"/></marker>
    <marker id="mz" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#387ad9"/></marker>
  </defs>
  <rect width="500" height="320" fill="#faf8f5" rx="8"/>
  <!-- Mirror plane (yz plane = x=0) -->
  <line x1="250" y1="30" x2="250" y2="290" stroke="#9333ea" stroke-width="2.5" stroke-dasharray="8,4"/>
  <text x="210" y="45" fill="#7c3aed" font-size="12" font-weight="600">yz 镜像平面 (x=0)</text>
  <!-- Axes -->
  <line x1="80" y1="160" x2="420" y2="160" stroke="#e35947" stroke-width="1.5" marker-end="url(#mx)"/>
  <line x1="250" y1="280" x2="250" y2="50" stroke="#387ad9" stroke-width="1.5" marker-end="url(#mz)"/>
  <text x="410" y="155" fill="#e35947" font-size="12">x</text>
  <text x="260" y="55" fill="#387ad9" font-size="12">z</text>
  <!-- Original object (right side) -->
  <polygon points="340,110 380,150 340,190 300,150" fill="#3b82f6" opacity="0.25" stroke="#1d4ed8" stroke-width="2"/>
  <text x="340" y="100" fill="#1d4ed8" font-size="12" font-weight="600">原始物体</text>
  <text x="340" y="220" fill="#888" font-size="10">x > 0 侧</text>
  <!-- Reflected object (left side) -->
  <polygon points="160,110 120,150 160,190 200,150" fill="#f59e0b" opacity="0.25" stroke="#d97706" stroke-width="2"/>
  <text x="140" y="100" fill="#d97706" font-size="12" font-weight="600">镜像物体</text>
  <text x="140" y="220" fill="#888" font-size="10">x < 0 侧（x→−x）</text>
  <!-- Distance annotations -->
  <line x1="300" y1="145" x2="250" y2="145" stroke="#1d4ed8" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="250" y1="145" x2="200" y2="145" stroke="#d97706" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="264" y="140" fill="#555" font-size="10">d</text>
  <text x="232" y="140" fill="#555" font-size="10">d</text>
  <text x="200" y="260" fill="#666" font-size="10">反射矩阵: diag(-1, 1, 1)</text>
</svg>`,
        },
      ],
    },
    {
      title: '5.5 剪切矩阵',
      blocks: [
        {
          type: 'text',
          html: `
            <p><strong>剪切（Shear）</strong>是一种使物体"倾斜"的变换——想象将一副扑克牌向侧面推，上面的牌比下面的牌偏移更多。在数学上，剪切保持一个坐标分量不变，但将另一个（或两个）坐标分量加上不变的坐标分量的<strong>倍数</strong>。</p>
          `,
        },
        {
          type: 'definition',
          title: '2D 剪切',
          body: '在二维平面中，沿 x 轴剪切 y 意味着：<strong>x 坐标加上 y 坐标的某个倍数</strong>，而 y 保持不变。例如 x\' = x + sy。参数 <em>s</em> 控制"倾斜度"——s=0 表示不剪切，s 越大倾斜越厉害。',
        },
        {
          type: 'formula',
          latex: `\\mathbf{H}_{x}(s) = \\begin{bmatrix} 1 & s \\\\ 0 & 1 \\end{bmatrix} \\quad \\text{——2D 中沿 x 方向剪切 y}`,
          note: '2D 剪切：x\' = x + sy，y\' = y。注意非对角线上有非零值 s。',
        },
        {
          type: 'text',
          html: `
            <h3>3D 剪切</h3>
            <p>在三维空间中，剪切更灵活——可以沿一个轴剪切另外两个轴。例如，沿 x 轴剪切（y 和 z 不变，但 x 加上了 y 和 z 的倍数）：</p>
          `,
        },
        {
          type: 'formula',
          latex: `\\mathbf{H}_{xy}(s) = \\begin{bmatrix} 1 & s & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix} \\quad \\text{——沿 x 方向剪切 y：x\' = x + s·y}`,
          note: '3D 剪切（沿 x 剪切 y）：第 1 行、第 2 列的位置有非零值 s。',
        },
        {
          type: 'formula',
          latex: `\\mathbf{H}_{xz}(t) = \\begin{bmatrix} 1 & 0 & t \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix} \\quad \\text{——沿 x 方向剪切 z：x\' = x + t·z}`,
          note: '3D 剪切（沿 x 剪切 z）：第 1 行、第 3 列的位置有非零值 t。',
        },
        {
          type: 'formula',
          latex: `\\mathbf{H}_{x}(s, t) = \\begin{bmatrix} 1 & s & t \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix} \\quad \\text{——沿 x 方向同时剪切 y 和 z}`,
          note: '组合剪切：x\' = x + s·y + t·z，y 和 z 保持不变。非对角线（右上角）有多个非零值。',
        },
        {
          type: 'text',
          html: `
            <h3>剪切的性质</h3>
            <p>剪切有几个有趣的性质：</p>
            <ul>
              <li><strong>保持面积/体积不变</strong>：剪切不改变物体的面积（2D）或体积（3D）。这一点可以通过行列式验证——剪切矩阵的行列式永远是 1。</li>
              <li><strong>保持某一组平行线不变</strong>：沿 x 轴剪切时，所有水平线（y = c）上的点仍然在水平线上，只是水平位置发生了偏移。</li>
              <li><strong>角度会改变</strong>：剪切后的直角不再保持 90°。</li>
              <li><strong>各向异性</strong>：剪切只在一个方向上影响物体，不在其他方向。</li>
            </ul>
            <p>在图形学中，剪切主要用于<strong>特殊效果</strong>（如倾斜文字、斜体效果）和<strong>视锥体裁剪变换</strong>的一部分（透视投影的实现细节中会用到）。</p>
          `,
        },
        {
          type: 'code',
          language: 'typescript',
          code: `// 3D 剪切矩阵：沿 x 方向剪切 y 和 z
function shearX(sy: number, sz: number): number[] {
  return [
    1,  0,  0,   // 第1列（x 轴不变方向）
    sy, 1,  0,   // 第2列（y 轴的方向在 x 上有偏移 sy）
    sz, 0,  1,   // 第3列（z 轴的方向在 x 上有偏移 sz）
  ]
}

// 沿 y 方向剪切 x 和 z
function shearY(sx: number, sz: number): number[] {
  return [
    1, sx,  0,   // 第1列（y 方向偏移）
    0,  1,  0,   // 第2列
    0, sz,  1,   // 第3列（y 方向偏移）
  ]
}

// 验证：剪切不改变体积
// 剪切矩阵的行列式 = 1（对角线乘积 = 1×1×1 = 1）`,
        },
      ],
    },
    {
      title: '5.6 变换的组合',
      blocks: [
        {
          type: 'text',
          html: `
            <p>在前面的小节中，我们学习了五种基本线性变换：旋转、缩放、投影、反射和剪切。但在实际应用中，物体通常同时经历<strong>多种变换</strong>——例如，先缩放、再旋转、再平移到指定位置。</p>
            <p>矩阵的强大之处在于：我们可以通过<strong>矩阵乘法</strong>将多个变换<strong>组合（Concatenate / Compose）</strong>为单个矩阵。</p>
          `,
        },
        {
          type: 'definition',
          title: '变换组合 = 矩阵连乘',
          body: '设我们有一系列变换矩阵 <strong>A、B、C</strong>，它们按顺序应用于向量 <strong>v</strong>：<br/><br/>1. 先应用 <strong>C</strong>：v₁ = Cv<br/>2. 再应用 <strong>B</strong>：v₂ = Bv₁ = B(Cv)<br/>3. 最后应用 <strong>A</strong>：v₃ = Av₂ = A(B(Cv))<br/><br/>根据矩阵乘法的<strong>结合律</strong>，这等价于：<br/><br/><strong>v₃ = (ABC) v</strong><br/><br/>即：先将矩阵连乘，得到一个<strong>复合变换矩阵 M = ABC</strong>，然后用 M 一次性变换所有顶点。',
        },
        {
          type: 'formula',
          latex: `\\mathbf{M} = \\mathbf{A} \\mathbf{B} \\mathbf{C} \\quad \\Longrightarrow \\quad \\mathbf{v}' = \\mathbf{M} \\mathbf{v}`,
          note: '变换组合：A(B(Cv)) = (ABC)v。连乘后的单一矩阵等价于依次应用各变换。',
        },
        {
          type: 'text',
          html: `
            <h3>顺序至关重要！</h3>
            <p>矩阵乘法不满足交换律，因此<strong>变换的顺序直接影响结果</strong>。由于矩阵从<strong>右到左</strong>应用（M₃M₂M₁v → 先 M₁，再 M₂，再 M₃），所以：</p>
            <ul>
              <li><strong>M = R · S</strong>：先缩放（最靠近 v），再旋转。结果是物体先被缩放，然后旋转后的尺寸不是原始尺寸。</li>
              <li><strong>M = S · R</strong>：先旋转，再缩放。两者结果通常不同！</li>
            </ul>
            <p>一个直观的例子：一个单位正方形，先沿 x 轴放大 2 倍，再旋转 45°——你会得到一个菱形。如果先旋转 45°，再沿 x 轴放大 2 倍——你会得到一个沿新 x 轴（45°方向）拉长的形状。两者完全不同。</p>
          `,
        },
        {
          type: 'illustration',
          caption: '图 5.3 — 变换顺序的影响：上排先缩放再旋转（RS）；下排先旋转再缩放（SR），结果不同',
          width: 520,
          height: 380,
          svg: `<svg viewBox="0 0 520 380" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,sans-serif">
  <defs>
    <marker id="bx" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#e35947"/></marker>
    <marker id="by" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#2e9978"/></marker>
  </defs>
  <rect width="520" height="380" fill="#faf8f5" rx="8"/>
  <!-- Row 1: R * S (scale first, then rotate) -->
  <text x="30" y="30" fill="#1d4ed8" font-size="14" font-weight="700">RS：先缩放（×2,×1）再旋转 30°</text>
  <!-- Original square -->
  <rect x="110" y="65" width="40" height="40" fill="#e35947" opacity="0.3" stroke="#e35947" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="97" y="60" fill="#c53030" font-size="10">原始</text>
  <!-- After scale -->
  <rect x="190" y="65" width="80" height="40" fill="#f59e0b" opacity="0.3" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="195" y="55" fill="#d97706" font-size="10">缩放后</text>
  <text x="195" y="125" fill="#d97706" font-size="9">(×2, ×1)</text>
  <!-- After S then R (the R*S result) - rotated rectangle -->
  <g transform="translate(320, 85) rotate(30)">
    <rect x="-40" y="-20" width="80" height="40" fill="#3b82f6" opacity="0.35" stroke="#1d4ed8" stroke-width="2"/>
  </g>
  <text x="340" y="55" fill="#1d4ed8" font-size="10">旋转后 = RS 结果</text>
  <!-- Arrows -->
  <text x="155" y="80" fill="#888" font-size="14">→</text>
  <text x="275" y="80" fill="#888" font-size="14">→</text>
  <!-- Row 2: S * R (rotate first, then scale) -->
  <text x="30" y="210" fill="#b45309" font-size="14" font-weight="700">SR：先旋转 30° 再缩放（×2,×1）</text>
  <!-- Original square -->
  <rect x="110" y="245" width="40" height="40" fill="#e35947" opacity="0.3" stroke="#e35947" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="97" y="240" fill="#c53030" font-size="10">原始</text>
  <!-- After rotate (diamond shape) -->
  <g transform="translate(190, 265) rotate(30)">
    <rect x="-20" y="-20" width="40" height="40" fill="#f59e0b" opacity="0.3" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4,2"/>
  </g>
  <text x="195" y="240" fill="#d97706" font-size="10">旋转后</text>
  <!-- After R then S (the S*R result) - diamond scaled horizontally -->
  <g transform="translate(340, 265) rotate(30)">
    <rect x="-40" y="-20" width="80" height="40" fill="#ea580c" opacity="0.35" stroke="#c2410c" stroke-width="2"/>
  </g>
  <text x="365" y="240" fill="#c2410c" font-size="10">缩放后 = SR 结果</text>
  <!-- Arrows -->
  <text x="155" y="260" fill="#888" font-size="14">→</text>
  <text x="275" y="260" fill="#888" font-size="14">→</text>
  <!-- Conclusion -->
  <text x="150" y="350" fill="#555" font-size="12" font-weight="600">结论：RS ≠ SR！变换顺序决定最终结果</text>
</svg>`,
        },
        {
          type: 'note',
          level: 'tip',
          body: '<strong>记忆口诀：</strong>矩阵乘法的顺序是从<strong>右到左</strong>应用在向量上的。<br/><br/><strong>M = T · R · S</strong> 表示：先缩放（S，最右边），再旋转（R），最后平移（T，最左边）。<br/><br/>在代码中构建变换矩阵时，大多数人习惯按"从局部到世界"的顺序来思考：先在局部空间缩放物体，再旋转到正确朝向，最后平移到世界空间中的位置。这恰好对应 S → R → T 的顺序，即矩阵连乘 <strong>T·R·S</strong>（T 在左边、最靠近最终的向量）。',
        },
        {
          type: 'code',
          language: 'typescript',
          code: `// 矩阵乘法（3×3）——用于组合变换
function mulMat3(a: number[], b: number[]): number[] {
  const r = new Array(9).fill(0)
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        r[i * 3 + j] += a[i * 3 + k] * b[k * 3 + j]
      }
    }
  }
  return r
}

// 组合变换：先绕 Y 旋转 45°，再沿 X 缩放 2 倍
const R = rotationY(Math.PI / 4)
const S = scaleMatrix(2, 1, 1)
const M = mulMat3(S, R)  // S * R = 先旋转再缩放
// 注意：M = S*R 表示先应用 R（右边），再应用 S（左边）

// 验证：变换顺序不同 → 结果不同
const M2 = mulMat3(R, S)  // R * S = 先缩放再旋转
// M !== M2（一般情况）`,
        },
      ],
    },
    {
      title: '5.7 变换的分类',
      blocks: [
        {
          type: 'text',
          html: `
            <p>到目前为止，我们已经学习了六种具体变换。现在从更高的视角来<strong>分类</strong>这些变换，理解它们的数学性质和几何含义。这在选择正确的变换类型和优化渲染管线时非常重要。</p>
          `,
        },
        {
          type: 'definition',
          title: '线性变换（Linear Transformation）',
          body: '满足两条性质的变换：<br/>1. <strong>f(u + v) = f(u) + f(v)</strong>（保持加法）<br/>2. <strong>f(kv) = k f(v)</strong>（保持标量乘法）<br/><br/>等价地说，线性变换可以用<strong>矩阵乘法</strong>表示：f(v) = Mv。所有 3×3 矩阵实现的变换都是线性变换。<br/><br/>线性变换的集合包括：<strong>旋转、缩放、投影、反射、剪切</strong>。<br/><br/><strong>关键限制：线性变换必须保持原点不变</strong>——f(0) = 0。因此 3×3 矩阵无法表示平移。',
        },
        {
          type: 'definition',
          title: '仿射变换（Affine Transformation）',
          body: '在线性变换的基础上增加<strong>平移</strong>。仿射变换 = 线性变换 + 平移：<br/><br/><strong>f(v) = Mv + b</strong>（M 是 3×3 线性变换矩阵，b 是平移向量）<br/><br/>使用 4×4 的<strong>齐次矩阵</strong>可以将仿射变换统一表示为单个矩阵乘法（第 6 章详解）。<br/><br/>仿射变换的两个重要性质：<br/>• <strong>保持共线性</strong>：一条直线变换后仍然是直线<br/>• <strong>保持平行性</strong>：平行线变换后仍然平行<br/>• <strong>保持比例</strong>：线段上的比例点在变换后仍保持相同比例',
        },
        {
          type: 'definition',
          title: '刚体变换（Rigid Body Transformation）',
          body: '一种特殊的仿射变换，<strong>保持物体的形状和大小完全不变</strong>。也称为<strong>等距变换（Isometry）</strong>。<br/><br/>刚体变换仅包含：<strong>旋转 + 平移</strong>（有时也包括反射）。不含缩放或剪切。<br/><br/>性质：<br/>• 保持任意两点间的距离不变<br/>• 保持角度不变<br/>• 保持面积和体积不变<br/><br/>在物理模拟和角色动画中，大多数物体运动都是刚体变换。',
        },
        {
          type: 'definition',
          title: '透视变换（Perspective Transformation）',
          body: '一种<strong>非仿射</strong>的变换，用于模拟<strong>透视效果</strong>（近大远小）。透视变换<strong>不保持平行性</strong>——平行的铁轨在透视图像中会聚于消失点。<br/><br/>透视变换可以用 4×4 矩阵在<strong>齐次坐标</strong>中表示（但需要除以 w 分量来完成投影），这使得 GPU 的渲染管线可以用统一的矩阵框架处理所有类型的变换。详细讨论见第 6 章。',
        },
        {
          type: 'text',
          html: `
            <h3>变换的分类层次</h3>
            <p>各类变换之间存在包含关系——从最广泛的到最受限的：</p>
            <table style="width:100%; border-collapse: collapse; margin: 1em 0; font-size: 0.92em;">
              <tr style="background: #f3f4f6;">
                <th style="padding: 8px 12px; border: 1px solid #ddd; text-align: left;">变换类别</th>
                <th style="padding: 8px 12px; border: 1px solid #ddd; text-align: left;">包含的操作</th>
                <th style="padding: 8px 12px; border: 1px solid #ddd; text-align: left;">保持的性质</th>
                <th style="padding: 8px 12px; border: 1px solid #ddd; text-align: left;">矩阵维度</th>
              </tr>
              <tr><td style="padding: 6px 12px; border: 1px solid #ddd;">透视变换</td><td style="padding: 6px 12px; border: 1px solid #ddd;">所有投影变换</td><td style="padding: 6px 12px; border: 1px solid #ddd;">直线→直线（共线性）</td><td style="padding: 6px 12px; border: 1px solid #ddd;">4×4 齐次</td></tr>
              <tr style="background: #f9fafb;"><td style="padding: 6px 12px; border: 1px solid #ddd;">仿射变换</td><td style="padding: 6px 12px; border: 1px solid #ddd;">旋转、缩放、剪切、反射、平移</td><td style="padding: 6px 12px; border: 1px solid #ddd;">平行性、共线性、比例</td><td style="padding: 6px 12px; border: 1px solid #ddd;">4×4（或 3×3 + 平移）</td></tr>
              <tr><td style="padding: 6px 12px; border: 1px solid #ddd;">线性变换</td><td style="padding: 6px 12px; border: 1px solid #ddd;">旋转、缩放、剪切、反射、投影</td><td style="padding: 6px 12px; border: 1px solid #ddd;">原点、加法、标量乘法</td><td style="padding: 6px 12px; border: 1px solid #ddd;">3×3</td></tr>
              <tr style="background: #f9fafb;"><td style="padding: 6px 12px; border: 1px solid #ddd;">刚体变换</td><td style="padding: 6px 12px; border: 1px solid #ddd;">旋转、平移（含反射）</td><td style="padding: 6px 12px; border: 1px solid #ddd;">距离、角度、面积、体积</td><td style="padding: 6px 12px; border: 1px solid #ddd;">4×4（旋转正交部分）</td></tr>
            </table>
          `,
        },
        {
          type: 'note',
          level: 'info',
          body: '<strong>为什么需要分类？</strong><br/><br/>了解变换的类型直接关系到<strong>性能优化</strong>和<strong>数值精度</strong>：<br/>• 如果你知道一个矩阵仅代表刚体变换（无缩放），则可以用快速路径计算逆矩阵（转置 = 逆）<br/>• 如果你知道变换是仿射的，则可以省略某些齐次坐标的完整 4×4 计算<br/>• 透视变换需要特殊处理（除以 w），而仿射变换不需要<br/><br/>在渲染引擎内部，这些分类用于选择最优的计算路径。',
        },
        {
          type: 'text',
          html: `
            <h3>本章小结</h3>
            <p>本章系统学习了 3D 图形学中<strong>五种基本线性变换</strong>及其组合应用：</p>
            <ul>
              <li>✅ <strong>旋转矩阵</strong>：2D 旋转、3D 绕 X/Y/Z 轴旋转，掌握三个标准旋转矩阵</li>
              <li>✅ <strong>缩放矩阵</strong>：均匀缩放（kI）、非均匀缩放（对角矩阵）、法向量变换的注意事项</li>
              <li>✅ <strong>投影矩阵</strong>：正交投影到坐标平面，降维和不可逆性</li>
              <li>✅ <strong>反射矩阵</strong>：沿坐标平面反射（取反对角线元素），与缩放的区别（手性变化）</li>
              <li>✅ <strong>剪切矩阵</strong>：非对角线的非零值，保持体积不变</li>
              <li>✅ <strong>变换的组合</strong>：矩阵乘法 = 变换连接，从右到左应用顺序，RS ≠ SR</li>
              <li>✅ <strong>变换的分类</strong>：线性变换 → 仿射变换 → 刚体变换 → 透视变换的层次关系</li>
            </ul>
            <p>这些变换都是以 3×3 矩阵的形式实现的。但有一个重要限制：<strong>3×3 矩阵不能表示平移</strong>（因为线性变换必须保持原点不变）。在下一章中，我们将引入<strong>4×4 齐次矩阵</strong>来解决这个问题，并学习行列式、逆矩阵和正交矩阵等重要的矩阵性质。</p>
          `,
        },
        {
          type: 'note',
          level: 'tip',
          body: '<strong>动手实践建议：</strong>建议你在 Babylon.js 或其他 3D 引擎中尝试手动构建这些变换矩阵，观察不同变换对简单几何体（如立方体、球体）的效果。特别注意变换顺序的影响——这是图形学中"90% 的 bug"的根源。你可以通过本页面右侧的交互演示来直观感受各种变换的效果。',
        },
      ],
    },
  ],
}

export default content
