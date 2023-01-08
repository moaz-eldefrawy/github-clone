import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { AppRoute } from "@github/navigation/routes"
import { SearchScreen } from "@github/views/search/search-screen"
import { HomeScreen } from "@github/views/Home/home-screen"
import { ResultsScreen } from "@github/views/results/results-screen"
import { IRootParamList } from "./root-navigator.types"

const RootStack = createStackNavigator<IRootParamList>()

const RootNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName={AppRoute.Home} screenOptions={{ headerShown: false }}>
      <RootStack.Screen name={AppRoute.Search} component={SearchScreen} />
      <RootStack.Screen name={AppRoute.Home} component={HomeScreen} />
      <RootStack.Screen name={AppRoute.Results} component={ResultsScreen} />
      {/* <RootStack.Group screenOptions={{ presentation: "modal" }}>
        {// any modal screen  }
      </RootStack.Group> */}
    </RootStack.Navigator>
  )
}

export default RootNavigator
