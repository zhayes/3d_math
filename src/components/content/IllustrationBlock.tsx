export default function IllustrationBlock(props: {
  svg: string
  caption?: string
  width?: number
  height?: number
}) {
  return (
    <figure class="my-8 flex flex-col items-center">
      <div
        class="w-full max-w-2xl bg-white border border-gray-200 rounded-xl p-4 shadow-sm overflow-x-auto"
        style={{
          "max-width": props.width ? `${props.width}px` : undefined,
          "min-height": props.height ? `${props.height}px` : undefined,
        }}
        innerHTML={props.svg}
      />
      {props.caption && (
        <figcaption class="mt-3 text-sm text-gray-500 text-center italic">
          {props.caption}
        </figcaption>
      )}
    </figure>
  )
}