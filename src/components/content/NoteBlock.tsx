const levelStyles: Record<string, string> = {
  info: "border-l-blue-500 bg-blue-50 text-blue-800",
  tip: "border-l-green-500 bg-green-50 text-green-800",
  warning: "border-l-amber-500 bg-amber-50 text-amber-800",
}

const levelLabels: Record<string, string> = {
  info: "说明",
  tip: "提示",
  warning: "注意",
}

export default function NoteBlock(props: {
  level: "info" | "tip" | "warning"
  body: string
}) {
  return (
    <div
      class={`my-6 border-l-4 p-4 rounded-r-lg ${levelStyles[props.level]}`}
    >
      <h4 class="font-semibold mb-1 text-sm">{levelLabels[props.level]}</h4>
      <div class="text-sm leading-relaxed" innerHTML={props.body} />
    </div>
  )
}