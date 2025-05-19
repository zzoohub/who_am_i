import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 0 20px;
  background-color: #f5f5f5;
  border-top: 1px solid #f0f0f0;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  color: #888;
`

const Footer = () => {
  return <FooterContainer>© {new Date().getFullYear()} Who am I</FooterContainer>
}

export default Footer
