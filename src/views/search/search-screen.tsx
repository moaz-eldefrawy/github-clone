import React, { useState, useEffect, useCallback } from "react"
import {
  FlatList,
  ListRenderItem,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from "react-native"
import { useDispatch } from "react-redux"
import { Header, StyledCancelButton, StyledStatusBar } from "@github/views/Home/home-style"
import { ActivityIndicator, Button, Image, SafeAreaView, Screen, Text } from "@github-shared"
import { IResponse } from "@github/services"
import {
  IGithubUser,
  IGithubResponse,
  githubApi,
  githubUsersEndPoint,
} from "@github/services/networking/endpoints/github"
import { showErrorAction } from "@github/state"
import { R } from "@github/res"
import { NavigationService } from "@github/navigation"

export const SearchScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState<string>("")
  const [searchResults, setSearchResults] = useState<Array<IGithubUser>>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [currPage, setCurrPage] = useState<number>(0)
  const [nextPage, setNextPage] = useState<number>(1)
  const [isFocused, setIsFocused] = useState<Boolean>(false)
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

  const handleSubmit = (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    event.preventDefault()
    setSearchResults([])
    setCurrPage(1)
    setNextPage(1)
    setTotalCount(0)
    if (searchPhrase.length > 0) {
      setIsLoading(true)
    }
  }

  const onEnd = () => {
    setCurrPage(nextPage)
  }

  const clearInput = () => {
    setSearchPhrase("")
  }

  const renderItem: ListRenderItem<IGithubUser> = ({ item }) => {
    return (
      <Button style={[styles.item]}>
        <Text>{item.login}</Text>
      </Button>
    )
  }

  useEffect(() => {
    if (currPage === nextPage && (totalCount > searchResults.length || totalCount === 0)) {
      setNextPage(nextPage + 1)
      fetchUsers(searchPhrase, currPage)
    }
  }, [searchPhrase, currPage, nextPage, totalCount, searchResults.length, fetchUsers, isFocused])

  return (
    <Screen preset="fixedStack">
      <SafeAreaView top bottom>
        <StyledStatusBar />
        <View style={styles.container}>
          <Header style={styles.searchBarView}>
            <Button onPress={() => NavigationService.goBack()}>
              <Image source={R.image.backAndroid} />
            </Button>
            <View style={[styles.inputView, isFocused && styles.activeInput]}>
              <TextInput
                placeholderTextColor={R.color.textInputPlaceholder}
                onFocus={() => setIsFocused(true)}
                style={styles.input}
                onBlur={() => setIsFocused(false)}
                placeholder={R.string.search.placeholder}
                value={searchPhrase}
                onChangeText={setSearchPhrase}
                onSubmitEditing={handleSubmit}
              />
              <StyledCancelButton onPress={clearInput}>
                <Image source={R.image.cancel} />
              </StyledCancelButton>
            </View>
          </Header>
          <View style={styles.resultsView}>
            {isLoading ? (
              <ActivityIndicator preset="large" />
            ) : (
              <FlatList
                data={searchResults}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                onEndReached={onEnd}
              />
            )}
          </View>
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
  item: {
    paddingVertical: R.spacing.medium,
  },
  inputView: {
    flex: 8,
    height: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: R.spacing.medium,
  },
  input: {
    color: R.color.text,
    fontSize: R.fontSize.big,
  },
  activeInput: {
    borderBottomWidth: 1,
    borderBottomColor: R.color.ripple,
  },
  searchBarView: {},
  resultsView: {
    flex: 10,
    justifyContent: "center",
  },
})
