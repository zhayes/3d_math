export interface Chapter {
  id: string;
  title: string;
  description: string;
}

export interface Demo {
  id: string;
  title: string;
  loader: () => Promise<{
    setupScene: (scene: any, engine: any) => void;
  }>;
}

const demoRegistry: Record<string, Record<string, Demo>> = {};

export function registerDemo(chapterId: string, demo: Demo): void {
  if (!demoRegistry[chapterId]) {
    demoRegistry[chapterId] = {};
  }
  demoRegistry[chapterId][demo.id] = demo;
}

export function getChapterDemos(chapterId: string): Demo[] {
  return Object.values(demoRegistry[chapterId] || {});
}

export const chapters: Chapter[] = [
  {
    id: "1",
    title: "笛卡尔坐标系 (Cartesian Coordinate Systems)",
    description: "1D数学、2D笛卡尔空间、3D笛卡尔空间",
  },
  {
    id: "2",
    title: "向量 (Vectors)",
    description: "向量的几何定义、运算、点积、叉积、线性代数恒等式",
  },
  {
    id: "3",
    title: "多重坐标空间 (Multiple Coordinate Spaces)",
    description: "坐标空间变换、嵌套坐标空间、直立空间",
  },
  {
    id: "4",
    title: "矩阵介绍 (Introduction to Matrices)",
    description: "矩阵的数学定义、几何解释、线性代数",
  },
  {
    id: "5",
    title: "矩阵与线性变换 (Matrices & Linear Transformations)",
    description: "旋转、缩放、投影、反射、剪切、变换组合",
  },
  {
    id: "6",
    title: "更多矩阵 (More on Matrices)",
    description: "行列式、逆矩阵、正交矩阵、齐次矩阵、透视投影",
  },
  {
    id: "7",
    title: "极坐标系统 (Polar Coordinate Systems)",
    description: "2D/3D极坐标空间、用极坐标表示向量",
  },
  {
    id: "8",
    title: "三维旋转 (Rotation in Three Dimensions)",
    description: "欧拉角、轴角、四元数、各方法比较与转换",
  },
  {
    id: "9",
    title: "几何图元 (Geometric Primitives)",
    description: "直线、射线、球体、包围盒、平面、三角形、多边形",
  },
  {
    id: "10",
    title: "3D图形中的数学 (Math Topics from 3D Graphics)",
    description: "渲染管线、坐标空间、光照模型、纹理映射、骨骼动画",
  },
  {
    id: "11",
    title: "力学1: 线性运动学与微积分 (Linear Kinematics)",
    description: "速度、加速度、导数与积分、匀加速运动、圆周运动",
  },
  {
    id: "12",
    title: "力学2: 线性与旋转动力学 (Linear & Rotational Dynamics)",
    description: "牛顿三定律、动量、冲量碰撞、旋转动力学、刚体模拟",
  },
  {
    id: "13",
    title: "3D曲线 (Curves in 3D)",
    description: "参数多项式曲线、Hermite曲线、贝塞尔曲线、样条、连续性",
  },
  {
    id: "14",
    title: "后记 (Afterword)",
    description: "后续学习方向与资源推荐",
  },
  {
    id: "A",
    title: "附录A: 几何测试 (Geometric Tests)",
    description: "常用几何相交测试参考",
  },
  {
    id: "B",
    title: "附录B: 习题答案 (Answers to Exercises)",
    description: "各章习题解答",
  },
];