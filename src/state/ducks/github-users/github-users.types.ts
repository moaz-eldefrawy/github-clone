import { IGithubUser } from "@github/services/networking/endpoints/github";

export enum loadingState {
  Idle,
  Fetching,
  Success,
  Failed,
  Refreshing,
}

export interface IGithubUsersState {
  loadingState: loadingState
  searchString: string
  githubUsers: IGithubUser[]
}
