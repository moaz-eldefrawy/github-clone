import { errorReducer, errorReducerName, loadingReducer, loadingReducerName } from "./ducks/"
import githubUsersReducer, { githubUsersReducerName } from "./ducks/github-users/github-users"

const reducers = {
  [errorReducerName]: errorReducer,
  [loadingReducerName]: loadingReducer,
  [githubUsersReducerName]: githubUsersReducer,
} as const

export default reducers
