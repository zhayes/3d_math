import { type JSX, createMemo, createSignal, onCleanup } from "solid-js"
import { useBabylon } from "@/hooks/useBabylon"
import type { Scene, Engine } from "babylonjs"

export interface DemoPanelProps {
  demoId: string
  title: string
  setupScene: (scene: Scene, engine: Engine) => void
  children?: JSX.Element
}

export default function DemoPanel(props: DemoPanelProps) {
  const demoId = createMemo(() => props.demoId)
  const setupSceneFn = createMemo(() => props.setupScene)
  const [isFullscreen, setIsFullscreen] = createSignal(false)

  const { canvasRef } = useBabylon(demoId, setupSceneFn)

  let containerRef!: HTMLDivElement

  function handleFullscreenChange() {
    const fs = !!document.fullscreenElement
    setIsFullscreen(fs)
    // Trigger Babylon resize after a frame to let layout settle
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"))
    })
  }

  onCleanup(() => {
    document.removeEventListener("fullscreenchange", handleFullscreenChange)
  })

  document.addEventListener("fullscreenchange", handleFullscreenChange)

  async function toggleFullscreen() {
    if (!document.fullscreenElement) {
      try {
        await containerRef.requestFullscreen()
      } catch (e) {
        console.error("Fullscreen request failed:", e)
      }
    } else {
      await document.exitFullscreen()
    }
  }

  return (
    <div
      ref={containerRef}
      class="border border-gray-200 rounded-lg bg-white overflow-hidden"
      classList={{
        "!rounded-none !border-0": isFullscreen(),
      }}
    >
      {/* Header */}
      <div
        class="px-4 py-2 bg-gray-50 border-b border-gray-200 flex items-center gap-2"
        classList={{
          "bg-gray-900 border-gray-700": isFullscreen(),
        }}
      >
        <span
          class="text-xs font-medium uppercase tracking-wider flex-shrink-0"
          classList={{
            "text-gray-400": !isFullscreen(),
            "text-gray-500": isFullscreen(),
          }}
        >
          {props.demoId}
        </span>
        <span
          class="flex-shrink-0"
          classList={{
            "text-gray-300": !isFullscreen(),
            "text-gray-600": isFullscreen(),
          }}
        >
          |
        </span>
        <h3
          class="text-sm font-semibold flex-1 min-w-0 truncate"
          classList={{
            "text-gray-800": !isFullscreen(),
            "text-gray-200": isFullscreen(),
          }}
        >
          {props.title}
        </h3>

        {/* Fullscreen toggle */}
        <button
          type="button"
          onClick={toggleFullscreen}
          class="flex-shrink-0 p-1.5 rounded-md transition-colors"
          classList={{
            "text-gray-400 hover:text-gray-600 hover:bg-gray-200": !isFullscreen(),
            "text-gray-400 hover:text-gray-200 hover:bg-gray-700": isFullscreen(),
          }}
          title={isFullscreen() ? "退出全屏" : "全屏查看"}
        >
          {isFullscreen() ? (
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width={2}
                d="M6 18L18 6M6 6l12 0v12"
              />
            </svg>
          ) : (
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Canvas container */}
      <div
        class="relative w-full"
        classList={{
          "h-[400px]": !isFullscreen(),
          "h-full flex-1": isFullscreen(),
        }}
        style={
          isFullscreen()
            ? { height: "calc(100vh - 41px)" }
            : { "min-height": "400px" }
        }
      >
        <canvas
          ref={canvasRef}
          class="block w-full h-full"
        />
      </div>

      {props.children && (
        <div
          class="border-t"
          classList={{
            "border-gray-200": !isFullscreen(),
            "border-gray-700": isFullscreen(),
          }}
        >
          {props.children}
        </div>
      )}
    </div>
  )
}