import { For, Show } from "solid-js"
import { useMathJax } from "@/hooks/useMathJax"
import { createEffect } from "solid-js"

export default function DerivationBlock(props: {
  title: string
  intro?: string
  steps: { latex: string; note: string; insight?: string; diagram?: string }[]
}) {
  const { isLoaded, typeset } = useMathJax()
  let containerRef!: HTMLDivElement

  createEffect(() => {
    if (isLoaded() && containerRef) {
      typeset(containerRef)
    }
  })

  return (
    <div
      ref={containerRef}
      class="my-8 border border-indigo-200 rounded-xl overflow-hidden bg-white shadow-sm"
    >
      {/* Header */}
      <div class="bg-indigo-50 px-5 py-3 border-b border-indigo-100">
        <h3 class="text-base font-bold text-indigo-800 flex items-center gap-2">
          <span class="text-lg">📐</span>
          {props.title}
        </h3>
        <Show when={props.intro}>
          <p class="mt-1 text-sm text-indigo-600 leading-relaxed">{props.intro}</p>
        </Show>
      </div>

      {/* Steps */}
      <div class="px-5 py-4 space-y-5">
        <For each={props.steps}>
          {(step, idx) => (
            <div class="flex gap-4">
              {/* Step number */}
              <div class="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold mt-0.5">
                {idx() + 1}
              </div>

              <div class="flex-1 min-w-0 space-y-2">
                {/* Formula */}
                <div class="bg-gray-50 rounded-lg px-4 py-3 overflow-x-auto border border-gray-100">
                  <div class="flex justify-center">
                    <span class="text-base">{`\\(\\displaystyle ${step.latex}\\)`}</span>
                  </div>
                </div>

                {/* Diagram (if present) */}
                <Show when={step.diagram}>
                  <div
                    class="flex justify-center bg-[#faf8f5] rounded-lg border border-gray-200 p-3"
                    innerHTML={step.diagram}
                  />
                  <div class="text-xs text-gray-400 text-center -mt-1">▲ 图例示意</div>
                </Show>

                {/* Explanation */}
                <div class="text-sm text-gray-600 leading-relaxed">
                  <span class="font-semibold text-gray-700">{step.note}</span>
                </div>

                {/* Principle insight */}
                <Show when={step.insight}>
                  <div class="flex items-start gap-1.5 text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">
                    <span class="flex-shrink-0">💡</span>
                    <span class="leading-relaxed">{step.insight}</span>
                  </div>
                </Show>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  )
}