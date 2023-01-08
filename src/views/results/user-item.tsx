// create a user item component
// Path: src\views\Home\user-item.tsx
// Compare this snippet from src\views\search\search-screen.tsx:

import React from "react"
import { View } from "react-native"
import { UserItemStyles } from "@github/views/results/results-styles"
import { Image, Text } from "@github-shared"
import { IGithubUser } from "@github/services/networking/endpoints/github"

// create a component that renders the results coming from github user search api

// create proprs for UserItem component
export interface IUserItemProps {
  user: IGithubUser
}

export const UserItem = ({ user }: IUserItemProps) => {
  return (
    <View style={UserItemStyles.container}>
      <Image source={{ uri: user.avatarUrl }} style={UserItemStyles.avatar} />
      <View style={UserItemStyles.info}>
        <Text style={UserItemStyles.name}>{user.login}</Text>
        <Text style={UserItemStyles.bio}>{`${user.type}`}</Text>
      </View>
    </View>
  )
}
