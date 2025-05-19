import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { SignupFormData } from '../../../types'
import { signup } from '../../../utils/api'
import { Layout } from '../../common/components'
import SignupForm from '../components/SignupForm'
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

const LoginLink = styled.div`
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

const Signup = () => {
  const navigate = useNavigate()
  const { showPopup } = usePopup()
  const { setLoading } = useLoading()

  const handleSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true)
      const response = await signup(data)

      if (response.status !== 200) {
        showPopup({
          title: 'Signup Failed',
          content: response.message || 'An error occurred during signup.',
        })
        return
      }

      showPopup({
        title: 'Account Created',
        content: 'Your account has been created successfully! Please log in.',
        onConfirm: () => navigate('/login'),
      })
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
    <Layout headerTitle="Sign Up" headerLeftAction={handleBack}>
      <Container>
        <Title>Create Account</Title>
        <SignupForm onSubmit={handleSubmit} />

        <LoginLink>
          Already have an account?
          <Link to="/login">Log in</Link>
        </LoginLink>
      </Container>
    </Layout>
  )
}

export default Signup
