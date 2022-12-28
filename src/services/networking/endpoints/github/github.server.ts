export interface IGithubServerUser {
  login: string
  html_url: string
  id: string
}

export interface IGithubServerResponse {
  incompleteResults: boolean
  items: Array<IGithubServerUser>
  totalCount: number
}
