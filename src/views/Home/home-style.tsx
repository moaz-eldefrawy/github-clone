import styled from "styled-components/native"
import { StatusBar, View } from "react-native"
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
