import React, { ReactNode } from 'react'
import { PopupProvider } from './PopupContext'
import { LoadingProvider } from './LoadingContext'

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <PopupProvider>
      <LoadingProvider>{children}</LoadingProvider>
    </PopupProvider>
  )
}

export * from './PopupContext'
export * from './LoadingContext'
