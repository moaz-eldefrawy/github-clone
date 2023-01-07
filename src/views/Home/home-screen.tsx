import { StyleSheet, View } from "react-native"
import React from "react"
import { Header, StyledStatusBar } from "@github/views/Home/home-style"
import { Button, Image, SafeAreaView, Screen, Text } from "@github-shared"
import { R } from "@github/res"
import { NavigationService } from "@github/navigation"
import { AppRoute } from "@github/navigation/routes"

export const HomeScreen = () => {
  return (
    <Screen preset="fixedStack">
      <SafeAreaView top bottom>
        <View style={styles.container}>
          <StyledStatusBar />
          <Header>
            <Text style={styles.title}>{R.string.home.title}</Text>
            <Button onPress={() => NavigationService.navigate(AppRoute.Search)}>
              <Image source={R.image.search} />
            </Button>
          </Header>
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
  },
  title: {
    fontSize: R.fontSize.bigger,
    fontWeight: "bold",
  },
  header: {
    padding: R.spacing.medium,
  },
})

// create a component that renders the results coming from github user search api
// Path: src\views\search\search-results.tsx
// Compare this snippet from src\views\search\search-screen.tsx:
