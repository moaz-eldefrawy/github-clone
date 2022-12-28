import styled, { css } from "styled-components/native"
import { PressableAndroidRippleConfig, StyleSheet } from "react-native"
import { R } from "@github/res"
import { Column } from "@github-shared/layout"
import { IButtonProps, ButtonPreset, RipplePreset } from "./button.props"

export const Container = styled(Column)`
  border-radius: ${R.spacing.tiny}px;
  overflow: hidden;
`

const circular = css`
  width: ${R.layout.circularButtonDimension}px;
  height: ${R.layout.circularButtonDimension}px;
  border-radius: ${R.layout.circularButtonDimension / 2}px;
  overflow: hidden;
`

const circularSmall = css`
  width: ${R.layout.circularSmallButtonDimension}px;
  height: ${R.layout.circularSmallButtonDimension}px;
  border-radius: ${R.layout.circularSmallButtonDimension / 2}px;
  overflow: hidden;
`

export const StyledButton = styled.Pressable<IButtonProps>`
  justify-content: center;
  align-items: center;
  ${({ preset = "default" }) => css`
    ${preset === "circular" && circular}
    ${preset === "circular-small" && circularSmall}
  `}
`

export const getRippleConfig = (
  preset: ButtonPreset,
  ripplePreset: RipplePreset,
): PressableAndroidRippleConfig => {
  return {
    radius:
      preset === "circular"
        ? R.layout.circularButtonDimension / 2
        : preset === "circular-small"
        ? R.layout.circularSmallButtonDimension / 2
        : undefined,
    color: ripplePreset === "secondary" ? R.color.secondaryRipple : R.color.ripple,
    borderless: false,
  }
}

export const styles = StyleSheet.create({
  pressedState: {
    opacity: 0.5,
  },
})
