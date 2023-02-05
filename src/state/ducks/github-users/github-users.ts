import { IGithubUser } from "@github/services/networking/endpoints/github"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ILoadingState } from "../ducks.types"
import { IGithubUsersState, loadingState } from "./github-users.types"


// create initial state
const initialState: IGithubUsersState = {
  loadingState: loadingState.Idle,
  searchString: "",
  githubUsers: []
}

export const GithubUsersSlice = createSlice({
  name: "githubUsers",
  initialState,
  reducers: {
    fetchUsers: (state, action: PayloadAction<string>) => {
      state.loadingState = loadingState.Fetching
      state.searchString = action.payload
    },

    fetchUsersSuccess: (state, action: PayloadAction<IGithubUser[]>) => {
      state.loadingState = loadingState.Success
      state.githubUsers = action.payload
    },

    fetchUsersFailed: (state) => {
      state.loadingState = loadingState.Failed
    },
  },
})

export const { fetchUsers, fetchUsersSuccess, fetchUsersFailed } = GithubUsersSlice.actions
export const githubUsersReducerName = GithubUsersSlice.name
export default GithubUsersSlice.reducer
