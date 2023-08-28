export interface Page {
  id: string
  title: string
  url: string
  level: number
  parentId?: number
  pages?: number[] // List of nested pages ids
  anchors?: number[] // List of anchor ids
  tabIndex: number // Ignore
  disqus_id: number // Ignore
}
