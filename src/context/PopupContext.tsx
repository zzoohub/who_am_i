import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { PopupState } from '../types'

// Initial state
const INITIAL_POPUP_STATE: PopupState = {
  isShow: false,
  element: null,
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

// Action types
type PopupAction = { type: 'SHOW_POPUP'; payload: Partial<PopupState> } | { type: 'CLOSE_POPUP' }

// Reducer
function popupReducer(state: PopupState, action: PopupAction): PopupState {
  switch (action.type) {
    case 'SHOW_POPUP':
      return { ...state, isShow: true, ...action.payload }
    case 'CLOSE_POPUP':
      return INITIAL_POPUP_STATE
    default:
      return state
  }
}

// Context
interface PopupContextType {
  state: PopupState
  showPopup: (popupData: Partial<PopupState>) => void
  closePopup: () => void
}

const PopupContext = createContext<PopupContextType | undefined>(undefined)

// Provider component
interface PopupProviderProps {
  children: ReactNode
}

export function PopupProvider({ children }: PopupProviderProps) {
  const [state, dispatch] = useReducer(popupReducer, INITIAL_POPUP_STATE)

  const showPopup = (popupData: Partial<PopupState>) => {
    dispatch({ type: 'SHOW_POPUP', payload: popupData })
  }

  const closePopup = () => {
    dispatch({ type: 'CLOSE_POPUP' })
  }

  return <PopupContext.Provider value={{ state, showPopup, closePopup }}>{children}</PopupContext.Provider>
}

// Custom hook
export function usePopup() {
  const context = useContext(PopupContext)

  if (context === undefined) {
    throw new Error('usePopup must be used within a PopupProvider')
  }

  return context
}
