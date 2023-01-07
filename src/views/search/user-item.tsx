// create a user item component
// Path: src\views\Home\user-item.tsx
// Compare this snippet from src\views\search\search-screen.tsx:

import React from "react"
import { StyleSheet, View } from "react-native"
import { Image, Text } from "@github-shared"
import { IGithubUser } from "@github/services/networking/endpoints/github"
import { R } from "@github/res"

// create a component that renders the results coming from github user search api

// create proprs for UserItem component
export interface IUserItemProps {
  user: IGithubUser
}

export const UserItem = ({ user }: IUserItemProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{user.login}</Text>
        <Text style={styles.bio}>{`${user.type}`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: R.spacing.medium,
  },
  avatar: {
    width: R.spacing.huge,
    height: R.spacing.huge,
    borderRadius: R.spacing.huge / 2,
  },
  info: {
    marginLeft: R.spacing.medium,
    justifyContent: "center",
  },
  name: {
    fontSize: R.fontSize.big,
    fontWeight: "bold",
  },
  bio: {
    fontSize: R.fontSize.medium,
  },
})
