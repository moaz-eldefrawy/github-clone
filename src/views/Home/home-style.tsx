import styled from "styled-components/native"
import { StatusBar, StyleSheet, View } from "react-native"
import React from "react"
import { R } from "@github/res"
import palette from "@github/res/color/palette"
import { Button } from "@github-shared"

// create a header styled view
export const Header = styled(View)`
  flexDirection: row;
  backgroundColor: ${palette.black.smoke};
  alignItems: center;
  justifyContent: space-between;
  height: ${R.spacing.headerHeight}px;
  paddingHorizontal: ${R.spacing.smaller}px;
`

// make my own status bar
export const StyledStatusBar = () => (
  <StatusBar animated={true} backgroundColor={R.color.secondaryRipple} />
)

export const StyledCancelButton = styled(Button)`
  padding: ${R.spacing.smaller}px;
`

export const HomeScreenStyles = StyleSheet.create({
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