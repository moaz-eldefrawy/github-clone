import { StyleSheet } from "react-native"
import { R } from "@github/res"

export const SearchItemStyles = StyleSheet.create({
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
