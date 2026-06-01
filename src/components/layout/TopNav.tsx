import { useParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import { chapters } from "@/chapters";

export default function TopNav() {
  const params = useParams<{ id: string }>();

  const currentChapter = createMemo(() =>
    chapters.find((ch) => ch.id === params.id)
  );

  return (
    <div class="flex items-center gap-2 text-sm">
      <span class="text-gray-700 font-medium">3D 数学基础</span>
      {currentChapter() && (
        <>
          <span class="text-gray-400 select-none">/</span>
          <span class="text-indigo-600 font-medium">
            Chapter {currentChapter()!.id}: {currentChapter()!.title}
          </span>
        </>
      )}
    </div>
  );
}