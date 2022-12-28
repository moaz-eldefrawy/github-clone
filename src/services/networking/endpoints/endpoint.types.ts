import { ResponseType as APIResponseType } from "axios"
import { SnakeKeysToCamelCase } from "@github/utils"

export enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE",
}

export type IMapper<D, T> = (data: D) => T

type DefaultResponseType<T> = SnakeKeysToCamelCase<T>

export type UndefinedDataType = undefined
export type UndefinedPathParamsType = undefined[]
export type UndefinedServerResponseType = undefined

export type DefaultPathParamsType = [number]

export type DefaultEndpointData<T> = SnakeKeysToCamelCase<T>

/**
 * General Endpoint
 */
export interface IEndpoint<TServerData, TServerResponse, TPathParams, TData, TResponse> {
  path: string
  method: HttpMethod
  pathParams?: TPathParams // Mutable additional url path parameters (eg. document ID) will be added at the end of the endpoint path.
  data?: TData
  mapper?: IMapper<TServerResponse, TResponse>
  dataMapper?: IMapper<TData, TServerData>
  response?: TResponse
  responseType?: APIResponseType
}

/**
 * Endpoint with body data and path params
 */
export type IDataParamsEndpoint<
  TServerData,
  TServerResponse,
  TPathParams = DefaultPathParamsType,
  TData = DefaultEndpointData<TServerData>,
  TResponse = DefaultResponseType<TServerResponse>,
> = IEndpoint<TServerData, TServerResponse, TPathParams, TData, TResponse>

/**
 * Endpoint with path params only
 */
export type IParamsEndpoint<
  TServerResponse,
  TPathParams = DefaultPathParamsType,
  TResponse = DefaultResponseType<TServerResponse>,
> = IEndpoint<UndefinedDataType, TServerResponse, TPathParams, UndefinedDataType, TResponse>

/**
 * Endpoint with body data only
 */
export type IDataEndpoint<
  TServerData,
  TServerResponse,
  TData = DefaultEndpointData<TServerData>,
  TResponse = DefaultResponseType<TServerResponse>,
> = IEndpoint<TServerData, TServerResponse, UndefinedPathParamsType, TData, TResponse>

/**
 * Endpoint with path params only and its ok response is empty
 */
export type IParamsEmptyResponseEndpoint<TPathParams = DefaultPathParamsType> = IParamsEndpoint<
  UndefinedDataType,
  TPathParams
>

/**
 * Endpoint without body data and path params
 */
export type IEmptyDataEndpoint<
  TServerResponse,
  TResponse = DefaultResponseType<TServerResponse>,
> = IParamsEndpoint<TServerResponse, UndefinedPathParamsType, TResponse>

/**
 * Endpoint without body data, path params and response
 */
export type IEmptyEndpoint = IEmptyDataEndpoint<UndefinedServerResponseType>
