import type { ChapterContent } from "@/components/content/types"

const content: ChapterContent = {
  id: "2",
  title: "向量",
  sections: [
    {
      title: "2.1 向量——数学定义",
      blocks: [
        {
          type: "intro",
        },
        {
          type: "text",
          html: `
            <p>在数学中，<strong>向量（Vector）</strong>和<strong>标量（Scalar）</strong>是两个最基本的概念。理解它们的区别是掌握所有后续内容的前提。</p>
          `,
        },
        {
          type: "definition",
          title: "定义: 标量与向量",
          body: '<strong>标量（Scalar）</strong>：仅有大小而无方向的量。例如：温度、质量、时间、长度。<br/><br/><strong>向量（Vector）</strong>：同时拥有<strong>大小（模长）</strong>和<strong>方向</strong>的量。例如：位移、速度、力。',
        },
        {
          type: "text",
          html: `
            <p>在数学上，一个 <em>n</em> 维向量就是 <em>n</em> 个有序实数的列表。通常写作：</p>
          `,
        },
        {
          type: "formula",
          latex: `\\mathbf{v} = \\begin{bmatrix} v_1 \\\\ v_2 \\\\ \\vdots \\\\ v_n \\end{bmatrix}, \\quad v_i \\in \\mathbb{R}`,
          note: "n 维向量的通用形式。v₁, v₂, …, vₙ 称为向量的分量（components）。",
        },
        {
          type: "text",
          html: `
            <p>在游戏开发和图形学中，我们几乎只用到 2D、3D 和 4D 向量。4D 向量主要用于齐次坐标（将在第 6 章详解）。本书中如无特别说明，"向量"默认指<strong>三维向量</strong>。</p>
          `,
        },
        {
          type: "note",
          level: "tip",
          body: "<strong>向量的维度 = 所需坐标的个数。</strong>一维向量就是标量。二维向量描述平面上的位移，三维向量描述空间中的位移。维度的概念自然地扩展到任意正整数 n。",
        },
      ],
    },
    {
      title: "2.2 向量——几何定义",
      blocks: [
        {
          type: "text",
          html: `
            <p>从几何角度看，向量是一个<strong>带有方向的线段（有向线段）</strong>。它有<strong>长度（模长 magnitude）</strong>和<strong>指向（方向 direction）</strong>两个属性。</p>
            <p>在纸上，我们用<strong>箭头</strong>来表示向量：箭头的长度代表向量的大小，箭头的指向代表向量的方向。</p>
          `,
        },
        {
          type: "definition",
          title: "定义: 向量的几何属性",
          body: '一个向量由两个要素完全确定：<br/><br/><strong>模长（Magnitude）</strong>：向量箭头的长度，记作 |<em>v</em>| 或 ‖<em>v</em>‖。恒为非负实数。<br/><br/><strong>方向（Direction）</strong>：向量箭头的指向。方向相同的向量有相同指向；方向相反的向量互为反向向量。<br/><br/><strong>注意：</strong>向量的位置<em>不重要</em>——一个有向线段无论画在哪里，只要长度和指向相同，就代表同一个向量。这称为向量的<strong>平移不变性</strong>。',
        },
        {
          type: "text",
          html: `
            <h3>特殊向量</h3>
            <ul>
              <li><strong>零向量（Zero Vector）</strong>：模长为 0 的向量，记作 <strong>0</strong>。它是唯一没有方向的向量。<strong>零向量不是"没有向量"，而是"位移为零"。</strong></li>
              <li><strong>单位向量（Unit Vector）</strong>：模长恰好为 1 的向量。它们仅表示方向，不表示大小。</li>
            </ul>
          `,
        },
        {
          type: "illustration",
          caption: "图 2.1 — 向量的几何表示：有向线段，模长与方向",
          width: 480,
          height: 280,
          svg: `<svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg"><defs><marker id="a22" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#e35947"/></marker><marker id="a23" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#2e9978"/></marker></defs><rect width="480" height="280" fill="#faf8f5" rx="8"/><g stroke="#e8e4de" stroke-width="0.5"><line x1="30" y1="140" x2="450" y2="140"/><line x1="30" y1="70" x2="450" y2="70"/><line x1="30" y1="210" x2="450" y2="210"/><line x1="60" y1="30" x2="60" y2="250"/><line x1="180" y1="30" x2="180" y2="250"/><line x1="300" y1="30" x2="300" y2="250"/><line x1="420" y1="30" x2="420" y2="250"/></g><line x1="120" y1="180" x2="320" y2="60" stroke="#e35947" stroke-width="2.5" marker-end="url(#a22)"/><text x="200" y="105" fill="#c53030" font-size="13" font-weight="700">v</text><text x="240" y="135" fill="#e35947" font-size="11">模长 |v|</text><line x1="320" y1="200" x2="440" y2="100" stroke="#2e9978" stroke-width="2.5" marker-end="url(#a23)"/><text x="385" y="140" fill="#166534" font-size="13" font-weight="700">w</text><circle cx="100" cy="100" r="3" fill="#999"/><text x="60" y="95" fill="#888" font-size="11">零向量 0</text><path d="M 140 210 A 50 50 0 0 1 175 183" fill="none" stroke="#aaa" stroke-width="1"/><text x="120" y="225" fill="#999" font-size="10">方向</text></svg>`,
        },
      ],
    },
    {
      title: "2.3 向量与点的区别",
      blocks: [
        {
          type: "text",
          html: `
            <p>初学者经常混淆向量和点。它们确实很像——在笛卡尔坐标系中，点和向量都可以用 (x, y, z) 三元组表示。但它们的<strong>语义</strong>完全不同：</p>
            <ul>
              <li><strong>点（Point）</strong>：表示一个<strong>位置</strong>——"我在哪里"</li>
              <li><strong>向量（Vector）</strong>：表示一个<strong>位移</strong>——"往哪个方向、走多远"</li>
            </ul>
          `,
        },
        {
          type: "note",
          level: "info",
          body: '<strong>直觉理解：</strong>如果把空间想象成一张地图：<br/><br/>• <strong>点</strong>就像一个城市的位置——北京在东经116°、北纬40°<br/>• <strong>向量</strong>就像从一个城市到另一个城市的航线——从北京出发，朝东南方向飞行 1200 公里<br/><br/>点描述<strong>绝对位置</strong>，向量描述<strong>相对位移</strong>。',
        },
        {
          type: "text",
          html: `
            <p>点和向量之间存在一个重要的关系：</p>
            <p style="text-align: center; font-size: 1.1em; padding: 1rem 0;">
              <strong>终点 = 起点 + 位移向量</strong>
            </p>
            <p>换句话说，从点 P 到点 Q 的向量 = Q − P。这是向量与点之间最基本的桥梁。</p>
          `,
        },
        {
          type: "formula",
          latex: `\\overrightarrow{PQ} = \\mathbf{Q} - \\mathbf{P}`,
          note: "从点 P 到点 Q 的位移向量等于终点坐标减去起点坐标",
        },
      ],
    },
    {
      title: "2.4 用笛卡尔坐标表示向量",
      blocks: [
        {
          type: "text",
          html: `
            <p>有了第 1 章的笛卡尔坐标系基础，我们可以用<strong>坐标分量</strong>来精确表示向量。对于一个 3D 向量，如果我们把它"平移"到原点，它的箭头尖端就恰好落在坐标 (x, y, z) 处——这三个数就是向量的分量。</p>
          `,
        },
        {
          type: "formula",
          latex: `\\mathbf{v} = \\begin{bmatrix} x \\\\ y \\\\ z \\end{bmatrix} = (x, y, z)`,
          note: "向量的分量表示。本书使用粗体 v 表示向量，其分量用小写英文字母表示。",
        },
        {
          type: "text",
          html: `
            <p>在本书中，我们把向量写成<strong>列向量（Column Vector）</strong>形式。在行文中为节约空间也常写成行形式 (x, y, z)。分量 x, y, z 分别表示在 x 轴、y 轴、z 轴方向上的"步数"。</p>
            <p>对于 2D 向量：</p>
          `,
        },
        {
          type: "formula",
          latex: `\\mathbf{v} = \\begin{bmatrix} x \\\\ y \\end{bmatrix}`,
          note: "2D 向量只需两个分量",
        },
        {
          type: "note",
          level: "tip",
          body: "<strong>分量的直观含义：</strong>向量 (3, 4, 0) 意味着：沿 x 轴走 3 步，沿 y 轴走 4 步，z 方向不动。这恰好是从原点到点 (3, 4, 0) 的位移。",
        },
      ],
    },
    {
      title: "2.5 向量的取反",
      blocks: [
        {
          type: "text",
          html: `
            <p>对任意向量 <strong>v</strong>，其<strong>相反向量（negative vector）</strong> −<strong>v</strong> 被定义为：与 <strong>v</strong> 模长相等但方向完全相反的向量。</p>
            <p>从代数角度看，取反操作是对每个分量取反：</p>
          `,
        },
        {
          type: "formula",
          latex: `-\\mathbf{v} = -\\begin{bmatrix} x \\\\ y \\\\ z \\end{bmatrix} = \\begin{bmatrix} -x \\\\ -y \\\\ -z \\end{bmatrix}`,
          note: "向量取反：每个分量取相反数",
        },
        {
          type: "text",
          html: `
            <p>几何上，把向量箭头旋转 180° 即可得到其相反向量。这个操作在物理中特别常用——例如，如果 v 代表"向右走 5 米"，那么 −v 就是"向左走 5 米"。</p>
          `,
        },
      ],
    },
    {
      title: "2.6 向量与标量的乘法",
      blocks: [
        {
          type: "text",
          html: `
            <p><strong>标量乘法（Scalar Multiplication）</strong>是将向量的每个分量同时乘以同一个标量：</p>
          `,
        },
        {
          type: "formula",
          latex: `k \\mathbf{v} = k \\begin{bmatrix} x \\\\ y \\\\ z \\end{bmatrix} = \\begin{bmatrix} kx \\\\ ky \\\\ kz \\end{bmatrix}`,
          note: "标量乘法：每个分量乘以标量 k",
        },
        {
          type: "text",
          html: `
            <p>标量乘法的<strong>几何效果</strong>一目了然：</p>
            <ul>
              <li><strong>k > 1</strong>：向量被<strong>拉长</strong>为原来的 k 倍（方向不变）</li>
              <li><strong>0 < k < 1</strong>：向量被<strong>缩短</strong>（方向不变）</li>
              <li><strong>k = 0</strong>：结果为零向量</li>
              <li><strong>k < 0</strong>：向量<strong>反向</strong>并缩放 |k| 倍</li>
            </ul>
          `,
        },
        {
          type: "note",
          level: "info",
          body: "标量乘法最常见的用途之一是<strong>归一化（Normalization）</strong>——将向量除以其模长，得到一个方向相同但长度为 1 的单位向量。归一化公式为：<em>v̂ = v / |v|</em>。单位向量在表示方向时非常有用。",
        },
      ],
    },
    {
      title: "2.7 向量的加法与减法",
      blocks: [
        {
          type: "text",
          html: `
            <p>两个向量的<strong>加法</strong>和<strong>减法</strong>是按分量进行的：</p>
          `,
        },
        {
          type: "formula",
          latex: `\\mathbf{a} + \\mathbf{b} = \\begin{bmatrix} a_x + b_x \\\\ a_y + b_y \\\\ a_z + b_z \\end{bmatrix}`,
          note: "向量加法：对应分量相加",
        },
        {
          type: "formula",
          latex: `\\mathbf{a} - \\mathbf{b} = \\begin{bmatrix} a_x - b_x \\\\ a_y - b_y \\\\ a_z - b_z \\end{bmatrix}`,
          note: "向量减法：对应分量相减。注意 a − b = a + (−b)",
        },
        {
          type: "text",
          html: `
            <h3>向量加法的几何解释</h3>
            <p>向量加法有两个等效的几何解释：</p>
            <ul>
              <li><strong>三角形法则（Triangle Rule）</strong>：将 <strong>b</strong> 的起点"平移"到 <strong>a</strong> 的终点，然后从 <strong>a</strong> 的起点画到 <strong>b</strong> 的终点。形象地说就是"首尾相接"。</li>
              <li><strong>平行四边形法则（Parallelogram Rule）</strong>：将 <strong>a</strong> 和 <strong>b</strong> 的起点对齐，以它们为邻边作平行四边形，对角线就是和向量。</li>
            </ul>
          `,
        },
        {
          type: "text",
          html: `
            <h3>向量减法的几何解释</h3>
            <p><strong>a − b</strong> 就相当于 <strong>a + (−b)</strong>。从几何上看，a − b 是从 <strong>b 的终点指向 a 的终点</strong>的向量。</p>
            <p>这恰好印证了我们在 2.3 节中的结论：<em>从点 B 到点 A 的位移 = A − B</em>。</p>
          `,
        },
        {
          type: "illustration",
          caption: "图 2.2 — 向量加法：平行四边形法则与三角形法则",
          width: 500,
          height: 320,
          svg: `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg"><defs><marker id="b1" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#e35947"/></marker><marker id="b2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#2e9978"/></marker><marker id="b3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#eab308"/></marker></defs><rect width="500" height="320" fill="#faf8f5" rx="8"/><g stroke="#e8e4de" stroke-width="0.5"><line x1="30" y1="160" x2="470" y2="160"/><line x1="30" y1="80" x2="470" y2="80"/><line x1="30" y1="240" x2="470" y2="240"/><line x1="70" y1="30" x2="70" y2="290"/><line x1="200" y1="30" x2="200" y2="290"/><line x1="330" y1="30" x2="330" y2="290"/><line x1="460" y1="30" x2="460" y2="290"/></g><!-- Vector a (red) --><line x1="100" y1="220" x2="300" y2="100" stroke="#e35947" stroke-width="2.5" marker-end="url(#b1)"/><text x="180" y="145" fill="#c53030" font-size="13" font-weight="700">a</text><!-- Vector b (green) from origin --><line x1="100" y1="220" x2="210" y2="270" stroke="#2e9978" stroke-width="2.5" marker-end="url(#b2)"/><text x="145" y="265" fill="#166534" font-size="13" font-weight="700">b</text><!-- Dashed copies for parallelogram --><line x1="210" y1="270" x2="410" y2="150" stroke="#e35947" stroke-width="1.5" stroke-dasharray="6,4"/><line x1="300" y1="100" x2="410" y2="150" stroke="#2e9978" stroke-width="1.5" stroke-dasharray="6,4"/><!-- Sum vector a+b (gold, diagonal) --><line x1="100" y1="220" x2="410" y2="150" stroke="#eab308" stroke-width="2.5" marker-end="url(#b3)"/><text x="260" y="195" fill="#a16207" font-size="13" font-weight="700">a + b</text><!-- Triangle alternative --><text x="350" y="280" fill="#888" font-size="11">※ 三角形法则：b的起点</text><text x="350" y="295" fill="#888" font-size="11">平移到a的终点</text></svg>`,
        },
      ],
    },
    {
      title: "2.8 向量的模长",
      blocks: [
        {
          type: "text",
          html: `
            <p>向量的<strong>模长（Magnitude / Length / Norm）</strong>是该向量所代表的位移的"长度"。由勾股定理可以导出：</p>
          `,
        },
        {
          type: "formula",
          latex: `|\\mathbf{v}| = \\sqrt{v_x^2 + v_y^2 + v_z^2}`,
          note: "3D 向量的模长：各分量平方和的平方根",
        },
        {
          type: "formula",
          latex: `|\\mathbf{v}| = \\sqrt{v_x^2 + v_y^2}`,
          note: "2D 向量的模长",
        },
        {
          type: "text",
          html: `
            <p>模长公式就是 n 维空间的勾股定理。注意：</p>
            <ul>
              <li>模长<strong>永远是 ≥ 0 的实数</strong>。只有零向量的模长为 0。</li>
              <li><strong>标量乘法对模长的影响</strong>：|<em>k</em><strong>v</strong>| = |<em>k</em>| · |<strong>v</strong>|</li>
            </ul>
          `,
        },
        {
          type: "code",
          language: "typescript",
          code: `// 向量模长计算
function magnitude(v: { x: number; y: number; z: number }): number {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z)
}

// 平方模长（避免 sqrt，性能更优）
function magnitudeSquared(v: { x: number; y: number; z: number }): number {
  return v.x * v.x + v.y * v.y + v.z * v.z
}`,
        },
      ],
    },
    {
      title: "2.9 单位向量与归一化",
      blocks: [
        {
          type: "text",
          html: `
            <p><strong>归一化（Normalization）</strong>是将任意非零向量转化为<strong>单位向量</strong>（模长为 1 的向量）的过程。单位向量只携带方向信息，广泛应用于光照计算、法线、方向表示等场景。</p>
          `,
        },
        {
          type: "formula",
          latex: `\\hat{\\mathbf{v}} = \\frac{\\mathbf{v}}{|\\mathbf{v}|}, \\quad \\mathbf{v} \\neq \\mathbf{0}`,
          note: '归一化公式：向量除以其模长，得到同方向的单位向量 v̂（读作 v-hat）',
        },
        {
          type: "text",
          html: `
            <h3>标准基向量</h3>
            <p>在 3D 空间中，有三个特别重要的单位向量，分别指向 x、y、z 轴的正方向：</p>
          `,
        },
        {
          type: "formula",
          latex: `\\mathbf{i} = \\begin{bmatrix} 1 \\\\ 0 \\\\ 0 \\end{bmatrix}, \\quad \\mathbf{j} = \\begin{bmatrix} 0 \\\\ 1 \\\\ 0 \\end{bmatrix}, \\quad \\mathbf{k} = \\begin{bmatrix} 0 \\\\ 0 \\\\ 1 \\end{bmatrix}`,
          note: "标准基向量（Standard Basis Vectors）：i 沿 +x，j 沿 +y，k 沿 +z",
        },
        {
          type: "code",
          language: "typescript",
          code: `// 向量归一化
function normalize(v: { x: number; y: number; z: number }): {
  x: number; y: number; z: number
} | null {
  const mag = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z)
  if (mag === 0) return null  // 零向量无法归一化
  return { x: v.x / mag, y: v.y / mag, z: v.z / mag }
}`,
        },
      ],
    },
    {
      title: "2.10 使用向量计算距离",
      blocks: [
        {
          type: "text",
          html: `
            <p>回顾第 1 章的两点距离公式，我们现在可以用向量来优雅地重新表述：</p>
            <p style="text-align: center; padding: 1rem 0;">
              <strong>两点 P 和 Q 之间的距离 = |Q − P|</strong>
            </p>
            <p>即：先计算从 P 到 Q 的位移向量，然后取它的模长。</p>
          `,
        },
        {
          type: "formula",
          latex: `d(P, Q) = |\\mathbf{Q} - \\mathbf{P}| = \\sqrt{(Q_x - P_x)^2 + (Q_y - P_y)^2 + (Q_z - P_z)^2}`,
          note: "距离 = 位移向量的模长",
        },
      ],
    },
    {
      title: "2.11 向量的点积",
      blocks: [
        {
          type: "text",
          html: `
            <p><strong>点积（Dot Product / Inner Product）</strong>是向量运算中最重要的工具之一。它将两个向量映射为一个标量。</p>
          `,
        },
        {
          type: "definition",
          title: "定义: 点积的代数形式",
          body: '对两个向量 <strong>a</strong> = (aₓ, aᵧ, a<sub>z</sub>) 和 <strong>b</strong> = (bₓ, bᵧ, b<sub>z</sub>)，它们的<strong>点积</strong>为：<br/><br/><em><strong>a</strong> · <strong>b</strong> = aₓbₓ + aᵧbᵧ + a<sub>z</sub>b<sub>z</sub></em><br/><br/>结果是一个标量（普通的实数），<strong>不是</strong>向量。',
        },
        {
          type: "formula",
          latex: `\\mathbf{a} \\cdot \\mathbf{b} = a_x b_x + a_y b_y + a_z b_z`,
          note: "点积：对应分量乘积之和",
        },
        {
          type: "text",
          html: `
            <h3>点积的几何解释</h3>
            <p>点积有一个极其优美的几何定义：</p>
          `,
        },
        {
          type: "formula",
          latex: `\\mathbf{a} \\cdot \\mathbf{b} = |\\mathbf{a}| |\\mathbf{b}| \\cos\\theta`,
          note: "点积的几何形式：两向量模长乘以夹角的余弦",
        },
        {
          type: "text",
          html: `
            <p>这个公式揭示了点积的几个关键性质：</p>
            <ul>
              <li><strong>a · b > 0</strong>：夹角 < 90°（锐角，两向量大致同向）</li>
              <li><strong>a · b = 0</strong>：夹角 = 90°（垂直/<strong>正交</strong>）</li>
              <li><strong>a · b < 0</strong>：夹角 > 90°（钝角，两向量大致反向）</li>
            </ul>
            <p>由几何形式可以反推出<strong>两向量夹角的计算公式</strong>：</p>
          `,
        },
        {
          type: "formula",
          latex: `\\cos\\theta = \\frac{\\mathbf{a} \\cdot \\mathbf{b}}{|\\mathbf{a}| |\\mathbf{b}|}, \\quad \\theta = \\arccos\\left(\\frac{\\mathbf{a} \\cdot \\mathbf{b}}{|\\mathbf{a}| |\\mathbf{b}|}\\right)`,
          note: "用点积计算两向量之间的夹角",
        },
        {
          type: "text",
          html: `
            <h3>投影</h3>
            <p>在图形学中，经常需要将向量 <strong>a</strong> 投影到向量 <strong>b</strong> 的方向上：</p>
          `,
        },
        {
          type: "formula",
          latex: `\\text{proj}_{\\mathbf{b}} \\mathbf{a} = \\frac{\\mathbf{a} \\cdot \\mathbf{b}}{|\\mathbf{b}|^2} \\mathbf{b}`,
          note: "a 在 b 方向上的投影向量",
        },
        {
          type: "formula",
          latex: `\\text{proj}_{\\mathbf{b}} \\mathbf{a} = (\\mathbf{a} \\cdot \\hat{\\mathbf{b}}) \\hat{\\mathbf{b}}`,
          note: "投影的简洁形式：当 b 是单位向量时，投影 = (a·b̂) b̂",
        },
        {
          type: "illustration",
          caption: "图 2.3 — 点积的几何意义：夹角 θ 与向量 b 在 a 上的投影",
          width: 500,
          height: 300,
          svg: `<svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg"><defs><marker id="c1" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#e35947"/></marker><marker id="c2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#2e9978"/></marker><marker id="c3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#eab308"/></marker></defs><rect width="500" height="300" fill="#faf8f5" rx="8"/><g stroke="#e8e4de" stroke-width="0.5"><line x1="30" y1="200" x2="470" y2="200"/><line x1="80" y1="40" x2="80" y2="260"/><line x1="210" y1="40" x2="210" y2="260"/><line x1="340" y1="40" x2="340" y2="260"/></g><!-- Vector a (red) along x-axis --><line x1="80" y1="200" x2="340" y2="200" stroke="#e35947" stroke-width="2.5" marker-end="url(#c1)"/><text x="200" y="192" fill="#c53030" font-size="13" font-weight="700">a</text><!-- Vector b (green) at angle --><line x1="80" y1="200" x2="210" y2="100" stroke="#2e9978" stroke-width="2.5" marker-end="url(#c2)"/><text x="130" y="135" fill="#166534" font-size="13" font-weight="700">b</text><!-- Angle arc --><path d="M 170 200 A 90 90 0 0 0 145 143" fill="none" stroke="#888" stroke-width="1.2"/><text x="130" y="175" fill="#666" font-size="11">θ</text><!-- Projection of b onto a (gold) --><line x1="80" y1="200" x2="210" y2="200" stroke="#eab308" stroke-width="3" marker-end="url(#c3)"/><text x="130" y="215" fill="#a16207" font-size="12" font-weight="600">proj_b a</text><!-- Dashed perpendicular --><line x1="210" y1="200" x2="210" y2="100" stroke="#2e9978" stroke-width="1" stroke-dasharray="4,3" opacity="0.5"/><!-- Formula --><text x="250" y="75" fill="#666" font-size="12">a\u00b7b = |a||b|cos(θ)</text><text x="250" y="105" fill="#999" font-size="11">cos(θ) = (a\u00b7b) / (|a||b|)</text><text x="250" y="125" fill="#999" font-size="11">投影长度 = |b|cos(θ)</text></svg>`,
        },
        {
          type: "code",
          language: "typescript",
          code: `// 点积计算与夹角
function dot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z
}

function angleBetween(a: Vec3, b: Vec3): number {
  const dotProduct = dot(a, b)
  const magA = Math.sqrt(dot(a, a))
  const magB = Math.sqrt(dot(b, b))
  return Math.acos(dotProduct / (magA * magB))
}

// a 在 b 上的投影
function project(a: Vec3, b: Vec3): Vec3 {
  const bMagSq = dot(b, b)
  if (bMagSq === 0) return { x: 0, y: 0, z: 0 }
  const scalar = dot(a, b) / bMagSq
  return { x: b.x * scalar, y: b.y * scalar, z: b.z * scalar }
}`,
        },
      ],
    },
    {
      title: "2.12 向量的叉积",
      blocks: [
        {
          type: "text",
          html: `
            <p><strong>叉积（Cross Product）</strong>是另一个重要的向量运算。与点积不同，叉积的结果<strong>是一个向量</strong>（而非标量），且<strong>叉积只在 3D 空间中有定义</strong>。</p>
          `,
        },
        {
          type: "definition",
          title: "定义: 叉积",
          body: '对两个 3D 向量 <strong>a</strong> 和 <strong>b</strong>，它们的叉积 <strong>a × b</strong> 是一个同时<strong>垂直于 a 和 b</strong> 的新向量，其方向由<strong>右手定则</strong>确定，其模长为 |<strong>a</strong>| |<strong>b</strong>| sin θ。<br/><br/>换句话说，<strong>a × b</strong> 是 a 和 b 所张成平面的<strong>法向量（Normal Vector）</strong>。',
        },
        {
          type: "formula",
          latex: `\\mathbf{a} \\times \\mathbf{b} = \\begin{bmatrix} a_y b_z - a_z b_y \\\\ a_z b_x - a_x b_z \\\\ a_x b_y - a_y b_x \\end{bmatrix}`,
          note: "叉积的代数公式（分量形式）。记忆技巧：x 分量不含 aₓ 和 bₓ，y 分量不含 aᵧ 和 bᵧ……",
        },
        {
          type: "text",
          html: `
            <h3>叉积的几何意义</h3>
            <p>叉积 <strong>a × b</strong> 的<strong>模长</strong>等于以 a 和 b 为邻边的平行四边形的<strong>面积</strong>：</p>
          `,
        },
        {
          type: "formula",
          latex: `|\\mathbf{a} \\times \\mathbf{b}| = |\\mathbf{a}| |\\mathbf{b}| \\sin\\theta = \\text{平行四边形面积}`,
          note: "叉积模长 = 平行四边形面积",
        },
        {
          type: "text",
          html: `
            <h3>右手定则确定方向</h3>
            <p>叉积的方向遵循<strong>右手定则</strong>：伸出右手，四指从 <strong>a</strong> 弯曲到 <strong>b</strong>（沿较小角度），拇指所指的方向就是 <strong>a × b</strong> 的方向。</p>
            <p><strong>重要性质（反对称性）</strong>：a × b = −(b × a)。交换顺序会<strong>反转</strong>结果向量的方向。</p>
          `,
        },
        {
          type: "demo",
          demoId: "cross-product",
        },
        {
          type: "code",
          language: "typescript",
          code: `// 叉积计算
interface Vec3 { x: number; y: number; z: number }

function cross(a: Vec3, b: Vec3): Vec3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  }
}

// 用例：已知三角形三个顶点，计算面法向量
function triangleNormal(v0: Vec3, v1: Vec3, v2: Vec3): Vec3 {
  const edge1 = { x: v1.x - v0.x, y: v1.y - v0.y, z: v1.z - v0.z }
  const edge2 = { x: v2.x - v0.x, y: v2.y - v0.y, z: v2.z - v0.z }
  return cross(edge1, edge2)
  // 注意：该法向量需归一化后使用
}`,
        },
        {
          type: "text",
          html: `
            <h3>法向量（Normal Vector）深入理解</h3>
            <p><strong>法向量</strong>是垂直于某个平面或曲面的向量。在 3D 图形学中，法向量是<strong>最重要的概念之一</strong>——没有法向量，我们无法计算光照、无法判断面的朝向、无法做碰撞检测。</p>
            <p>叉积是生成法向量的主要工具：给定平面上的两个不共线向量 a 和 b，a × b 就是这个平面的一个法向量。</p>
          `,
        },
        {
          type: "illustration",
          caption: "图 2.4 — 三角形的面法向量：由两条边的叉积得到，垂直于三角形平面",
          width: 480,
          height: 320,
          svg: `<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg"><defs><marker id="n1" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#e35947"/></marker><marker id="n2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#2e9978"/></marker><marker id="n3" markerWidth="10" markerHeight="8" refX="10" refY="4" orient="auto"><path d="M0,0 L10,4 L0,8 Z" fill="#a659db"/></marker></defs><rect width="480" height="320" fill="#faf8f5" rx="8"/><!-- Triangle v0-v1-v2 --><polygon points="120,240 340,200 220,70" fill="#e8e4f0" stroke="#888" stroke-width="1.5"/><text x="120" y="258" fill="#555" font-size="12" font-weight="600">v0</text><text x="348" y="198" fill="#555" font-size="12" font-weight="600">v1</text><text x="202" y="62" fill="#555" font-size="12" font-weight="600">v2</text><!-- Edge vectors --><line x1="120" y1="240" x2="340" y2="200" stroke="#e35947" stroke-width="2" marker-end="url(#n1)"/><text x="220" y="228" fill="#c53030" font-size="11" font-weight="600">e1 = v1-v0</text><line x1="120" y1="240" x2="220" y2="70" stroke="#2e9978" stroke-width="2" marker-end="url(#n2)"/><text x="140" y="158" fill="#166534" font-size="11" font-weight="600">e2 = v2-v0</text><!-- Normal vector (purple, going up) --><line x1="227" y1="170" x2="227" y2="50" stroke="#a659db" stroke-width="2.5" marker-end="url(#n3)"/><text x="210" y="45" fill="#7c3aed" font-size="13" font-weight="700">n = e1 × e2</text><!-- Perpendicular indicator --><rect x="218" y="161" width="18" height="18" fill="none" stroke="#a659db" stroke-width="1" rx="2"/><line x1="218" y1="179" x2="227" y2="170" stroke="#a659db" stroke-width="0.8"/><!-- Annotation --><text x="280" y="100" fill="#666" font-size="11">n 垂直于三角形平面</text><text x="280" y="118" fill="#999" font-size="10">n 的方向由右手定则确定</text><text x="280" y="136" fill="#999" font-size="10">|n| = 三角形面积 × 2</text></svg>`,
        },
        {
          type: "definition",
          title: "面法向量 vs 顶点法向量",
          body: '<strong>面法向量（Face Normal）</strong>：垂直于整个三角形平面的向量。由三角形的两条边的叉积计算，再归一化得到。用于平面着色（Flat Shading）、背面剔除等。<br/><br/><strong>顶点法向量（Vertex Normal）</strong>：每个顶点处定义的向量，通常是该顶点相邻所有面的面法向量的加权平均。用于平滑着色（Smooth Shading，如 Gouraud/Phong），使曲面看起来更光滑。',
        },
        {
          type: "note",
          level: "warning",
          body: "<strong>⚠️ 法向量必须归一化！</strong><br/><br/>在光照计算中，法向量必须是单位向量（长度为 1）。如果使用未归一化的叉积结果作为法向量，光照会异常（过亮或过暗）。<br/><br/>叉积 <strong>a × b</strong> 的模长等于平行四边形面积，而不是 1——所以在用于光照前，务必调用 normalize() 得到单位法向量。<br/><br/>另外注意：法向量的<strong>方向</strong>取决于叉积的<strong>顺序</strong>。在右手坐标系中，按<strong>逆时针</strong>顺序遍历顶点（从前方看），叉积得到的法向量朝向观察者（前方）。",
        },
        {
          type: "text",
          html: `
            <h3>法向量在图形学中的核心应用</h3>
            <ul>
              <li><strong>光照计算（Lighting）</strong>：Lambert 漫反射 = dot(N, L)，其中 N 是法向量，L 是光线方向。N · L 越大，表面越亮；如果 N · L < 0，说明光线来自背面。</li>
              <li><strong>背面剔除（Back-face Culling）</strong>：如果三角形法向量指向远离摄像机的一侧（N · V < 0，V 是视线方向），该三角形不可见，可以直接跳过渲染，节省一半以上的性能。</li>
              <li><strong>碰撞检测（Collision）</strong>：判断点在哪一侧、射线与平面相交、反射向量计算等都需要法向量。</li>
              <li><strong>表面平滑（Smoothing）</strong>：通过对相邻面法向量加权平均，生成顶点法向量，实现曲面视觉效果。</li>
            </ul>
          `,
        },
        {
          type: "code",
          language: "typescript",
          code: `// 法向量完整使用示例
interface Vec3 { x: number; y: number; z: number }

// 计算三角形面法向量（已归一化）
function faceNormal(v0: Vec3, v1: Vec3, v2: Vec3): Vec3 {
  const e1 = { x: v1.x - v0.x, y: v1.y - v0.y, z: v1.z - v0.z }
  const e2 = { x: v2.x - v0.x, y: v2.y - v0.y, z: v2.z - v0.z }
  const cross = {
    x: e1.y * e2.z - e1.z * e2.y,
    y: e1.z * e2.x - e1.x * e2.z,
    z: e1.x * e2.y - e1.y * e2.x,
  }
  // 归一化
  const len = Math.sqrt(cross.x**2 + cross.y**2 + cross.z**2)
  return { x: cross.x / len, y: cross.y / len, z: cross.z / len }
}

// 背面剔除检测
function isBackFace(normal: Vec3, viewDir: Vec3): boolean {
  return normal.x * viewDir.x + normal.y * viewDir.y + normal.z * viewDir.z <= 0
}

// 漫反射光照强度
function diffuseLight(normal: Vec3, lightDir: Vec3): number {
  const dot = normal.x * lightDir.x + normal.y * lightDir.y + normal.z * lightDir.z
  return Math.max(0, dot)  // 负数 = 光照不到, 取 0
}`,
        },
      ],
    },
    {
      title: "2.13 重要线性代数恒等式",
      blocks: [
        {
          type: "text",
          html: `
            <p>以下是向量运算中最常用的恒等式，它们在推导和简化公式时非常有用：</p>
          `,
        },
        {
          type: "text",
          html: `
            <table style="width:100%; border-collapse: collapse; margin: 1em 0; font-size: 0.95em;">
              <tr style="background: #f3f4f6;">
                <th style="padding: 10px 12px; border: 1px solid #ddd; text-align: left;">恒等式</th>
                <th style="padding: 10px 12px; border: 1px solid #ddd; text-align: left;">说明</th>
              </tr>
              <tr>
                <td style="padding: 8px 12px; border: 1px solid #ddd;"><strong>a</strong> · <strong>b</strong> = <strong>b</strong> · <strong>a</strong></td>
                <td style="padding: 8px 12px; border: 1px solid #ddd;">点积满足交换律</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 8px 12px; border: 1px solid #ddd;"><strong>a</strong> × <strong>b</strong> = −(<strong>b</strong> × <strong>a</strong>)</td>
                <td style="padding: 8px 12px; border: 1px solid #ddd;">叉积满足反对称性（不交换）</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; border: 1px solid #ddd;"><strong>a</strong> · (<strong>b</strong> + <strong>c</strong>) = <strong>a</strong> · <strong>b</strong> + <strong>a</strong> · <strong>c</strong></td>
                <td style="padding: 8px 12px; border: 1px solid #ddd;">点积对加法满足分配律</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 8px 12px; border: 1px solid #ddd;"><strong>a</strong> × (<strong>b</strong> + <strong>c</strong>) = <strong>a</strong> × <strong>b</strong> + <strong>a</strong> × <strong>c</strong></td>
                <td style="padding: 8px 12px; border: 1px solid #ddd;">叉积对加法满足分配律</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; border: 1px solid #ddd;">(k<strong>a</strong>) · <strong>b</strong> = k(<strong>a</strong> · <strong>b</strong>)</td>
                <td style="padding: 8px 12px; border: 1px solid #ddd;">标量与点积的结合律</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 8px 12px; border: 1px solid #ddd;">(k<strong>a</strong>) × <strong>b</strong> = k(<strong>a</strong> × <strong>b</strong>)</td>
                <td style="padding: 8px 12px; border: 1px solid #ddd;">标量与叉积的结合律</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; border: 1px solid #ddd;"><strong>a</strong> × <strong>a</strong> = <strong>0</strong></td>
                <td style="padding: 8px 12px; border: 1px solid #ddd;">任何向量与自身的叉积为零向量</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 8px 12px; border: 1px solid #ddd;">|<strong>a</strong>|² = <strong>a</strong> · <strong>a</strong></td>
                <td style="padding: 8px 12px; border: 1px solid #ddd;">向量自身的点积等于其模长的平方</td>
              </tr>
            </table>
          `,
        },
        {
          type: "note",
          level: "tip",
          body: '<strong>记忆技巧：</strong>点积就像普通乘法，满足交换律和分配律；叉积则像一个反交换的乘法——交换顺序会变号。把点积理解成两个向量的相似度（共线时最大），叉积理解成两个向量的垂直度（垂直时最大），非常有助于直觉建立。',
        },
        {
          type: "text",
          html: `
            <h3>本章小结</h3>
            <p>向量是 3D 数学中最核心的抽象之一。本章涵盖了：</p>
            <ul>
              <li>✅ 向量的数学定义与几何意义（大小 + 方向）</li>
              <li>✅ 向量与点的区别（位移 vs 位置）</li>
              <li>✅ 向量的基本运算：取反、标量乘法、加法、减法</li>
              <li>✅ 模长、单位向量、归一化、标准基向量</li>
              <li>✅ <strong>点积（Dot Product）</strong>——代数与几何定义、夹角计算、投影</li>
              <li>✅ <strong>叉积（Cross Product）</strong>——法向量、平行四边形面积、右手定则</li>
              <li>✅ 常用线性代数恒等式</li>
            </ul>
            <p>在下一章中，我们将学习如何使用<strong>多个坐标空间</strong>（世界空间、模型空间、摄像机空间等），以及如何在这些空间之间进行转换——向量的概念将是这些变换的基础。</p>
          `,
        },
      ],
    },
  ],
}

export default content