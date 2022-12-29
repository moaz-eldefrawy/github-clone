// TODO: Just an example. The endpoint folder should be removed

import { HttpMethod, IParamsEndpoint } from "@github/services/networking/endpoints/endpoint.types"
import { SnakeKeysToCamelCase } from "@github/utils"
import { Api, GITHUB_API_CONFIG } from "@github/services"
import { IGithubServerResponse, IGithubServerUser } from "./github.server"

export type IGithubUser = SnakeKeysToCamelCase<IGithubServerUser>
export type IGithubResponse = SnakeKeysToCamelCase<IGithubServerResponse>

type GetGithubUserPathParams = [string, number, number]

export const githubUsersEndPoint: IParamsEndpoint<
  IGithubServerResponse,
  GetGithubUserPathParams,
  IGithubResponse
> = {
  method: HttpMethod.Get,
  path: "/search/users?q=%s&&per_page=%s&&page=%s",
} as const

export const githubApi: Api = new Api(GITHUB_API_CONFIG)
