import type { ChapterContent } from "@/components/content/types"

const content: ChapterContent = {
  id: "4",
  title: "矩阵介绍",
  sections: [
    {
      title: "4.1 矩阵——数学定义",
      blocks: [
        {
          type: "text",
          html: `
            <p>在前三章中，我们学习了坐标系和向量。现在引入一个更强大的数学工具——<strong>矩阵（Matrix）</strong>。矩阵是 3D 图形学的"主力运算工具"：所有的旋转、缩放、平移、投影都由矩阵来实现。</p>
          `,
        },
        {
          type: "definition",
          title: "定义: 矩阵",
          body: '一个 <strong>m × n 矩阵</strong>是由 m 行、n 列数字排列成的<strong>矩形阵列</strong>。每个数字称为矩阵的一个<strong>元素（element）</strong>或<strong>项（entry）</strong>。通常用大写粗体字母表示矩阵，如 <strong>M</strong>、<strong>A</strong>、<strong>R</strong>。<br/><br/>矩阵的元素用下标标记：M<sub>ij</sub> 表示第 i 行、第 j 列的元素。',
        },
        {
          type: "formula",
          latex: `\\mathbf{M} = \\begin{bmatrix} m_{11} & m_{12} & m_{13} \\\\ m_{21} & m_{22} & m_{23} \\\\ m_{31} & m_{32} & m_{33} \\end{bmatrix}`,
          note: "一个 3×3 矩阵的示例。m₁₁=第1行第1列，m₂₃=第2行第3列。",
        },
        {
          type: "text",
          html: `
            <p>在游戏开发和图形学中，我们<strong>几乎只用方阵（Square Matrix）</strong>——即行数等于列数的矩阵。最常见的维度是：</p>
            <ul>
              <li><strong>3×3</strong>：表示 3D 中的<strong>线性变换</strong>（旋转、缩放）</li>
              <li><strong>4×4</strong>：表示 3D 中的<strong>仿射变换</strong>（旋转 + 缩放 + 平移，使用齐次坐标）</li>
            </ul>
            <p>本书中如无特别说明，"矩阵"默认指方阵。</p>
          `,
        },
        {
          type: "note",
          level: "info",
          body: "<strong>为什么要学矩阵？</strong>矩阵提供了一种<strong>统一、紧凑</strong>的方式来表示和组合变换。一次矩阵乘法就能同时完成旋转、缩放和平移——如果没有矩阵，每次都要手动编写冗长的三角函数运算。更重要的是，多个变换可以通过矩阵乘法<strong>合并为单个矩阵</strong>，在渲染管线的顶点着色器中一次完成所有变换。",
        },
      ],
    },
    {
      title: "4.2 方阵与对角矩阵",
      blocks: [
        {
          type: "text",
          html: `
            <p>在线性代数中，有几类特殊的方阵，它们在图形学中频繁出现：</p>
          `,
        },
        {
          type: "definition",
          title: "对角矩阵（Diagonal Matrix）",
          body: '除了<strong>主对角线</strong>（从左上到右下）上的元素外，其余元素全为 0 的矩阵。<br/><br/>对角矩阵在图形学中代表<strong>沿坐标轴的缩放</strong>。例如，对角矩阵 diag(2, 1, 0.5) 表示将 x 方向放大 2 倍、y 不变、z 缩小到一半。',
        },
        {
          type: "formula",
          latex: `\\begin{bmatrix} k_x & 0 & 0 \\\\ 0 & k_y & 0 \\\\ 0 & 0 & k_z \\end{bmatrix} \\quad \\text{—— 沿各轴的缩放因子} k_x, k_y, k_z`,
          note: "对角矩阵的几何意义：各轴独立的缩放。",
        },
        {
          type: "definition",
          title: "单位矩阵（Identity Matrix）",
          body: '主对角线上全为 <strong>1</strong>、其余元素全为 <strong>0</strong> 的方阵，记作 <strong>Iₙ</strong> 或简写 <strong>I</strong>。<br/><br/>单位矩阵是矩阵乘法的"1"——任何矩阵乘以单位矩阵等于它自身：<strong>MI = IM = M</strong>。在图形学中，单位矩阵代表"<strong>不进行任何变换</strong>"。',
        },
        {
          type: "formula",
          latex: `\\mathbf{I}_3 = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}`,
          note: "3×3 单位矩阵。变换一个向量：I₃ v = v，向量保持不变。",
        },
      ],
    },
    {
      title: "4.3 向量作为矩阵",
      blocks: [
        {
          type: "text",
          html: `
            <p>向量可以看作<strong>特殊的矩阵</strong>——只有一行或一列的矩阵。这将在矩阵与向量的乘法中发挥重要作用。</p>
          `,
        },
        {
          type: "definition",
          title: "行向量 vs 列向量",
          body: '<strong>列向量（Column Vector）</strong>：向量写成 n×1 的<strong>单列矩阵</strong>。本书和大多数图形学资料使用列向量。<br/><br/><strong>行向量（Row Vector）</strong>：向量写成 1×n 的<strong>单行矩阵</strong>。某些资料（如 DirectX 的早期文档）使用行向量。<br/><br/>两种约定<strong>数学上等价</strong>，但矩阵的排布顺序不同：列向量写 v\' = Mv（矩阵在左），行向量写 v\' = vM（向量在左）。<strong>务必保持所选约定的一致性！</strong>',
        },
        {
          type: "formula",
          latex: `\\text{列向量: } \\mathbf{v} = \\begin{bmatrix} x \\\\ y \\\\ z \\end{bmatrix} \\qquad \\text{行向量: } \\mathbf{v} = \\begin{bmatrix} x & y & z \\end{bmatrix}`,
          note: "两种向量表示方式。本书采用列向量约定。",
        },
        {
          type: "note",
          level: "warning",
          body: "<strong>⚠️ 关键区别：</strong>如果使用列向量，变换写作 <strong>v' = Mv</strong>（矩阵 × 列向量）。如果使用行向量，变换写作 <strong>v' = vM</strong>（行向量 × 矩阵）。两者得到的变换矩阵互为<strong>转置</strong>。从不同来源复制矩阵代码时，务必确认所用的向量约定！",
        },
      ],
    },
    {
      title: "4.4 矩阵的转置",
      blocks: [
        {
          type: "text",
          html: `
            <p><strong>转置（Transpose）</strong>是将矩阵的行和列互换的操作。矩阵 <strong>M</strong> 的转置记作 <strong>Mᵀ</strong>。</p>
          `,
        },
        {
          type: "formula",
          latex: `(\\mathbf{M}^T)_{ij} = \\mathbf{M}_{ji}`,
          note: "转置的定义：第 i 行第 j 列的元素变为第 j 行第 i 列。",
        },
        {
          type: "formula",
          latex: `\\mathbf{M} = \\begin{bmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{bmatrix} \\quad \\Longrightarrow \\quad \\mathbf{M}^T = \\begin{bmatrix} a & d & g \\\\ b & e & h \\\\ c & f & i \\end{bmatrix}`,
          note: "转置操作示例：对角线上的元素不变，其余元素沿对角线镜像翻转。",
        },
        {
          type: "text",
          html: `
            <p>转置的两个重要性质：</p>
            <ul>
              <li><strong>(Mᵀ)ᵀ = M</strong> — 两次转置恢复原矩阵</li>
              <li><strong>(AB)ᵀ = BᵀAᵀ</strong> — 乘积的转置等于<strong>逆序</strong>转置的乘积（此性质在矩阵求逆中非常有用）</li>
            </ul>
            <p>在图形学中，转置常用于<strong>列向量与行向量约定之间的转换</strong>，以及<strong>法向量变换</strong>中的特殊处理。</p>
          `,
        },
        {
          type: "code",
          language: "typescript",
          code: `// 矩阵转置的简单实现
type Mat3 = [number, number, number, number, number, number, number, number, number]

function transpose3(m: Mat3): Mat3 {
  return [
    m[0], m[3], m[6],  // 第1行 → 第1列
    m[1], m[4], m[7],  // 第2行 → 第2列
    m[2], m[5], m[8],  // 第3行 → 第3列
  ]
}`,
        },
      ],
    },
    {
      title: "4.5 矩阵与标量的乘法",
      blocks: [
        {
          type: "text",
          html: `
            <p>矩阵与标量的乘法是最简单的矩阵运算：将矩阵的<strong>每一个元素</strong>乘以该标量。</p>
          `,
        },
        {
          type: "formula",
          latex: `k \\mathbf{M} = k \\begin{bmatrix} m_{11} & m_{12} & m_{13} \\\\ m_{21} & m_{22} & m_{23} \\\\ m_{31} & m_{32} & m_{33} \\end{bmatrix} = \\begin{bmatrix} k m_{11} & k m_{12} & k m_{13} \\\\ k m_{21} & k m_{22} & k m_{23} \\\\ k m_{31} & k m_{32} & k m_{33} \\end{bmatrix}`,
          note: "标量乘法：每个元素独立乘以标量 k。",
        },
        {
          type: "text",
          html: `
            <p>从几何角度看，如果矩阵 <strong>M</strong> 代表一个变换，那么 <strong>kM</strong> 就是将变换的"效果"放大 k 倍——但这个直觉仅在矩阵代表线性变换时才完全成立。对于包含平移的 4×4 矩阵，标量乘法会破坏齐次坐标的规范形式，通常不单独使用。</p>
          `,
        },
      ],
    },
    {
      title: "4.6 矩阵与矩阵的乘法",
      blocks: [
        {
          type: "text",
          html: `
            <p><strong>矩阵乘法</strong>是整个 3D 图形管线中最频繁的操作。理解它的规则至关重要。</p>
          `,
        },
        {
          type: "definition",
          title: "定义: 矩阵乘法",
          body: '两个矩阵 <strong>A</strong>（m×n）和 <strong>B</strong>（n×p）可以相乘，结果是一个 <strong>m×p</strong> 的矩阵 <strong>C = AB</strong>。<br/><br/>结果矩阵的元素 C<sub>ij</sub> = <strong>A 的第 i 行</strong> 与 <strong>B 的第 j 列</strong> 的<strong>点积</strong>。<br/><br/><strong>前置条件：</strong>A 的<strong>列数</strong>必须等于 B 的<strong>行数</strong>。否则乘法无定义。',
        },
        {
          type: "formula",
          latex: `C_{ij} = \\sum_{k=1}^{n} A_{ik} B_{kj}`,
          note: "矩阵乘法的通用公式：C 的第 i 行第 j 列 = A 的第 i 行与 B 的第 j 列的点积。",
        },
        {
          type: "text",
          html: `
            <h3>3×3 矩阵乘法示例</h3>
            <p>以 3×3 矩阵相乘为例，结果矩阵的元素逐个计算：</p>
          `,
        },
        {
          type: "formula",
          latex: `\\begin{bmatrix} a_{11} & a_{12} & a_{13} \\\\ a_{21} & a_{22} & a_{23} \\\\ a_{31} & a_{32} & a_{33} \\end{bmatrix} \\begin{bmatrix} b_{11} & b_{12} & b_{13} \\\\ b_{21} & b_{22} & b_{23} \\\\ b_{31} & b_{32} & b_{33} \\end{bmatrix} = \\begin{bmatrix} c_{11} & c_{12} & c_{13} \\\\ c_{21} & c_{22} & c_{23} \\\\ c_{31} & c_{32} & c_{33} \\end{bmatrix}`,
          note: "两个 3×3 矩阵相乘。例如 c₂₃ = a₂₁b₁₃ + a₂₂b₂₃ + a₂₃b₃₃（第二行·第三列）。",
        },
        {
          type: "text",
          html: `
            <h3>矩阵乘法的重要性质</h3>
            <ul>
              <li><strong>不满足交换律</strong>：<strong>AB ≠ BA</strong>（一般情况）。旋转 A 再旋转 B 与先 B 后 A 的结果不同。</li>
              <li><strong>满足结合律</strong>：(AB)C = A(BC)。这意味着多个变换可以预先合并。</li>
              <li><strong>满足分配律</strong>：A(B + C) = AB + AC。</li>
              <li><strong>单位矩阵</strong>：AI = IA = A。</li>
            </ul>
          `,
        },
        {
          type: "note",
          level: "tip",
          body: `<strong>几何直觉：</strong>矩阵乘法 = 变换的组合。如果 A 代表"绕 y 轴旋转 45°"，B 代表"沿 x 轴平移 5 个单位"，那么 <strong>AB 代表"先平移再旋转"</strong>（注意：矩阵乘法的顺序是从<strong>右到左</strong>应用的——ABv = A(Bv)，所以先应用 B，再应用 A）。这一点初学者经常搞反，务必注意。`,
        },
        {
          type: "code",
          language: "typescript",
          code: `// 3×3 矩阵乘法
type Mat3 = number[]  // 9 elements, row-major

function mul3(a: Mat3, b: Mat3): Mat3 {
  const r = new Array(9).fill(0)
  for (let i = 0; i < 3; i++) {       // 结果行
    for (let j = 0; j < 3; j++) {     // 结果列
      for (let k = 0; k < 3; k++) {   // 内积下标
        r[i * 3 + j] += a[i * 3 + k] * b[k * 3 + j]
      }
    }
  }
  return r
}`,
        },
      ],
    },
    {
      title: "4.7 矩阵与向量的乘法",
      blocks: [
        {
          type: "text",
          html: `
            <p>矩阵与向量的乘法是矩阵乘法的一个<strong>特例</strong>——将向量视为 n×1 的列矩阵（或 1×n 的行矩阵）。这是图形学中<strong>应用变换</strong>的核心操作。</p>
          `,
        },
        {
          type: "definition",
          title: "列向量约定：v' = Mv",
          body: '在列向量约定下，3×3 矩阵 <strong>M</strong> 乘以 3×1 列向量 <strong>v</strong>，结果是另一个 3×1 列向量。<strong>结果向量的每个分量 = M 的对应行与 v 的点积。</strong>',
        },
        {
          type: "formula",
          latex: `\\begin{bmatrix} m_{11} & m_{12} & m_{13} \\\\ m_{21} & m_{22} & m_{23} \\\\ m_{31} & m_{32} & m_{33} \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\\\ z \\end{bmatrix} = \\begin{bmatrix} m_{11}x + m_{12}y + m_{13}z \\\\ m_{21}x + m_{22}y + m_{23}z \\\\ m_{31}x + m_{32}y + m_{33}z \\end{bmatrix}`,
          note: "3×3 矩阵 × 3D 列向量。注意结果的每个分量都是矩阵的一行与向量的点积。",
        },
        {
          type: "text",
          html: `
            <h3>几何意义：矩阵 = 基向量的变换</h3>
            <p>从第 3 章我们知道，v_world = x i' + y j' + z k'。仔细观察矩阵×向量的结果：</p>
            <p style="text-align: center; padding: 0.5rem 0;">
              <strong>Mv = x · (M 的第 1 列) + y · (M 的第 2 列) + z · (M 的第 3 列)</strong>
            </p>
            <p>也就是说，<strong>矩阵的每一列就是变换后的基向量</strong>！如果 M 的第 1 列是 (1, 0, 0)，说明变换后的 x 轴仍然是世界 x 轴；如果第 1 列是 (0, 1, 0)，说明原来的 x 轴现在指向了 y 方向（旋转了 90°）。</p>
            <p>这个洞察极其重要——<strong>看一个矩阵的列，就能直接读出它的几何含义</strong>。</p>
          `,
        },
        {
          type: "note",
          level: "info",
          body: "<strong>快速判断矩阵类型：</strong><br/>• 第一列是 (1,0,0), 第二列 (0,1,0), 第三列 (0,0,1) → 单位矩阵（无变换）<br/>• 对角线上有非 1 的值 → 缩放<br/>• 列向量不再是标准基向量 → 旋转<br/>• 某列全为 0 → 投影（降维）",
        },
      ],
    },
    {
      title: "4.8 矩阵的几何解释",
      blocks: [
        {
          type: "text",
          html: `
            <p>现在我们可以将矩阵与<strong>坐标空间变换</strong>直接联系起来。这是全书最重要的概念连接之一。</p>
          `,
        },
        {
          type: "definition",
          title: "矩阵 = 坐标空间的描述",
          body: '一个 3×3 矩阵可以理解为<strong>描述了一个坐标空间相对于另一个坐标空间的方位</strong>。<br/><br/>具体来说：<strong>矩阵的每一列 = 原坐标空间的基向量在目标空间中的表示</strong>。<br/><br/>如果我们有一个从模型空间到世界空间的变换矩阵，那么：<br/>• 第 1 列 = 模型空间的 x 轴在世界空间中的方向<br/>• 第 2 列 = 模型空间的 y 轴在世界空间中的方向<br/>• 第 3 列 = 模型空间的 z 轴在世界空间中的方向',
        },
        {
          type: "text",
          html: `
            <h3>示例：绕 y 轴旋转 90° 的矩阵</h3>
            <p>将物体绕 y 轴旋转 90° 后：</p>
            <ul>
              <li>原模型空间的 <strong>x 轴 (1,0,0)</strong> 旋转后指向世界的 <strong>z 轴方向 (0,0,1)</strong></li>
              <li>原模型空间的 <strong>y 轴 (0,1,0)</strong> 不变，仍指向 <strong>(0,1,0)</strong></li>
              <li>原模型空间的 <strong>z 轴 (0,0,1)</strong> 旋转后指向世界的 <strong>-x 方向 (-1,0,0)</strong></li>
            </ul>
            <p>因此变换矩阵的各列为：</p>
          `,
        },
        {
          type: "formula",
          latex: `\\mathbf{R}_y(90°) = \\begin{bmatrix} 0 & 0 & 1 \\\\ 0 & 1 & 0 \\\\ -1 & 0 & 0 \\end{bmatrix}`,
          note: "绕 y 轴旋转 90° 的矩阵。第1列=(0,0,-1)、第2列=(0,1,0)、第3列=(1,0,0)。",
        },
        {
          type: "text",
          html: `
            <p>用这个矩阵乘以模型空间中的任意向量，就能得到它在世界空间中的坐标。实际上，<strong>乘以矩阵就是从矩阵描述的坐标空间变换到目标空间</strong>。</p>
          `,
        },
        {
          type: "illustration",
          caption: "图 4.1 — 矩阵的几何意义：列 = 变换后的基向量。红色=原 x 轴变到蓝色位置。",
          width: 500,
          height: 300,
          svg: `<svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg"><defs><marker id="m1" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#e35947"/></marker><marker id="m2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#2e9978"/></marker><marker id="m3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#387ad9"/></marker></defs><rect width="500" height="300" fill="#faf8f5" rx="8"/><g stroke="#e8e4de" stroke-width="0.5"><line x1="30" y1="150" x2="470" y2="150"/><line x1="30" y1="75" x2="470" y2="75"/><line x1="30" y1="225" x2="470" y2="225"/><line x1="80" y1="30" x2="80" y2="270"/><line x1="200" y1="30" x2="200" y2="270"/><line x1="320" y1="30" x2="320" y2="270"/><line x1="440" y1="30" x2="440" y2="270"/></g><!-- Original basis (standard) --><line x1="200" y1="150" x2="320" y2="150" stroke="#e35947" stroke-width="3" marker-end="url(#m1)"/><line x1="200" y1="150" x2="200" y2="70" stroke="#2e9978" stroke-width="3" marker-end="url(#m2)"/><text x="265" y="143" fill="#c53030" font-size="12">i (原 x)</text><text x="195" y="100" fill="#166534" font-size="12">j (原 y)</text><!-- Transformed basis (rotated 90deg around Y) --><line x1="200" y1="150" x2="200" y2="230" stroke="#387ad9" stroke-width="3" marker-end="url(#m3)"/><line x1="200" y1="150" x2="130" y2="150" stroke="#387ad9" stroke-width="3"/><text x="205" y="200" fill="#1d4ed8" font-size="12">i' = 第1列</text><text x="140" y="143" fill="#1d4ed8" font-size="12">(-1,0,0)</text><!-- Matrix representation --><text x="340" y="90" fill="#333" font-size="13" font-weight="600">矩阵 R_y(90°)</text><text x="340" y="115" fill="#666" font-size="11">第1列 = i' = (-1,0,0)</text><text x="340" y="135" fill="#666" font-size="11">第2列 = j' = (0,1,0)</text><text x="340" y="155" fill="#666" font-size="11">第3列 = k' = (0,0,1)</text><text x="340" y="185" fill="#999" font-size="10">矩阵的列 = 变换后的基向量</text></svg>`,
        },
        {
          type: "code",
          language: "typescript",
          code: `// 用矩阵列理解变换
// 旋转矩阵的3列 = 变换后的3个基向量
const rotY90 = [
  0, 0, 1,   // 第1列：原 x 轴 → 指向 (0,0,1)
  0, 1, 0,   // 第2列：原 y 轴 → 保持不变 (0,1,0)
 -1, 0, 0,   // 第3列：原 z 轴 → 指向 (-1,0,0)
]

// 验证：模型空间点 (1, 0, 0) 变换后
// = 1 * col1 + 0 * col2 + 0 * col3 = (0, 0, -1) ✓
// 原来的"右边"变成了"前面"（绕Y转90°）`,
        },
      ],
    },
    {
      title: "4.9 矩阵与线性变换",
      blocks: [
        {
          type: "text",
          html: `
            <p>在数学上，矩阵乘法实现的是<strong>线性变换（Linear Transformation）</strong>。线性变换有两个关键性质：</p>
            <ol>
              <li><strong>保持加法</strong>：f(u + v) = f(u) + f(v)</li>
              <li><strong>保持标量乘法</strong>：f(kv) = k f(v)</li>
            </ol>
          `,
        },
        {
          type: "text",
          html: `
            <p>在 3D 图形学中，常见的线性变换包括：</p>
          `,
        },
        {
          type: "definition",
          title: "旋转（Rotation）",
          body: '改变向量的方向但<strong>不改变其长度</strong>。旋转矩阵的列是<strong>单位向量</strong>且<strong>互相正交</strong>（垂直）。每个列的长度都为 1。旋转不改变原点位置。',
        },
        {
          type: "definition",
          title: "缩放（Scale）",
          body: '改变向量的长度但<strong>不改变其方向</strong>（均匀缩放）或<strong>在不同轴上以不同比例缩放</strong>（非均匀缩放）。缩放矩阵通常是对角矩阵。',
        },
        {
          type: "definition",
          title: "投影（Projection）",
          body: '将高维空间"压扁"到低维空间。例如将 3D 物体投影到 2D 屏幕上。投影矩阵通常有<strong>全零的列</strong>（某个维度被消除）或<strong>全为零的行</strong>。',
        },
        {
          type: "definition",
          title: "反射（Reflection）",
          body: '将物体沿某个平面"镜像"。反射矩阵的<strong>行列式为 -1</strong>。例如，沿 yz 平面反射（x 取反）的矩阵是 diag(-1, 1, 1)。',
        },
        {
          type: "definition",
          title: "剪切（Shear）",
          body: '将物体"倾斜"——一个坐标分量保持不变，另一个分量加上它的倍数。剪切矩阵的非对角线上有非零值。例如，沿 x 方向剪切 y：x\' = x + ky。',
        },
        {
          type: "note",
          level: "tip",
          body: "<strong>重要限制：</strong>3×3 矩阵只能表示<strong>线性变换</strong>，不能表示<strong>平移</strong>（Translation）。因为线性变换必须保持原点不变——f(0) = 0。要实现平移，需要 4×4 的<strong>齐次矩阵</strong>（将在第 6 章详解）。第 5 章将用具体的 3×3 矩阵构建这些变换。",
        },
      ],
    },
    {
      title: "4.10 矩阵运算总结",
      blocks: [
        {
          type: "text",
          html: `
            <p>以下是本章涉及的矩阵运算和性质的汇总，供后续章节快速查阅：</p>
          `,
        },
        {
          type: "text",
          html: `
            <table style="width:100%; border-collapse: collapse; margin: 1em 0; font-size: 0.92em;">
              <tr style="background: #f3f4f6;">
                <th style="padding: 8px 12px; border: 1px solid #ddd; text-align: left;">运算 / 性质</th>
                <th style="padding: 8px 12px; border: 1px solid #ddd; text-align: left;">公式</th>
                <th style="padding: 8px 12px; border: 1px solid #ddd; text-align: left;">说明</th>
              </tr>
              <tr><td style="padding: 6px 12px; border: 1px solid #ddd;">标量乘法</td><td style="padding: 6px 12px; border: 1px solid #ddd;">(kM)<sub>ij</sub> = k · M<sub>ij</sub></td><td style="padding: 6px 12px; border: 1px solid #ddd;">每个元素乘 k</td></tr>
              <tr style="background: #f9fafb;"><td style="padding: 6px 12px; border: 1px solid #ddd;">矩阵乘法</td><td style="padding: 6px 12px; border: 1px solid #ddd;">(AB)<sub>ij</sub> = Σ A<sub>ik</sub> B<sub>kj</sub></td><td style="padding: 6px 12px; border: 1px solid #ddd;">行×列的点积</td></tr>
              <tr><td style="padding: 6px 12px; border: 1px solid #ddd;">向量乘法</td><td style="padding: 6px 12px; border: 1px solid #ddd;">(Mv)<sub>i</sub> = Σ M<sub>ik</sub> v<sub>k</sub></td><td style="padding: 6px 12px; border: 1px solid #ddd;">矩阵行·向量点积</td></tr>
              <tr style="background: #f9fafb;"><td style="padding: 6px 12px; border: 1px solid #ddd;">结合律</td><td style="padding: 6px 12px; border: 1px solid #ddd;">(AB)C = A(BC)</td><td style="padding: 6px 12px; border: 1px solid #ddd;">变换可合并</td></tr>
              <tr><td style="padding: 6px 12px; border: 1px solid #ddd;">不交换</td><td style="padding: 6px 12px; border: 1px solid #ddd;">AB ≠ BA（一般）</td><td style="padding: 6px 12px; border: 1px solid #ddd;">顺序很重要！</td></tr>
              <tr style="background: #f9fafb;"><td style="padding: 6px 12px; border: 1px solid #ddd;">转置</td><td style="padding: 6px 12px; border: 1px solid #ddd;">(Mᵀ)<sub>ij</sub> = M<sub>ji</sub></td><td style="padding: 6px 12px; border: 1px solid #ddd;">行列互换</td></tr>
              <tr><td style="padding: 6px 12px; border: 1px solid #ddd;">乘积转置</td><td style="padding: 6px 12px; border: 1px solid #ddd;">(AB)ᵀ = BᵀAᵀ</td><td style="padding: 6px 12px; border: 1px solid #ddd;">逆序转置</td></tr>
              <tr style="background: #f9fafb;"><td style="padding: 6px 12px; border: 1px solid #ddd;">单位矩阵</td><td style="padding: 6px 12px; border: 1px solid #ddd;">MI = IM = M</td><td style="padding: 6px 12px; border: 1px solid #ddd;">乘法的"1"</td></tr>
              <tr><td style="padding: 6px 12px; border: 1px solid #ddd;">几何意义</td><td style="padding: 6px 12px; border: 1px solid #ddd;">列 = 基向量</td><td style="padding: 6px 12px; border: 1px solid #ddd;">矩阵=坐标空间</td></tr>
            </table>
          `,
        },
        {
          type: "text",
          html: `
            <h3>本章小结</h3>
            <p>本章介绍了矩阵的基本概念和运算，这是后续所有变换章节的基础：</p>
            <ul>
              <li>✅ 矩阵的数学定义（m×n 阵列，元素下标）</li>
              <li>✅ 方阵、对角矩阵、单位矩阵的定义和用途</li>
              <li>✅ 向量作为矩阵（行向量 vs 列向量的区别）</li>
              <li>✅ 矩阵转置的定义、公式和代码实现</li>
              <li>✅ 标量乘法、矩阵×矩阵、矩阵×向量的运算规则</li>
              <li>✅ <strong>矩阵乘法的几何意义：变换的组合（右到左应用）</strong></li>
              <li>✅ <strong>矩阵的列 = 变换后的基向量</strong>（核心洞察）</li>
              <li>✅ 常见线性变换类型：旋转、缩放、投影、反射、剪切</li>
              <li>✅ 3×3 矩阵的局限（不能平移）——预告 4×4 齐次矩阵</li>
            </ul>
            <p>第 5 章将深入：如何用具体的矩阵来实现旋转、缩放、投影等变换，以及如何将多个变换组合成复杂的运动。</p>
          `,
        },
      ],
    },
  ],
}

export default content
