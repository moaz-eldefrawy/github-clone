import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { StyleSheet, Text, View } from "react-native"
import { AppRoute } from "@github/navigation/routes"
import { SearchScreen } from "@github/views/search/search-screen"
import { Button, SafeAreaView, Screen } from "@github-shared"
import { R } from "@github/res"
import NavigationService from "@github/navigation/navigation-service"
import { IRootParamList } from "./root-navigator.types"

const RootStack = createStackNavigator<IRootParamList>()

function HomeScreen() {
  return (
    <Screen preset="fixedStack">
      <SafeAreaView top bottom>
        <View style={styles.container}>
          <Button
            style={styles.button}
            onPress={() => {
              return NavigationService.navigate(AppRoute.Search)
            }}>
            <Text style={styles.buttonText}>{R.string.search.title}</Text>
          </Button>
        </View>
      </SafeAreaView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: R.color.background,
    height: R.spacing.fullheight,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: R.color.background,
  },
  buttonText: {
    color: R.color.text,
    fontSize: R.fontSize.large,
    backgroundColor: R.color.background,
  },
})

const RootNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName={AppRoute.Home} screenOptions={{ headerShown: false }}>
      <RootStack.Screen name={AppRoute.Search} component={SearchScreen} />
      <RootStack.Screen name={AppRoute.Home} component={HomeScreen} />
      {/* <RootStack.Group screenOptions={{ presentation: "modal" }}>
        {// any modal screen  }
      </RootStack.Group> */}
    </RootStack.Navigator>
  )
}

export default RootNavigator
