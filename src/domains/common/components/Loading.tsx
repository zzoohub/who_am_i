import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useLoading } from '../../../context'
import { AnimatePresence, motion } from 'framer-motion'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const LoadingOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: ${spin} 1s ease-in-out infinite;
`

type LoadingProps = {
  isFullPage?: boolean
}

const Loading = ({ isFullPage = false }: LoadingProps) => {
  const { isLoading } = useLoading()

  // For use as a standalone component (e.g., in Suspense)
  if (isFullPage) {
    return (
      <LoadingOverlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <LoadingSpinner />
      </LoadingOverlay>
    )
  }

  // For use with the global loading state
  return (
    <AnimatePresence>
      {isLoading && (
        <LoadingOverlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <LoadingSpinner />
        </LoadingOverlay>
      )}
    </AnimatePresence>
  )
}

export default Loading
