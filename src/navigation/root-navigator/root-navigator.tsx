import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { AppRoute } from "@github/navigation/routes"
import { SearchScreen } from "@github/views/search/search-screen"
import { IRootParamList } from "./root-navigator.types"

const RootStack = createStackNavigator<IRootParamList>()

const RootNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName={AppRoute.Search} screenOptions={{ headerShown: true }}>
      <RootStack.Screen name={AppRoute.Search} component={SearchScreen} />
      {/* <RootStack.Group screenOptions={{ presentation: "modal" }}>
        {// any modal screen  }
      </RootStack.Group> */}
    </RootStack.Navigator>
  )
}

export default RootNavigator
