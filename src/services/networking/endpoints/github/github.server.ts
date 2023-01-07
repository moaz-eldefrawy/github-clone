export interface IGithubServerUser {
  login: string
  html_url: string
  id: string
  avatar_url: string
  type: string
}

export interface IGithubServerResponse {
  incompleteResults: boolean
  items: Array<IGithubServerUser>
  totalCount: number
}
