import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faGear } from '@fortawesome/free-solid-svg-icons'

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 20px;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
`

const Title = styled.h1`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;

  &:disabled {
    color: #ccc;
    cursor: default;
  }
`

interface HeaderProps {
  title?: string
  onLeftClick?: () => void
  onRightClick?: () => void
  hideLeftButton?: boolean
  hideRightButton?: boolean
}

const Header = ({ title, onLeftClick, onRightClick, hideLeftButton = false, hideRightButton = true }: HeaderProps) => {
  return (
    <HeaderContainer>
      {!hideLeftButton && (
        <IconButton onClick={onLeftClick}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </IconButton>
      )}
      {title && <Title>{title}</Title>}
      {!hideRightButton && (
        <IconButton onClick={onRightClick}>
          <FontAwesomeIcon icon={faGear} />
        </IconButton>
      )}
    </HeaderContainer>
  )
}

export default Header
