import React, { useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { SignupFormData } from '../../../types'
import { Button } from '../../common/components'
import { checkDuplicate } from '../../../utils/api'

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

const SuccessMessage = styled.p`
  color: #27ae60;
  font-size: 14px;
  margin-top: 4px;
`

const CheckButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  border-radius: 10px;
  padding: 8px 16px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  margin-top: 8px;
  align-self: flex-start;

  &:hover {
    background-color: #e0e0e0;
  }

  &:disabled {
    background-color: #f8f8f8;
    color: #aaa;
    cursor: not-allowed;
  }
`

interface SignupFormProps {
  onSubmit: (data: SignupFormData) => void
  isLoading?: boolean
}

const SignupForm = ({ onSubmit, isLoading = false }: SignupFormProps) => {
  const [idChecked, setIdChecked] = useState(false)
  const [nicknameChecked, setNicknameChecked] = useState(false)
  const [checkingId, setCheckingId] = useState(false)
  const [checkingNickname, setCheckingNickname] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignupFormData>()

  const id = watch('id')
  const nickname = watch('nickname')
  const password = watch('password')

  const handleIdCheck = async () => {
    if (!id || id.length < 4) {
      setError('id', { message: 'ID must be at least 4 characters' })
      return
    }

    try {
      setCheckingId(true)
      const response = await checkDuplicate('id', id)

      if (response.status === 200) {
        setIdChecked(true)
        clearErrors('id')
      } else {
        setIdChecked(false)
        setError('id', { message: response.message || 'This ID is already taken' })
      }
    } catch (error) {
      setError('id', { message: 'Error checking ID' })
    } finally {
      setCheckingId(false)
    }
  }

  const handleNicknameCheck = async () => {
    if (!nickname || nickname.length < 2) {
      setError('nickname', { message: 'Nickname must be at least 2 characters' })
      return
    }

    try {
      setCheckingNickname(true)
      const response = await checkDuplicate('nickname', nickname)

      if (response.status === 200) {
        setNicknameChecked(true)
        clearErrors('nickname')
      } else {
        setNicknameChecked(false)
        setError('nickname', { message: response.message || 'This nickname is already taken' })
      }
    } catch (error) {
      setError('nickname', { message: 'Error checking nickname' })
    } finally {
      setCheckingNickname(false)
    }
  }

  const onFormSubmit = (data: SignupFormData) => {
    if (!idChecked || !nicknameChecked) {
      if (!idChecked) setError('id', { message: 'Please check if this ID is available' })
      if (!nicknameChecked) setError('nickname', { message: 'Please check if this nickname is available' })
      return
    }

    onSubmit(data)
  }

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <FormGroup>
        <Label htmlFor="id">ID</Label>
        <Input
          type="text"
          id="id"
          placeholder="Enter your ID (min. 4 characters)"
          {...register('id', {
            required: 'ID is required',
            minLength: {
              value: 4,
              message: 'ID must be at least 4 characters',
            },
            onChange: () => setIdChecked(false),
          })}
        />
        {errors.id && <ErrorMessage>{errors.id.message}</ErrorMessage>}
        {idChecked && <SuccessMessage>ID available!</SuccessMessage>}
        <CheckButton type="button" onClick={handleIdCheck} disabled={!id || id.length < 4 || checkingId}>
          {checkingId ? 'Checking...' : 'Check Availability'}
        </CheckButton>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="Enter your password (min. 6 characters)"
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

      <FormGroup>
        <Label htmlFor="passwordConfirm">Confirm Password</Label>
        <Input
          type="password"
          id="passwordConfirm"
          placeholder="Confirm your password"
          {...register('passwordConfirm', {
            required: 'Please confirm your password',
            validate: value => value === password || 'Passwords do not match',
          })}
        />
        {errors.passwordConfirm && <ErrorMessage>{errors.passwordConfirm.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="nickname">Nickname</Label>
        <Input
          type="text"
          id="nickname"
          placeholder="Enter your nickname (min. 2 characters)"
          {...register('nickname', {
            required: 'Nickname is required',
            minLength: {
              value: 2,
              message: 'Nickname must be at least 2 characters',
            },
            onChange: () => setNicknameChecked(false),
          })}
        />
        {errors.nickname && <ErrorMessage>{errors.nickname.message}</ErrorMessage>}
        {nicknameChecked && <SuccessMessage>Nickname available!</SuccessMessage>}
        <CheckButton
          type="button"
          onClick={handleNicknameCheck}
          disabled={!nickname || nickname.length < 2 || checkingNickname}
        >
          {checkingNickname ? 'Checking...' : 'Check Availability'}
        </CheckButton>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          type="text"
          id="phoneNumber"
          placeholder="Enter your phone number"
          {...register('phoneNumber', {
            required: 'Phone number is required',
            pattern: {
              value: /^[0-9]{10,11}$/,
              message: 'Please enter a valid phone number (10-11 digits)',
            },
          })}
        />
        {errors.phoneNumber && <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>}
      </FormGroup>

      <Button type="submit" disabled={isLoading} fullWidth size="large">
        {isLoading ? 'Creating Account...' : 'Sign Up'}
      </Button>
    </Form>
  )
}

export default SignupForm
