import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { LoginFormData } from '../../../types'
import { Button } from '../../common/components'

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #333;
`

const Input = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #ddd;
  padding: 0 15px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #5571ee;
  }

  &::placeholder {
    color: #bbb;
  }
`

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 4px;
`

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void
  isLoading?: boolean
}

const LoginForm = ({ onSubmit, isLoading = false }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label htmlFor="id">ID</Label>
        <Input
          type="text"
          id="id"
          placeholder="Enter your ID"
          {...register('id', {
            required: 'ID is required',
          })}
        />
        {errors.id && <ErrorMessage>{errors.id.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="Enter your password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
      </FormGroup>

      <Button type="submit" disabled={isLoading} fullWidth size="large">
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </Form>
  )
}

export default LoginForm
