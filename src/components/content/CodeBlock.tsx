import { createSignal, createMemo } from "solid-js"
import hljs from "highlight.js/lib/core"
import typescript from "highlight.js/lib/languages/typescript"
import javascript from "highlight.js/lib/languages/javascript"
import glsl from "highlight.js/lib/languages/glsl"
import json from "highlight.js/lib/languages/json"
import bash from "highlight.js/lib/languages/bash"

// Register commonly used languages
hljs.registerLanguage("typescript", typescript)
hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("glsl", glsl)
hljs.registerLanguage("json", json)
hljs.registerLanguage("bash", bash)
// Aliases
hljs.registerLanguage("ts", typescript)
hljs.registerLanguage("js", javascript)
hljs.registerLanguage("sh", bash)

export default function CodeBlock(props: { language: string; code: string }) {
  const [copied, setCopied] = createSignal(false)

  const highlighted = createMemo(() => {
    const lang = hljs.getLanguage(props.language)
    if (lang) {
      const result = hljs.highlight(props.code, { language: props.language })
      return result.value
    }
    // Fallback: auto-detect
    const result = hljs.highlightAuto(props.code)
    return result.value
  })

  const handleCopy = () => {
    navigator.clipboard.writeText(props.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div class="my-6 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
      <div class="flex items-center justify-between bg-gray-800 px-4 py-2">
        <span class="text-xs font-medium text-gray-400 uppercase tracking-wider">
          {props.language}
        </span>
        <button
          onClick={handleCopy}
          class="text-xs text-gray-400 hover:text-white transition-colors px-2 py-0.5 rounded hover:bg-gray-700"
          type="button"
        >
          {copied() ? "✓ 已复制" : "⎘ 复制"}
        </button>
      </div>
      <pre class="bg-[#1e1e2e] text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed m-0">
        <code
          class="hljs"
          innerHTML={highlighted()}
        />
      </pre>
    </div>
  )
}