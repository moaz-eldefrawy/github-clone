// TODO: Just an example. The endpoint folder should be removed

import {
  HttpMethod,
  IEmptyDataEndpoint,
} from "@github/services/networking/endpoints/endpoint.types"
import { SnakeKeysToCamelCase } from "@github/utils"
import { Api, GITHUB_API_CONFIG } from "@github/services"
import { IGithubServerResponse, IGithubServerUser } from "./github.server"

export type IGithubUser = SnakeKeysToCamelCase<IGithubServerUser>
export type IGithubResponse = SnakeKeysToCamelCase<IGithubServerResponse>

export const githubUsersEndPoint: IEmptyDataEndpoint<IGithubServerResponse, IGithubResponse> = {
  method: HttpMethod.Get,
  path: "/search/users",
} as const

export const githubApi: Api = new Api(GITHUB_API_CONFIG)
