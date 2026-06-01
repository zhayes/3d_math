"""Render Chapter 2 intro MP4 — 960x544, thick lines for clarity"""
import math, os, imageio, numpy as np
from PIL import Image, ImageDraw, ImageFont

W, H = 960, 544
FPS, DUR = 30, 64.5
BG=(13,17,23); FG=(230,237,243); RED=(227,89,71); GREEN=(46,153,120)
BLUE=(56,122,217); GOLD=(234,179,8); PURPLE=(166,89,219); MUTED=(72,79,88); SUBTLE=(33,38,45)

FONT = None
for p in ["/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
          "/System/Library/Fonts/Hiragino Sans GB.ttc"]:
    if os.path.exists(p): FONT = p; break

def f(sz, b=False):
    try: return ImageFont.truetype(FONT, sz)
    except: return ImageFont.load_default()

# Font sizes
S = {88: f(44,True), 64: f(32,True), 48: f(24), 44: f(22), 40: f(20),
     36: f(18), 32: f(16), 28: f(14), 24: f(12), 22: f(11)}

def wa(t,s,e,fd=.5):
    if t<s: return 0
    if t<s+fd: return (t-s)/fd
    if t<e-fd: return 1
    if t<e: return (e-t)/fd
    return 0

def bl(fg,bg,a):
    return tuple(int(f*a+b*(1-a)) for f,b in zip(fg,bg))

def ar(d,x1,y1,x2,y2,c,w=5):
    dx,dy=x2-x1,y2-y1; L=math.hypot(dx,dy)
    if L<1: return
    ux,uy=dx/L,dy/L; hl=min(25,L*.25)
    d.line([(x1,y1),(x2,y2)],fill=c,width=w)
    d.polygon([(x2,y2),(x2-ux*hl-uy*hl*.5,y2-uy*hl+ux*hl*.5),
               (x2-ux*hl+uy*hl*.5,y2-uy*hl-ux*hl*.5)],fill=c)

def ds(d,x1,y1,x2,y2,c,w=3,dash=12,gap=8):
    dx,dy=x2-x1,y2-y1; L=math.hypot(dx,dy)
    if L<1: return; ux,uy=dx/L,dy/L; p=0.
    while p<L:
        s=min(dash,L-p)
        d.line([(x1+ux*p,y1+uy*p),(x1+ux*(p+s),y1+uy*(p+s))],fill=c,width=w)
        p+=dash+gap

def dt(d,x,y,r,c):
    d.ellipse([(x-r,y-r),(x+r,y+r)],fill=c)

def tx(d,xy,s,c,fnt,anc="mm"):
    d.text(xy,s,fill=c,font=fnt,anchor=anc)

def arc(d,ox,oy,r,a0,a1,c,w=2,seg=25):
    for i in range(seg):
        th0=a0+(a1-a0)*i/seg; th1=a0+(a1-a0)*(i+1)/seg
        d.line([(ox+r*math.cos(th0),oy-r*math.sin(th0)),
                (ox+r*math.cos(th1),oy-r*math.sin(th1))],fill=c,width=w)

CAPTIONS = [
    (0.5,3.0,"在 3D 游戏和图形学中"),(1.2,2.3,"向量是最基础也最重要的数学工具"),
    (2.5,2.0,"角色的移动、光照的计算、碰撞的检测"),(3.2,1.8,"背后都是向量运算"),
    (4.5,2.5,"什么是向量？"),(5.2,2.3,"简单说——向量就是有大小、有方向的量"),
    (6.5,2.5,"它像一支箭头：长度代表大小，指向代表方向"),
    (8.0,2.0,"向量的位置不重要——只要长度和方向相同"),(9.0,1.5,"它们就是同一个向量"),
    (11.0,2.5,"在笛卡尔坐标系中，向量用分量表示"),
    (12.0,3.0,"v = (x, y, z)，分别表示沿三个坐标轴的步数"),
    (14.0,2.0,"比如 (3, 4, 0) 就是向右3步、向上4步"),
    (16.5,2.5,"向量的加法：对应分量直接相加"),(17.5,3.0,"几何上，就是平行四边形法则"),
    (19.0,2.5,"两个向量首尾相接，对角线就是和"),
    (22.0,2.5,"标量乘法：每个分量乘以同一个数"),(23.0,3.0,"几何上就是拉长、缩短、或反转方向"),
    (25.0,2.0,"除以模长就是归一化，得到单位向量"),
    (28.0,2.5,"点积——这是最重要的向量运算之一"),(29.5,3.0,"a·b = ax·bx + ay·by + az·bz"),
    (31.5,3.5,"几何意义：a·b = |a||b|cosθ"),
    (34.0,3.0,"如果 a·b > 0，夹角小于90°，两向量大致同向"),
    (36.0,2.5,"如果 a·b = 0，两向量垂直——称为正交"),
    (37.5,2.5,"如果 a·b < 0，夹角大于90°，大致反向"),
    (40.5,2.5,"叉积——只在三维空间中有定义"),(42.0,3.5,"a × b 是一个垂直于 a 和 b 的新向量"),
    (44.5,3.0,"它的模长等于以 a 和 b 为边的平行四边形面积"),
    (46.5,3.0,"方向由右手定则确定：四指从 a 弯向 b"),(48.5,2.0,"拇指所指就是叉积的方向"),
    (51.5,2.5,"法向量是垂直于平面的向量"),(53.0,3.0,"在光照计算中，法向量决定了表面的亮暗"),
    (55.0,3.0,"背面剔除也靠法向量——面向摄像机的才渲染"),
    (58.5,2.5,"这就是第二章的核心内容"),(60.0,3.0,"现在，请阅读下方详细讲解"),
    (62.0,2.5,"并通过交互演示动手验证每个概念"),
]

def frame(t):
    img=Image.new("RGB",(W,H),BG); d=ImageDraw.Draw(img)

    # S0 title
    a=wa(t,0,4.5)
    tx(d,(W/2,H/2-20),"第二章：向量 Vectors",bl(FG,BG,a),S[88])
    tx(d,(W/2,H/2+25),"3D 数学基础 — 图形与游戏开发",bl(MUTED,BG,a),S[48])

    # S1 vector def
    a=wa(t,4,11)
    if a>0:
        ox,oy=200,360; vx,vy=ox+220,oy-180
        ar(d,ox,oy,vx,vy,bl(RED,BG,a)); dt(d,ox,oy,4,bl(MUTED,BG,a))
        tx(d,(ox-35,oy+18),"原点",bl(MUTED,BG,a),S[28])
        tx(d,((ox+vx)//2+40,(oy+vy)//2-8),"模长 |v|",bl(RED,BG,a),S[28])
        arc(d,ox,oy,50,-0.68,0,bl(MUTED,BG,a))
        tx(d,(ox+62,oy-28),"方向",bl(MUTED,BG,a),S[24])
        tx(d,(vx+10,vy+15),"v = (x, y)",bl(FG,BG,a),S[28])
        tx(d,(W//2+80,H//2-30),"向量 = 大小 + 方向",bl(FG,BG,a),S[48])
        tx(d,(W//2+80,H//2+12),"有向线段，平移不变",bl(MUTED,BG,a),S[32])

    # S2 components
    a=wa(t,10.5,16.5)
    if a>0:
        cx,cy=340,220; ax,ay=cx+180,cy; bx,by=cx,cy-140
        ds(d,cx,cy,ax,cy,bl(RED,BG,a),3)
        ar(d,cx,cy,ax,ay,bl(RED,BG,a)); ar(d,cx,cy,bx,by,bl(GREEN,BG,a))
        tx(d,((cx+ax)//2,cy+16),"x 分量",bl(RED,BG,a),S[28])
        tx(d,(cx-28,(cy+by)//2),"y 分量",bl(GREEN,BG,a),S[28])
        ar(d,cx,cy,ax,by,bl(GOLD,BG,a))
        tx(d,(ax//2+cx//2+30,by//2+cy//2-10),"v = (x, y)",bl(GOLD,BG,a),S[32])
        tx(d,(W//2+120,H//2-20),"分量 = 轴上的投影",bl(FG,BG,a),S[40])
        tx(d,(W//2+120,H//2+15),"每个分量独立变化",bl(MUTED,BG,a),S[28])

    # S3 addition
    a=wa(t,16,22)
    if a>0:
        ox,oy=150,300; ax,ay=ox+180,oy-100; bx,by=230,380; sx,sy=bx+160,ay-120
        ar(d,ox,oy,ax,ay,bl(RED,BG,a)); ar(d,ox,oy,bx,by,bl(GREEN,BG,a))
        tx(d,((ox+ax)//2+15,(oy+ay)//2-10),"a",bl(RED,BG,a),S[32])
        tx(d,((ox+bx)//2+15,(oy+by)//2+12),"b",bl(GREEN,BG,a),S[32])
        ds(d,bx,by,sx,sy,bl(RED,BG,a),3); ds(d,ax,ay,sx,sy,bl(GREEN,BG,a),3)
        ar(d,ox,oy,sx,sy,bl(GOLD,BG,a))
        tx(d,((ox+sx)//2+35,(oy+sy)//2+12),"a + b",bl(GOLD,BG,a),S[32])
        tx(d,(W//2+120,H//2-20),"向量加法：平行四边形法则",bl(FG,BG,a),S[40])
        tx(d,(W//2+120,H//2+15),"a + b = 对角线",bl(MUTED,BG,a),S[28])

    # S4 scalar
    a=wa(t,21.5,28)
    if a>0:
        sx,sy=300,160
        ar(d,sx,sy,sx+60,sy-30,bl(RED,BG,a),3)
        ar(d,sx+100,sy,sx+230,sy-65,bl(RED,BG,a),7)
        tx(d,(sx+30,sy-22),"v",bl(RED,BG,a),S[24])
        tx(d,(sx+165,sy-42),"2v",bl(RED,BG,a),S[28])
        d.line([(sx+60,sy-20),(sx+100,sy-10)],fill=bl(MUTED,BG,a),width=3)
        tx(d,(sx+82,sy-5),"x2",bl(MUTED,BG,a),S[22])
        ar(d,sx,sy+100,sx+80,sy+55,bl(BLUE,BG,a))
        tx(d,(sx+42,sy+82),"v/|v|",bl(BLUE,BG,a),S[28])
        tx(d,(W//2+120,H//2-20),"标量乘法：拉伸与归一化",bl(FG,BG,a),S[40])
        tx(d,(W//2+120,H//2+15),"k>1 拉长  k<1 缩短  k<0 反向",bl(MUTED,BG,a),S[28])

    # S5 dot
    a=wa(t,27.5,40)
    if a>0:
        ox,oy=160,260; ax,ay=ox+280,oy; ang=.85; blen=190
        bx=ox+math.cos(ang)*blen; by=oy-math.sin(ang)*blen
        ar(d,ox,oy,ax,ay,bl(RED,BG,a)); ar(d,ox,oy,bx,by,bl(GREEN,BG,a))
        tx(d,((ox+ax)//2,oy-18),"a",bl(RED,BG,a),S[32])
        tx(d,((ox+bx)//2-25,(oy+by)//2),"b",bl(GREEN,BG,a),S[32])
        arc(d,ox,oy,58,-ang,0,bl(MUTED,BG,a))
        tx(d,(ox+55,oy-22),"θ",bl(MUTED,BG,a),S[28])
        plen=blen*math.cos(ang); px,py=ox+plen,oy
        ds(d,ox,oy,px,py,bl(GOLD,BG,a),4,dash=10,gap=6)
        ds(d,px,py,bx,by,bl(GREEN,BG,a),2,dash=6,gap=10)
        dt(d,px,py,4,bl(GOLD,BG,a))
        tx(d,(px//2+ox//2,py+18),"proj",bl(GOLD,BG,a),S[24])
        tx(d,(W//2+140,75),"点积 Dot Product",bl(FG,BG,a),S[48])
        tx(d,(W//2+140,120),"a·b = |a||b|cosθ",bl(GOLD,BG,a),S[40])
        tx(d,(W//2+140,160),">0 锐角  =0 正交  <0 钝角",bl(MUTED,BG,a),S[28])
        tx(d,(W//2+140,195),"投影 = 点积除以模长",bl(MUTED,BG,a),S[28])

    # S6 cross
    a=wa(t,39.5,51)
    if a>0:
        ox,oy=260,280; ax,ay=ox+220,oy-20; bx,by=ox+70,oy-160
        ar(d,ox,oy,ax,ay,bl(RED,BG,a)); ar(d,ox,oy,bx,by,bl(GREEN,BG,a))
        tx(d,((ox+ax)//2+15,(oy+ay)//2-10),"a",bl(RED,BG,a),S[32])
        tx(d,((ox+bx)//2-30,(oy+by)//2),"b",bl(GREEN,BG,a),S[32])
        lx,ly=ax+bx-ox,ay+by-oy
        ds(d,ax,ay,lx,ly,bl(RED,BG,a),3); ds(d,bx,by,lx,ly,bl(GREEN,BG,a),3)
        ar(d,ox,oy,ox-20,oy-210,bl(PURPLE,BG,a),7)
        tx(d,(ox-50,oy-105),"a x b",bl(PURPLE,BG,a),S[32])
        d.line([(ox-18,oy),(ox-18,oy-18)],fill=bl(PURPLE,BG,a),width=2)
        d.line([(ox-18,oy-18),(ox,oy-18)],fill=bl(PURPLE,BG,a),width=2)
        tx(d,(W//2+120,75),"叉积 Cross Product",bl(FG,BG,a),S[48])
        tx(d,(W//2+120,120),"a x b 垂直于 a, b",bl(PURPLE,BG,a),S[32])
        tx(d,(W//2+120,160),"|axb| = 平行四边形面积",bl(MUTED,BG,a),S[28])
        tx(d,(W//2+120,195),"方向 = 右手定则",bl(MUTED,BG,a),S[28])

    # S7 normal
    a=wa(t,50.5,58.5)
    if a>0:
        t0=(300,340); t1=(450,300); t2=(370,200)
        d.polygon([t0,t1,t2],fill=bl((26,26,46),BG,a),outline=bl(MUTED,BG,a))
        tx(d,(t0[0]-15,t0[1]+12),"v0",bl(MUTED,BG,a),S[24])
        tx(d,(t1[0]+12,t1[1]),"v1",bl(MUTED,BG,a),S[24])
        tx(d,(t2[0]+12,t2[1]-10),"v2",bl(MUTED,BG,a),S[24])
        nx,ny=sum(p[0] for p in[t0,t1,t2])/3,sum(p[1] for p in[t0,t1,t2])/3
        ar(d,nx,ny,nx-20,ny-110,bl(PURPLE,BG,a))
        tx(d,(nx-35,ny-60),"n",bl(PURPLE,BG,a),S[28])
        tx(d,(W//2+120,280),"法向量 垂直于三角形平面",bl(FG,BG,a),S[36])
        tx(d,(W//2+120,315),"光照 · 背面剔除 · 碰撞检测",bl(MUTED,BG,a),S[28])

    # S8 outro
    a=wa(t,57.5,64.5)
    tx(d,(W//2,H//2-25),"这就是向量的世界",bl(FG,BG,a),S[64])
    tx(d,(W//2,H//2+25),"继续阅读下方内容，动手验证每个概念 ↓",bl(MUTED,BG,a),S[40])

    # Subtitle
    for ct,cd,txt in CAPTIONS:
        if ct<=t<ct+cd:
            sa=min(1.,(t-ct)/.3,(ct+cd-t)/.3)
            by=H-68
            ov=Image.new("RGBA",(W,56),(*BG,int(220*sa)))
            img.paste(ov,(0,by-20),ov)
            si=Image.new("RGBA",(W,56),(0,0,0,0))
            sd=ImageDraw.Draw(si)
            sd.text((W/2,28),txt,fill=(*FG,int(255*sa)),font=S[40],anchor="mm")
            img.paste(si,(0,by-20),si)
            break

    # Progress
    p=min(1.,t/DUR)
    d.rectangle([(0,H-3),(W,H)],fill=SUBTLE)
    d.rectangle([(0,H-3),(int(W*p),H)],fill=RED)

    # Time
    m0,s0=int(t)//60,int(t)%60; m1,s1=int(DUR)//60,int(DUR)%60
    tx(d,(W-40,H-17),f"{m0}:{s0:02d} / {m1}:{s1:02d}",MUTED,S[24],"rm")

    return img

def main():
    n=int(DUR*FPS); frames=[]
    print(f"Rendering {n} frames ({DUR}s @ {FPS}fps) {W}x{H}...")
    for i in range(n):
        frames.append(np.array(frame(i/FPS)))
        if (i+1)%60==0: print(f"  {i+1}/{n} ({(i+1)/FPS:.1f}s)")
    out="public/videos/chapter02.mp4"
    print(f"Encoding -> {out}")
    w=imageio.get_writer(out,fps=FPS,codec="libx264",format="ffmpeg",
        output_params=["-preset","fast","-crf","23","-pix_fmt","yuv420p"])
    for f in frames: w.append_data(f)
    w.close()
    print(f"Done! {out} ({os.path.getsize(out)/1024/1024:.1f} MB)")

if __name__=="__main__": main()