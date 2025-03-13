export type UserType = 'master' | 'guest'
export type OS = 'android' | 'ios' | 'web'
export type Struct<T> = {
  [key: string]: T
}
export type Direction = 'row' | 'column'
export type InputType = 'text' | 'password' | 'email' | 'number'
export type CapsuleOpenType = 'random' | 'choice'

export interface IUser {
  coin: number
  jarId: string
  nickname: string
  lastLoginAt: string
  phoneNumber: string
  userId: string
  [key: string]: any
}
export interface ICapsule {
  capsuleId: string
  authorNickname: string
  createdAt: string
  emoji: number
  emojiReply: string
  type: string
  color: string
  public: boolean
  read: boolean
}

export interface IJar {
  coin: number
  userNickname: string
  capsules: ICapsule[]
}

export interface ICapsuleDetail {
  authorNickname: string
  authorId: string
  content: string
  createdAt: string
  emoji: number
  jarId: string
  type: 'normal' | 'reply'
  color: string
  public: boolean
  read: boolean
  replied: boolean
  replyCapsule?: string
}
