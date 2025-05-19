import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../components'
import { motion } from 'framer-motion'
import { isLoggedIn } from '../../../utils/helpers/general'
import { useUser } from '../../../hooks'

const SplashContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
`

const Logo = styled(motion.div)`
  font-family: 'BitBit', sans-serif;
  font-size: 48px;
  margin-bottom: 60px;
  color: #5571ee;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  margin-top: 40px;
`

const SplashButton = styled(motion.button)`
  width: 100%;
  height: 68px;
  border-radius: 20px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 20px;
  font-weight: 500;
  border: none;
  cursor: pointer;

  &.login {
    background-color: #5571ee;
    color: white;
  }

  &.signup {
    background-color: #f0f0f0;
    color: #333;
  }
`

const Splash = () => {
  const navigate = useNavigate()
  const { data: userData } = useUser()

  useEffect(() => {
    // If user is already logged in, navigate to their jar
    if (userData?.jarId) {
      navigate(`/master/capsule-box/${userData.jarId}`)
    }
  }, [userData, navigate])

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleSignupClick = () => {
    navigate('/signup')
  }

  return (
    <Layout hasHeader={false} isContentCentered>
      <SplashContainer>
        <Logo initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          Who am I
        </Logo>

        <ButtonContainer>
          <SplashButton
            className="login"
            onClick={handleLoginClick}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            Login
          </SplashButton>

          <SplashButton
            className="signup"
            onClick={handleSignupClick}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            Signup
          </SplashButton>
        </ButtonContainer>
      </SplashContainer>
    </Layout>
  )
}

export default Splash
