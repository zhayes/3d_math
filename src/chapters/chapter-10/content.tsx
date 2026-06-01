import type { ChapterContent } from "@/components/content/types"

const content: ChapterContent = {
  id: "10",
  title: "3D图形中的数学主题",
  sections: [
    {
      title: "10.1 渲染管线详解",
      blocks: [
        {
          type: "text",
          html: `
            <p>3D 渲染管线将 3D 场景数据转换为 2D 屏幕图像。理解每个阶段的<strong>输入和输出</strong>可以帮你调试渲染 bug 和优化性能。</p>
          `,
        },
        {
          type: "text",
          html: `
            <table style="width:100%; border-collapse: collapse; margin: 1em 0; font-size: 0.88em;">
              <tr style="background: #f3f4f6;">
                <th style="padding: 6px 8px; border: 1px solid #ddd;">阶段</th><th style="padding: 6px 8px; border: 1px solid #ddd;">执行者</th><th style="padding: 6px 8px; border: 1px solid #ddd;">输入</th><th style="padding: 6px 8px; border: 1px solid #ddd;">输出</th><th style="padding: 6px 8px; border: 1px solid #ddd;">可编程？</th>
              </tr>
              <tr><td style="padding: 5px 8px; border: 1px solid #ddd;">顶点着色器</td><td style="padding: 5px 8px; border: 1px solid #ddd;">GPU</td><td style="padding: 5px 8px; border: 1px solid #ddd;">模型空间顶点</td><td style="padding: 5px 8px; border: 1px solid #ddd;">裁剪空间顶点</td><td style="padding: 5px 8px; border: 1px solid #ddd;">✅</td></tr>
              <tr style="background: #f9fafb;"><td style="padding: 5px 8px; border: 1px solid #ddd;">裁剪</td><td style="padding: 5px 8px; border: 1px solid #ddd;">GPU 固定</td><td style="padding: 5px 8px; border: 1px solid #ddd;">裁剪空间顶点</td><td style="padding: 5px 8px; border: 1px solid #ddd;">裁剪后的顶点</td><td style="padding: 5px 8px; border: 1px solid #ddd;">❌</td></tr>
              <tr><td style="padding: 5px 8px; border: 1px solid #ddd;">透视除法</td><td style="padding: 5px 8px; border: 1px solid #ddd;">GPU 固定</td><td style="padding: 5px 8px; border: 1px solid #ddd;">裁剪空间 (x,y,z,w)</td><td style="padding: 5px 8px; border: 1px solid #ddd;">NDC (x/w,y/w,z/w)</td><td style="padding: 5px 8px; border: 1px solid #ddd;">❌</td></tr>
              <tr style="background: #f9fafb;"><td style="padding: 5px 8px; border: 1px solid #ddd;">视口变换</td><td style="padding: 5px 8px; border: 1px solid #ddd;">GPU 固定</td><td style="padding: 5px 8px; border: 1px solid #ddd;">NDC</td><td style="padding: 5px 8px; border: 1px solid #ddd;">屏幕像素坐标</td><td style="padding: 5px 8px; border: 1px solid #ddd;">❌</td></tr>
              <tr><td style="padding: 5px 8px; border: 1px solid #ddd;">光栅化</td><td style="padding: 5px 8px; border: 1px solid #ddd;">GPU 固定</td><td style="padding: 5px 8px; border: 1px solid #ddd;">屏幕三角形</td><td style="padding: 5px 8px; border: 1px solid #ddd;">片元（像素候选项）</td><td style="padding: 5px 8px; border: 1px solid #ddd;">❌</td></tr>
              <tr style="background: #f9fafb;"><td style="padding: 5px 8px; border: 1px solid #ddd;">片元着色器</td><td style="padding: 5px 8px; border: 1px solid #ddd;">GPU</td><td style="padding: 5px 8px; border: 1px solid #ddd;">插值后的片元属性</td><td style="padding: 5px 8px; border: 1px solid #ddd;">像素颜色 + 深度</td><td style="padding: 5px 8px; border: 1px solid #ddd;">✅</td></tr>
            </table>
          `,
        },
        {
          type: "note",
          level: "info",
          body: "顶点着色器和片元着色器是<strong>可编程</strong>的——用 GLSL/HLSL 编写。中间的裁剪、透视除法、视口变换、光栅化是 GPU <strong>固定功能硬件</strong>，不可编程但高度优化。",
        },
      ],
    },
    {
      title: "10.2 光照模型",
      blocks: [
        {
          type: "text",
          html: `
            <p><strong>Blinn-Phong 光照模型</strong>将表面光照分解为三个独立分量：环境光、漫反射、镜面反射。每个分量独立计算，最后相加。</p>
          `,
        },
        {
          type: "definition",
          title: "环境光（Ambient）",
          body: '模拟间接光照。计算公式：<strong>I_ambient = k_a × L_a</strong>，其中 k_a 是材质的环境反射系数，L_a 是环境光颜色。所有表面均匀照亮，防止暗面完全变黑。',
        },
        {
          type: "definition",
          title: "漫反射（Diffuse / Lambert）",
          body: '模拟粗糙表面均匀散射光线的效果。亮度仅取决于<strong>法向量 N 和光线方向 L 的夹角</strong>：<strong>I_diffuse = k_d × max(N·L, 0) × L_d</strong>。<br/><br/>这是最重要的光照分量。当 N·L=1 时（光线垂直照射）最亮，N·L≤0 时（背面）全暗。<strong>与观察方向无关</strong>——这是漫反射区别于镜面反射的关键。',
        },
        {
          type: "definition",
          title: "镜面反射（Specular / Blinn-Phong）",
          body: '模拟光滑表面的<strong>高光</strong>。使用<strong>半向量 H = normalize(L + V)</strong>（光线方向与视线方向的中间方向）替代反射向量：<br/><br/><strong>I_specular = k_s × max(N·H, 0)^shininess × L_s</strong><br/><br/>shininess 控制高光的集中程度——值越大，高光越集中（越亮越小）。金属约 100-500，塑料约 10-50。',
        },
        {
          type: "formula",
          latex: `I = k_a L_a + k_d (\\\\mathbf{N} \\\\cdot \\\\mathbf{L}) L_d + k_s (\\\\mathbf{N} \\\\cdot \\\\mathbf{H})^{\\\\alpha} L_s`,
          note: "Blinn-Phong 完整公式。三个分量的颜色相加 = 最终像素颜色。",
        },
        {
          type: "text",
          html: `
            <h3>逐顶点 vs 逐像素着色</h3>
            <ul>
              <li><strong>逐顶点（Gouraud）</strong>：在顶点着色器中计算光照，光栅化时线性插值颜色到片元。快速但高光可能丢失（因为插值抹平了峰值）。</li>
              <li><strong>逐像素（Phong）</strong>：在片元着色器中对<strong>每个像素</strong>重新计算光照（法向量在三角形内插值）。效果远好于逐顶点，是现代游戏的默认方式。</li>
            </ul>
          `,
        },
        {
          type: "code",
          language: "typescript",
          code: `// Blinn-Phong 逐像素光照（片元着色器伪代码）
function blinnPhong(N: Vec3, L: Vec3, V: Vec3, shininess: number): Color {
  const ambient  = 0.1                    // k_a * L_a
  const diffuse  = 0.6 * max(0, dot(N, L))  // k_d * max(N·L, 0)
  const H = normalize({ x: L.x+V.x, y: L.y+V.y, z: L.z+V.z })
  const specular = 0.3 * Math.pow(max(0, dot(N, H)), shininess)
  return ambient + diffuse + specular
}`,
        },
      ],
    },
    {
      title: "10.3 纹理映射",
      blocks: [
        {
          type: "text",
          html: `
            <p><strong>纹理映射（Texture Mapping）</strong>将 2D 图像贴在 3D 模型表面。每个顶点存储 <strong>UV 坐标</strong>（纹理空间坐标，范围 [0,1]）。GPU 光栅化时在三角形内插值 UV，然后用它从纹理中采样颜色。</p>
          `,
        },
        {
          type: "definition",
          title: "纹理过滤（Texture Filtering）",
          body: '<strong>最近邻（Nearest）</strong>：取 UV 坐标最接近的纹理像素。速度快但放大时有马赛克。<br/><br/><strong>双线性（Bilinear）</strong>：取周围 4 个纹理像素的加权平均。放大时平滑，但缩小（远处）时可能闪烁。<br/><br/><strong>三线性 + Mipmap（Trilinear）</strong>：预先生成纹理的缩小版本（mipmap 链）。选择最接近的 mip 级别做双线性过滤。消除远处闪烁，现代游戏的默认选择。',
        },
        {
          type: "note",
          level: "warning",
          body: "<strong>⚠️ 透视校正：</strong>在 3D 透视投影下，UV 坐标不能简单线性插值——远距离的像素应使用更密的纹理。现代 GPU 的<strong>透视校正插值</strong>自动处理这一点（使用 1/w 加权插值）。2D 精灵渲染或正交投影不需要透视校正。",
        },
      ],
    },
    {
      title: "10.4 骨骼动画",
      blocks: [
        {
          type: "text",
          html: `
            <p><strong>骨骼动画（Skeletal Animation）</strong>是游戏角色的标准动画技术。角色由<strong>骨骼层次结构</strong>和<strong>蒙皮网格</strong>两部分组成。</p>
          `,
        },
        {
          type: "definition",
          title: "蒙皮矩阵（Skinning Matrix）",
          body: '每个顶点存储它受哪些骨骼影响（最多 4 根）及对应的权重。顶点在动画中的世界位置 = 静止姿态位置 × <strong>蒙皮矩阵</strong>。<br/><br/>蒙皮矩阵 = BoneWorldMatrix × InverseBindMatrix。其中 InverseBindMatrix 把顶点从模型空间变换到<strong>骨骼的局部空间</strong>（在静止姿态下），BoneWorldMatrix 再把它带到动画后的世界位置。<br/><br/>最终顶点 = Σ (weight_i × SkinningMatrix_i × vertex_rest)。所有权重之和 = 1。',
        },
        {
          type: "code",
          language: "typescript",
          code: `// 骨骼蒙皮（顶点着色器中的简化逻辑）
// 每个顶点最多受4根骨骼影响
vec4 skinnedPos = vec4(0.0)
for (int i = 0; i < 4; i++) {
  if (boneWeights[i] > 0.0) {
    skinnedPos += boneWeights[i]
      * boneMatrices[boneIndices[i]]
      * vec4(inPosition, 1.0)
  }
}
gl_Position = VP * skinnedPos  // 继续走渲染管线`,
        },
      ],
    },
    {
      title: "10.5 阴影映射（Shadow Mapping）",
      blocks: [
        {
          type: "text",
          html: `
            <p><strong>阴影映射</strong>是实时渲染中最常用的阴影技术。核心思想很巧妙：</p>
            <ol>
              <li><strong>第一遍（Shadow Pass）</strong>：从光源的视角渲染场景，把深度值写入一张纹理（Shadow Map）</li>
              <li><strong>第二遍（Main Pass）</strong>：从摄像机视角正常渲染。对于每个像素，计算它在光源视角下的深度，与 Shadow Map 中存储的深度比较。如果当前深度 > Shadow Map 深度，说明该点被其他物体遮挡——处于阴影中</li>
            </ol>
          `,
        },
        {
          type: "note",
          level: "info",
          body: "<strong>Shadow Map 的优缺点：</strong>优点——实现简单、GPU 友好、适用于任意几何体。缺点——阴影边缘可能出现锯齿（需用 PCF 软阴影或更高分辨率解决）、只支持点光源/方向光源（聚光灯）、有\"阴影痤疮\"（shadow acne）问题（表面自遮挡，通过 bias 偏移缓解）。",
        },
      ],
    },
    {
      title: "10.6 本章小结",
      blocks: [
        {
          type: "text",
          html: `
            <ul>
              <li>✅ 渲染管线 7 个阶段的输入/输出/可编程性</li>
              <li>✅ Blinn-Phong 光照模型：环境+漫反射+镜面反射的完整公式与代码</li>
              <li>✅ 逐顶点（Gouraud）vs 逐像素（Phong）着色的区别</li>
              <li>✅ 纹理过滤：Nearest→Bilinear→Trilinear+Mipmap 三级进化</li>
              <li>✅ 骨骼动画：蒙皮矩阵 = BoneWorld × InverseBind，顶点混合权重</li>
              <li>✅ 阴影映射 Shadow Map 的两遍渲染原理</li>
            </ul>
          `,
        },
      ],
    },
  ],
}

export default content