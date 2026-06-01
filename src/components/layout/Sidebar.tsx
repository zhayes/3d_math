import { A, useParams, useLocation } from "@solidjs/router"
import { createMemo, createSignal, createEffect, onCleanup, For, Show } from "solid-js"
import { chapters } from "@/chapters"
import { chapterSections } from "@/chapters/section-data"

export default function Sidebar(props: {
  collapsed: boolean
  onToggle: () => void
}) {
  const params = useParams<{ id: string }>()
  const sections = createMemo(() => chapterSections[params.id] ?? [])

  // Scroll spy: track which section is currently visible
  const [activeSection, setActiveSection] = createSignal("")

  createEffect(() => {
    // Re-initialize observer when chapter changes
    const id = params.id
    if (!id) return

    // Small delay for DOM to render
    const timeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          // Find the first visible section heading
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          if (visible.length > 0) {
            setActiveSection(visible[0].target.id)
          }
        },
        { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
      )

      document.querySelectorAll("[data-section-id]").forEach((el) => {
        observer.observe(el)
      })

      onCleanup(() => observer.disconnect())
    }, 300)

    onCleanup(() => clearTimeout(timeout))
  })

  return (
    <nav class="h-full flex flex-col">
      {/* Header */}
      <div class="flex items-center justify-between px-4 py-3 border-b border-gray-700 flex-shrink-0">
        <Show when={!props.collapsed()}>
          <h2 class="text-base font-bold text-white truncate">3D 数学基础</h2>
        </Show>
        <button
          type="button"
          onClick={props.onToggle}
          class="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors flex-shrink-0"
          title={props.collapsed() ? "展开侧边栏" : "折叠侧边栏"}
        >
          <svg
            class="w-4 h-4 transition-transform duration-300"
            classList={{ "rotate-180": props.collapsed() }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      {/* Chapter list */}
      <div
        class="flex-1 overflow-y-auto py-2"
        classList={{ hidden: props.collapsed() }}
      >
        {/* Subsection navigation for current chapter */}
        <Show when={sections().length > 0}>
          <div class="mb-3">
            <div class="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              本章目录
            </div>
            <ul class="space-y-0">
              <For each={sections()}>
                {(section) => (
                  <li>
                    <a
                      href={`#section-${section.id}`}
                      class="block px-4 py-1.5 text-xs transition-colors border-l-2 ml-2"
                      classList={{
                        "border-indigo-400 bg-indigo-900/30 text-indigo-200":
                          activeSection() === `section-${section.id}`,
                        "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600":
                          activeSection() !== `section-${section.id}`,
                      }}
                    >
                      {section.id} {section.title}
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </div>
          <div class="mx-4 mb-3 border-t border-gray-700" />
        </Show>

        {/* All chapters */}
        <div class="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          全部章节
        </div>
        <ul class="space-y-0">
          <For each={chapters}>
            {(ch) => (
              <li>
                <A
                  href={`/chapters/${ch.id}`}
                  class="block px-4 py-1.5 text-sm transition-colors"
                  activeClass="bg-indigo-600 text-white font-medium"
                  inactiveClass="text-gray-300 hover:bg-gray-800"
                  end
                >
                  <span class="text-xs text-gray-500 mr-1.5">{ch.id}.</span>
                  {ch.title}
                </A>
              </li>
            )}
          </For>
        </ul>
      </div>

      {/* Collapsed mode: chapter numbers only */}
      <div
        class="flex-1 overflow-y-auto py-3"
        classList={{ hidden: !props.collapsed() }}
      >
        <ul class="space-y-1 px-1.5">
          <For each={chapters}>
            {(ch) => (
              <li>
                <A
                  href={`/chapters/${ch.id}`}
                  class="flex items-center justify-center w-9 h-9 mx-auto rounded-md text-xs font-bold transition-colors"
                  activeClass="bg-indigo-600 text-white"
                  inactiveClass="text-gray-400 hover:bg-gray-700 hover:text-gray-200"
                  title={ch.title}
                  end
                >
                  {ch.id}
                </A>
              </li>
            )}
          </For>
        </ul>
      </div>
    </nav>
  )
}