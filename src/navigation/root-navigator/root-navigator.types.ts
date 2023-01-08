import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppRoute } from "@github/navigation/routes"
import { IResultsProps } from "@github/views/results/results-screen"

export type IRootParamList = {
  [AppRoute.Search]: undefined
  [AppRoute.Home]: undefined
  [AppRoute.Results]: IResultsProps
}

type IRootRoute = keyof IRootParamList

export type IRootNavigationProp<R extends IRootRoute> = StackNavigationProp<IRootParamList, R>
export type IRootRoutProp<R extends IRootRoute> = RouteProp<IRootParamList, R>
