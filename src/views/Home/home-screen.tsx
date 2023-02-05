import { View } from "react-native"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Header, StyledStatusBar, HomeScreenStyles } from "@github/views/Home/home-style"
import { Button, Image, SafeAreaView, Screen, Text } from "@github-shared"
import { R } from "@github/res"
import { NavigationService } from "@github/navigation"
import { AppRoute } from "@github/navigation/routes"
import { fetchUsers, fetchUsersSuccess } from "@github/state/ducks/github-users/github-users"
import { getGithubUsers } from "@github/state/ducks/github-users/github-users.selectors"
import { IGithubUsersState } from "@github/state/ducks/github-users/github-users.types"

export const HomeScreen = () => {
  const dispatch = useDispatch()
  const githubUsers: IGithubUsersState = useSelector(getGithubUsers)
  console.log("----------------\n current state -> \n", githubUsers)

  dispatch(
    fetchUsersSuccess([
      {
        id: "1",
        login: "test",
        avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
        htmlUrl: "",
        type: "",
      },
    ]),
  )

  useEffect(() => {
    //
  })
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
          <View />
        </View>
      </SafeAreaView>
    </Screen>
  )
}
