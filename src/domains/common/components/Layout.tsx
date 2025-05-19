import React, { ReactNode } from 'react'
import styled from 'styled-components'
import Header from './Header'
import Footer from './Footer'
import Loading from './Loading'
import Popup from './Popup'

const Container = styled.div`
  max-width: 575px;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background-color: #fff;
`

const Content = styled.main<{ $isContentCentered?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  ${props =>
    props.$isContentCentered &&
    `
    justify-content: center;
    align-items: center;
  `}
  padding: 20px;
  overflow-y: auto;
`

interface LayoutProps {
  children: ReactNode
  hasHeader?: boolean
  hasFooter?: boolean
  headerTitle?: string
  isContentCentered?: boolean
  headerLeftAction?: () => void
  headerRightAction?: () => void
}

const Layout = ({
  children,
  hasHeader = true,
  hasFooter = false,
  headerTitle,
  isContentCentered = false,
  headerLeftAction,
  headerRightAction,
}: LayoutProps) => {
  return (
    <Container>
      {hasHeader && <Header title={headerTitle} onLeftClick={headerLeftAction} onRightClick={headerRightAction} />}
      <Content $isContentCentered={isContentCentered}>{children}</Content>
      {hasFooter && <Footer />}
      <Loading />
      <Popup />
    </Container>
  )
}

export default Layout
