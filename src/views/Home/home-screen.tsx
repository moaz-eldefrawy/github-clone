import { View } from "react-native"
import React from "react"
import { Header, StyledStatusBar, HomeScreenStyles } from "@github/views/Home/home-style"
import { Button, Image, SafeAreaView, Screen, Text } from "@github-shared"
import { R } from "@github/res"
import { NavigationService } from "@github/navigation"
import { AppRoute } from "@github/navigation/routes"

export const HomeScreen = () => {
  return (
    <Screen preset="fixedStack">
      <SafeAreaView top bottom>
        <View style={HomeScreenStyles.container}>
          <StyledStatusBar />
          <Header>
            <Text style={HomeScreenStyles.title}>{R.string.home.title}</Text>
            <Button onPress={() => NavigationService.navigate(AppRoute.Search)}>
              <Image source={R.image.search} />
            </Button>
          </Header>
        </View>
      </SafeAreaView>
    </Screen>
  )
}
