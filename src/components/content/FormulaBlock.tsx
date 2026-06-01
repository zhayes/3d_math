export default function FormulaBlock(props: { latex: string; note?: string }) {
  return (
    <div class="my-6 py-4 px-6 bg-gray-50 rounded-lg border border-gray-200 overflow-x-auto">
      <div class="flex justify-center">
        <span class="text-lg">{`\\(${props.latex}\\)`}</span>
      </div>
      {props.note && (
        <p class="mt-2 text-sm text-gray-500 text-center">{props.note}</p>
      )}
    </div>
  )
}