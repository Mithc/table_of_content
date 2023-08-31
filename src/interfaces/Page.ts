export interface Page {
    id: string
    title: string
    url: string
    level: number
    parentId?: string
    pages?: string[] // List of nested pages ids
    anchors?: number[] // List of anchor ids
    tabIndex?: number // Ignore
    disqus_id?: number // Ignore
}

export interface PageListResponse {
    pages: PageList
}

export interface PageList {
    [key: string]: Page
}
