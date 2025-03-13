import { ILogin } from '../components/auth/LoginForm'
import { ISignup } from '../components/auth/SignupForm'
import { IWritePayload } from '../pages/WriteCapsule'
import { AUTH_TOKEN, GET, JAR, POST, USER, USER_CHECK, USER_LOGIN } from '../utils/constants'
import axios from 'axios'
import { isExist } from '../utils/functions'
import { Fetch } from '../lib/Fetch/Fetch'

export const SERVER_URL = process.env.REACT_APP_SERVER_URL

export const Axios = axios.create({
  baseURL: SERVER_URL,
  timeout: 3000,
  headers: {
    'Content-Type': `application/json`,
    ...(isExist(AUTH_TOKEN) && { Authorization: `Bearer ${AUTH_TOKEN}` }),
  },
})

export const FetchInstance = Fetch.create({
  baseURL: SERVER_URL!,
  timeout: 3000,
  headers: {
    'Content-Type': `application/json`,
    ...(isExist(AUTH_TOKEN) && { Authorization: `Bearer ${AUTH_TOKEN}` }),
  },
})

const ErrNetwork = (error: Error) => {
  console.log('ErrNetwork: ', error)
}

export const signup = async (data: ISignup) => {
  return await FetchInstance.post(`${SERVER_URL}/${USER}`, data)
    .then(response => response.json())
    .catch((error: Error) => ErrNetwork(error))
}

export const login = async (data: ILogin) => {
  return await FetchInstance.post(`${SERVER_URL}/${USER_LOGIN}`, data)
    .then((response: Response) => {
      return response.json()
    })
    .catch((error: Error) => ErrNetwork(error))
}

export const duplicateCheck = async (type: 'id' | 'nickname', data: string) => {
  return await FetchInstance.get(`${SERVER_URL}/${USER_CHECK}?${type}=${data}`)
    .then(response => response.json())
    .catch((error: Error) => ErrNetwork(error))
}

export const user = async () => {
  return await FetchInstance.get(`${SERVER_URL}/${USER}`)
    .then(response => response.json())
    .catch((error: Error) => ErrNetwork(error))
}

export const capsules = async (jarId: string) => {
  return await FetchInstance.get(`${SERVER_URL}/${JAR}/${jarId}`)
    .then(response => response.json())
    .catch((error: Error) => ErrNetwork(error))
}

export const sendCapsule = async (jarId: string, data: IWritePayload) => {
  return await FetchInstance.post(`${SERVER_URL}/${JAR}/${jarId}`, data)
    .then(response => response.json())
    .catch((error: Error) => ErrNetwork(error))
}

export const replyCapsule = async (jarId: string, capsuleId: string, data: IWritePayload) => {
  return await FetchInstance.post(`${SERVER_URL}/${JAR}/${jarId}/${capsuleId}/reply`, data)
    .then(response => response.json())
    .catch((error: Error) => ErrNetwork(error))
}

export const capsule = async (jarId: string, capsuleId: string) => {
  return await FetchInstance.get(`${SERVER_URL}/${JAR}/${jarId}/${capsuleId}`)
    .then(response => response.json())
    .catch((error: Error) => ErrNetwork(error))
}

export const randomCapsule = async (jarId: string) => {
  return await FetchInstance.get(`${SERVER_URL}/${JAR}/${jarId}/random`)
    .then(response => response.json())
    .catch((error: Error) => ErrNetwork(error))
}

interface IReplyEmoji {
  emoji: number
  dumpField: string
}
export const replyEmoji = async (jarId: string, capsuleId: string, data: IReplyEmoji) => {
  return await FetchInstance.post(`${SERVER_URL}/${JAR}/${jarId}/${capsuleId}/reply/emoji`, data)
    .then(response => response.json())
    .catch((error: Error) => ErrNetwork(error))
}
