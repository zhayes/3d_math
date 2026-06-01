# 3D 数学基础 — 交互式学习指南

基于《3D Math Primer for Graphics and Game Development (2nd Edition)》的交互式学习网站，使用 Babylon.js 3D 引擎和 SolidJS 构建。

## 技术栈

| 组件 | 技术 |
|---|---|
| 前端框架 | [SolidJS](https://www.solidjs.com/) |
| 3D 引擎 | [Babylon.js](https://www.babylonjs.com/) |
| 样式 | [Tailwind CSS](https://tailwindcss.com/) |
| 数学公式 | [MathJax 3](https://www.mathjax.org/) |
| 代码高亮 | [highlight.js](https://highlightjs.org/) |
| 视频渲染 | Python + PIL + imageio-ffmpeg |
| 构建工具 | [Vite](https://vitejs.dev/) |

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build

# 预览构建结果
npm run preview
```

## 项目结构

```
├── src/
│   ├── chapters/           # 各章内容（14章 + 附录）
│   │   ├── chapter-01/     #   内容 + 3D 演示
│   │   ├── chapter-02/     #   内容 + 演示 + 视频
│   │   ├── ...
│   │   ├── chapter-14/     #   后记与附录
│   │   ├── index.ts        #   章节注册表
│   │   ├── register-demos.ts  # 3D 演示注册
│   │   └── section-data.ts    # 侧边栏小节元数据
│   ├── components/
│   │   ├── content/        # 内容渲染组件
│   │   │   ├── ChapterViewer.tsx    # 章节查看器
│   │   │   ├── DerivationBlock.tsx  # 公式推导演算
│   │   │   ├── IllustrationBlock.tsx # SVG 图解
│   │   │   ├── DemoBlock.tsx        # 3D 演示（折叠）
│   │   │   ├── CodeBlock.tsx        # 代码块（高亮）
│   │   │   ├── FormulaBlock.tsx     # LaTeX 公式
│   │   │   ├── NoteBlock.tsx        # 提示/警告块
│   │   │   └── TheoremBox.tsx       # 定义定理框
│   │   ├── demo/           # 3D 演示面板
│   │   └── layout/         # 布局（侧边栏/导航）
│   ├── hooks/              # 自定义 Hooks
│   ├── utils/              # 工具函数
│   └── styles/             # 全局样式
├── manim/
│   └── chapter02_render.py # 视频渲染脚本
├── public/
│   └── videos/             # 生成的章节介绍视频
└── package.json
```

## 章节内容

| 章 | 标题 | 节数 | 特色 |
|---|---|---|---|
| 1 | 笛卡尔坐标系 | 5 | 3D 坐标演示 |
| 2 | 向量 | 13 | 视频介绍 + 演示 |
| 3 | 多重坐标空间 | 6 | 场景图代码 |
| 4 | 矩阵介绍 | 10 | 基向量图解 |
| 5 | 矩阵与线性变换 | 7 | 公式推导 + 演示 |
| 6 | 更多矩阵 | 9 | 透视投影详解 |
| 7 | 极坐标系统 | 5 | 坐标转换 |
| 8 | 三维旋转 | 6 | 四元数推导 |
| 9 | 几何图元 | 6 | 包围盒代码 |
| 10 | 3D 图形数学主题 | 5 | 光照模型 |
| 11 | 运动学与微积分 | 4 | 欧拉积分 |
| 12 | 线性与旋转动力学 | 4 | 牛顿定律 |
| 13 | 3D 曲线 | 4 | 贝塞尔曲线 |
| 14 | 后记与附录 | 4 | 学习方向推荐 |

## 内容块类型

每个章节的文章由以下内容块组合而成：

| 类型 | 说明 | 示例 |
|---|---|---|
| `text` | 普通文本 + HTML | 段落、列表、表格 |
| `definition` | 定义/定理框 | 蓝色左边框样式 |
| `formula` | LaTeX 数学公式 | MathJax 渲染 |
| `note` | 提示/警告块 | info / tip / warning |
| `code` | 代码块 | TypeScript 语法高亮 |
| `illustration` | SVG 图解 | 嵌入 SVG 图像 |
| `demo` | 3D 交互演示 | Babylon.js 渲染 |
| `derivation` | 公式推导演算 | 分步推导 + 原理洞察 + 图解 |
| `intro` | 章节介绍视频 | MP4 播放器 |

## 视频渲染

第二章包含一个介绍视频，使用 Python + PIL 渲染：

```bash
# 安装依赖
pip3 install imageio imageio-ffmpeg pillow numpy

# 渲染视频
python3 manim/chapter02_render.py

# 输出: public/videos/chapter02.mp4
```

视频脚本在 `manim/chapter02_render.py` 中，使用 PIL ImageDraw 逐帧渲染 64 秒动画，imageio+ffmpeg 编码为 H.264 MP4。

## 功能特色

- **固定侧边栏**：支持折叠，显示本章小节导航 + 全部章节列表
- **滚动监听**：自动高亮当前阅读位置对应的小节
- **3D 交互演示**：折叠式展开，支持全屏查看
- **公式推导演算**：每个步骤包含公式、说明和原理洞察
- **SVG 图解**：关键概念配有内嵌矢量图
- **代码高亮**：TypeScript 代码自动语法着色
- **章节目录**：树状结构支持多级展开

## 许可

本项目为教育用途的学习材料，基于《3D Math Primer for Graphics and Game Development (2nd Edition)》编写。原书版权归作者 Fletcher Dunn 和 Ian Parberry 所有。