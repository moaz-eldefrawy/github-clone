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
import { Button, SafeAreaView, Text } from "@github-shared"
import { IResponse } from "@github/services"
import {
  IGithubUser,
  IGithubResponse,
  githubApi,
  githubUsersEndPoint,
} from "@github/services/networking/endpoints/github"
import { showErrorAction } from "@github/state"

export const SearchComponent = () => {
  const [searchPhrase, setSearchPhrase] = useState<string>("")
  const [searchResults, setSearchResults] = useState<Array<IGithubUser>>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [currPage, setCurrPage] = useState<number>(0)
  const [nextPage, setNextPage] = useState<number>(1)
  const dispatch = useDispatch()
  const perPage = 30

  // timeout can return duplicate users
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

  // can be moved to another (API) folder for reuse.
  const fetchUsers = useCallback(
    async (phrase: string, page: number) => {
      const res: IResponse<IGithubResponse> = await githubApi.request(githubUsersEndPoint, {
        pathParams: [phrase, perPage, page],
      })
      if (res.ok) {
        if (res.data.incompleteResults) {
          // TODO: one of 2 options depeding on the requirements
          // 1- ignore if missing the reuslt doesn't matter
          // 2- repeat for a fixed ammount of times (i.e 5) until we get complete results
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
  }

  const onEnd = () => {
    setCurrPage(nextPage)
  }

  const renderItem: ListRenderItem<IGithubUser> = ({ item }) => {
    return (
      <Button style={[styles.item]}>
        <Text style={[styles.title]}>{item.login}</Text>
      </Button>
    )
  }

  useEffect(() => {
    if (currPage === nextPage && (totalCount > searchResults.length || totalCount === 0)) {
      setNextPage(nextPage + 1)
      fetchUsers(searchPhrase, currPage)
    }
  }, [searchPhrase, currPage, nextPage, totalCount, searchResults.length, fetchUsers])

  return (
    <SafeAreaView top bottom>
      <View>
        <TextInput
          placeholderTextColor="grey"
          style={styles.input}
          placeholder="Search Github Users..."
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onSubmitEditing={handleSubmit}
          // clearButtonMode={"while-editing"}
        />
      </View>
      <View>
        {isLoading ? (
          <Text>Loading ..</Text>
        ) : (
          <FlatList
            data={searchResults}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            onEndReached={onEnd}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    paddingTop: 20,
  },
  item: {
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    color: "black",
    display: "flex",
  },
  input: {
    borderBottomColor: "white",
    fontSize: 20,
    borderWidth: 1,
    color: "black",
  },
})
