import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { LoginFormData } from '../../../types'
import { login } from '../../../utils/api'
import { Layout } from '../../common/components'
import LoginForm from '../components/LoginForm'
import { usePopup, useLoading } from '../../../context'

const Container = styled.div`
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  padding: 20px;
`

const Title = styled.h1`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
`

const SignupLink = styled.div`
  margin-top: 20px;
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16px;

  a {
    color: #5571ee;
    text-decoration: none;
    font-weight: 500;
    margin-left: 8px;

    &:hover {
      text-decoration: underline;
    }
  }
`

const Login = () => {
  const navigate = useNavigate()
  const { showPopup } = usePopup()
  const { setLoading } = useLoading()

  const handleSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true)
      const response = await login(data)

      if (response.status !== 200) {
        showPopup({
          title: 'Login Failed',
          content: response.message || 'Please check your ID and password.',
        })
        return
      }

      // Store auth token
      localStorage.setItem('auth', response.data.token)

      // Navigate to home
      if (response.data.jarId) {
        navigate(`/master/capsule-box/${response.data.jarId}`)
      } else {
        showPopup({
          title: 'Welcome!',
          content: "Your account has been created, but you don't have a jar yet.",
        })
      }
    } catch (error) {
      showPopup({
        title: 'Error',
        content: 'An unexpected error occurred. Please try again later.',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/')
  }

  return (
    <Layout headerTitle="Login" headerLeftAction={handleBack}>
      <Container>
        <Title>Welcome Back!</Title>
        <LoginForm onSubmit={handleSubmit} />

        <SignupLink>
          Don't have an account?
          <Link to="/signup">Sign up</Link>
        </SignupLink>
      </Container>
    </Layout>
  )
}

export default Login
