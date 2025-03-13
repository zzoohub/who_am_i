import { styled } from 'styled-components'
import Input from './Input'
import { FieldValues, useForm } from 'react-hook-form'
import BigButton from '../common/UI/BigButton'
import { useNavigate, useSearchParams } from 'react-router-dom'
import * as API from '../../api/api'

import { useRecoilState, useRecoilValue } from 'recoil'
import { popupAtom, showPopup } from '../../atom/atom'
import { AUTH } from '../../utils/constants'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const ErrorText = styled.p`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0px 5px;
  color: #ff4343;
  font-size: 16px;
  font-family: Noto Sans Kr;
`

export interface ILogin {
  id: string
  password: string
}

const LoginForm = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [qs, setQs] = useSearchParams()
  const [popup, setPopup] = useRecoilState(popupAtom)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    localStorage.removeItem(AUTH)
  }, [])

  const onSubmit = async (data: FieldValues) => {
    const response = await API.login(data as ILogin)
    if (response?.status !== 200) {
      return setPopup(showPopup({ content: response?.message }))
    }
    localStorage.setItem(AUTH, response?.data.token)
    queryClient.removeQueries()
    if (qs.get('jarId')) {
      return navigate(`/master/write/${qs.get('jarId')}/send/setting`)
    }
    navigate(`/master/capsule-box/${response?.data.jarId}`, { replace: true })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="아이디를 입력해주세요"
        register={register('id', {
          required: true,
          minLength: { value: 4, message: '최소 4글자를 입력해주세요.' },
          maxLength: {
            value: 12,
            message: '최대 12글자를 입력할 수 있습니다.',
          },
        })}
      />
      <ErrorText>{errors.id?.message as any}</ErrorText>
      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요"
        register={register('password', {
          required: true,
          minLength: { value: 4, message: '최소 4글자를 입력해주세요.' },
          maxLength: {
            value: 12,
            message: '최대 12글자를 입력할 수 있습니다.',
          },
        })}
      />
      <ErrorText>{errors.password?.message as any}</ErrorText>
      <BigButton>로그인</BigButton>
    </Form>
  )
}

export default LoginForm
