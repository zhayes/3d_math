import type { ChapterContent } from "@/components/content/types"

const content: ChapterContent = {
  id: "8",
  title: "三维旋转",
  sections: [
    {
      title: "8.1 旋转的复杂性",
      blocks: [
        {
          type: "text",
          html: `
            <p>旋转是 3D 图形学中最重要、也是最复杂的主题之一。与 2D 旋转（只需一个角度）不同，<strong>3D 旋转有三个自由度</strong>，且旋转<strong>不满足交换律</strong>——先绕 x 轴再绕 y 轴的结果，与先 y 后 x 完全不同。</p>
            <p>3D 旋转有四种主要的表示方法：<strong>欧拉角、轴-角、矩阵、四元数</strong>。每种方法各有优劣，实际开发中通常根据场景选择合适的方法，并在它们之间转换。</p>
          `,
        },
      ],
    },
    {
      title: "8.2 欧拉角",
      blocks: [
        {
          type: "text",
          html: `
            <p><strong>欧拉角（Euler Angles）</strong>是最直观的旋转表示：将任意 3D 旋转分解为<strong>绕三个坐标轴的依次旋转</strong>。就像飞机的三个姿态角：</p>
            <ul>
              <li><strong>Pitch（俯仰）</strong>：绕 x 轴（或侧轴）的旋转——机头上下</li>
              <li><strong>Yaw（偏航）</strong>：绕 y 轴（或垂直轴）的旋转——机头左右</li>
              <li><strong>Roll（滚转）</strong>：绕 z 轴（或前后轴）的旋转——机身侧倾</li>
            </ul>
          `,
        },
        {
          type: "definition",
          title: "定义: 欧拉角",
          body: '将 3D 旋转表示为三个独立的角度 (α, β, γ)，分别代表绕特定轴的旋转量。旋转按<strong>固定顺序</strong>依次应用。<br/><br/>常见约定：<strong>Heading-Pitch-Bank</strong>（偏航-俯仰-滚转）：先绕 y 轴（heading）→ 再绕 x 轴（pitch）→ 最后绕 z 轴（bank/roll）。',
        },
        {
          type: "formula",
          latex: `\\mathbf{R}_{yaw}(h) = \\begin{bmatrix} \\cos h & 0 & \\sin h \\\\ 0 & 1 & 0 \\\\ -\\sin h & 0 & \\cos h \\end{bmatrix}`,
          note: "绕 y 轴的旋转矩阵（Yaw / Heading）。",
        },
        {
          type: "text",
          html: `
            <h3>万向节锁（Gimbal Lock）</h3>
            <p>欧拉角有一个致命的缺陷——<strong>万向节锁</strong>。当第二个旋转角度为 ±90° 时，第一个和第三个旋转轴<strong>重合</strong>，系统失去一个旋转自由度。这在物理万向节和数学欧拉角中都会发生。</p>
            <p>例如，在 Heading-Pitch-Bank 顺序中，当 Pitch = 90° 时，Heading 和 Bank 绕的是同一个轴——飞机无法独立控制这两个方向。</p>
          `,
        },
        {
          type: "note",
          level: "warning",
          body: "<strong>⚠️ 实践中的影响：</strong>在 3D 游戏中，欧拉角常用于<strong>简单的旋转控制</strong>（如人物朝向、摄像机基础旋转）。但对于需要<strong>任意方向平滑旋转</strong>的场景（如飞行模拟器、3D 建模工具），万向节锁会导致旋转卡顿或失控。此时应使用<strong>四元数</strong>。",
        },
      ],
    },
    {
      title: "8.3 轴-角表示",
      blocks: [
        {
          type: "text",
          html: `
            <p><strong>轴-角表示（Axis-Angle）</strong>是另一种直观的方式：任意 3D 旋转可以描述为<strong>绕某个单位向量 n 旋转角度 θ</strong>。这就像用一根轴穿过物体，然后绕这根轴旋转。</p>
          `,
        },
        {
          type: "definition",
          title: "定义: 轴-角表示",
          body: '任意 3D 旋转都可以表示为<strong>绕单位向量 n = (nₓ, nᵧ, n_z) 旋转 θ 弧度</strong>。<br/><br/>旋转的正方向由<strong>右手定则</strong>确定：右手拇指指向 n 的方向，手指弯曲的方向为旋转正方向。<br/><br/>记作 (n, θ) 或简写为 θn。',
        },
        {
          type: "formula",
          latex: `\\mathbf{R}(\\mathbf{n}, \\theta) = \\begin{bmatrix} n_x^2(1-c)+c & n_x n_y(1-c)-n_z s & n_x n_z(1-c)+n_y s \\\\ n_x n_y(1-c)+n_z s & n_y^2(1-c)+c & n_y n_z(1-c)-n_x s \\\\ n_x n_z(1-c)-n_y s & n_y n_z(1-c)+n_x s & n_z^2(1-c)+c \\end{bmatrix}`,
          note: "轴-角→旋转矩阵。其中 c = cos θ, s = sin θ。也称 Rodrigues 旋转公式。",
        },
        {
          type: 'derivation',
          title: '推导：Rodrigues 旋转公式',
          intro: '核心思路：将向量分解为平行于旋转轴和垂直于旋转轴的两个分量，只有垂直分量受旋转影响。',
          steps: [
            { latex: '\\mathbf{v} = \\mathbf{v}_{\\parallel} + \\mathbf{v}_{\\perp}', note: '将向量 v 分解为平行于旋转轴 n 的分量 v_∥ 和垂直于 n 的分量 v_⊥。', insight: '这是向量分解的标准技巧：选一个好的坐标系，把问题拆成"受影响的"和"不受影响的"两部分。旋转轴的平行分量不受旋转影响。', diagram: '<svg viewBox="0 0 260 160" width="260" height="160" xmlns="http://www.w3.org/2000/svg"><rect width="260" height="160" fill="#faf8f5" rx="4"/><line x1="130" y1="30" x2="130" y2="140" stroke="#a659db" stroke-width="2" stroke-dasharray="6,3" opacity="0.6"/><text x="140" y="40" fill="#a659db" font-size="10" font-weight="600">旋转轴 n</text><circle cx="130" cy="90" r="3" fill="#555"/><text x="122" y="82" fill="#555" font-size="10">O</text><line x1="130" y1="90" x2="130" y2="55" stroke="#888" stroke-width="2.5"/><text x="120" y="70" fill="#666" font-size="10">v_∥</text><line x1="130" y1="90" x2="190" y2="110" stroke="#e35947" stroke-width="2.5"/><text x="170" y="110" fill="#c53030" font-size="10">v_⊥</text><line x1="130" y1="90" x2="190" y2="50" stroke="#387ad9" stroke-width="2.5"/><text x="175" y="55" fill="#1d4ed8" font-size="11" font-weight="600">v</text><line x1="130" y1="55" x2="190" y2="50" stroke="#888" stroke-width="0.8"/><line x1="190" y1="110" x2="190" y2="50" stroke="#888" stroke-width="0.8"/></svg>' },
            { latex: '\\mathbf{v}_{\\parallel} = (\\mathbf{v} \\cdot \\mathbf{n})\\mathbf{n}', note: '平行分量 = v 在 n 上的投影。用点积计算投影标量，乘以单位向量 n 得到投影向量。', insight: '之前学的点积投影在这里直接应用——v·n 是 v 在 n 方向上的"影子长度"。' },
            { latex: '\\mathbf{v}_{\\perp} = \\mathbf{v} - \\mathbf{v}_{\\parallel}', note: '垂直分量 = 原始向量减去平行分量。', insight: '这就是在 n 的垂直平面上的分量——旋转只会改变这个分量。' },
            { latex: '\\mathbf{v}_{\\perp}\' = \\cos\\theta \\cdot \\mathbf{v}_{\\perp} + \\sin\\theta \\cdot (\\mathbf{n} \\times \\mathbf{v})', note: '在垂直于 n 的平面上，旋转 θ 角度：v_⊥ 变为 cosθ·v_⊥ + sinθ·(n×v)。', insight: 'n×v 是垂直于 n 和 v 的向量，它在旋转平面中恰好是 v_⊥ 的 90° 方向——就像一个 2D 旋转中的"y 轴"。cosθ 和 sinθ 就是 2D 旋转的系数。' },
            { latex: '\\mathbf{v}\' = \\mathbf{v}_{\\parallel} + \\cos\\theta \\cdot \\mathbf{v}_{\\perp} + \\sin\\theta \\cdot (\\mathbf{n} \\times \\mathbf{v})', note: '旋转后的向量 = 不变的平行分量 + 旋转后的垂直分量。', insight: '这就是 Rodrigues 公式的核心！平行分量"原样保留"，垂直分量"在平面内旋转 θ"——两者相加即为结果。' },
            { latex: '\\mathbf{v}\' = \\cos\\theta \\cdot \\mathbf{v} + (1-\\cos\\theta)(\\mathbf{v}\\cdot\\mathbf{n})\\mathbf{n} + \\sin\\theta(\\mathbf{n}\\times\\mathbf{v})', note: '整理后得到 Rodrigues 公式的标准形式。展开为矩阵即得 3×3 旋转矩阵。', insight: '这就是四元数旋转的几何本质——四元数 q = (cos(θ/2), n·sin(θ/2)) 中，n 是旋转轴，θ 是旋转角。Rodrigues 和四元数是同一几何事实的两种代数表达。' },
          ],
        },
        {
          type: "text",
          html: `
            <p>轴-角表示没有万向节锁问题，且非常直观——"绕这个方向转这么多"。但它<strong>不适合直接组合</strong>（两个轴-角旋转的合成没有简单的代数公式）。四元数正是为了解决轴-角的组合问题而诞生的。</p>
          `,
        },
      ],
    },
    {
      title: "8.4 四元数",
      blocks: [
        {
          type: "text",
          html: `
            <p><strong>四元数（Quaternion）</strong>是 3D 旋转的"黄金标准"。它克服了欧拉角的万向节锁问题，同时保持了轴-角表示的直观性，并且可以高效地组合旋转。</p>
          `,
        },
        {
          type: "definition",
          title: "定义: 四元数",
          body: '一个四元数 <strong>q</strong> = (w, x, y, z) = w + xi + yj + zk，其中 i² = j² = k² = ijk = −1。<br/><br/>用于表示旋转的四元数满足 <strong>w² + x² + y² + z² = 1</strong>（单位四元数）。<br/><br/>四元数 q = (cos(θ/2), nₓ sin(θ/2), nᵧ sin(θ/2), n_z sin(θ/2)) 表示绕单位向量 n 旋转 θ 弧度。',
        },
        {
          type: "formula",
          latex: `\\mathbf{q} = \\left[\\cos\\frac{\\theta}{2},\\ \\mathbf{n} \\sin\\frac{\\theta}{2}\\right]`,
          note: "从轴-角 (n, θ) 构造四元数。注意是 θ/2！",
        },
        {
          type: 'derivation',
          title: '推导：四元数乘法规则',
          intro: '四元数乘法的 16 项公式看起来复杂，但它们都源自一条核心规则：i² = j² = k² = ijk = −1。',
          steps: [
            { latex: 'i^2 = j^2 = k^2 = ijk = -1', note: '四元数的基本定义。这四条规则完全确定了四元数的代数结构。', insight: '类比：复数只有一个规则 i²=−1。四元数多了 j 和 k，以及三者之间的乘积关系。这四条规则就是四元数的"公理"。' },
            { latex: 'ij = k, \\quad ji = -k', note: '从 ijk=−1 两边右乘 k⁻¹=−k，得到 ij=k。左乘不同元得到不同结果——乘法不交换。', insight: '这是四元数最核心的特征：乘法不满足交换律。i×j 不等于 j×i——正因如此，四元数可以表示 3D 旋转（旋转本身也不可交换）。' },
            { latex: 'jk = i, \\quad kj = -i', note: '类似推导：jk=i, kj=−i。三个基元成循环关系。', insight: '循环模式：i→j→k→i。正序乘积 = 第三个基元，逆序乘积 = 负的第三个基元。这就像三维空间的右手定则。' },
            { latex: 'ki = j, \\quad ik = -j', note: '最后一对：ki=j, ik=−j。现在有完整的乘法表。', insight: '完整的四元数乘法表（16项）完全由这6条规则推导。不需要记忆——理解循环关系即可随时推出。' },
            { latex: '(w_1 + x_1 i + y_1 j + z_1 k)(w_2 + x_2 i + y_2 j + z_2 k) = \\text{逐项展开，16项合并}', note: '两个四元数相乘 = 多项式乘法 + 应用基元乘法规则合并同类项。', insight: '就像初中代数里的多项式展开 (a+b)(c+d)=ac+ad+bc+bd——只是要额外处理 i²=−1 等规则。最终公式虽然长，但原理极其简单。' },
          ],
        },
        {
          type: "text",
          html: `
            <h3>四元数的核心操作</h3>
            <ul>
              <li><strong>旋转向量</strong>：v' = q v q⁻¹（四元数乘法），结果向量的 w=0。</li>
              <li><strong>组合旋转</strong>：q_combined = q₂ q₁（先 q₁ 后 q₂）。注意顺序——与矩阵一样，从右到左应用。</li>
              <li><strong>插值（Slerp）</strong>：四元数支持球面线性插值，可以在两个旋转之间平滑过渡——这是动画系统的核心需求。</li>
              <li><strong>求逆</strong>：q⁻¹ = (w, −x, −y, −z)（共轭，因为单位四元数 |q| = 1）。</li>
            </ul>
          `,
        },
        {
          type: "note",
          level: "tip",
          body: "<strong>为什么是 θ/2？</strong>这是四元数最反直觉的部分。原因是：四元数旋转公式 q v q⁻¹ 实际上应用了两次 q——所以构造时角度减半。这种设计使四元数的<strong>乘法直接对应旋转的组合</strong>，避免了轴-角组合的复杂公式。",
        },
        {
          type: "code",
          language: "typescript",
          code: `// 四元数基本操作
interface Quat { w: number; x: number; y: number; z: number }

// 从轴-角构造
function fromAxisAngle(axis: Vec3, angle: number): Quat {
  const half = angle / 2; const s = Math.sin(half)
  return { w: Math.cos(half), x: axis.x * s, y: axis.y * s, z: axis.z * s }
}

// 四元数乘法 q1 * q2
function mul(a: Quat, b: Quat): Quat {
  return {
    w: a.w*b.w - a.x*b.x - a.y*b.y - a.z*b.z,
    x: a.w*b.x + a.x*b.w + a.y*b.z - a.z*b.y,
    y: a.w*b.y - a.x*b.z + a.y*b.w + a.z*b.x,
    z: a.w*b.z + a.x*b.y - a.y*b.x + a.z*b.w,
  }
}

// 球面线性插值
function slerp(a: Quat, b: Quat, t: number): Quat {
  let cosHalf = a.w*b.w + a.x*b.x + a.y*b.y + a.z*b.z
  if (cosHalf < 0) { b = { w: -b.w, x: -b.x, y: -b.y, z: -b.z }; cosHalf = -cosHalf }
  if (cosHalf > 0.999) { /* 使用线性插值避免除零 */ }
  const half = Math.acos(cosHalf); const s = Math.sin(half)
  const ra = Math.sin((1-t)*half)/s; const rb = Math.sin(t*half)/s
  return { w: ra*a.w+rb*b.w, x: ra*a.x+rb*b.x, y: ra*a.y+rb*b.y, z: ra*a.z+rb*b.z }
}`,
        },
        {
          type: "text",
          html: `
            <h3>各表示间的转换代码</h3>
            <p>在实际开发中经常需要切换表示。以下是最常用的转换：</p>
          `,
        },
        {
          type: "code",
          language: "typescript",
          code: `// === 四元数 ↔ 欧拉角 (Yaw-Pitch-Roll) ===
function quatToEuler(q: Quat): { yaw: number; pitch: number; roll: number } {
  const sinP = 2*(q.w*q.y - q.z*q.x)
  const pitch = Math.abs(sinP) >= 1 ? Math.sign(sinP)*Math.PI/2 : Math.asin(sinP)
  const yaw = Math.atan2(2*(q.w*q.y + q.x*q.z), 1 - 2*(q.y*q.y + q.x*q.x))
  const roll = Math.atan2(2*(q.w*q.x + q.y*q.z), 1 - 2*(q.x*q.x + q.y*q.y))
  return { yaw, pitch, roll }
}
function eulerToQuat(yaw: number, pitch: number, roll: number): Quat {
  const cy=Math.cos(yaw/2), sy=Math.sin(yaw/2), cp=Math.cos(pitch/2), sp=Math.sin(pitch/2), cr=Math.cos(roll/2), sr=Math.sin(roll/2)
  return { w: cy*cp*cr + sy*sp*sr, x: cy*sp*cr + sy*cp*sr, y: sy*cp*cr - cy*sp*sr, z: cy*cp*sr - sy*sp*cr }
}
// === 四元数 → 3×3 旋转矩阵 ===
function quatToMat3(q: Quat): number[] {
  return [1-2*(q.y*q.y+q.z*q.z), 2*(q.x*q.y-q.w*q.z), 2*(q.x*q.z+q.w*q.y),
          2*(q.x*q.y+q.w*q.z), 1-2*(q.x*q.x+q.z*q.z), 2*(q.y*q.z-q.w*q.x),
          2*(q.x*q.z-q.w*q.y), 2*(q.y*q.z+q.w*q.x), 1-2*(q.x*q.x+q.y*q.y)]
}`,
        },
        {
          type: "note",
          level: "tip",
          body: "在 Babylon.js 中，Quaternion、Vector3（欧拉角）、Matrix 三者通过 <code>toRotationMatrix()</code>、<code>toEulerAngles()</code> 等方法互转。Unity 的 Quaternion.Euler() 和 Unreal 的 FRotator 同理。实践中直接调用引擎 API，无需手写。",
        },
      ],
    },
    {
      title: "8.5 旋转方法对比与选择",
      blocks: [
        {
          type: "text",
          html: `
            <table style="width:100%; border-collapse: collapse; margin: 1em 0; font-size: 0.9em;">
              <tr style="background: #f3f4f6;">
                <th style="padding: 8px 10px; border: 1px solid #ddd;">方法</th>
                <th style="padding: 8px 10px; border: 1px solid #ddd;">参数数</th>
                <th style="padding: 8px 10px; border: 1px solid #ddd;">直观？</th>
                <th style="padding: 8px 10px; border: 1px solid #ddd;">可组合？</th>
                <th style="padding: 8px 10px; border: 1px solid #ddd;">可插值？</th>
                <th style="padding: 8px 10px; border: 1px solid #ddd;">万向锁？</th>
                <th style="padding: 8px 10px; border: 1px solid #ddd;">典型用途</th>
              </tr>
              <tr>
                <td style="padding: 6px 10px; border: 1px solid #ddd;"><strong>欧拉角</strong></td>
                <td style="padding: 6px 10px; border: 1px solid #ddd;">3</td><td style="padding: 6px 10px; border: 1px solid #ddd;">✅ 最直观</td>
                <td style="padding: 6px 10px; border: 1px solid #ddd;">❌</td><td style="padding: 6px 10px; border: 1px solid #ddd;">❌</td>
                <td style="padding: 6px 10px; border: 1px solid #ddd;">⚠️ 有</td><td style="padding: 6px 10px; border: 1px solid #ddd;">编辑器面板、简单朝向</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 6px 10px; border: 1px solid #ddd;"><strong>轴-角</strong></td>
                <td style="padding: 6px 10px; border: 1px solid #ddd;">4</td><td style="padding: 6px 10px; border: 1px solid #ddd;">✅ 很直观</td>
                <td style="padding: 6px 10px; border: 1px solid #ddd;">❌</td><td style="padding: 6px 10px; border: 1px solid #ddd;">❌</td>
                <td style="padding: 6px 10px; border: 1px solid #ddd;">✅</td><td style="padding: 6px 10px; border: 1px solid #ddd;">角速度、物理旋转</td>
              </tr>
              <tr>
                <td style="padding: 6px 10px; border: 1px solid #ddd;"><strong>矩阵</strong></td>
                <td style="padding: 6px 10px; border: 1px solid #ddd;">9</td><td style="padding: 6px 10px; border: 1px solid #ddd;">❌</td>
                <td style="padding: 6px 10px; border: 1px solid #ddd;">✅</td><td style="padding: 6px 10px; border: 1px solid #ddd;">❌</td>
                <td style="padding: 6px 10px; border: 1px solid #ddd;">✅</td><td style="padding: 6px 10px; border: 1px solid #ddd;">顶点变换、GPU 着色器</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 6px 10px; border: 1px solid #ddd;"><strong>四元数</strong></td>
                <td style="padding: 6px 10px; border: 1px solid #ddd;">4</td><td style="padding: 6px 10px; border: 1px solid #ddd;">⚠️ 中等</td>
                <td style="padding: 6px 10px; border: 1px solid #ddd;">✅</td><td style="padding: 6px 10px; border: 1px solid #ddd;">✅ Slerp</td>
                <td style="padding: 6px 10px; border: 1px solid #ddd;">✅</td><td style="padding: 6px 10px; border: 1px solid #ddd;">动画、摄像机、角色旋转</td>
              </tr>
            </table>
          `,
        },
        {
          type: "note",
          level: "info",
          body: "<strong>实践建议：</strong>在游戏引擎中，通常<strong>内部存储用四元数</strong>（避免万向锁、支持插值），<strong>转换为矩阵传给 GPU</strong>（顶点变换），<strong>用欧拉角做 UI/编辑器输入</strong>（用户友好）。引擎（如 Babylon.js 的 Quaternion、Unity 的 Quaternion、Unreal 的 FQuat）已经封装了这些转换。",
        },
      ],
    },
    {
      title: "8.6 各表示间的转换",
      blocks: [
        {
          type: "text",
          html: `
            <p>在实际开发中，经常需要在不同表示之间转换。以下是最常用的转换关系：</p>
          `,
        },
        {
          type: "definition",
          title: "欧拉角 → 矩阵",
          body: '按约定的顺序依次相乘三个旋转矩阵。例如 Heading-Pitch-Bank 顺序：<strong>R = R_z(bank) · R_x(pitch) · R_y(heading)</strong>。注意顺序——在列向量约定下，最先应用的旋转在最右边。',
        },
        {
          type: "definition",
          title: "四元数 → 矩阵",
          body: '给定单位四元数 q = (w, x, y, z)，对应的旋转矩阵可以直接计算，无需先转成轴-角。这是引擎中最常用的转换路径。',
        },
        {
          type: "formula",
          latex: `\\mathbf{R}(q) = \\begin{bmatrix} 1-2(y^2+z^2) & 2(xy-wz) & 2(xz+wy) \\\\ 2(xy+wz) & 1-2(x^2+z^2) & 2(yz-wx) \\\\ 2(xz-wy) & 2(yz+wx) & 1-2(x^2+y^2) \\end{bmatrix}`,
          note: "四元数 → 3×3 旋转矩阵。这是最简单的转换公式之一，只要 q 是单位四元数。",
        },
        {
          type: "text",
          html: `
            <h3>本章小结</h3>
            <p>3D 旋转有四种主要表示方法：</p>
            <ul>
              <li>✅ <strong>欧拉角</strong>：最直观，有万向节锁，适合简单 UI 和编辑器</li>
              <li>✅ <strong>轴-角</strong>：直观，不适合组合，适合角速度和物理</li>
              <li>✅ <strong>矩阵</strong>：适合 GPU 顶点变换和组合，不适合插值</li>
              <li>✅ <strong>四元数</strong>：综合最优——无万向锁、支持组合和 Slerp，是动画和游戏逻辑的标准选择</li>
            </ul>
            <p>下一章将进入更具体的应用——<strong>几何图元</strong>（直线、平面、包围盒等），它们构成了碰撞检测和空间查询的基础。</p>
          `,
        },
      ],
    },
  ],
}

export default content