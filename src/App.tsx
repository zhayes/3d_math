import { Route, useParams } from "@solidjs/router";
import { createSignal, createResource, Show, For } from "solid-js";
import AppShell from "./components/layout/AppShell";
import ChapterViewer from "./components/content/ChapterViewer";
import type { ChapterContent } from "./components/content/types";
import { chapters } from "./chapters";

function Home() {
  return (
    <main class="flex-1 overflow-y-auto bg-gray-50">
      <div class="max-w-4xl mx-auto py-16 px-6">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            3D 数学基础
          </h1>
          <p class="text-lg text-gray-600">
            图形与游戏开发 — 交互式学习指南
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <For each={chapters}>
            {(ch) => (
              <a
                href={`/chapters/${ch.id}`}
                class="block p-5 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
              >
                <span class="text-xs font-bold text-indigo-500">
                  第 {ch.id} 章
                </span>
                <h3 class="mt-1 font-semibold text-gray-900">{ch.title}</h3>
                <p class="mt-1 text-sm text-gray-500">{ch.description}</p>
              </a>
            )}
          </For>
        </div>
      </div>
    </main>
  );
}

function ChapterPage() {
  const params = useParams<{ id: string }>();

  // Load chapter content dynamically
  const [content] = createResource(
    () => params.id,
    async (id): Promise<ChapterContent | null> => {
      try {
        const mod = await import(
          /* @vite-ignore */ `./chapters/chapter-${id.padStart(2, "0")}/content`
        );
        return mod.default;
      } catch {
        return null;
      }
    },
  );

  return (
    <div class="flex-1 overflow-y-auto">
      <Show
        when={content()}
        fallback={
          <div class="flex items-center justify-center h-full text-gray-400">
            加载中...
          </div>
        }
      >
        <Show
          when={content() ?? undefined}
          fallback={
            <div class="flex items-center justify-center h-full text-gray-500 p-8 text-center">
              <div>
                <p class="text-lg font-medium">章节内容尚未编写</p>
                <p class="text-sm mt-2">
                  第 {params.id} 章的内容正在建设中
                </p>
              </div>
            </div>
          }
        >
          {(c) => <ChapterViewer content={c()} />}
        </Show>
      </Show>
    </div>
  );
}

export default function App() {
  return (
    <Route path="/" component={AppShell}>
      <Route path="/" component={Home} />
      <Route path="/chapters/:id" component={ChapterPage} />
    </Route>
  );
}