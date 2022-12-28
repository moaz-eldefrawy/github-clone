import styled, { css } from "styled-components/native"
import { StyleSheet } from "react-native"
import { R } from "@github/res"
import { Container, ScrollContainer } from "@github-shared/layout"
import { IFixedScreenProps, IScrollScreenProps } from "./screen.props"

const screen = css`
  flex: 1;
  flex-direction: column;
  background-color: ${R.color.transparent};
`

export const StyledFixedScreen = styled(Container)<IFixedScreenProps>`
  ${screen}
  ${({ preset }) => css`
    justify-content: ${preset === "fixedCenter" ? "center" : "flex-start"};
    align-items: ${preset === "fixed" ? "flex-start" : "stretch"};
  `}
`

export const StyledScrollScreen = styled(ScrollContainer)<IScrollScreenProps>`
  ${screen}
`

export const styles = StyleSheet.create({
  stackContent: {
    alignItems: "stretch",
  },
})
