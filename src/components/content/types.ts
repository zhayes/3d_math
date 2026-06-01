export type Block =
  | { type: 'text'; html: string }
  | { type: 'definition'; title: string; body: string }
  | { type: 'formula'; latex: string; note?: string }
  | { type: 'note'; level: 'info' | 'tip' | 'warning'; body: string }
  | { type: 'demo'; demoId: string }
  | { type: 'code'; language: string; code: string }
  | { type: 'illustration'; svg: string; caption?: string; width?: number; height?: number }
  | { type: 'intro' }
  | { type: 'derivation'; title: string; intro?: string; steps: { latex: string; note: string; insight?: string; diagram?: string }[] }

export interface Section {
  title: string
  blocks: Block[]
}

export interface ChapterContent {
  id: string
  title: string
  sections: Section[]
}