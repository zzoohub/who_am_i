import React, { createContext, useContext, useState, ReactNode } from 'react'

// Context
interface LoadingContextType {
  isLoading: boolean
  setLoading: (isLoading: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

// Provider component
interface LoadingProviderProps {
  children: ReactNode
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const setLoading = (isLoading: boolean) => {
    setIsLoading(isLoading)
  }

  return <LoadingContext.Provider value={{ isLoading, setLoading }}>{children}</LoadingContext.Provider>
}

// Custom hook
export function useLoading() {
  const context = useContext(LoadingContext)

  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }

  return context
}
