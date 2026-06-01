export default function ChapterIntro(_props: { chapterId: string }) {
  return (
    <div class="relative w-full rounded-xl overflow-hidden border border-gray-700 shadow-lg bg-[#0d1117] my-8">
      <video
        class="block w-full"
        style={{ "aspect-ratio": "16/9" }}
        controls
        preload="metadata"
        playsinline
      >
        <source src="/videos/chapter02.mp4" type="video/mp4" />
        您的浏览器不支持视频播放
      </video>
    </div>
  )
}