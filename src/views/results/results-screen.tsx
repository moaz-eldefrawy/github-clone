import React, { useCallback, useEffect, useState } from "react"
import { View, FlatList } from "react-native"
import { useDispatch } from "react-redux"
import {
  githubApi,
  githubUsersEndPoint,
  IGithubResponse,
  IGithubUser,
} from "@github/services/networking/endpoints/github"
import { IResponse } from "@github/services"
import { showErrorAction } from "@github/state"
import { ActivityIndicator, SafeAreaView, Screen } from "@github-shared"
import { StyledStatusBar } from "@github/views/Home/home-style"
import { IRootNavigationProp } from "@github/navigation/root-navigator"
import { AppRoute } from "@github/navigation/routes"
import { ResultsScreenStyles } from "@github/views/results/results-styles"
import { UserItem } from "./user-item"

export interface IResultsProps {
  searchPhrase: string
}

export interface IResultsScreenProps {
  route: { params: IResultsProps }
  navigation: IRootNavigationProp<AppRoute.Results>
}

export const ResultsScreen = (props: IResultsScreenProps) => {
  const { searchPhrase } = props.route.params
  const [searchResults, setSearchResults] = useState<Array<IGithubUser>>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const [currPageToLoad, setCurrPageToLoad] = useState<number>(1)
  const [loadNextPage, setLoadNextPage] = useState<boolean>(true)
  const dispatch = useDispatch()
  const perPage = 30

  // I am not sure why, but timeout can return duplicate users.
  const uniqeUsers = (users: Array<IGithubUser>): Array<IGithubUser> => {
    const userIds: Set<string> = new Set()
    return users.filter((user: IGithubUser) => {
      if (userIds.has(user.id)) {
        return false
      } else {
        userIds.add(user.id)
        return true
      }
    })
  }

  const onEnd = () => {
    // load next page
    setLoadNextPage(true)
  }

  const fetchUsers = useCallback(
    async (phrase: string, page: number) => {
      if (phrase.length === 0) {
        setIsLoading(false)
        setTotalCount(0)
        setSearchResults([])
        return
      }

      const res: IResponse<IGithubResponse> = await githubApi.request(githubUsersEndPoint, {
        pathParams: [phrase, perPage, page],
      })
      if (res.ok) {
        if (res.data.incompleteResults) {
          // this happens due to request timeout by github
          // waiting to get the complete results usually works
          setTimeout(() => fetchUsers(phrase, page), 2000)
          return
        }
        setTotalCount(res.data.totalCount)
        setSearchResults((seachRes: Array<IGithubUser>) =>
          uniqeUsers([...seachRes, ...res.data.items]),
        )
        setCurrPageToLoad(page + 1)
      } else {
        dispatch(
          showErrorAction({
            title: res.problem,
            message: res.error,
          }),
        )
      }
      setIsLoading(false)
    },
    [dispatch],
  )

  useEffect(() => {
    if (loadNextPage && (totalCount === 0 || totalCount > searchResults.length)) {
      setLoadNextPage(false)
      fetchUsers(searchPhrase, currPageToLoad)
    }
  }, [loadNextPage, totalCount, searchResults.length, searchPhrase, currPageToLoad, fetchUsers])

  return (
    <Screen preset="fixedStack">
      <SafeAreaView top bottom>
        <StyledStatusBar />
        <View style={ResultsScreenStyles.container}>
          {isLoading ? (
            <ActivityIndicator preset="large" />
          ) : (
            <FlatList
              data={searchResults}
              renderItem={({ item }) => <UserItem user={item} />}
              keyExtractor={(item) => item.id}
              onEndReached={onEnd}
            />
          )}
        </View>
      </SafeAreaView>
    </Screen>
  )
}
