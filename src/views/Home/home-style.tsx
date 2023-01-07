import styled from "styled-components/native"
import { StatusBar, View } from "react-native"
import { R } from "@github/res"
import palette from "@github/res/color/palette"
import { Button } from "@github-shared"

// create a header styled view
export const Header = styled(View)`
  flexdirection: row;
  backgroundcolor: ${palette.black.smoke};
  alignitems: center;
  justifycontent: space-between;
  height: ${R.spacing.headerHeight}px;
  paddinghorizontal: ${R.spacing.smaller}px;
`

// make my own status bar
export const StyledStatusBar = () => (
  <StatusBar animated={true} backgroundColor={R.color.secondaryRipple} />
)

export const StyledCancelButton = styled(Button)`
  padding: ${R.spacing.smaller}px;
`
