export default function TheoremBox(props: { title: string; body: string }) {
  return (
    <div class="my-6 border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
      <h4 class="font-semibold text-blue-900 mb-2">{props.title}</h4>
      <div class="text-blue-800 text-sm leading-relaxed" innerHTML={props.body} />
    </div>
  )
}