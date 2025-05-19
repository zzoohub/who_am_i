import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import styled, { css } from 'styled-components'

type ButtonSize = 'small' | 'medium' | 'large'
type ButtonVariant = 'primary' | 'secondary' | 'text'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  size?: ButtonSize
  variant?: ButtonVariant
  fullWidth?: boolean
}

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        height: 40px;
        font-size: 16px;
        padding: 0 16px;
      `
    case 'large':
      return css`
        height: 68px;
        font-size: 24px;
        padding: 0 32px;
      `
    case 'medium':
    default:
      return css`
        height: 54px;
        font-size: 20px;
        padding: 0 24px;
      `
  }
}

const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'secondary':
      return css`
        background-color: #e0e0e0;
        color: #333;
        &:hover {
          background-color: #d0d0d0;
        }
        &:disabled {
          background-color: #f0f0f0;
          color: #999;
        }
      `
    case 'text':
      return css`
        background-color: transparent;
        color: #5571ee;
        padding: 0;
        height: auto;
        &:hover {
          text-decoration: underline;
        }
        &:disabled {
          color: #999;
        }
      `
    case 'primary':
    default:
      return css`
        background-color: #5571ee;
        color: white;
        &:hover {
          background-color: #4561de;
        }
        &:disabled {
          background-color: #a0acee;
        }
      `
  }
}

const StyledButton = styled.button<{
  $size: ButtonSize
  $variant: ButtonVariant
  $fullWidth: boolean
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s, color 0.2s;
  width: ${props => (props.$fullWidth ? '100%' : 'auto')};

  &:disabled {
    cursor: not-allowed;
  }

  ${props => getSizeStyles(props.$size)}
  ${props => getVariantStyles(props.$variant)}
`

export const Button = ({
  children,
  size = 'medium',
  variant = 'primary',
  fullWidth = false,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton $size={size} $variant={variant} $fullWidth={fullWidth} {...props}>
      {children}
    </StyledButton>
  )
}

export default Button
