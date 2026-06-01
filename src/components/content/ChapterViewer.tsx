import { createEffect } from "solid-js"
import type { ChapterContent } from "./types"
import { useMathJax } from "@/hooks/useMathJax"
import ConceptBlock from "./ConceptBlock"
import FormulaBlock from "./FormulaBlock"
import TheoremBox from "./TheoremBox"
import CodeBlock from "./CodeBlock"
import NoteBlock from "./NoteBlock"
import DemoBlock from "./DemoBlock"
import IllustrationBlock from "./IllustrationBlock"
import ChapterIntro from "./ChapterIntro"
import DerivationBlock from "./DerivationBlock"

export default function ChapterViewer(props: { content: ChapterContent }) {
  const { isLoaded, typeset } = useMathJax()
  let containerRef!: HTMLDivElement

  // Re-typeset when content changes (chapter switch) or MathJax loads
  createEffect(() => {
    const _id = props.content.id // track chapter id to re-trigger on switch
    if (isLoaded() && containerRef) {
      // Small delay ensures Solid has rendered the new DOM
      const timer = setTimeout(() => typeset(containerRef), 50)
      return () => clearTimeout(timer)
    }
  })

  return (
    <div ref={containerRef} class="max-w-3xl mx-auto py-8 px-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-10">
        第 {props.content.id} 章: {props.content.title}
      </h1>

      {props.content.sections.map((section, idx) => {
        // Extract section number from title like "1.1 xxx"
        const secNum = section.title.match(/^([\d.]+)/)?.[1] ?? String(idx + 1)
        const secId = `section-${secNum}`
        return (
          <section class="mb-10">
            <h2
              id={secId}
              data-section-id={secId}
              class="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200 scroll-mt-20"
            >
              {section.title}
            </h2>

            <div class="space-y-4">
              {section.blocks.map((block) => {
                switch (block.type) {
                  case "text":
                    return <ConceptBlock html={block.html} />
                  case "definition":
                    return <TheoremBox title={block.title} body={block.body} />
                  case "formula":
                    return <FormulaBlock latex={block.latex} note={block.note} />
                  case "note":
                    return <NoteBlock level={block.level} body={block.body} />
                  case "demo":
                    return <DemoBlock demoId={block.demoId} chapterId={props.content.id} />
                  case "code":
                    return (
                      <CodeBlock
                        language={block.language}
                        code={block.code}
                      />
                    )
                  case "illustration":
                    return (
                      <IllustrationBlock
                        svg={block.svg}
                        caption={block.caption}
                        width={block.width}
                        height={block.height}
                      />
                    )
                  case "intro":
                    return <ChapterIntro chapterId={props.content.id} />
                  case "derivation":
                    return (
                      <DerivationBlock
                        title={block.title}
                        intro={block.intro}
                        steps={block.steps}
                      />
                    )
                  default:
                    return null
                }
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}