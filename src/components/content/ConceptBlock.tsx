export default function ConceptBlock(props: { html: string }) {
  return (
    <div
      class="prose prose-gray max-w-none text-gray-700 leading-relaxed"
      innerHTML={props.html}
    />
  )
}