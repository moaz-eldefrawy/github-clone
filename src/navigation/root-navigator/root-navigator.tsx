import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { AppRoute } from "@github/navigation/routes"
import { SearchComponent } from "@github/components"
import { IRootParamList } from "./root-navigator.types"

const RootStack = createStackNavigator<IRootParamList>()

const RootNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName={AppRoute.Search} screenOptions={{ headerShown: true }}>
      <RootStack.Screen name={AppRoute.Search} component={SearchComponent} />
      {/* <RootStack.Group screenOptions={{ presentation: "modal" }}>
        {// any modal screen  }
      </RootStack.Group> */}
    </RootStack.Navigator>
  )
}

export default RootNavigator
