import { createSignal } from "solid-js"
import { getChapterDemos } from "@/chapters"
import DemoPanel from "@/components/demo/DemoPanel"

export default function DemoBlock(props: { demoId: string; chapterId: string }) {
  const [expanded, setExpanded] = createSignal(false)
  const [loaded, setLoaded] = createSignal(false)
  const [setupSceneFn, setSetupSceneFn] = createSignal<
    ((scene: any, engine: any) => void) | null
  >(null)
  const [loading, setLoading] = createSignal(false)

  const demos = () => getChapterDemos(props.chapterId)
  const demo = () => demos().find((d) => d.id === props.demoId)
  const title = () => demo()?.title ?? props.demoId

  async function handleToggle() {
    if (expanded()) {
      setExpanded(false)
      return
    }

    setExpanded(true)
    if (!loaded()) {
      setLoading(true)
      try {
        const d = demo()
        if (d) {
          const mod = await d.loader()
          setSetupSceneFn(() => mod.setupScene)
          setLoaded(true)
        }
      } catch (e) {
        console.error(`Failed to load demo ${props.demoId}:`, e)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div class="my-6 border border-indigo-200 rounded-lg overflow-hidden bg-white">
      {/* Collapsible header */}
      <button
        type="button"
        onClick={handleToggle}
        class="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-indigo-50/50 transition-colors"
      >
        {/* Expand/collapse icon */}
        <svg
          class={`w-4 h-4 text-indigo-400 transition-transform duration-200 shrink-0 ${
            expanded() ? "rotate-90" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width={2}
            d="M9 5l7 7-7 7"
          />
        </svg>

        {/* Demo icon */}
        <span class="text-lg shrink-0">🎮</span>

        {/* Title area */}
        <div class="flex-1 min-w-0">
          <span class="text-sm font-semibold text-gray-800">{title()}</span>
          <span class="ml-2 text-xs text-indigo-400 font-mono">{props.demoId}</span>
        </div>

        {/* Status badge */}
        <span
          class={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${
            expanded()
              ? "bg-indigo-100 text-indigo-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {expanded() ? "已展开" : "点击展开"}
        </span>
      </button>

      {/* Collapsible content */}
      <div
        class={`overflow-hidden transition-all duration-300 ${
          expanded() ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div class="border-t border-indigo-100">
          {loading() && (
            <div class="flex items-center justify-center py-12 text-gray-400 text-sm gap-2">
              <svg
                class="animate-spin w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              加载演示中...
            </div>
          )}

          {!loading() && loaded() && setupSceneFn() && (
            <div class="p-2">
              <DemoPanel
                demoId={props.demoId}
                title={title()}
                setupScene={setupSceneFn()!}
              />
            </div>
          )}

          {!loading() && loaded() && !setupSceneFn() && (
            <div class="flex items-center justify-center py-8 text-amber-600 text-sm">
              演示加载失败，请刷新页面重试
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
