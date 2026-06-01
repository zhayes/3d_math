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
            <p>这一变换称为<strong>视口变换（Viewport Transform）</strong>，由 GPU 固定功能硬件自动执行。在 OpenGL 中用 <code>glViewport(x, y, width, height)</code> 指定屏幕上的目标矩形区域。</p>
          `,
        },
        {
          type: "formula",
          latex: `x_{\\text{screen}} = \\frac{x_{\\text{NDC}} + 1}{2} \\cdot \\text{width} + \\text{viewportX} \\qquad y_{\\text{screen}} = \\frac{1 - y_{\\text{NDC}}}{2} \\cdot \\text{height} + \\text{viewportY}`,
          note: "NDC → 屏幕坐标变换。(x_NDC+1)/2 把 [−1,1] 映射到 [0,1]——原点从屏幕中心移到左上角。y 轴翻转：NDC 的 y 向上，屏幕的 y 向下。",
        },
        {
          type: "text",
          html: `
            <h3>原点在哪？——NDC vs 屏幕</h3>
            <p>在不同空间中，<strong>原点</strong>的位置完全不同：</p>
            <ul>
              <li><strong>NDC</strong>：原点 (0,0) 在<strong>屏幕正中心</strong>。x 向右 [−1,1]，y 向上 [−1,1]。</li>
              <li><strong>屏幕空间</strong>：原点 (0,0) 在<strong>左上角</strong>。x 向右 [0, width]，y 向下 [0, height]。</li>
            </ul>
            <p>公式中的 <code>(x_NDC + 1)/2</code> 同时完成了两件事：① 将 [−1,1] 映射到 [0,1]；② 把原点从<strong>中心移到左边</strong>。而 <code>(1 − y_NDC)/2</code> 额外翻转了 y 方向并移到顶部。</p>
          `,
        },
        {
          type: "text",
          html: `
            <h3>为什么 y 轴要翻转？</h3>
            <p>在 3D 数学中，y 轴通常<strong>向上</strong>（+y = 上方）。但在屏幕坐标系中，y 轴<strong>向下</strong>（原点在左上角）。这是因为早期 CRT 显示器的电子束<strong>从上往下逐行扫描</strong>。所有现代图形 API 都继承了这个约定。</p>
            <p>因此视口变换不仅缩放坐标，还翻转 y 轴：<strong>y_screen = (1 − y_NDC) / 2 × height</strong>。当 y_NDC = 1（顶部），y_screen = 0（屏幕顶部）；y_NDC = −1（底部），y_screen = height（屏幕底部）。</p>
          `,
        },
        {
          type: "text",
          html: `
            <h3>深度范围映射</h3>
            <p>NDC 中的 z 坐标也要映射到深度缓冲（Depth Buffer）的范围：</p>
            <ul>
              <li><strong>OpenGL</strong>：NDC z ∈ [−1, 1] → depth buffer [0, 1]（z_NDC = −1 → depth = 0 最近）</li>
              <li><strong>DirectX/Vulkan</strong>：NDC z ∈ [0, 1] → depth buffer [0, 1]</li>
            </ul>
            <p>这个映射由 GPU 自动完成，但了解它可以帮你调试深度相关的渲染问题（如 z-fighting）。</p>
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
            <p>前六章建立的所有数学概念——向量、矩阵、变换、齐次坐标、投影——最终都在<strong>渲染管线</strong>中汇聚。本章最后一节将沿着一个顶点的完整旅程，逐站解析每个变换矩阵的作用和含义。</p>
          `,
        },
        {
          type: "illustration",
          caption: "图 6.3 — 顶点变换管线全景：一个顶点从模型空间出发，经历 M→V→P→透视除法→视口变换，最终到达屏幕。",
          width: 620,
          height: 200,
          svg: `<svg viewBox="0 0 620 200" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ar" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#888"/></marker></defs><rect width="620" height="200" fill="#faf8f5" rx="8"/><rect x="10" y="30" width="95" height="50" fill="#fef2f2" stroke="#e35947" rx="6"/><text x="57" y="52" fill="#c53030" font-size="11" font-weight="700">模型空间</text><text x="57" y="68" fill="#c53030" font-size="8">(3D 局部坐标)</text><line x1="105" y1="55" x2="145" y2="55" stroke="#888" stroke-width="1.5" marker-end="url(#ar)"/><text x="113" y="48" fill="#888" font-size="7">×M</text><rect x="150" y="30" width="95" height="50" fill="#fef9c3" stroke="#eab308" rx="6"/><text x="197" y="52" fill="#a16207" font-size="11" font-weight="700">世界空间</text><text x="197" y="68" fill="#a16207" font-size="8">(3D 全局坐标)</text><line x1="245" y1="55" x2="285" y2="55" stroke="#888" stroke-width="1.5" marker-end="url(#ar)"/><text x="253" y="48" fill="#888" font-size="7">×V</text><rect x="290" y="30" width="95" height="50" fill="#ecfdf5" stroke="#2e9978" rx="6"/><text x="337" y="52" fill="#166534" font-size="11" font-weight="700">摄像机空间</text><text x="337" y="68" fill="#166534" font-size="8">(3D 相机为原点)</text><line x1="385" y1="55" x2="425" y2="55" stroke="#888" stroke-width="1.5" marker-end="url(#ar)"/><text x="393" y="48" fill="#888" font-size="7">×P</text><rect x="430" y="30" width="95" height="50" fill="#e0e7ff" stroke="#387ad9" rx="6"/><text x="477" y="52" fill="#1d4ed8" font-size="11" font-weight="700">裁剪空间</text><text x="477" y="68" fill="#1d4ed8" font-size="8">(4D 齐次坐标)</text><line x1="525" y1="55" x2="555" y2="55" stroke="#888" stroke-width="1.5" marker-end="url(#ar)"/><text x="533" y="48" fill="#888" font-size="7">÷w</text><rect x="525" y="90" width="80" height="35" fill="#f3e8ff" stroke="#a659db" rx="6"/><text x="565" y="103" fill="#7c3aed" font-size="10" font-weight="700">NDC</text><text x="565" y="117" fill="#7c3aed" font-size="7">[-1,1]³</text><text x="565" y="155" fill="#7c3aed" font-size="10" font-weight="700">屏幕</text><text x="565" y="169" fill="#7c3aed" font-size="7">(像素)</text><text x="15" y="155" fill="#999" font-size="9">M = T·R·S (模型摆放)</text><text x="155" y="155" fill="#999" font-size="9">V = Camera⁻¹ (视角变换)</text><text x="300" y="155" fill="#999" font-size="9">P = 透视/正交 (投影)</text><text x="435" y="155" fill="#999" font-size="9">GPU 裁剪</text></svg>`,
        },
        {
          type: "formula",
          latex: `\\mathbf{v}_{\\text{clip}} = \\mathbf{P} \\cdot \\mathbf{V} \\cdot \\mathbf{M} \\cdot \\mathbf{v}_{\\text{model}}`,
          note: "完整的顶点变换：模型矩阵 → 视图矩阵 → 投影矩阵。顺序是从右到左应用的——先 M，再 V，最后 P。",
        },
        {
          type: "note",
          level: "info",
          body: '<strong>MVP 组合：</strong>在 GPU 顶点着色器中，三个矩阵通常预乘为单个矩阵 <strong>MVP = P·V·M</strong>（CPU 端计算），每个顶点只需一次矩阵乘法。矩阵结合律 (PV)M = P(VM) 保证了正确性。这是 GPU 每秒处理数亿顶点的性能基础。',
        },
        {
          type: "text",
          html: `
            <h3>6.9.1 第1站：模型空间 → 世界空间</h3>
            <p>每个 3D 模型在建模软件（如 Blender）中创建时，有一个<strong>局部坐标系</strong>——<strong>原点位置由建模师设定</strong>，并不自动是几何中心。例如：角色模型的原点通常在<strong>脚底</strong>（y=0=地面），方便直接放在地形上；门模型的原点设在<strong>铰链处</strong>，方便旋转开门。这个坐标系中的坐标称为<strong>模型空间坐标</strong>。</p>
            <p>无论原点在哪，GPU 不关心——它只忠实执行 <strong>v_world = M · v_model</strong>。M 矩阵负责把模型从"建模师设定的原点"搬到"游戏世界中的位置"。</p>
            <p>把模型放入游戏世界时，需要指定它的<strong>位置、旋转和缩放</strong>。这三者组合成<strong>模型矩阵 M</strong>（也称世界矩阵）。在列向量约定下：</p>
          `,
        },
        {
          type: "formula",
          latex: `\\mathbf{M} = \\mathbf{T} \\cdot \\mathbf{R} \\cdot \\mathbf{S}`,
          note: "模型矩阵 = 平移 × 旋转 × 缩放。顺序：先缩放（S），再旋转（R），最后平移（T）。",
        },
        {
          type: "note",
          level: "info",
          body: '<strong>如何从"想放的位置"构建 M？</strong> 不需要反推！你直接指定目标世界坐标、旋转角度和缩放值，填入 M 矩阵即可：<br/><br/>• <strong>平移分量</strong>（第4列）= 你希望模型在世界中的位置 (tx, ty, tz)<br/>• <strong>旋转分量</strong>（左上3×3）= 你希望模型的朝向（R_x, R_y, R_z 依次相乘）<br/>• <strong>缩放分量</strong>（对角线上）= 你希望的缩放因子<br/><br/>构建好 M 后，GPU 对每个模型空间顶点执行 <code>v_world = M · v_model</code>，全部自动归位。<strong>真正需要"反推"的场景</strong>是：已知世界空间中的点（如鼠标点击位置），想知道它在模型空间中的坐标——此时用 <code>v_model = M⁻¹ · v_world</code>。',
        },
        {
          type: "text",
          html: `
            <p><strong>为什么是这个顺序？</strong>想一想：如果先平移再旋转，物体会绕世界原点旋转（不是绕自身）。而先缩放再旋转再平移，缩放和旋转都发生在<strong>模型自身的局部空间</strong>中——这正是我们想要的效果。</p>
            <p><strong>实例：</strong>角色模型在 Blender 中鼻子位于 (0, 1.8, 0.1)。现在角色被放到世界坐标 (50, 0, 30)，绕 y 轴转了 45°，无缩放。鼻子的世界坐标 = M × (0, 1.8, 0.1, 1)。</p>
          `,
        },
        {
          type: "code",
          language: "typescript",
          code: `// 组装模型矩阵 M = T · R · S
const S = scaleMatrix(1, 1, 1)          // 无缩放
const R = rotateY(Math.PI / 4)         // 绕 Y 轴转 45°
const T = translation(50, 0, 30)       // 世界坐标 (50,0,30)
const M = mul4(mul4(T, R), S)          // M = T·R·S
// 角色鼻子 (0, 1.8, 0.1, 1) → 世界坐标
const noseModel = [0, 1.8, 0.1, 1]
const noseWorld = mul4vec(M, noseModel) // ≈ (49.86, 1.8, 28.73, 1)`,
        },
        {
          type: "text",
          html: `
            <h3>6.9.2 第2站：世界空间 → 摄像机空间</h3>
            <p>世界空间中有所有物体，但渲染时我们只关心<strong>从摄像机看到的东西</strong>。视图矩阵 V 将整个世界"移动"到<strong>以摄像机为原点、摄像机前方为 −z 方向</strong>的坐标系中。</p>
            <p><strong>直觉理解：</strong>与其移动摄像机去"看"世界，不如<strong>把整个世界反过来移动</strong>，让摄像机停在原点看向 −z。V 矩阵就是摄像机世界矩阵的<strong>逆矩阵</strong>。</p>
          `,
        },
        {
          type: "definition",
          title: "lookAt 矩阵：从 eye/target/up 构建 V",
          body: '给定<strong>摄像机位置 eye</strong>、<strong>注视点 target</strong>、<strong>上方向 up</strong>（通常为 (0,1,0)），可以构建视图矩阵：<br/><br/>① <strong>z_axis = normalize(eye − target)</strong> — 摄像机前方（−z）<br/>② <strong>x_axis = normalize(up × z_axis)</strong> — 摄像机右侧（+x）<br/>③ <strong>y_axis = z_axis × x_axis</strong> — 摄像机上方（+y）<br/>④ <strong>V = [x_axis, y_axis, z_axis 的旋转 + eye 的平移]</strong><br/><br/>这实际上是摄像机世界矩阵的<strong>逆矩阵</strong>。',
        },
        {
          type: "code",
          language: "typescript",
          code: `// lookAt 矩阵（右手坐标系）
function lookAt(eye: Vec3, target: Vec3, up: Vec3): number[] {
  const z = normalize({x: eye.x-target.x, y: eye.y-target.y, z: eye.z-target.z})
  const x = normalize(cross(up, z))
  const y = cross(z, x)
  // V = 旋转部分（摄像机基向量的转置）× 平移部分（−eye 点积）
  return [
    x.x, y.x, z.x, 0,
    x.y, y.y, z.y, 0,
    x.z, y.z, z.z, 0,
    -dot(x,eye), -dot(y,eye), -dot(z,eye), 1,
  ]
}`,
        },
        {
          type: "text",
          html: `
            <h3>6.9.3 第3站：摄像机空间 → 裁剪空间</h3>
            <p>现在物体在摄像机空间中（摄像机位于原点，看向 −z）。投影矩阵 P 的作用是：</p>
            <ol>
              <li><strong>缩放 x 和 y</strong>：根据 FOV 和宽高比，将可见范围映射到 [−1, 1]</li>
              <li><strong>压缩 z</strong>：将近平面到远平面的深度范围映射到 NDC 的 [−1, 1]（或 [0, 1]）</li>
              <li><strong>设置 w</strong>：对于透视投影，w = −z（用于后续透视除法）</li>
            </ol>
            <p>P 矩阵把<strong>视锥体（一个截顶四棱锥）变换为裁剪空间中的<strong>正方体 [−w, w]³</strong>。这个正方体就是 GPU 进行裁剪的地方——任何坐标超出 [−w, w] 范围的部分被裁掉。</p>
          `,
        },
        {
          type: "text",
          html: `
            <h3>6.9.4 第4站：裁剪与透视除法</h3>
            <p>在裁剪空间中，GPU 检查每个顶点的<strong>齐次坐标</strong> (x, y, z, w)。裁剪条件是：</p>
            <p style="text-align:center; padding:0.5rem 0;"><strong>−w ≤ x ≤ w, &emsp; −w ≤ y ≤ w, &emsp; −w ≤ z ≤ w</strong></p>
            <p>位于这个范围之外的顶点（或其部分）被<strong>裁剪</strong>——不可见的三角形不会进入后续的光栅化阶段，大幅节省计算。</p>
            <p>裁剪之后，GPU 执行<strong>透视除法</strong>：将 (x, y, z) 分别除以 w：</p>
          `,
        },
        {
          type: "formula",
          latex: `\\begin{bmatrix} x_{\\text{NDC}} \\\\ y_{\\text{NDC}} \\\\ z_{\\text{NDC}} \\end{bmatrix} = \\begin{bmatrix} x_{\\text{clip}} / w_{\\text{clip}} \\\\ y_{\\text{clip}} / w_{\\text{clip}} \\\\ z_{\\text{clip}} / w_{\\text{clip}} \\end{bmatrix}`,
          note: "透视除法：裁剪空间 (x, y, z, w) → NDC [−1, 1]³。对于透视投影，w = −z_view，所以远处物体被缩小。",
        },
        {
          type: "text",
          html: `
            <h3>深度压缩的非线性</h3>
            <p>透视投影对 z 的压缩是<strong>非线性</strong>的——靠近近平面的深度获得更高的精度，远离近平面的深度精度急剧下降：</p>
          `,
        },
        {
          type: "illustration",
          caption: "图 6.4 — 透视投影的 z 映射非线性：近处 1m 精度极高，远处 1m 几乎看不到深度变化。",
          width: 500,
          height: 220,
          svg: `<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg"><rect width="500" height="220" fill="#faf8f5" rx="8"/><text x="250" y="22" fill="#555" font-size="12" font-weight="600" text-anchor="middle">NDC z 与 摄像机空间 z 的关系 (n=1, f=100)</text><line x1="60" y1="180" x2="460" y2="180" stroke="#ccc" stroke-width="1"/><text x="40" y="184" fill="#888" font-size="9">z_view</text><text x="40" y="110" fill="#888" font-size="9">z_NDC</text><text x="440" y="182" fill="#888" font-size="9">远</text><text x="55" y="182" fill="#888" font-size="9">近</text><polyline points="60,175 90,130 120,75 150,48 200,25 300,5 460,-5" fill="none" stroke="#e35947" stroke-width="2.5"/><text x="200" y="100" fill="#c53030" font-size="9">深度精度在此区域急剧下降</text><text x="200" y="115" fill="#c53030" font-size="9">→ z-fighting 的风险区域</text><line x1="60" y1="60" x2="460" y2="60" stroke="#ddd" stroke-width="0.8" stroke-dasharray="4,3"/><line x1="60" y1="60" x2="60" y2="180" stroke="#ddd" stroke-width="0.8" stroke-dasharray="4,3"/></svg>`,
        },
        {
          type: "note",
          level: "warning",
          body: "<strong>⚠️ z-fighting 的根源：</strong>由于深度非线性压缩，两个在远处几乎同深的物体会映射到几乎相同的 NDC z 值。GPU 无法区分哪个在前，导致两个面交替闪烁——这就是 z-fighting。解决方案：拉近远平面距离 f、增加深度缓冲位深（24→32 bit）、或使用反向 Z-buffer（将精度集中在远处）。",
        },
        {
          type: "text",
          html: `
            <h3>6.9.5 第5站：NDC → 屏幕空间</h3>
            <p>NDC 中的 (x, y) ∈ [−1, 1]² 通过视口变换映射到屏幕像素坐标（详见 6.8 节）。z 分量写入<strong>深度缓冲</strong>用于逐像素的遮挡判断。</p>
            <p>至此，一个 3D 顶点完成了从模型空间到 2D 屏幕的完整旅程。GPU 每秒重复这个过程<strong>数亿次</strong>——而所有这一切，仅依赖一个简单公式：</p>
            <p style="text-align:center; font-size:1.1em; padding:1rem 0;"><strong>v_screen = viewport( P · V · M · v_model )</strong></p>
          `,
        },
        {
          type: "text",
          html: `
            <h3>6.9.6 完整数值演练</h3>
            <p>取一个具体顶点，跟踪它从模型空间到屏幕的全过程：</p>
          `,
        },
        {
          type: 'derivation',
          title: '数值演练：一个顶点的完整旅程',
          intro: '顶点：角色右手在模型空间中的位置 P_model = (0.5, 1.0, 0)。角色位于世界坐标 (10, 0, 20)，绕 y 轴转了 30°。摄像机在 (5, 8, 40)，看向 (10, 0, 20)。FOV=60°, aspect=16/9, near=1, far=200。',
          steps: [
            { latex: '\\mathbf{M} = \\mathbf{T}(10,0,20) \\cdot \\mathbf{R}_y(30°)', note: '模型矩阵 = 平移 × 旋转（无缩放）。T = 将角色放到世界位置，R = 绕 y 轴转 30°。', insight: '组装顺序 = T·R。先旋转（在模型空间中转身），再平移到世界位置。如果先平移再旋转，角色会绕世界原点公转！' },
            { latex: '\\mathbf{P}_{\\text{world}} = \\mathbf{M} \\cdot (0.5, 1.0, 0, 1)^T', note: '右手在模型空间 (0.5, 1, 0) → 乘以 M → 世界空间中的位置。具体数值因旋转而变化。', insight: '模型空间中的坐标不会变——无论角色在世界哪里，右手相对身体的位置始终是 (0.5, 1, 0)。变换矩阵承担了所有"移动"工作。' },
            { latex: '\\mathbf{V} = \\text{lookAt}((5,8,40), (10,0,20), (0,1,0))', note: '视图矩阵：摄像机在 (5,8,40)，注视 (10,0,20)，上方向 (0,1,0)。', insight: 'lookAt 自动计算摄像机空间的三个轴：z = eye-target（前方），x = up×z（右侧），y = z×x（上方）。' },
            { latex: '\\mathbf{P}_{\\text{view}} = \\mathbf{V} \\cdot \\mathbf{P}_{\\text{world}}', note: '世界空间 × V → 摄像机空间。此时摄像机位于原点，角色在其前方某处。', insight: '摄像机空间中，角色可能在 (3, 2, -15) 左右——x=3 表示在摄像机右侧，z=-15 表示在摄像机前方 15 单位。' },
            { latex: '\\mathbf{P} = \\text{perspective}(60°, 16/9, 1, 200)', note: '投影矩阵：FOV 60°，宽屏 16:9，近平面 1，远平面 200。cot(30°)=1.732，缩放因子=1.732。', insight: '1/tan(fov/2) = 1/tan(30°) = 1.732。宽高比 aspect=1.778，所以 x 方向额外除以 1.778（因为屏幕比高宽）。' },
            { latex: '\\mathbf{P}_{\\text{clip}} = \\mathbf{P} \\cdot \\mathbf{P}_{\\text{view}}', note: '摄像机空间 × P → 裁剪空间 (4D)。关键：w_clip = −z_view（透视投影的 −1 行）。', insight: '此时 w_clip ≈ 15。裁剪判定：−15 ≤ x,y,z ≤ 15。角色的右手在这个范围内，所以不会被裁剪。' },
            { latex: '\\mathbf{P}_{\\text{NDC}} = \\left(\\frac{x_{\\text{clip}}}{w_{\\text{clip}}}, \\frac{y_{\\text{clip}}}{w_{\\text{clip}}}, \\frac{z_{\\text{clip}}}{w_{\\text{clip}}}\\right)', note: '透视除法 ÷w → NDC。w ≈ 15，所以 x_NDC ≈ x_clip/15，y_NDC ≈ y_clip/15。', insight: 'NDC 中 x,y ∈ [−1,1]。如果宽高比正确，x_NDC 约在 (−0.3, 0.3) 左右——角色在屏幕中央偏右。' },
          ],
        },
        {
          type: "text",
          html: `
            <h3>6.9.7 完整实例：一个长方体的渲染全旅程</h3>
            <p>上一节跟踪了一个顶点的数值变化。现在用一个<strong>完整的长方体</strong>（4棱柱，8个顶点）走完整个管线，每步配合图解，直观看到物体形状在各个空间中的变化。</p>
            <p><strong>场景设定：</strong>一个长方体（宽2、高2、深4）放在世界坐标 (10, 1, 20) 处，绕 y 轴旋转 20°。摄像机在 (5, 6, 35)，看向长方体中心 (10, 1, 20)。屏幕分辨率为 1920×1080，FOV=60°，near=1，far=100。</p>
          `,
        },
        {
          type: "illustration",
          caption: `图 6.5 — ① 模型空间：长方体以自身中心为原点，8 个顶点坐标。局部坐标与模型一起"携带"，无论模型在世界何处都不变。`,
          width: 480,
          height: 300,
          svg: `<svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg"><defs><marker id="sx" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto"><path d="M0,0 L6,2.5 L0,5 Z" fill="#e35947"/></marker><marker id="sy" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto"><path d="M0,0 L6,2.5 L0,5 Z" fill="#2e9978"/></marker><marker id="sz" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto"><path d="M0,0 L6,2.5 L0,5 Z" fill="#387ad9"/></marker></defs><rect width="480" height="300" fill="#faf8f5" rx="8"/><text x="240" y="22" fill="#555" font-size="12" font-weight="600" text-anchor="middle">模型空间 (局部坐标)</text><line x1="40" y1="220" x2="200" y2="220" stroke="#e35947" stroke-width="1.5" marker-end="url(#sx)"/><text x="195" y="215" fill="#e35947" font-size="10" font-weight="600">x</text><line x1="40" y1="220" x2="40" y2="80" stroke="#2e9978" stroke-width="1.5" marker-end="url(#sy)"/><text x="48" y="85" fill="#2e9978" font-size="10" font-weight="600">y</text><line x1="40" y1="220" x2="120" y2="270" stroke="#387ad9" stroke-width="1.5" marker-end="url(#sz)"/><text x="115" y="285" fill="#387ad9" font-size="10" font-weight="600">z</text><circle cx="40" cy="220" r="2.5" fill="#555"/><text x="28" y="212" fill="#555" font-size="9">O</text><!-- Box in pseudo-3D --><polygon points="120,160 200,140 200,110 120,130" fill="#fef2f2" stroke="#e35947" stroke-width="1.5" opacity="0.7"/><polygon points="120,160 120,230 120,200 120,130" fill="none" stroke="#e35947" stroke-width="0.5" opacity="0"/><polygon points="120,160 200,140 190,210 120,230" fill="#fee" stroke="#e35947" stroke-width="1" opacity="0.5"/><polygon points="200,140 200,110 190,180 190,210" fill="#fdd" stroke="#e35947" stroke-width="1" opacity="0.3"/><polygon points="120,130 200,110 190,180 120,200" fill="#fcc" stroke="#e35947" stroke-width="1" opacity="0.3"/><text x="210" y="120" fill="#c53030" font-size="9">(-1, 1, 2)</text><text x="210" y="135" fill="#c53030" font-size="9">(1, 1, 2)</text><text x="195" y="175" fill="#c53030" font-size="9">(1, 1, -2)</text><text x="125" y="125" fill="#c53030" font-size="9">(-1, -1, 2)</text><text x="125" y="195" fill="#c53030" font-size="9">(-1, -1, -2)</text><text x="50" y="150" fill="#666" font-size="11">宽2 × 高2 × 深4</text><text x="50" y="168" fill="#666" font-size="9">中心在原点</text><text x="290" y="115" fill="#c53030" font-size="9">顶点坐标 (模型空间)：</text><text x="290" y="133" fill="#555" font-size="9">前上面: (-1, 1, 2)  (1, 1, 2)</text><text x="290" y="150" fill="#555" font-size="9">前下面: (-1,-1, 2)  (1,-1, 2)</text><text x="290" y="167" fill="#555" font-size="9">后上面: (-1, 1,-2)  (1, 1,-2)</text><text x="290" y="184" fill="#555" font-size="9">后下面: (-1,-1,-2)  (1,-1,-2)</text></svg>`,
        },
        {
          type: 'derivation',
          title: '第①步：模型空间 → 世界空间',
          intro: '长方体最初在模型空间（原点在自身中心）。通过模型矩阵 M = T·R·S 将其摆放到世界中的正确位置。本场景中 S = I（无缩放）。',
          steps: [
            { latex: '\\mathbf{R} = \\mathbf{R}_y(20°) = \\begin{bmatrix} 0.94 & 0 & 0.34 \\\\ 0 & 1 & 0 \\\\ -0.34 & 0 & 0.94 \\end{bmatrix}', note: '绕 y 轴旋转 20°。cos20°≈0.94, sin20°≈0.34。物体沿 xz 平面旋转。', insight: '旋转矩阵的列 = 模型空间基向量在世界空间的方向。第1列 (0.94, 0, -0.34) = 模型空间的"右"方向在世界空间中略微偏后。' },
            { latex: '\\mathbf{T} = \\begin{bmatrix} 1 & 0 & 0 & 10 \\\\ 0 & 1 & 0 & 1 \\\\ 0 & 0 & 1 & 20 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}', note: '平移：物体中心从 (0,0,0) 移到世界坐标 (10, 1, 20)。', insight: '平移只改变位置，不改变形状和朝向。物体的所有顶点跟着中心一起移动。' },
            { latex: '\\mathbf{M} = \\mathbf{T} \\cdot \\mathbf{R} = \\begin{bmatrix} 0.94 & 0 & 0.34 & 10 \\\\ 0 & 1 & 0 & 1 \\\\ -0.34 & 0 & 0.94 & 20 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}', note: '模型矩阵 = T·R（先旋转再平移）。注意第4列的平移分量直接来自 T。', insight: 'M 的左上 3×3 = 旋转部分，第4列 = 平移部分。对于每个顶点 v_model，v_world = M · v_model。' },
          ],
        },
        {
          type: 'derivation',
          title: '第②步：世界空间 → 摄像机空间',
          intro: '摄像机位于 (5, 6, 35)，看向长方体中心 (10, 1, 20)。通过 lookAt 构建视图矩阵 V。',
          steps: [
            { latex: '\\mathbf{z}_{\\text{axis}} = \\text{normalize}((5,6,35) - (10,1,20)) = (-0.28, 0.28, 0.84)', note: '摄像机前方方向（-z 轴）= eye − target 归一化。指向从 target 到 eye 的方向。', insight: '注意：摄像机看向 target，但 z_axis = eye−target（从目标指向摄像机）。这和"看向"的直觉相反——因为在右手坐标系中，摄像机"前方"是 −z。' },
            { latex: '\\mathbf{x}_{\\text{axis}} = \\text{normalize}((0,1,0) \\times \\mathbf{z}_{\\text{axis}}) = (0.95, 0, 0.32)', note: '摄像机右侧（+x 轴）= up × z_axis 归一化。右手定则：拇指=up，食指=z，中指=x。', insight: 'x_axis 位于 xz 平面（y=0）——因为 up=(0,1,0) 和 z_axis 都在 y 上有分量，叉积得到垂直于两者的方向。' },
            { latex: '\\mathbf{y}_{\\text{axis}} = \\mathbf{z}_{\\text{axis}} \\times \\mathbf{x}_{\\text{axis}} = (-0.09, 0.96, -0.32)', note: '摄像机上方向（+y 轴）= z_axis × x_axis。与原始的 up=(0,1,0) 略有不同，因为摄像机有俯仰。', insight: '如果摄像机完全水平（无俯仰），y_axis 就是 (0,1,0)。但这里摄像机从 (5,6,35) 看向 (10,1,20)，略向下俯视，所以 y_axis 偏离了 (0,1,0)。' },
            { latex: '\\mathbf{V} = \\begin{bmatrix} 0.95 & -0.09 & 0.28 & -9.6 \\\\ 0 & 0.96 & -0.28 & -3.8 \\\\ 0.32 & -0.32 & -0.84 & 24.1 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}', note: '完整的 4×4 视图矩阵。第4列 = (−dot(x,eye), −dot(y,eye), −dot(z,eye)) 是眼睛位置在摄像机空间中的反投影。', insight: '视图矩阵 = 摄像机世界矩阵的逆。它把世界"反着移动"：摄像机在 (5,6,35) → V 把整个世界平移到相当于摄像机在原点的位置。' },
          ],
        },
        {
          type: "illustration",
          caption: `图 6.6 — ② 摄像机空间：整个世界被"移动"到以摄像机为原点。长方体原来的世界坐标被变换为摄像机空间坐标。摄像机看向 −z 方向。`,
          width: 520,
          height: 300,
          svg: `<svg viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg"><rect width="520" height="300" fill="#faf8f5" rx="8"/><text x="260" y="22" fill="#555" font-size="12" font-weight="600" text-anchor="middle">摄像机空间 (相机在原点的坐标系)</text><circle cx="60" cy="200" r="4" fill="#555"/><text x="40" y="190" fill="#555" font-size="10" font-weight="600">摄像机</text><text x="40" y="205" fill="#888" font-size="8">(0,0,0)</text><line x1="60" y1="200" x2="490" y2="200" stroke="#387ad9" stroke-width="1.5"/><text x="478" y="195" fill="#387ad9" font-size="9" font-weight="600">-z</text><line x1="60" y1="200" x2="60" y2="50" stroke="#2e9978" stroke-width="1.5"/><text x="70" y="55" fill="#2e9978" font-size="9">+y</text><line x1="60" y1="200" x2="160" y2="260" stroke="#e35947" stroke-width="1.5"/><text x="155" y="275" fill="#e35947" font-size="9">+x</text><!-- Near plane --><line x1="180" y1="80" x2="180" y2="260" stroke="#e35947" stroke-width="1.2" stroke-dasharray="6,3"/><text x="145" y="75" fill="#c53030" font-size="9">近平面 z=-1</text><!-- Box in camera space (rotated, translated) --><polygon points="310,155 370,148 370,130 310,137" fill="#fef9c3" stroke="#eab308" stroke-width="1.5" opacity="0.7"/><polygon points="310,155 310,185 310,167 310,137" fill="none" stroke="#eab308" stroke-width="0.5"/><polygon points="310,155 370,148 365,178 310,185" fill="#fef3c7" stroke="#eab308" stroke-width="1" opacity="0.5"/><polygon points="370,148 370,130 365,160 365,178" fill="#fee" stroke="#eab308" stroke-width="1" opacity="0.3"/><polygon points="310,137 370,130 365,160 310,167" fill="#fef9c3" stroke="#eab308" stroke-width="1" opacity="0.3"/><text x="380" y="135" fill="#a16207" font-size="9" font-weight="600">长方体</text><text x="380" y="150" fill="#a16207" font-size="8">(摄像机空间)</text><text x="380" y="165" fill="#888" font-size="8">z ≈ -15 到 -19</text></svg>`,
        },
        {
          type: 'derivation',
          title: '第③④⑤步：投影 → 裁剪 → 透视除法 → 屏幕',
          intro: '剩余步骤通过矩阵和除法完成。以长方体前上面顶点 (1, 1, 2) 为例，跟踪它从摄像机空间到屏幕的变换。',
          steps: [
            { latex: '\\mathbf{P} = \\begin{bmatrix} 1.0 & 0 & 0 & 0 \\\\ 0 & 1.73 & 0 & 0 \\\\ 0 & 0 & -1.02 & -2.02 \\\\ 0 & 0 & -1 & 0 \\end{bmatrix}', note: '投影矩阵（60°FOV, 16:9, near=1, far=100）。1/tan(30°)=1.73，aspect=1.78，x缩放=1.73/1.78=0.97≈1.0。', insight: 'P[0][0]=cot(30°)/aspect≈1.73/1.78≈0.97。P[3][2]=-1 是把摄像机空间 z 复制到 w 的关键（w_clip = -z_view）。' },
            { latex: '\\mathbf{v}_{\\text{clip}} = \\mathbf{P} \\cdot \\mathbf{v}_{\\text{view}} = (x_{clip}, y_{clip}, z_{clip}, w_{clip})', note: '以 (1,1,2) 变换后的某个顶点为例，P 矩阵乘以摄像机空间坐标得到 4D 裁剪空间坐标。', insight: '此时坐标仍为齐次坐标。x_clip 和 y_clip 已经缩放到接近 [−w, w] 范围。如果超出，GPU 会裁剪该顶点。' },
            { latex: '\\mathbf{v}_{\\text{NDC}} = (\\frac{x_{clip}}{w_{clip}}, \\frac{y_{clip}}{w_{clip}}, \\frac{z_{clip}}{w_{clip}})', note: '透视除法 ÷w。w_clip ≈ |z_view|（深度），远处顶点 w 大，÷w 后坐标缩小——产生近大远小。', insight: '以 z_view≈-17 的顶点为例：w_clip≈17，÷17 后 x,y 缩到约 (−0.2, 0.1) 范围——这个顶点在 NDC 中靠近屏幕中心。' },
            { latex: 'x_{screen} = \\frac{x_{NDC}+1}{2} \\times 1920, \\quad y_{screen} = \\frac{1-y_{NDC}}{2} \\times 1080', note: '视口变换：NDC [−1,1] → 屏幕像素 [0,1920]×[0,1080]。x_NDC≈−0.2 → x_screen≈768px，y_NDC≈0.1 → y_screen≈486px。', insight: '该顶点最终出现在屏幕约 (768, 486) 的位置——偏左、偏上的区域。8 个顶点经同样流程后，在屏幕上形成透视投影下的长方体。' },
          ],
        },
        {
          type: "illustration",
          caption: `图 6.7 — ③④⑤ 投影与屏幕映射：视锥体中的长方体 → 投影到近平面 → 透视除法 → 视口变换 → 屏幕上的 2D 图像。注意远面顶点比近面顶点更"收缩"到中心。`,
          width: 520,
          height: 280,
          svg: `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><rect width="520" height="280" fill="#faf8f5" rx="8"/><text x="260" y="18" fill="#555" font-size="11" font-weight="600" text-anchor="middle">投影 + 屏幕映射</text><!-- Side view on left --><circle cx="50" cy="120" r="3" fill="#555"/><text x="30" y="115" fill="#555" font-size="9" font-weight="600">相机</text><line x1="50" y1="120" x2="240" y2="120" stroke="#ccc" stroke-width="1"/><line x1="120" y1="60" x2="120" y2="180" stroke="#e35947" stroke-width="1.2" stroke-dasharray="5,3"/><text x="108" y="55" fill="#c53030" font-size="8">近平面</text><rect x="135" y="95" width="30" height="50" fill="#fef9c3" stroke="#eab308" stroke-width="1" opacity="0.8"/><text x="140" y="90" fill="#a16207" font-size="7">长方体</text><!-- Screen on right --><rect x="310" y="55" width="190" height="130" fill="#fff" stroke="#888" stroke-width="1.5" rx="3"/><text x="405" y="50" fill="#666" font-size="9" font-weight="600">屏幕 (1920×1080)</text><!-- Projected box on screen --><polygon points="360,85 420,95 460,85 400,75" fill="#fef9c3" stroke="#a16207" stroke-width="1.2" opacity="0.8"/><polygon points="360,85 360,155 400,145 400,75" fill="#fef3c7" stroke="#a16207" stroke-width="1" opacity="0.5"/><polygon points="420,95 460,85 460,155 420,165" fill="#fee" stroke="#a16207" stroke-width="1" opacity="0.3"/><polygon points="360,155 420,165 460,155 400,145" fill="#fed" stroke="#a16207" stroke-width="1" opacity="0.4"/><text x="370" y="73" fill="#a16207" font-size="8">前面(大)</text><text x="425" y="172" fill="#a16207" font-size="8">后面(小)</text><text x="425" y="185" fill="#888" font-size="7">透视：远面收缩</text><text x="310" y="210" fill="#888" font-size="8">8 个模型空间顶点 → M → V → P → ÷w → 视口</text><text x="310" y="225" fill="#888" font-size="8">→ 屏幕上的 2D 投影四边形</text></svg>`,
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
              <li>✅ 齐次坐标——4D 表示 3D 变换的巧妙设计（w=1 点，w=0 方向）</li>
              <li>✅ 4×4 平移矩阵——解决 3×3 不能平移的问题</li>
              <li>✅ 透视投影矩阵——w 分量产生近大远小效果</li>
              <li>✅ 正交投影——没有透视的平直投影</li>
              <li>✅ 完整渲染管线：5 个阶段、6 个坐标空间、1 个公式</li>
              <li>✅ 深度非线性压缩及其导致的 z-fighting 问题</li>
              <li>✅ 一个顶点从模型空间到屏幕空间的完整数值演练</li>
            </ul>
            <p>掌握了前六章的内容，你已经拥有了理解任何 3D 图形代码所需的全部数学基础。后续章节将转入更具体的应用领域。</p>
          `,
        },
      ],
    },
  ],
}

export default content
