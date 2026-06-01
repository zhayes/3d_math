import type { ChapterContent } from "@/components/content/types"

const content: ChapterContent = {
  id: "3",
  title: "多重坐标空间",
  sections: [
    {
      title: "3.1 为什么需要多重坐标空间？",
      blocks: [
        {
          type: "text",
          html: `
            <p>在第 1 章中，我们介绍了笛卡尔坐标系。在游戏中，仅仅一个坐标系是<strong>远远不够</strong>的。考虑以下场景：</p>
            <ul>
              <li><strong>角色的手臂</strong>：手臂相对于身体的位置是固定的（肘部在肩部下方 30cm），但身体在世界中移动时，手臂的世界坐标也在变化。</li>
              <li><strong>摄像机视角</strong>：场景中的物体在世界空间中有固定坐标，但渲染时需要知道它们"在屏幕上的位置"——这取决于摄像机的位置和朝向。</li>
              <li><strong>模型导入</strong>：建模师在 Blender 中创建的模型有自己的局部坐标（原点在模型中心），放入游戏世界时需要缩放、旋转、平移到正确位置。</li>
            </ul>
            <p>这些场景的共同特点是：<strong>同一个点在不同的"参考系"中有不同的坐标</strong>。我们需要能在这些参考系之间自由切换。</p>
          `,
        },
        {
          type: "definition",
          title: "定义: 坐标空间（Coordinate Space）",
          body: '坐标空间是一个定义了<strong>原点</strong>和<strong>坐标轴方向</strong>的三维笛卡尔坐标系。不同的坐标空间有不同的原点位置和轴向。同一个点在空间 A 中的坐标 (x₁,y₁,z₁) 与在空间 B 中的坐标 (x₂,y₂,z₂) 通常<strong>不同</strong>，但都描述同一个物理位置。',
        },
        {
          type: "note",
          level: "info",
          body: "<strong>核心思想：</strong>每个物体（或子系统）使用最方便的坐标系来描述自身，然后通过<strong>坐标变换</strong>来统一到同一个参考系下。就像用母语思考、再翻译成通用语言交流一样。",
        },
      ],
    },
    {
      title: "3.2 游戏中的常用坐标空间",
      blocks: [
        {
          type: "text",
          html: `
            <p>在典型的 3D 游戏引擎中，至少会用到以下几种坐标空间。理解每个空间的用途是使用游戏引擎的基础。</p>
          `,
        },
        {
          type: "definition",
          title: "模型空间（Model Space / Object Space / Local Space）",
          body: '也称<strong>局部空间</strong>或<strong>对象空间</strong>。原点位于模型自身的"中心点"（通常是建模时的原点），坐标轴随着模型旋转。<br/><br/><strong>用途：</strong>定义模型顶点位置。例如"角色的鼻尖位于模型空间 (0, 1.8, 0.1)"。<strong>模型空间中的坐标不会因为角色在世界中移动而改变。</strong>',
        },
        {
          type: "definition",
          title: "世界空间（World Space）",
          body: '整个场景的<strong>全局坐标系</strong>。原点固定在场景中的某个位置，坐标轴方向固定（通常是 y 轴朝上）。<br/><br/><strong>用途：</strong>所有物体在场景中的绝对位置。例如"角色当前位于世界坐标 (50, 0, 30)"。这是所有物体相互定位的共同参考系。',
        },
        {
          type: "definition",
          title: "摄像机空间（Camera Space / View Space）",
          body: '以<strong>摄像机为原点</strong>的坐标系。通常 z 轴（或 -z 轴）指向摄像机的观察方向。<br/><br/><strong>用途：</strong>渲染管线中的关键中间步骤。物体从世界空间变换到摄像机空间后，位于摄像机前方的物体有正的 z 值（或负的，取决于约定），位于后方或视锥体外的物体可以被裁剪掉。',
        },
        {
          type: "text",
          html: `
            <p>此外，一些引擎还使用：</p>
            <ul>
              <li><strong>惯性空间（Inertial Space）</strong>：原点与物体重合，但坐标轴方向与世界空间平行（不随物体旋转）。常用于简化物理计算。</li>
              <li><strong>骨骼空间（Bone Space）</strong>：用于骨骼动画，每根骨骼有自己的局部空间，通过父子关系嵌套。</li>
              <li><strong>切线空间（Tangent Space）</strong>：用于法线贴图，坐标轴沿表面切线和法线方向。</li>
            </ul>
          `,
        },
        {
          type: "definition",
          title: "直立空间（Upright Space / Inertial Space）",
          body: '一种特殊的坐标空间：<strong>原点与物体重合</strong>，但<strong>坐标轴与世界空间平行</strong>（通常 y 轴始终朝上）。<br/><br/><strong>与模型空间的区别：</strong>模型空间的坐标轴随物体旋转；直立空间的坐标轴始终与世界对齐。<br/><br/><strong>用途：</strong>处理"相对于地面"的方向。例如角色"面朝北偏东30°"——这用的是直立空间的方向。常用于 AI 导航、UI 指示器、以及需要"世界对齐"的物理计算。',
        },
        {
          type: "demo",
          demoId: "coordinate-spaces",
        },
      ],
    },
    {
      title: "3.3 坐标空间变换",
      blocks: [
        {
          type: "text",
          html: `
            <p><strong>坐标空间变换（Coordinate Space Transformation）</strong>是将一个点的坐标从空间 A 转换到空间 B 的过程。这是整个 3D 图形管线的核心操作。</p>
            <p>在图形学中，变换通常由<strong>矩阵</strong>来表示（我们将在第 4-5 章详细学习矩阵）。现在，我们先用向量的语言来理解变换的直觉：</p>
          `,
        },
        {
          type: "text",
          html: `
            <h3>从模型空间到世界空间</h3>
            <p>假设一个角色模型在模型空间中的鼻子位于 <strong>p_model = (0, 1.8, 0.1)</strong>。现在该角色被放置到世界坐标 (50, 0, 30) 处，并绕 y 轴旋转了 45°。</p>
            <p>鼻子在世界空间中的位置是：</p>
            <p style="text-align: center; padding: 0.5rem 0;">
              <strong>p_world = 角色位置 + 旋转后的 p_model</strong>
            </p>
            <p>直观地说：先把鼻子的局部坐标旋转 45°，再加上角色在世界中的位置，就得到了鼻子的世界坐标。</p>
          `,
        },
        {
          type: "formula",
          latex: `\\mathbf{p}_{\\text{world}} = \\mathbf{p}_{\\text{object}} + R \\cdot \\mathbf{p}_{\\text{model}}`,
          note: "从模型空间到世界空间的变换：平移到物体世界位置 + 旋转模型的局部坐标",
        },
        {
          type: "note",
          level: "tip",
          body: "<strong>变换链：</strong>在渲染管线中，一个顶点的完整旅程是：<br/><br/><strong>模型空间</strong> → <strong>世界空间</strong> → <strong>摄像机空间</strong> → <strong>裁剪空间</strong> → <strong>屏幕空间</strong><br/><br/>每一步都是一次坐标空间变换。理解这个流程是理解 3D 渲染的关键。",
        },
        {
          type: "code",
          language: "typescript",
          code: `// 概念代码：模型空间到世界空间的变换
interface Vec3 { x: number; y: number; z: number }

// 绕 Y 轴旋转一个点（简化版，第5章会详细讲矩阵旋转）
function rotateY(p: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  return {
    x: p.x * cos + p.z * sin,
    y: p.y,
    z: -p.x * sin + p.z * cos,
  }
}

// 模型空间 → 世界空间
function modelToWorld(
  modelPoint: Vec3,
  objectPosition: Vec3,
  objectRotation: number,
): Vec3 {
  const rotated = rotateY(modelPoint, objectRotation)
  return {
    x: objectPosition.x + rotated.x,
    y: objectPosition.y + rotated.y,
    z: objectPosition.z + rotated.z,
  }
}`,
        },
      ],
    },
    {
      title: "3.4 嵌套坐标空间",
      blocks: [
        {
          type: "text",
          html: `
            <p>在游戏中，坐标空间通常形成<strong>树状层次结构</strong>（Hierarchy）。这是场景图（Scene Graph）的基础。</p>
            <p>一个典型的层次结构：</p>
          `,
        },
        {
          type: "text",
          html: `
            <div style="background: #1e1e2e; padding: 1.2rem; border-radius: 8px; font-family: monospace; font-size: 0.9em; line-height: 1.8; color: #e6edf3; margin: 1rem 0;">
              <div>🌍 <strong>世界空间</strong></div>
              <div style="margin-left: 1.5rem;">├── 🧍 <strong>角色</strong>（世界坐标 50,0,30）</div>
              <div style="margin-left: 3rem;">├── 💪 <strong>上臂</strong>（相对于角色肩部）</div>
              <div style="margin-left: 4.5rem;">├── ✋ <strong>前臂</strong>（相对于上臂肘部）</div>
              <div style="margin-left: 6rem;">└── 🖐️ <strong>手掌</strong>（相对于前臂腕部）</div>
              <div style="margin-left: 3rem;">└── 🦿 <strong>大腿</strong>（相对于角色髋部）</div>
              <div style="margin-left: 1.5rem;">└── 🚗 <strong>汽车</strong>（世界坐标 100,0,50）</div>
              <div style="margin-left: 3rem;">├── 🚪 <strong>车门</strong>（相对于车身）</div>
              <div style="margin-left: 3rem;">└── 🪟 <strong>车窗</strong>（相对于车身）</div>
            </div>
          `,
        },
        {
          type: "text",
          html: `
            <p>当角色移动时：整个世界坐标改变，但它所有子节点（手臂、腿）的<strong>局部坐标不变</strong>。当上臂旋转时：前臂和手掌的世界坐标跟着改变，因为它们嵌套在上臂的坐标空间中。</p>
            <p>这种层次结构的好处是：<strong>修改父节点的变换会自动影响所有子节点</strong>，无需手动更新每个部分。</p>
          `,
        },
        {
          type: "definition",
          title: "局部变换 vs 世界变换",
          body: '<strong>局部变换（Local Transform）</strong>：节点相对于<strong>父节点</strong>的位置、旋转和缩放。<br/><br/><strong>世界变换（World Transform）</strong>：从根节点累积变换到当前节点，得到该节点在世界空间中的<strong>最终位置、旋转和缩放</strong>。<br/><br/>世界变换 = 局部变换 × 父节点的世界变换。',
        },
        {
          type: "code",
          language: "typescript",
          code: `// 简化版场景图节点
class SceneNode {
  localPosition: Vec3 = { x: 0, y: 0, z: 0 }
  parent: SceneNode | null = null
  children: SceneNode[] = []

  // 计算世界位置：递归累加所有父节点的局部位置
  getWorldPosition(): Vec3 {
    const parentPos = this.parent?.getWorldPosition()
      ?? { x: 0, y: 0, z: 0 }
    return {
      x: parentPos.x + this.localPosition.x,
      y: parentPos.y + this.localPosition.y,
      z: parentPos.z + this.localPosition.z,
    }
  }

  addChild(child: SceneNode) {
    child.parent = this
    this.children.push(child)
  }
}

// 使用示例
const world = new SceneNode()
const character = new SceneNode()
character.localPosition = { x: 50, y: 0, z: 30 }
world.addChild(character)

const upperArm = new SceneNode()
upperArm.localPosition = { x: 0, y: 1.5, z: 0 }  // 相对于角色
character.addChild(upperArm)

console.log(upperArm.getWorldPosition())
// => { x: 50, y: 1.5, z: 30 }  — 自动累加了角色的世界位置！`,
        },
        {
          type: "note",
          level: "info",
          body: "场景图中的变换传播在游戏引擎中由矩阵乘法高效实现。Babylon.js、Unity、Unreal 都内置了 `TransformNode` 或类似组件来管理这种父子层次关系。",
        },
      ],
    },
    {
      title: "3.5 指定坐标空间",
      blocks: [
        {
          type: "text",
          html: `
            <p>在处理多重坐标空间时，需要一种清晰的方式来<strong>标明一个坐标值所属的空间</strong>。常用的记法包括：</p>
            <ul>
              <li><strong>下标记法</strong>：p<sub>world</sub>、v<sub>model</sub>、p<sub>camera</sub></li>
              <li><strong>箭头记法</strong>：不同的箭头标记表示不同空间中的向量</li>
              <li><strong>API 显式转换</strong>：调用 <code>worldToLocal()</code>、<code>localToWorld()</code> 等命名清晰的方法</li>
            </ul>
            <p>在本书和实际开发中，保持<strong>一致性</strong>最为重要。混乱的坐标空间标记是 bug 的主要来源。</p>
          `,
        },
        {
          type: "note",
          level: "warning",
          body: `<strong>⚠️ 常见错误：</strong>将模型空间中的向量直接加到世界空间中而忘记变换。例如，在模型空间中计算了一个"向前移动"的方向向量，但在世界空间中直接使用——由于角色的朝向不同，这个方向在世界空间中可能指向完全错误的位置。<br/><br/>解决方式：始终在心中明确<strong>当前变量属于哪个坐标空间</strong>。必要时在变量名中体现，如 <code>forward_model</code> 和 <code>forward_world</code>。`,
        },
      ],
    },
    {
      title: "3.6 基向量与坐标空间",
      blocks: [
        {
          type: "text",
          html: `
            <p>第 2 章中我们介绍了标准基向量 <strong>i = (1,0,0)</strong>、<strong>j = (0,1,0)</strong>、<strong>k = (0,0,1)</strong>。在默认的坐标空间中，任何向量都可以写成基向量的线性组合：</p>
          `,
        },
        {
          type: "formula",
          latex: `\\mathbf{v} = x \\mathbf{i} + y \\mathbf{j} + z \\mathbf{k}`,
          note: "向量 = 分量 × 基向量的线性组合",
        },
        {
          type: "text",
          html: `
            <p>现在我们有一个更深刻的理解：<strong>每个坐标空间都有一套自己的基向量</strong>。世界空间有世界的 i, j, k；模型空间有模型的 i, j, k。</p>
            <p>当一个物体旋转时，实际上是在<strong>旋转它的基向量</strong>。模型空间中的 (1,0,0) 在世界空间中不再指向世界空间的 x 轴——它指向物体当前的"右方向"。</p>
          `,
        },
        {
          type: "text",
          html: `
            <h3>从基向量理解坐标变换</h3>
            <p>如果我们知道模型空间的三个基向量在世界空间中的表示（记为 <strong>i'</strong>、<strong>j'</strong>、<strong>k'</strong>），那么任何模型空间中的向量 <strong>v</strong> = (x, y, z) 可以通过以下方式变换到世界空间：</p>
          `,
        },
        {
          type: "formula",
          latex: `\\mathbf{v}_{\\text{world}} = x \\mathbf{i}' + y \\mathbf{j}' + z \\mathbf{k}'`,
          note: "用模型空间的基向量在世界空间中的坐标来计算世界空间中的向量",
        },
        {
          type: "text",
          html: `
            <p>这个公式非常重要！它是<strong>矩阵表示坐标变换</strong>的基础。在第 5 章中，我们将看到这个公式自然地转化为矩阵乘法。</p>
          `,
        },
        {
          type: "note",
          level: "tip",
          body: `<strong>直觉：</strong>基向量就像坐标空间的"建筑材料"。如果你知道一个空间的基向量，就完全知道了这个空间的方向和比例。变换一个向量就是把它"重组"到目标空间的基向量上。`,
        },
        {
          type: "text",
          html: `
            <h3>本章小结</h3>
            <p>本章介绍了多重坐标空间的概念，这是理解 3D 变换和渲染管线的基础：</p>
            <ul>
              <li>✅ 为什么需要多重坐标空间（模型/世界/摄像机各有各的便利）</li>
              <li>✅ 游戏中常用的坐标空间及其用途</li>
              <li>✅ 坐标空间变换的基本概念（平移 + 旋转）</li>
              <li>✅ 嵌套坐标空间和场景图层次结构</li>
              <li>✅ 如何标明坐标所属的空间（避免 bug 的关键习惯）</li>
              <li>✅ 基向量与坐标空间的深层关系</li>
            </ul>
            <p>从下一章开始，我们将正式引入<strong>矩阵</strong>——它是实现坐标空间变换的数学工具。掌握了前三章的基础，矩阵将不是一个陌生的数学概念，而是一个自然的、用于描述变换的有效工具。</p>
          `,
        },
      ],
    },
  ],
}

export default content
