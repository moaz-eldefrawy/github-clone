import { StyleSheet } from "react-native"
import { R } from "@github/res"

export const UserItemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: R.spacing.medium,
  },
  avatar: {
    width: R.spacing.massive,
    height: R.spacing.massive,
    borderRadius: R.spacing.smaller,
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

export const ResultsScreenStyles = StyleSheet.create({
  container: {
    backgroundColor: R.color.secondaryRipple,
    height: R.spacing.fullheight,
    display: "flex",
    justifyContent: "center",
  },
})
