import { MouseEventHandler, ReactNode } from 'react'
import { atom, useRecoilCallback } from 'recoil'
import { OS } from '../utils/type'

export interface IPopup {
  isShow: boolean
  element: ReactNode | null
  title: string
  content: string
  onConfirm: MouseEventHandler | undefined
  onReject: MouseEventHandler | undefined
  onDimmedClick: MouseEventHandler | undefined
  numberOfButton: number
  confirmText: string
  rejectText: string
  withDimmed: boolean
}

export const INIT_POPUP: IPopup = {
  element: null,
  isShow: false,
  title: '',
  content: '',
  onConfirm: undefined,
  onReject: undefined,
  onDimmedClick: undefined,
  numberOfButton: 1,
  confirmText: '',
  rejectText: '',
  withDimmed: false,
}

export const popupAtom = atom<IPopup>({
  key: 'popup', // unique ID (with respect to other atoms/selectors)
  default: INIT_POPUP, // default value (aka initial value)
})

export const showPopup = (popupData?: Partial<IPopup>) => {
  return (popup: IPopup): IPopup => ({ ...popup, isShow: true, ...popupData })
}

export const closePopup = () => {
  return INIT_POPUP
}

export const loadingAtom = atom<boolean>({
  key: 'loading',
  default: false,
})

export const osAtom = atom<OS>({
  key: 'osCheck',
  default: 'web',
})

export const isNewbieAtom = atom<boolean>({
  key: 'isNewbie',
  default: false,
})
