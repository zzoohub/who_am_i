import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import { usePopup } from '../../../context'
import { motion, AnimatePresence } from 'framer-motion'

const PopupOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(2px);
`

const PopupContainer = styled(motion.div)`
  width: 90%;
  max-width: 400px;
  background-color: white;
  border-radius: 20px;
  padding: 30px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h2`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
`

const Content = styled.p`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 18px;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 30px;
  white-space: pre-line;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`

const Popup = () => {
  const { state, closePopup } = usePopup()
  const {
    isShow,
    title,
    content,
    element,
    onConfirm,
    onReject,
    onDimmedClick,
    numberOfButton,
    confirmText,
    rejectText,
  } = state

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onDimmedClick) {
      onDimmedClick(e)
    }
  }

  const handleConfirm = (e: React.MouseEvent) => {
    if (onConfirm) {
      onConfirm(e)
    }
    closePopup()
  }

  const handleReject = (e: React.MouseEvent) => {
    if (onReject) {
      onReject(e)
    }
    closePopup()
  }

  return (
    <AnimatePresence>
      {isShow && (
        <PopupOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          <PopupContainer
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {element || (
              <>
                {title && <Title>{title}</Title>}
                {content && <Content>{content}</Content>}
                <ButtonContainer>
                  {numberOfButton === 2 && (
                    <Button variant="secondary" fullWidth onClick={handleReject}>
                      {rejectText || 'Cancel'}
                    </Button>
                  )}
                  <Button fullWidth onClick={handleConfirm}>
                    {confirmText || 'OK'}
                  </Button>
                </ButtonContainer>
              </>
            )}
          </PopupContainer>
        </PopupOverlay>
      )}
    </AnimatePresence>
  )
}

export default Popup
