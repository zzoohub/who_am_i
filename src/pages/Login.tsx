import LoginForm from '../components/auth/LoginForm'
import Layout from '../components/common/Layout'
import Scaffold from '../components/common/UI/Scaffold'
import Logo from '../components/common/UI/Logo'
import Box from '../components/common/UI/Box'
import { styled } from 'styled-components'
import FlexBox from '../components/common/UI/FlexBox'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import React, { useCallback } from 'react'

const Em = styled.span`
  color: #fff;
  font-size: 24px;
  font-family: 'Noto Sans Kr';
  font-style: normal;
  font-weight: 300;
  text-align: center;
  margin-top: 10px;
`

const Span = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 20px;
  font-family: Noto Sans Kr;
  font-style: normal;
  font-weight: 300;
  line-height: 167.023%;
`

const Button = styled.div`
  color: #fff;
  font-size: 20px;
  font-family: Noto Sans Kr;
  font-style: normal;
  font-weight: 300;
  line-height: 167.023%;
  text-decoration-line: underline;
`

const Login = () => {
  const navigate = useNavigate()
  const [qs, setQs] = useSearchParams()
  const goToSignup = useCallback(() => {
    if (qs.get('jarId')) return navigate(`/signup?jarId=${qs.get('jarId')}`)
    navigate('/signup')
  }, [qs])

  return (
    <Layout bgColor="dark">
      <Scaffold style={{ justifyContent: 'space-between' }}>
        <FlexBox direction="column" style={{ marginTop: '5vh' }}>
          <Logo width="70%" />
          <Em>누가 나한테 편지를 썼을까?</Em>
        </FlexBox>

        <FlexBox direction="column">
          <LoginForm />
          <FlexBox
            direction="row"
            style={{
              justifyContent: 'space-between',
              marginTop: '20px',
              padding: '0px 10px',
            }}
          >
            <Span>편지를 받아보고 싶나요?</Span>
            <Button onClick={goToSignup}>회원가입</Button>
          </FlexBox>
        </FlexBox>
      </Scaffold>
    </Layout>
  )
}

export default React.memo(Login)
