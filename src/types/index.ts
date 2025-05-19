import React from 'react'

export type UserType = 'master' | 'guest'
export type OS = 'android' | 'ios' | 'web'
export type Direction = 'row' | 'column'
export type InputType = 'text' | 'password' | 'email' | 'number'
export type CapsuleOpenType = 'random' | 'choice'

export interface Struct<T> {
  [key: string]: T
}

export interface User {
  coin: number
  jarId: string
  nickname: string
  lastLoginAt: string
  phoneNumber: string
  userId: string
  [key: string]: any
}

export interface Capsule {
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

export interface Jar {
  coin: number
  userNickname: string
  capsules: Capsule[]
}

export interface CapsuleDetail {
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

export interface ApiResponse<T = any> {
  data: T | null
  status: number
  message: string | null
}

export interface LoginFormData {
  id: string
  password: string
}

export interface SignupFormData {
  id: string
  password: string
  passwordConfirm: string
  nickname: string
  phoneNumber: string
}

export interface WritePayload {
  content: string
  emoji: number
  isPublic: boolean
}

export interface PopupState {
  isShow: boolean
  element: React.ReactNode | null
  title: string
  content: string
  onConfirm: React.MouseEventHandler | undefined
  onReject: React.MouseEventHandler | undefined
  onDimmedClick: React.MouseEventHandler | undefined
  numberOfButton: number
  confirmText: string
  rejectText: string
  withDimmed: boolean
}
