import { createSignal, JSX } from "solid-js"
import Sidebar from "./Sidebar"
import TopNav from "./TopNav"

export default function AppShell(props: { children?: JSX.Element }) {
  const [mobileOpen, setMobileOpen] = createSignal(false)
  const [collapsed, setCollapsed] = createSignal(false)

  function toggleCollapse() {
    setCollapsed((prev) => !prev)
  }

  return (
    <div class="flex min-h-screen">
      {/* Mobile overlay */}
      <div
        class={`fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity ${
          mobileOpen()
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        class={`fixed inset-y-0 left-0 z-30 bg-gray-900 text-white transform transition-all duration-300 md:sticky md:top-0 md:h-screen ${
          mobileOpen() ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 ${
          collapsed() ? "w-[52px]" : "w-[280px]"
        }`}
      >
        <Sidebar collapsed={collapsed} onToggle={toggleCollapse} />
      </aside>

      {/* Main content area */}
      <div class="flex flex-1 flex-col min-w-0">
        <header class="h-14 border-b bg-white px-4 md:px-6 flex items-center gap-4 sticky top-0 z-10">
          {/* Hamburger button - visible only on mobile */}
          <button
            class="md:hidden p-1 rounded hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open sidebar"
            type="button"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop sidebar toggle */}
          <button
            class="hidden md:block p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500"
            onClick={toggleCollapse}
            title={collapsed() ? "展开侧边栏" : "折叠侧边栏"}
            type="button"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <TopNav />
        </header>
        <main class="flex-1">{props.children}</main>
      </div>
    </div>
  )
}