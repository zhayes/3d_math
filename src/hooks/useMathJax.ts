import { createSignal, onMount } from "solid-js"

declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: (elements?: HTMLElement[]) => Promise<void>
      typeset?: (elements?: HTMLElement[]) => void
    }
  }
}

export function useMathJax() {
  const [isLoaded, setIsLoaded] = createSignal(false)

  onMount(() => {
    if (window.MathJax) {
      setIsLoaded(true)
      return
    }

    const script = document.createElement("script")
    script.src =
      "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
    script.async = true
    script.onload = () => setIsLoaded(true)
    document.head.appendChild(script)
  })

  const typeset = async (element?: HTMLElement) => {
    if (window.MathJax?.typesetPromise) {
      await window.MathJax.typesetPromise(element ? [element] : undefined)
    } else if (window.MathJax?.typeset) {
      window.MathJax.typeset(element ? [element] : undefined)
    }
  }

  return { isLoaded, typeset }
}