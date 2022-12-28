import { ENV } from "@github/config"
import { ApiConstants } from "./api.constants"

/**
 * The options used to configure the API.
 */
export interface IApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Minimum timeout for request. It will be use for exponential back-off retry mechanism
   */
  minimumTimeout: number
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: IApiConfig = {
  url: ENV.baseURL,
  minimumTimeout: ApiConstants.requestTimeout,
}

export const GITHUB_API_CONFIG: IApiConfig = {
  url: "https://api.github.com",
  minimumTimeout: ApiConstants.requestTimeout,
}
