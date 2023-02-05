import { IAppState } from "@github/state"
import { IGithubUsersState } from "./github-users.types"

export const getGithubUsers = ({ githubUsers }: IAppState): IGithubUsersState => githubUsers
