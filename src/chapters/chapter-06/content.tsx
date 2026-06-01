import type { ChapterContent } from "@/components/content/types"

const content: ChapterContent = {
  id: "6",
  title: "更多矩阵",
  sections: [
    {
      title: "6.1 行列式",
      blocks: [
        {
          type: "text",
          html: `
            <p><strong>行列式（Determinant）</strong>是方阵的一个标量属性，记作 det(M) 或 |M|。它在图形学中有重要的几何意义。</p>
          `,
        },
        {
          type: "definition",
          title: "定义: 2×2 和 3×3 行列式",
          body: '对于 2×2 矩阵，行列式 = 主对角线乘积 − 副对角线乘积。<br/><br/>对于 3×3 矩阵，行列式 = a₁₁(a₂₂a₃₃ − a₂₃a₃₂) − a₁₂(a₂₁a₃₃ − a₂₃a₃₁) + a₁₃(a₂₁a₃₂ − a₂₂a₃₁)。这其实就是沿第一行展开（称为<strong>余子式展开</strong>）。<br/><br/>行列式为 <strong>0</strong> 的矩阵称为<strong>奇异矩阵（Singular Matrix）</strong>——不可逆。',
        },
        {
          type: "formula",
          latex: `\\det\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} = ad - bc`,
          note: "2×2 行列式：叉乘减去叉乘——记住这个最简单的形式。",
        },
        {
          type: 'derivation',
          title: '推导：行列式的几何意义——为什么 det = 面积',
          intro: '对于 2×2 矩阵，行列式的绝对值 = 两个列向量张成的平行四边形面积。',
          steps: [
            { latex: '\\mathbf{M} = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}, \\quad \\det(\\mathbf{M}) = ad - bc', note: '2×2 矩阵的两列分别为向量 u=(a,c) 和 v=(b,d)。', insight: '矩阵的每一列是一个向量。2×2 矩阵 = 两个 2D 向量并排。这也是矩阵的几何本质。' },
            { latex: '\\text{面积} = |\\mathbf{u}| \\cdot |\\mathbf{v}| \\cdot \\sin\\theta', note: '平行四边形面积 = |u|·|v|·sinθ，其中 θ 是两向量的夹角。', insight: '与叉积的模长公式完全一致——面积 = |u × v|。在 2D 中，叉积的 z 分量恰好等于 ad−bc。' },
            { latex: '\\det = ad - bc = \\text{有符号面积}', note: '行列式 = 叉积的 z 分量 = 有符号面积。正值=逆时针（右手系），负值=顺时针。', insight: '行列式的符号告诉你"两个向量的相对方向"：正 = u 在 v 的逆时针方向，负 = 顺时针。行列式为 0 = 两个向量共线（面积为零）。' },
            { latex: '|\\det(\\mathbf{M})| = \\frac{\\text{变换后面积}}{\\text{变换前面积}}', note: '行列式的绝对值 = 变换对面积的缩放因子。这是将 2D 推广到 3D（体积）的关键。', insight: '在 3D 中，行列式 = 体积缩放因子。这个缩放因子适用于任何形状——不仅仅是单位正方形。这是多重积分的雅可比行列式的本质。' },
          ],
        },
        {
          type: "formula",
          latex: `\\det\\begin{bmatrix} a_{11} & a_{12} & a_{13} \\\\ a_{21} & a_{22} & a_{23} \\\\ a_{31} & a_{32} & a_{33} \\end{bmatrix} = a_{11}(a_{22}a_{33}-a_{23}a_{32}) - a_{12}(a_{21}a_{33}-a_{23}a_{31}) + a_{13}(a_{21}a_{32}-a_{22}a_{31})`,
          note: "3×3 行列式：沿第一行展开。也可沿任意行/列展开，结果相同。",
        },
        {
          type: "text",
          html: `
            <h3>行列式的几何意义</h3>
            <p>行列式的<strong>绝对值</strong>表示变换对体积（3D）或面积（2D）的<strong>缩放因子</strong>：</p>
            <ul>
              <li><strong>|det(M)| > 1</strong>：变换放大了空间</li>
              <li><strong>|det(M)| < 1</strong>：变换缩小了空间</li>
              <li><strong>|det(M)| = 1</strong>：变换保持体积不变（如纯旋转、反射）</li>
              <li><strong>det(M) = 0</strong>：变换将空间压缩到更低维度（"压扁"）</li>
            </ul>
            <p>行列式的<strong>符号</strong>表示变换是否翻转了空间：</p>
            <ul>
              <li><strong>det(M) > 0</strong>：保持手性（右手系仍为右手系）</li>
              <li><strong>det(M) < 0</strong>：翻转手性（右手系→左手系，如反射）</li>
            </ul>
          `,
        },
        {
          type: "code",
          language: "typescript",
          code: `// 3×3 行列式计算（沿第一行展开）
function det3(m: number[]): number {
  return (
    m[0] * (m[4] * m[8] - m[5] * m[7]) -
    m[1] * (m[3] * m[8] - m[5] * m[6]) +
    m[2] * (m[3] * m[7] - m[4] * m[6])
  )
}

// 使用
const scale = [2, 0, 0, 0, 3, 0, 0, 0, 4]
console.log(det3(scale)) // => 24 (= 2×3×4，体积放大 24 倍)`,
        },
        {
          type: "note",
          level: "info",
          body: "<strong>常用技巧：</strong>不需要每次都手算行列式。在代码中判断 <code>abs(det) < epsilon</code> 可以检测矩阵是否奇异（不可逆）。游戏引擎的矩阵库通常提供 <code>determinant()</code> 方法。",
        },
      ],
    },
    {
      title: "6.2 逆矩阵",
      blocks: [
        {
          type: "text",
          html: `
            <p><strong>逆矩阵（Inverse Matrix）</strong>是矩阵的"撤销"操作。如果 M 代表某个变换，M⁻¹ 就是<strong>逆向变换</strong>——将变换后的结果恢复到原始状态。</p>
          `,
        },
        {
          type: "definition",
          title: "定义: 逆矩阵",
          body: '对于方阵 <strong>M</strong>，如果存在矩阵 <strong>M⁻¹</strong> 使得：<br/><br/><strong>M M⁻¹ = M⁻¹ M = I</strong>（单位矩阵）<br/><br/>则 M⁻¹ 称为 M 的<strong>逆矩阵</strong>。只有行列式不为 0 的矩阵（非奇异矩阵）才有逆。',
        },
        {
          type: "text",
          html: `
            <h3>逆矩阵在图形学中的关键用途</h3>
            <ul>
              <li><strong>撤销变换</strong>：如果 M 将物体从模型空间变换到世界空间，M⁻¹ 将世界空间中的点转换回模型空间。这在射线拾取（鼠标点击→3D 物体）中至关重要。</li>
              <li><strong>法向量变换</strong>：表面法向量需要用变换矩阵的<strong>逆转置</strong> (M⁻¹)ᵀ 来变换（普通变换会破坏法向量的垂直性）。</li>
              <li><strong>摄像机矩阵</strong>：视图矩阵（世界→摄像机）正是摄像机世界矩阵的逆矩阵。</li>
            </ul>
          `,
        },
        {
          type: "formula",
          latex: `\\mathbf{M}^{-1} = \\frac{1}{\\det(\\mathbf{M})} \\text{adj}(\\mathbf{M})`,
          note: "逆矩阵 = 伴随矩阵 / 行列式。伴随矩阵是余子式矩阵的转置。",
        },
        {
          type: "text",
          html: `
            <p>在实际编程中，几乎<strong>不需要手写逆矩阵的计算代码</strong>。原因有二：</p>
            <ol>
              <li>许多常见变换的逆矩阵有简单的解析形式（旋转的逆=转置，缩放的逆=取倒数，平移的逆=反向平移）</li>
              <li>游戏引擎和数学库都提供了成熟的 <code>inverse()</code> 函数</li>
            </ol>
            <p>但理解逆矩阵的概念和性质非常重要——它是理解整个变换管线的基础。</p>
          `,
        },
        {
          type: "note",
          level: "warning",
          body: "<strong>⚠️ 常见错误：</strong>使用逆矩阵变换法向量时，很多人直接用变换矩阵 M 来变换法向量——这是<strong>错误的</strong>！法向量需要用 <strong>(M⁻¹)ᵀ</strong> 来变换。如果 M 仅包含旋转和均匀缩放，可以简化为用 M 变换后重新归一化，但在非均匀缩放情况下必须用逆转置。",
        },
      ],
    },
    {
      title: "6.3 正交矩阵",
      blocks: [
        {
          type: "text",
          html: `
            <p><strong>正交矩阵（Orthogonal Matrix）</strong>是一类特殊的方阵，在图形学中大量出现——所有<strong>纯旋转矩阵</strong>和<strong>反射矩阵</strong>都是正交矩阵。</p>
          `,
        },
        {
          type: "definition",
          title: "定义: 正交矩阵",
          body: '一个方阵 <strong>M</strong> 如果满足 <strong>Mᵀ = M⁻¹</strong>（转置等于逆），则称为<strong>正交矩阵</strong>。<br/><br/>等价地说：<strong>M 的各行（或各列）是一组互相垂直的单位向量</strong>——它们是<strong>标准正交基（Orthonormal Basis）</strong>。<br/><br/>正交矩阵的<strong>行列式为 ±1</strong>（+1 = 纯旋转，−1 = 含反射）。',
        },
        {
          type: "text",
          html: `
            <h3>正交矩阵的便利性质</h3>
            <ul>
              <li><strong>求逆 = 求转置</strong>：M⁻¹ = Mᵀ。这比求一般逆矩阵快得多（O(n²) vs O(n³)）。</li>
              <li><strong>保持长度</strong>：|Mv| = |v|——变换不改变向量的长度。</li>
              <li><strong>保持角度</strong>：两个向量的夹角变换后不变。</li>
              <li><strong>行列式为 ±1</strong>：便于快速判断是旋转还是反射。</li>
            </ul>
          `,
        },
        {
          type: "formula",
          latex: `\\mathbf{M}^T \\mathbf{M} = \\mathbf{I} \\quad \\Longleftrightarrow \\quad \\mathbf{M}^{-1} = \\mathbf{M}^T`,
          note: "正交矩阵的等价定义：转置乘以自身等于单位矩阵。",
        },
        {
          type: "text",
          html: `
            <p>在 Babylon.js 中，旋转矩阵、视图矩阵等都是正交矩阵。正交矩阵在数值计算中非常稳定——多次乘法不会积累明显的浮点误差（不像一般矩阵会慢慢"漂移"）。</p>
          `,
        },
        {
          type: "code",
          language: "typescript",
          code: `// 验证正交矩阵：M^T * M = I
function isOrthogonal(m: number[], epsilon = 1e-6): boolean {
  // 计算 M^T * M
  const mtm = new Array(9).fill(0)
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      for (let k = 0; k < 3; k++)
        mtm[i*3+j] += m[k*3+i] * m[k*3+j]  // 用转置的行

  // 应该等于单位矩阵
  return (
    Math.abs(mtm[0] - 1) < epsilon && Math.abs(mtm[1]) < epsilon &&
    Math.abs(mtm[4] - 1) < epsilon && Math.abs(mtm[8] - 1) < epsilon
  )
}`,
        },
      ],
    },
    {
      title: "6.4 齐次坐标",
      blocks: [
        {
          type: "text",
          html: `
            <p>这是图形学中<strong>最重要的技术之一</strong>。回顾一下：3×3 矩阵不能表示平移，因为平移不是线性变换（它改变了原点）。<strong>齐次坐标（Homogeneous Coordinates）</strong>通过增加一个维度来优雅地解决这个问题。</p>
          `,
        },
        {
          type: "definition",
          title: "定义: 齐次坐标",
          body: '在 3D 齐次坐标中，一个点用一个<strong>4D 向量</strong> (x, y, z, w) 表示。对应的 3D 笛卡尔坐标为 <strong>(x/w, y/w, z/w)</strong>。<br/><br/><strong>约定：</strong>对于 3D 中的点，通常取 <strong>w = 1</strong>；对于方向向量（不受平移影响），取 <strong>w = 0</strong>。<br/><br/>4×4 矩阵可以同时表示<strong>旋转、缩放和平移</strong>——即<strong>仿射变换</strong>。',
        },
        {
          type: "formula",
          latex: `\\begin{bmatrix} x' \\\\ y' \\\\ z' \\\\ w' \\end{bmatrix} = \\begin{bmatrix} r_{11} & r_{12} & r_{13} & t_x \\\\ r_{21} & r_{22} & r_{23} & t_y \\\\ r_{31} & r_{32} & r_{33} & t_z \\\\ 0 & 0 & 0 & 1 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\\\ z \\\\ 1 \\end{bmatrix}`,
          note: "4×4 仿射变换矩阵：左上 3×3 = 旋转/缩放，第4列 = 平移，底行 = (0,0,0,1)。",
        },
        {
          type: 'derivation',
          title: '推导：齐次坐标——为什么加一个 w 就能表示平移',
          intro: '3×3 矩阵可以表示旋转和缩放，但无法表示平移。增加第4维 w 后，平移可以优雅地融入矩阵乘法。',
          steps: [
            { latex: '\\begin{bmatrix} x\' \\\\ y\' \\\\ z\' \\end{bmatrix} = \\begin{bmatrix} r_{11} & r_{12} & r_{13} \\\\ r_{21} & r_{22} & r_{23} \\\\ r_{31} & r_{32} & r_{33} \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\\\ z \\end{bmatrix} + \\begin{bmatrix} t_x \\\\ t_y \\\\ t_z \\end{bmatrix}', note: '3×3 矩阵只能做线性变换，平移（+t）是"附加"在矩阵乘法之外的，无法合并。', insight: '线性变换的数学定义要求 f(0)=0——原点不变。但平移恰恰改变了原点！这就是为什么 3×3 矩阵不能表示平移。' },
            { latex: '\\begin{bmatrix} x\' \\\\ y\' \\\\ z\' \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} r_{11} & r_{12} & r_{13} & t_x \\\\ r_{21} & r_{22} & r_{23} & t_y \\\\ r_{31} & r_{32} & r_{33} & t_z \\\\ 0 & 0 & 0 & 1 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\\\ z \\\\ 1 \\end{bmatrix}', note: '增加第4行和第4列，平移量 t 放在第4列。w=1 乘第4列 = t，完成平移。', insight: '关键设计：底行 (0,0,0,1) 确保 w\'=w=1——平移不改变 w。这意味着多次变换的 w 始终为 1，变换可以无限串联。', diagram: '<svg viewBox="0 0 320 140" width="320" height="140" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="140" fill="#faf8f5" rx="4"/><rect x="30" y="20" width="110" height="100" fill="#fef2f2" stroke="#e35947" stroke-width="1.5" rx="3" opacity="0.7"/><text x="85" y="50" fill="#c53030" font-size="10" font-weight="600">旋转</text><text x="85" y="65" fill="#c53030" font-size="9">+ 缩放</text><text x="85" y="80" fill="#c53030" font-size="9">3×3</text><rect x="145" y="20" width="30" height="100" fill="#fef9c3" stroke="#eab308" stroke-width="1.5" rx="3" opacity="0.7"/><text x="155" y="75" fill="#a16207" font-size="20" font-weight="600">t</text><rect x="30" y="120" width="110" height="18" fill="#e8e4f0" stroke="#a659db" stroke-width="1" rx="2" opacity="0.7"/><text x="85" y="133" fill="#7c3aed" font-size="9">0 0 0 1 (底行)</text><rect x="180" y="20" width="50" height="120" fill="#e8e4de" stroke="#888" stroke-width="1.5" rx="3"/><text x="195" y="55" fill="#555" font-size="11" font-weight="600">点</text><text x="195" y="75" fill="#555" font-size="11" font-weight="600">(x,y,z,1)</text><text x="195" y="95" fill="#888" font-size="9">w=1</text></svg>' },
            { latex: '\\text{若 } w=0: \\quad t \\cdot 0 = 0, \\text{ 平移无效}', note: '对于方向向量（w=0），平移列乘以 w=0 后对结果无贡献——方向不随平移改变。', insight: '这就是绝妙之处：同一个矩阵对点（w=1）施加平移，对方向（w=0）不施加平移。GPU 利用这特性在顶点着色器中统一处理位置和法向量。' },
          ],
        },
        {
          type: "text",
          html: `
            <h3>为什么 w=0 代表方向？</h3>
            <p>如果 w = 0，那么平移部分 tₓ, tᵧ, t_z 在除以 w 时会被"忽略"——因为不能除以 0！实际上，w=0 的向量的第 4 个分量乘以平移列后结果仍为 0：</p>
            <p style="text-align: center; padding: 0.3rem 0;"><strong>平移列 × w = t · 0 = 0 → 方向向量不受平移影响 ✓</strong></p>
            <p>这个设计非常精妙——同一个矩阵可以同时对点（w=1）施加平移，而对方向向量（w=0）不施加平移。</p>
          `,
        },
        {
          type: "note",
          level: "tip",
          body: "<strong>实践提示：</strong>在着色器中，顶点位置作为点使用 w=1（受平移影响），而法向量作为方向使用 w=0（不受平移影响）。GPU 的顶点着色器自动处理 w 除法（透视除法），这是渲染管线的标准步骤。",
        },
      ],
    },
    {
      title: "6.5 4×4 平移矩阵",
      blocks: [
        {
          type: "text",
          html: `
            <p>有了齐次坐标，平移变得极其简单——只需将平移量填入第 4 列：</p>
          `,
        },
        {
          type: "formula",
          latex: `\\mathbf{T}(t_x, t_y, t_z) = \\begin{bmatrix} 1 & 0 & 0 & t_x \\\\ 0 & 1 & 0 & t_y \\\\ 0 & 0 & 1 & t_z \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}`,
          note: "4×4 平移矩阵。左上角是单位矩阵（无旋转/缩放），第 4 列是平移量。",
        },
        {
          type: "text",
          html: `
            <p>验证：T · (x, y, z, 1) = (x+t_x, y+t_y, z+t_z, 1) ✓</p>
            <p>4×4 的旋转和缩放矩阵也很简单：将 3×3 的旋转/缩放矩阵放在左上角，第 4 列和第 4 行保持 (0,0,0,1) 的"边框"。</p>
          `,
        },
        {
          type: "code",
          language: "typescript",
          code: `// 构建 4×4 平移矩阵
function translation(tx: number, ty: number, tz: number): number[] {
  return [
    1, 0, 0, tx,
    0, 1, 0, ty,
    0, 0, 1, tz,
    0, 0, 0, 1,
  ]
}

// 组合变换：先缩放，再旋转，最后平移
// 在列向量约定下：T * R * S * v（从右到左应用）
// const modelMatrix = mul4(translation(5,0,3), mul4(rotY, scale))`,
        },
      ],
    },
    {
      title: "6.6 透视投影",
      blocks: [
        {
          type: "text",
          html: `
            <p><strong>透视投影（Perspective Projection）</strong>模拟了真实世界中的视觉效果：<strong>近大远小</strong>。平行线在远处汇聚于消失点。这是 3D 图形看起来"真实"的核心技术。</p>
            <p>透视投影也是通过一个 4×4 矩阵实现的。与仿射变换不同的是，透视投影矩阵会<strong>改变 w 分量</strong>——这就是产生透视效果的关键。</p>
          `,
        },
        {
          type: "definition",
          title: "定义: 透视投影矩阵",
          body: '透视投影矩阵将<strong>视锥体（Frustum）</strong>中的点映射到<strong>裁剪空间</strong>（规范化设备坐标 NDC）。最常用的形式是：<br/><br/>给定 FOV（视场角）、宽高比 aspect、近平面 n 和远平面 f，透视投影矩阵为：',
        },
        {
          type: "formula",
          latex: `\\mathbf{P} = \\begin{bmatrix} \\frac{1}{\\text{aspect} \\cdot \\tan(\\text{fov}/2)} & 0 & 0 & 0 \\\\ 0 & \\frac{1}{\\tan(\\text{fov}/2)} & 0 & 0 \\\\ 0 & 0 & \\frac{f+n}{n-f} & \\frac{2fn}{n-f} \\\\ 0 & 0 & -1 & 0 \\end{bmatrix}`,
          note: "透视投影矩阵（右手坐标系，OpenGL 风格）。注意第 4 行第 3 列 = −1：这是产生透视效果的关键——z 坐标被复制到 w 分量。",
        },
        {
          type: 'text',
          html: `
            <h3>关键概念：近平面、远平面与视锥体</h3>
            <p>在继续推导之前，先澄清几个容易混淆的概念：</p>
            <ul>
              <li><strong>近平面（Near Plane）不等于 xy 平面</strong>。在摄像机空间中，摄像机位于原点，看向 <strong>−z 方向</strong>。近平面是一个<strong>平行于 xy 平面、位于 z = −n 处</strong>的平面。它是一个"虚拟的屏幕"——3D 场景被投影到这个平面上形成 2D 图像。</li>
              <li><strong>为什么需要近平面？</strong>如果摄像机恰好位于 z=0 处，而场景中的物体也在 z=0 附近，透视公式 x' = n·x/(−z) 中的分母 −z 会趋于 0，导致坐标爆炸。近平面 n 将投影面"推"到摄像机前方安全距离处。</li>
              <li><strong>远平面（Far Plane）</strong>位于 z = −f，超过这个距离的物体被裁剪。近平面和远平面之间的区域称为<strong>视锥体（View Frustum）</strong>——一个截顶的四棱锥。</li>
              <li><strong>推导图中的"远处物体线"</strong>是示意性的——它表示场景中不同深度（z 值）的物体。射线从摄像机穿过近平面，继续延伸到场景深处。线上每个点代表一个可能的物体位置，它们在近平面上的投影位置由相似三角形决定。</li>
            </ul>
          `,
        },
        {
          type: 'illustration',
          caption: '图 6.1 — 透视投影侧视图（从 x 轴看 yz 平面）：摄像机在原点 O，看向 −z。近平面和远平面之间的截锥区域 = 视锥体。物体越远，在近平面上的投影越小。',
          width: 600,
          height: 380,
          svg: `<svg viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg"><defs><marker id="az" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#387ad9"/></marker><marker id="ay" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#2e9978"/></marker></defs><rect width="600" height="380" fill="#faf8f5" rx="8"/><line x1="120" y1="350" x2="120" y2="20" stroke="#2e9978" stroke-width="2" marker-end="url(#ay)"/><text x="130" y="30" fill="#2e9978" font-size="14" font-weight="700">y</text><line x1="40" y1="280" x2="570" y2="280" stroke="#387ad9" stroke-width="2" marker-end="url(#az)"/><text x="555" y="275" fill="#387ad9" font-size="12" font-weight="600">-z</text><circle cx="120" cy="280" r="5" fill="#555"/><text x="90" y="270" fill="#555" font-size="13" font-weight="700">摄像机 O</text><text x="90" y="288" fill="#888" font-size="10">(0,0,0)</text><line x1="230" y1="30" x2="230" y2="340" stroke="#e35947" stroke-width="2.5" stroke-dasharray="8,4"/><text x="195" y="25" fill="#c53030" font-size="13" font-weight="700">近平面</text><text x="195" y="42" fill="#c53030" font-size="11">z=-n</text><line x1="470" y1="40" x2="470" y2="340" stroke="#2e9978" stroke-width="2" stroke-dasharray="8,4"/><text x="435" y="55" fill="#166534" font-size="13" font-weight="700">远平面</text><text x="435" y="72" fill="#166534" font-size="11">z=-f</text><polygon points="120,280 470,170 470,340" fill="#387ad9" opacity="0.06"/><text x="330" y="300" fill="#387ad9" font-size="12" font-weight="600">视锥体</text><path d="M 155 280 A 35 35 0 0 0 155 245" fill="none" stroke="#f59e0b" stroke-width="1.5"/><text x="162" y="265" fill="#b45309" font-size="11" font-weight="600">fov/2</text><circle cx="340" cy="200" r="4" fill="#f59e0b"/><text x="348" y="195" fill="#b45309" font-size="11" font-weight="600">物体A(近)</text><line x1="120" y1="280" x2="230" y2="230" stroke="#f59e0b" stroke-width="1" opacity="0.5"/><circle cx="230" cy="230" r="2" fill="#f59e0b"/><circle cx="420" cy="230" r="4" fill="#f59e0b"/><text x="428" y="225" fill="#b45309" font-size="11" font-weight="600">物体B(远)</text><line x1="120" y1="280" x2="230" y2="255" stroke="#f59e0b" stroke-width="1" opacity="0.5"/><circle cx="230" cy="255" r="2" fill="#f59e0b"/><text x="178" y="225" fill="#c53030" font-size="10">投影A(大)</text><text x="178" y="260" fill="#c53030" font-size="10">投影B(小)</text><text x="140" y="365" fill="#888" font-size="11">射线 = 远处物体线：物体越远，投影越靠近中心</text></svg>`,
        },
        {
          type: 'illustration',
          caption: '图 6.2 — 3D 立体视角：摄像机看向 −z 方向。视锥体是一个截顶四棱锥（近小远大），屏幕就是近平面。物体发出的光线穿过近平面打到摄像机——这就是 GPU 投影的几何本质。',
          width: 600,
          height: 400,
          svg: `<svg viewBox="0 0 600 440" xmlns="http://www.w3.org/2000/svg"><defs><marker id="pz" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#387ad9"/></marker><marker id="py" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#2e9978"/></marker><marker id="px" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#e35947"/></marker></defs><rect width="600" height="440" fill="#faf8f5" rx="8"/><!-- Axes --><circle cx="80" cy="200" r="5" fill="#555"/><text x="58" y="192" fill="#555" font-size="12" font-weight="700">摄像机</text><text x="58" y="208" fill="#888" font-size="8">(0,0,0)</text><line x1="80" y1="200" x2="220" y2="260" stroke="#e35947" stroke-width="2" marker-end="url(#px)"/><text x="215" y="275" fill="#e35947" font-size="11" font-weight="600">x</text><line x1="80" y1="200" x2="80" y2="55" stroke="#2e9978" stroke-width="2" marker-end="url(#py)"/><text x="92" y="65" fill="#2e9978" font-size="11" font-weight="600">y</text><!-- z axis with distance markers --><line x1="40" y1="200" x2="560" y2="200" stroke="#387ad9" stroke-width="2" marker-end="url(#pz)"/><text x="548" y="195" fill="#387ad9" font-size="11" font-weight="600">z</text><!-- Near plane --><line x1="220" y1="55" x2="220" y2="310" stroke="#e35947" stroke-width="2" stroke-dasharray="8,4"/><text x="180" y="48" fill="#c53030" font-size="13" font-weight="700">近平面</text><text x="180" y="65" fill="#c53030" font-size="10">z = -n</text><!-- Far plane --><line x1="460" y1="55" x2="460" y2="310" stroke="#2e9978" stroke-width="2" stroke-dasharray="8,4"/><text x="430" y="48" fill="#166534" font-size="13" font-weight="700">远平面</text><text x="430" y="65" fill="#166534" font-size="10">z = -f</text><!-- Distance: n (camera to near plane) --><line x1="80" y1="230" x2="220" y2="230" stroke="#888" stroke-width="1"/><line x1="80" y1="226" x2="80" y2="234" stroke="#888" stroke-width="1"/><line x1="220" y1="226" x2="220" y2="234" stroke="#888" stroke-width="1"/><text x="138" y="224" fill="#888" font-size="11" font-weight="600">n</text><!-- Distance: f (camera to far plane) --><line x1="80" y1="245" x2="460" y2="245" stroke="#888" stroke-width="1"/><line x1="80" y1="241" x2="80" y2="249" stroke="#888" stroke-width="1"/><line x1="460" y1="241" x2="460" y2="249" stroke="#888" stroke-width="1"/><text x="255" y="239" fill="#888" font-size="11" font-weight="600">f</text><!-- Frustum edges (side view cut-away) --><line x1="80" y1="200" x2="460" y2="130" stroke="#aaa" stroke-width="1" opacity="0.5"/><line x1="80" y1="200" x2="460" y2="270" stroke="#aaa" stroke-width="1" opacity="0.5"/><!-- Frustum fill --><polygon points="80,200 460,130 460,270" fill="#387ad9" opacity="0.05"/><!-- Near plane intersects frustum --><line x1="220" y1="165" x2="220" y2="235" stroke="#e35947" stroke-width="2"/><!-- Object near --><circle cx="310" cy="175" r="6" fill="#f59e0b"/><text x="322" y="170" fill="#b45309" font-size="11" font-weight="600">物体A</text><text x="322" y="185" fill="#b45309" font-size="8">(近, |z|小)</text><!-- Projection ray A --><line x1="80" y1="200" x2="310" y2="175" stroke="#f59e0b" stroke-width="1.2" opacity="0.6"/><circle cx="220" cy="188" r="3.5" fill="#f59e0b"/><text x="190" y="186" fill="#c53030" font-size="9" font-weight="600">投影A</text><!-- Object far --><circle cx="400" cy="160" r="5" fill="#f59e0b"/><text x="412" y="155" fill="#b45309" font-size="11" font-weight="600">物体B</text><text x="412" y="170" fill="#b45309" font-size="8">(远, |z|大)</text><!-- Projection ray B --><line x1="80" y1="200" x2="400" y2="160" stroke="#f59e0b" stroke-width="1.2" opacity="0.6"/><circle cx="220" cy="180" r="2.5" fill="#f59e0b"/><text x="190" y="178" fill="#c53030" font-size="9" font-weight="600">投影B</text><!-- Key takeaway --><text x="240" y="330" fill="#555" font-size="12" font-weight="600">核心关系</text><text x="240" y="352" fill="#888" font-size="10">投影大小 = 实际大小 x (n / |z|)</text><text x="240" y="372" fill="#888" font-size="10">|z| 越大(越远) → 投影越小 → 近大远小</text><!-- 3D frustum inset --><rect x="400" y="310" width="180" height="110" fill="#fff" stroke="#ddd" rx="6"/><text x="420" y="330" fill="#666" font-size="9" font-weight="600">3D 视锥体示意</text><polygon points="440,370 480,340 560,340 530,370" fill="#387ad9" opacity="0.08" stroke="#387ad9" stroke-width="1.2"/><polygon points="480,340 510,355 560,340" fill="#387ad9" opacity="0.04" stroke="#387ad9" stroke-width="0.8"/><text x="475" y="395" fill="#888" font-size="8">近平面(小)</text><text x="530" y="395" fill="#888" font-size="8">远平面(大)</text><circle cx="500" cy="348" r="2" fill="#f59e0b"/><text x="505" y="348" fill="#b45309" font-size="7">物体</text></svg>`,
        },
        {
          type: 'derivation',
          title: '推导：透视投影矩阵的构建原理',
          intro: '透视投影由两个核心步骤组成：① 相似三角形缩放（产生近大远小）→ ② 深度映射（将 z 压缩到 NDC 范围）。理解了这个，整个投影矩阵的每个元素都有清晰的几何含义。',
          steps: [
            { latex: '\\frac{x\'}{x} = \\frac{-n}{z}', note: '第①步核心：相似三角形。摄像机看向 -z 方向，近平面距离为 n。屏幕上 x\' 与实际 x 的比例 = n : |z|。', insight: '这是初中几何——两个相似直角三角形。"近平面上的投影点"、"实际空间点"和"摄像机原点"构成相似三角形。屏幕上的坐标 = 实际坐标 × (n/|z|)——z 越大（越远），缩小越多。', diagram: '<svg viewBox="0 0 340 160" width="340" height="160" xmlns="http://www.w3.org/2000/svg"><rect width="340" height="160" fill="#faf8f5" rx="4"/><circle cx="60" cy="90" r="3" fill="#555"/><text x="48" y="82" fill="#555" font-size="10">相机</text><line x1="60" y1="90" x2="320" y2="20" stroke="#387ad9" stroke-width="1.5"/><line x1="60" y1="90" x2="320" y2="60" stroke="#387ad9" stroke-width="1.5"/><line x1="60" y1="90" x2="320" y2="130" stroke="#387ad9" stroke-width="1.5"/><line x1="180" y1="50" x2="180" y2="110" stroke="#e35947" stroke-width="2" stroke-dasharray="5,3"/><text x="140" y="48" fill="#c53030" font-size="9">近平面 n</text><line x1="280" y1="30" x2="280" y2="120" stroke="#2e9978" stroke-width="2" stroke-dasharray="5,3"/><text x="240" y="28" fill="#166534" font-size="9">远处物体</text><text x="140" y="140" fill="#888" font-size="10">x\' : x = n : |z|  (相似三角形)</text></svg>' },
            { latex: 'x\' = \\frac{n \\cdot x}{-z}, \\quad y\' = \\frac{n \\cdot y}{-z}', note: '整理相似三角形比例：屏幕坐标 = 实际坐标 × (n/|z|)。注意：这里的 z 是标量坐标值（不是向量！）。摄像机看向 −z 方向，物体 z 坐标为负值，所以分母 −z 是正数。', insight: '区分两个 z：公式中的 z = 物体在摄像机空间中的 z 坐标值（标量，如 −5），不是 z 轴方向向量。分母 −z = −(−5) = 5（物体距摄像机的实际深度）。z 在分母上——越深（|z| 越大），x\' y\' 越小，产生近大远小效果。' },
            { latex: '\\text{用 FOV 替代 n: } \\quad \\cot(\\text{fov}/2) = \\frac{n}{h}', note: '第②步：引入视场角 FOV。半屏高 h 与近平面距离 n 的关系：n/h = cot(fov/2) = 1/tan(fov/2)。', insight: '这是一个设计选择：与其让用户指定近平面距离 n，不如让他们指定更直观的"视野角度"（FOV）。引擎内部自动换算出缩放因子。' },
            { latex: '\\mathbf{P} = \\begin{bmatrix} \\frac{\\cot(\\text{fov}/2)}{\\text{aspect}} & 0 & 0 & 0 \\\\ 0 & \\cot(\\text{fov}/2) & 0 & 0 \\\\ 0 & 0 & \\frac{f+n}{n-f} & \\frac{2fn}{n-f} \\\\ 0 & 0 & -1 & 0 \\end{bmatrix}', note: '完整的透视投影矩阵。第4行第3列 = −1 是关键——它将 z（取反）复制到 w\' 分量。', insight: '为什么有一个 −1？因为齐次坐标的透视除法是 (x\'/w\', y\'/w\', z\'/w\')。设置 w\'=−z 意味着最终除以 −z（即除以 |z|），实现"远近缩放"。这行 −1 是透视投影区别于正交投影的唯一标记。' },
            { latex: '\\text{GPU 自动执行: } \\left(\\frac{x\'}{w\'}, \\frac{y\'}{w\'}, \\frac{z\'}{w\'}\\right) = \\left(\\frac{x\'}{-z}, \\frac{y\'}{-z}, \\frac{z\'}{-z}\\right)', note: '透视除法：裁剪空间 (x\',y\',z\',w\') → NDC。除以 w\'（即 −z）后，x 和 y 自动缩放到 [−1,1]，深度 z 映射到 [−1,1]（或 [0,1]）。', insight: 'GPU 的固定功能硬件专门优化了透视除法——每个顶点着色器输出后自动执行。这就是为什么你只需要在顶点着色器中输出 gl_Position（裁剪空间坐标），GPU 帮你做剩下的。' },
          ],
        },
        {
          type: "text",
          html: `
            <h3>透视投影的工作流程</h3>
            <ol>
              <li><strong>摄像机空间中的点</strong> (x, y, z, 1) 乘以投影矩阵 P → 得到裁剪空间中的点 (x', y', z', w')</li>
              <li><strong>GPU 自动执行透视除法</strong>：(x'/w', y'/w', z'/w') → 规范化设备坐标 (NDC)</li>
              <li>NDC 中的 x 和 y 在 [−1, 1] 范围内，可以直接映射到屏幕像素坐标</li>
            </ol>
            <p>透视效果来自第 2 步——除以 w'（其中包含了原始 z 的信息），使得远处的物体被缩小。</p>
          `,
        },
        {
          type: "note",
          level: "warning",
          body: "<strong>⚠️ 坐标系差异：</strong>上面的矩阵适用于右手坐标系（OpenGL、Babylon.js）。DirectX 的透视矩阵略有不同——z 范围是 [0,1] 而非 [−1,1]。不同引擎提供的投影矩阵函数（如 Babylon.js 的 <code>Matrix.PerspectiveFovLH</code> 和 <code>Matrix.PerspectiveFovRH</code>）已经封装了这些差异，<strong>直接使用引擎 API 即可，无需手写</strong>。",
        },
        {
          type: "code",
          language: "typescript",
          code: `// 透视投影矩阵（右手坐标系，OpenGL 风格）
function perspectiveRH(
  fovY: number, aspect: number, near: number, far: number
): number[] {
  const f = 1 / Math.tan(fovY / 2)
  const nf = 1 / (near - far)
  return [
    f / aspect, 0,  0,                0,
    0,          f,  0,                0,
    0,          0,  (far + near) * nf, 2 * far * near * nf,
    0,          0, -1,                0,
  ]
}

// 透视除法（通常在 GPU 顶点着色器中自动执行）
function perspectiveDivide(v: number[]): number[] {
  const w = v[3]
  return [v[0] / w, v[1] / w, v[2] / w, 1]
}`,
        },
      ],
    },
    {
      title: "6.7 正交投影",
      blocks: [
        {
          type: "text",
          html: `
            <p><strong>正交投影（Orthographic Projection）</strong>是透视投影的"平替"——<strong>没有近大远小效果</strong>，物体在屏幕上无论远近都保持相同大小。常用于 2D 游戏、UI 渲染、工程 CAD 视图。</p>
          `,
        },
        {
          type: "definition",
          title: "正交投影 vs 透视投影",
          body: '<strong>正交投影</strong>：平行线保持平行，没有消失点。投影线平行（垂直于投影面）。<br/><br/><strong>透视投影</strong>：平行线汇聚于消失点。投影线从视点发出（透视锥体）。<br/><br/><strong>使用场景：</strong>正交投影用于 2D UI、小地图、编辑器的顶视图/侧视图；透视投影用于 3D 游戏的主摄像机。',
        },
        {
          type: "formula",
          latex: `\\mathbf{O} = \\begin{bmatrix} \\frac{2}{r-l} & 0 & 0 & -\\frac{r+l}{r-l} \\\\ 0 & \\frac{2}{t-b} & 0 & -\\frac{t+b}{t-b} \\\\ 0 & 0 & \\frac{2}{n-f} & -\\frac{n+f}{n-f} \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}`,
          note: "正交投影矩阵（右手系）。注意第 4 行是 (0,0,0,1)——w 保持不变，不产生透视效果。",
        },
        {
          type: "text",
          html: `
            <p>与透视投影矩阵对比：正交投影矩阵的<strong>底行是 (0,0,0,1)</strong>（w 不变），而透视投影矩阵的底行是 <strong>(0,0,-1,0)</strong>（z 赋值给 w 产生透视）。这是两者最关键的区别。</p>
          `,
        },
      ],
    },
    {
      title: "6.8 屏幕空间变换",
      blocks: [
        {
          type: "text",
          html: `
            <p>NDC（规范化设备坐标）到屏幕坐标的变换是渲染管线的最后一步。在 NDC 中，x 和 y 都在 [−1, 1] 范围内。需要将它们映射到实际的屏幕像素坐标。</p>
          `,
        },
        {
          type: "formula",
          latex: `x_{\\text{screen}} = \\frac{x_{\\text{NDC}} + 1}{2} \\cdot \\text{width} \\qquad y_{\\text{screen}} = \\frac{1 - y_{\\text{NDC}}}{2} \\cdot \\text{height}`,
          note: "NDC → 屏幕坐标变换。注意 y 轴翻转：NDC 的 y 向上，屏幕的 y 向下。",
        },
        {
          type: "text",
          html: `
            <p>这一步通常由 GPU 自动完成，包含在<strong>视口变换（Viewport Transform）</strong>中。了解它有助于理解渲染管线的完整流程。</p>
          `,
        },
      ],
    },
    {
      title: "6.9 完整变换管线回顾",
      blocks: [
        {
          type: "text",
          html: `
            <p>现在我们可以把整个 3D 渲染的变换管线串联起来看：</p>
          `,
        },
        {
          type: "text",
          html: `
            <div style="background: #1e1e2e; padding: 1.5rem; border-radius: 8px; font-family: monospace; font-size: 0.85em; line-height: 2.2; color: #e6edf3; margin: 1rem 0;">
              <div><span style="color:#e35947;">模型空间</span> ──Model Matrix (M)──> <span style="color:#f59e0b;">世界空间</span></div>
              <div><span style="color:#f59e0b;">世界空间</span> ──View Matrix (V)──> <span style="color:#2e9978;">摄像机空间</span></div>
              <div><span style="color:#2e9978;">摄像机空间</span> ──Projection Matrix (P)──> <span style="color:#387ad9;">裁剪空间</span></div>
              <div><span style="color:#387ad9;">裁剪空间</span> ──透视除法 (÷w)──> <span style="color:#a659db;">NDC</span></div>
              <div><span style="color:#a659db;">NDC</span> ──视口变换──> <span style="color:#e6edf3;">屏幕空间</span></div>
            </div>
          `,
        },
        {
          type: "formula",
          latex: `\\mathbf{v}_{\\text{clip}} = \\mathbf{P} \\cdot \\mathbf{V} \\cdot \\mathbf{M} \\cdot \\mathbf{v}_{\\text{model}}`,
          note: "完整的顶点变换：模型矩阵 → 视图矩阵 → 投影矩阵。顺序是从右到左应用的。",
        },
        {
          type: "text",
          html: `
            <p>在实际的 GPU 顶点着色器中，通常预先将 P、V、M 三个矩阵相乘为一个组合矩阵 <strong>MVP = P·V·M</strong>，然后每个顶点只需一次矩阵乘法。这就是矩阵结合律的性能优势。</p>
          `,
        },
        {
          type: "note",
          level: "info",
          body: `<strong>记忆技巧：</strong>变换顺序可以用一句话记住——<strong>"MVP"</strong>（Model → View → Projection，即 MVP 组合）。这是图形学中最常用的缩写之一。`,
        },
        {
          type: "text",
          html: `
            <h3>本章小结</h3>
            <p>本章深入了矩阵的高级概念，它们是理解 3D 渲染管线的核心：</p>
            <ul>
              <li>✅ 行列式的定义、计算（2×2/3×3）和几何意义（体积缩放因子）</li>
              <li>✅ 逆矩阵的概念和用途（撤销变换、法向量变换）</li>
              <li>✅ 正交矩阵——旋转矩阵为什么求逆特别快（转置=逆）</li>
              <li>✅ <strong>齐次坐标</strong>——4D 表示 3D 变换的巧妙设计（w=1 点，w=0 方向）</li>
              <li>✅ 4×4 平移矩阵——解决 3×3 不能平移的问题</li>
              <li>✅ <strong>透视投影矩阵</strong>——w 分量产生近大远小效果</li>
              <li>✅ 正交投影——没有透视的平直投影</li>
              <li>✅ 完整渲染管线：模型→世界→摄像机→裁剪→NDC→屏幕</li>
            </ul>
            <p>掌握了前六章的内容，你已经拥有了理解任何 3D 图形代码所需的全部数学基础。后续章节将转入更具体的应用领域。</p>
          `,
        },
      ],
    },
  ],
}

export default content
