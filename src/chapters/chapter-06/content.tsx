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
            <p>行列式（Determinant）是方阵的一个重要标量属性，记作 <strong>det(M)</strong> 或 <strong>|M|</strong>。</p>
            <p>在 2D 和 3D 中，行列式的绝对值等于矩阵所表示的线性变换对 <strong>面积/体积的缩放因子</strong>。</p>
            <ul>
              <li><strong>det(M) > 0</strong>：变换保持手性（orientation-preserving）</li>
              <li><strong>det(M) < 0</strong>：变换翻转手性（orientation-reversing），即包含反射</li>
              <li><strong>det(M) = 0</strong>：矩阵不可逆，变换将空间压缩到更低维度（投影）</li>
            </ul>
          `,
        },
        {
          type: "formula",
          latex: `\\det\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} = ad - bc`,
          note: "2×2 矩阵的行列式：主对角线乘积减去副对角线乘积",
        },
      ],
    },
    {
      title: "6.2 逆矩阵",
      blocks: [
        {
          type: "text",
          html: `
            <p>方阵 <strong>M</strong> 的逆矩阵记作 <strong>M⁻¹</strong>，满足 <strong>M · M⁻¹ = M⁻¹ · M = I</strong>。</p>
            <p>几何意义：逆矩阵 <strong>"撤销"</strong>原矩阵的变换。例如旋转矩阵的逆就是反向旋转；缩放矩阵的逆就是取倒数缩放。</p>
            <p>只有行列式非零的方阵（满秩矩阵）才存在逆矩阵。</p>
          `,
        },
      ],
    },
    {
      title: "6.3 正交矩阵",
      blocks: [
        {
          type: "text",
          html: `
            <p>正交矩阵（Orthogonal Matrix）是一种特殊的方阵，其逆矩阵等于其转置：<strong>M⁻¹ = Mᵀ</strong>。</p>
            <p>几何意义：正交矩阵表示的变换<strong>保持长度和角度不变</strong>——即只包含旋转和/或反射，不包含缩放或剪切。</p>
            <ul>
              <li>旋转矩阵是正交矩阵（det = +1）</li>
              <li>反射矩阵也是正交矩阵（det = -1）</li>
              <li>正交矩阵的每一行（列）都是单位向量，且彼此正交</li>
            </ul>
          `,
        },
      ],
    },
    {
      title: "6.4 齐次坐标",
      blocks: [
        {
          type: "text",
          html: `
            <p>齐次坐标（Homogeneous Coordinates）是 3D 图形学的核心概念。通过将 3D 点 <strong>(x, y, z)</strong> 扩展为 4D 向量 <strong>(x, y, z, 1)</strong>，我们可以用 4×4 矩阵统一表示<strong>旋转、缩放、平移和投影</strong>。</p>
            <p>方向向量则用 w=0 表示：<strong>(x, y, z, 0)</strong>，这样平移变换不会影响方向。</p>
          `,
        },
      ],
    },
    {
      title: "6.5 4×4 平移矩阵",
      blocks: [
        {
          type: "text",
          html: `
            <p>平移无法用 3×3 矩阵表示（因为平移不是关于原点的线性变换）。但在齐次坐标下，4×4 矩阵可以优雅地实现平移：</p>
          `,
        },
        {
          type: "formula",
          latex: `\\begin{bmatrix} 1 & 0 & 0 & t_x \\\\ 0 & 1 & 0 & t_y \\\\ 0 & 0 & 1 & t_z \\\\ 0 & 0 & 0 & 1 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\\\ z \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} x + t_x \\\\ y + t_y \\\\ z + t_z \\\\ 1 \\end{bmatrix}`,
          note: "4×4 平移矩阵。第四列的前三个分量是平移量 (t_x, t_y, t_z)。方向向量 (w=0) 不受平移影响。",
        },
      ],
    },
    {
      title: "6.6 透视投影",
      blocks: [
        {
          type: "text",
          html: `
            <p>透视投影（Perspective Projection）模拟了人眼和相机的成像方式：<strong>近大远小</strong>。远处的物体在屏幕上显得更小，平行线在远处汇聚到一点（灭点）。</p>
            <p>核心参数：</p>
            <ul>
              <li><strong>视野角（FOV, Field of View）</strong>：垂直方向的可视角度，通常在 45°–90° 之间</li>
              <li><strong>宽高比（Aspect Ratio）</strong>：屏幕宽度 / 高度</li>
              <li><strong>近裁剪面（Near Clip Plane）</strong>：最近可见距离</li>
              <li><strong>远裁剪面（Far Clip Plane）</strong>：最远可见距离</li>
            </ul>
            <p>这四个参数定义了一个<strong>视锥体（View Frustum）</strong>——一个被截断的金字塔形状。</p>
          `,
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
            <p>将前面所有概念串联起来，从 3D 模型到屏幕像素的完整变换管线：</p>
            <ol>
              <li><strong>模型变换（Model Transform）</strong>：物体从自身的<em>模型空间</em>变换到<em>世界空间</em>，包含旋转、缩放、平移</li>
              <li><strong>视图变换（View Transform）</strong>：从世界空间变换到<em>相机空间</em>，本质上是将相机"移回"原点的逆变换</li>
              <li><strong>投影变换（Projection Transform）</strong>：从相机空间变换到<em>裁剪空间</em>，透视投影产生近大远小效果</li>
              <li><strong>透视除法（Perspective Divide）</strong>：除以 w 分量，从裁剪空间变换到<em>NDC（归一化设备坐标）</em></li>
              <li><strong>视口变换（Viewport Transform）</strong>：从 NDC 映射到<em>屏幕空间</em>的实际像素坐标</li>
            </ol>
            <p>整体公式：<strong>P_screen = Viewport · Projection · View · Model · P_local</strong></p>
            <p>下面通过一个具体数值例子，跟踪一个顶点从模型空间到屏幕空间的完整旅程。</p>
          `,
        },
        {
          type: "text",
          html: `
            <h3>场景设定</h3>
            <table style="width:100%;font-size:0.9em;border-collapse:collapse;">
              <tr><td style="padding:3px 12px 3px 0;color:#888;white-space:nowrap;">模型顶点</td><td>P_model = (0.5, 1.2, 0) — 一个小房子屋顶尖端在模型空间中的位置</td></tr>
              <tr><td style="padding:3px 12px 3px 0;color:#888;white-space:nowrap;">模型摆放</td><td>世界坐标 (10, 0, 20)，绕 Y 轴旋转 30°，无缩放</td></tr>
              <tr><td style="padding:3px 12px 3px 0;color:#888;white-space:nowrap;">摄像机</td><td>位于 (4, 6, 38)，注视模型中心 (10, 0, 20)</td></tr>
              <tr><td style="padding:3px 12px 3px 0;color:#888;white-space:nowrap;">投影参数</td><td>FOV = 60°, 宽高比 = 16:9, near = 1, far = 100</td></tr>
              <tr><td style="padding:3px 12px 3px 0;color:#888;white-space:nowrap;">屏幕</td><td>1920 × 1080 像素</td></tr>
            </table>
          `,
        },
        {
          type: "derivation",
          title: "完整数值演练：一个顶点的 MVP 旅程",
          intro: "跟踪顶点 P_model = (0.5, 1.2, 0) 依次经过 M → V → P → ÷w → 视口变换，看它在每个空间中的坐标变化。",
          steps: [
            {
              latex: `\\mathbf{M} = \\mathbf{T}(10,0,20) \\cdot \\mathbf{R}_y(30°) = \\begin{bmatrix} 0.866 & 0 & 0.5 & 10 \\\\ 0 & 1 & 0 & 0 \\\\ -0.5 & 0 & 0.866 & 20 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}`,
              note: "第①步：模型矩阵 M = 平移 × 旋转。左上角 3×3 = 旋转部分（绕 Y 转 30°），第 4 列 = 世界位置 (10, 0, 20)。",
              insight: "M 的每一列有明确含义——前三列 = 模型空间 X/Y/Z 轴在世界空间中的方向，第4列 = 模型原点在世界空间中的位置。"
            },
            {
              latex: `\\mathbf{P}_{\\text{world}} = \\mathbf{M} \\cdot \\begin{bmatrix} 0.5 \\\\ 1.2 \\\\ 0 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 10.43 \\\\ 1.20 \\\\ 19.75 \\\\ 1 \\end{bmatrix}`,
              note: "模型空间顶点 (0.5, 1.2, 0) × M → 世界空间。x = 0.866×0.5 + 10 = 10.43，z = −0.5×0.5 + 20 = 19.75（旋转使顶点在 xz 平面偏移）。",
              insight: "无论模型在世界何处，模型空间中的顶点坐标永远不变——所有「移动」都由 M 矩阵完成。这就是为什么同一个模型可以在场景中复用多次，只需换不同的 M。"
            },
            {
              latex: `\\mathbf{V} = \\text{lookAt}((4,6,38),\\ (10,0,20),\\ (0,1,0))`,
              note: "第②步：视图矩阵 V。摄像机在 (4,6,38)，注视 (10,0,20)。lookAt 自动计算摄像机的三个正交轴：前方 z = normalize(eye−target)、右侧 x = normalize(up×z)、上方 y = z×x，然后组装成 V。",
              insight: "V 矩阵 = 摄像机世界矩阵的逆。它把整个世界「反着移动」——摄像机本来在 (4,6,38) 看向目标，V 把世界平移 + 旋转，使得摄像机等效于在原点看向 −z。"
            },
            {
              latex: `\\mathbf{V} = \\begin{bmatrix} 0.949 & -0.096 & 0.302 & -6.28 \\\\ 0 & 0.955 & -0.302 & -5.73 \\\\ 0.317 & 0.287 & -0.905 & 30.2 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}`,
              note: "lookAt 构建出的具体 V 矩阵。前三列 = 摄像机右/上/前方向在世界中的分量，第4列 = −dot(axis, eye)。",
              insight: "V 矩阵也可以不用 lookAt 而手动构建——只要你算出了摄像机空间的三个正交轴。但在实践中 always use engine API（如 Babylon 的 Matrix.LookAtLH/RH），手算极易出错。"
            },
            {
              latex: `\\mathbf{P}_{\\text{view}} = \\mathbf{V} \\cdot \\mathbf{P}_{\\text{world}} \\approx \\begin{bmatrix} 4.81 \\\\ -3.97 \\\\ -16.4 \\\\ 1 \\end{bmatrix}`,
              note: "世界空间顶点 × V → 摄像机空间。x≈4.81 表示顶点在摄像机右侧约 4.8 单位，z≈−16.4 表示在摄像机前方约 16.4 单位。",
              insight: "摄像机空间中，z 为负值（右手系摄像机看向 −z）。离摄像机越远的物体 |z| 越大。这个 |z| 值将在透视投影中决定物体缩小多少——这就是「近大远小」的根源。"
            },
            {
              latex: `\\mathbf{P} = \\begin{bmatrix} \\frac{\\cot(30°)}{16/9} & 0 & 0 & 0 \\\\ 0 & \\cot(30°) & 0 & 0 \\\\ 0 & 0 & \\frac{100+1}{1-100} & \\frac{2·100·1}{1-100} \\\\ 0 & 0 & -1 & 0 \\end{bmatrix} = \\begin{bmatrix} 0.974 & 0 & 0 & 0 \\\\ 0 & 1.732 & 0 & 0 \\\\ 0 & 0 & -1.02 & -2.02 \\\\ 0 & 0 & -1 & 0 \\end{bmatrix}`,
              note: "第③步：投影矩阵 P。1/tan(30°)=1.732，除以宽高比 16/9≈1.778 后 x 缩放≈0.974。第4行第3列 = −1 是关键——把摄像机空间的 z 取反后存入 w。",
              insight: "P[3][2] = −1 是透视投影区别于正交投影的唯一标记。它令 w_clip = −z_view，后续的 ÷w 就会自动实现「近大远小」。正交投影的 P[3][2] = 0。"
            },
            {
              latex: `\\mathbf{P}_{\\text{clip}} = \\mathbf{P} \\cdot \\mathbf{P}_{\\text{view}} \\approx \\begin{bmatrix} 4.69 \\\\ -6.88 \\\\ 14.74 \\\\ 16.4 \\end{bmatrix}`,
              note: "摄像机空间顶点 × P → 裁剪空间（4D 齐次坐标）。x_clip≈4.69, y_clip≈−6.88, z_clip≈14.74, w_clip≈16.4。注意 w ≠ 1 了！——透视投影改变了 w 分量。",
              insight: "裁剪空间中 GPU 判定可见性：−w ≤ x,y,z ≤ w。本例中 −16.4 ≤ 4.69, −6.88, 14.74 ≤ 16.4，全部通过裁剪——这个顶点在视锥体内，不会被裁掉。"
            },
            {
              latex: `\\mathbf{P}_{\\text{NDC}} = \\left(\\frac{4.69}{16.4},\\ \\frac{-6.88}{16.4},\\ \\frac{14.74}{16.4}\\right) = (0.286,\\ -0.420,\\ 0.899)`,
              note: "第④步：透视除法 ÷w。x,y,z 各除以 w_clip≈16.4。x_NDC≈0.286（屏幕偏右），y_NDC≈−0.420（屏幕偏下），z_NDC≈0.899（深度值，在 [−1,1] 内）。",
              insight: "透视除法的效果：w_clip = −z_view ≈ 16.4。如果顶点在更远处（|z_view| 更大），w 更大，÷w 后坐标更接近 0（屏幕中心）——这就是「远小近大」的完整数学机制。"
            },
            {
              latex: `\\begin{aligned} x_{\\text{screen}} &= \\frac{0.286+1}{2} \\times 1920 = 1235\\ \\text{px} \\\\ y_{\\text{screen}} &= \\frac{1-(-0.420)}{2} \\times 1080 = 767\\ \\text{px} \\end{aligned}`,
              note: "第⑤步：视口变换。NDC [−1,1] → 屏幕像素。x_NDC=0.286 → 屏幕 x≈1235px，y_NDC=−0.420 → 屏幕 y≈767px。最终这个顶点显示在屏幕的 (1235, 767) 位置。",
              insight: "顶点出发时在模型空间 (0.5, 1.2, 0)，经过 M(摆放) → V(视角) → P(投影) → ÷w(透视) → viewport(屏幕)，最终落在屏幕 (1235, 767)。GPU 每帧对每个顶点重复这个过程——这就是 3D 渲染的全部数学。"
            },
          ],
        },
        {
          type: "text",
          html: `
            <h3>矩阵链总结</h3>
            <p>回顾整个过程中每个矩阵的<strong>独立职责</strong>：</p>
            <table style="width:100%;font-size:0.9em;border-collapse:collapse;">
              <tr style="border-bottom:1px solid #e5e7eb;">
                <td style="padding:6px 8px;font-weight:700;color:#e35947;white-space:nowrap;">M（模型矩阵）</td>
                <td style="padding:6px 8px;">决定物体在<strong>世界中的位置、朝向和大小</strong>。M = T · R · S。改变 M 就是移动/旋转/缩放物体。</td>
              </tr>
              <tr style="border-bottom:1px solid #e5e7eb;">
                <td style="padding:6px 8px;font-weight:700;color:#2e9978;white-space:nowrap;">V（视图矩阵）</td>
                <td style="padding:6px 8px;">决定<strong>从哪个角度观察世界</strong>。V = 摄像机世界矩阵的逆。改变 V 就是移动摄像机。</td>
              </tr>
              <tr style="border-bottom:1px solid #e5e7eb;">
                <td style="padding:6px 8px;font-weight:700;color:#387ad9;white-space:nowrap;">P（投影矩阵）</td>
                <td style="padding:6px 8px;">决定<strong>如何将 3D 压到 2D</strong>。P[3][2]=−1 产生透视（近大远小），P[3][2]=0 则无透视（正交投影）。</td>
              </tr>
              <tr>
                <td style="padding:6px 8px;font-weight:700;color:#a659db;white-space:nowrap;">MVP（组合）</td>
                <td style="padding:6px 8px;">GPU 中通常预乘为 <strong>MVP = P · V · M</strong>，每个顶点只需一次矩阵乘法。结合律保证 (P·V)·M = P·(V·M)。</td>
              </tr>
            </table>
            <p>下面的交互演示将所有 5 个空间可视化在一个场景中——旋转视角、拉近拉远，观察每个变换阶段的空间关系：</p>
          `,
        },
        {
          type: "demo",
          demoId: "transform-pipeline",
        },
      ],
    },
  ],
}

export default content
