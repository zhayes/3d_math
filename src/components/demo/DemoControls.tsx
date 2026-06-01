import { createSignal, type JSX } from "solid-js";

export interface DemoControlsProps {
  /** Optional title for the control panel (default "Controls") */
  title?: string;
  /** Control widgets rendered inside the panel */
  children: JSX.Element;
}

/**
 * Collapsible control panel for demo parameters.
 * Renders below or beside the 3D viewport with a slide-down toggle.
 */
export default function DemoControls(props: DemoControlsProps) {
  const [open, setOpen] = createSignal(true);

  return (
    <div class="w-full">
      {/* Toggle header */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        class="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <span>{props.title ?? "Controls"}</span>
        <svg
          class="w-4 h-4 transition-transform duration-200"
          classList={{ "rotate-180": open() }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Collapsible content */}
      <div
        class="overflow-hidden transition-all duration-200"
        classList={{
          "max-h-0": !open(),
          "max-h-[600px]": open(),
        }}
      >
        <div class="px-4 py-3 space-y-3 bg-white">{props.children}</div>
      </div>
    </div>
  );
}