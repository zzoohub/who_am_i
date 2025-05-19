import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Layout } from '../../common/components'
import { usePopup, useLoading } from '../../../context'
import { WritePayload } from '../../../types'
import { createCapsule, replyCapsule } from '../../../utils/api'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
`

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`

const StepDot = styled.div<{ $active: boolean }>`
  width: ${props => (props.$active ? '30px' : '15px')};
  height: 15px;
  border-radius: 10px;
  background-color: ${props => (props.$active ? '#5571ee' : '#d9d9d9')};
  transition: all 0.3s ease;
`

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16px;
  margin-bottom: 20px;
  resize: none;

  &:focus {
    outline: none;
    border-color: #5571ee;
  }
`

const EmojiSelector = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

const EmojiOption = styled.div<{ $selected: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  border: 2px solid ${props => (props.$selected ? '#5571ee' : '#ccc')};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 30px;
  background-color: ${props => (props.$selected ? '#f0f5ff' : 'transparent')};
`

const PrivacyOption = styled.div`
  display: flex;
  margin-bottom: 30px;
`

const Option = styled.div<{ $selected: boolean }>`
  flex: 1;
  padding: 10px;
  text-align: center;
  border: 1px solid ${props => (props.$selected ? '#5571ee' : '#ccc')};
  background-color: ${props => (props.$selected ? '#f0f5ff' : 'white')};
  color: ${props => (props.$selected ? '#5571ee' : '#333')};
  cursor: pointer;

  &:first-child {
    border-radius: 10px 0 0 10px;
  }

  &:last-child {
    border-radius: 0 10px 10px 0;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: auto;
`

const Button = styled(motion.button)<{ $primary?: boolean }>`
  flex: 1;
  height: 50px;
  border-radius: 25px;
  border: none;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  background-color: ${props => (props.$primary ? '#5571ee' : '#f0f0f0')};
  color: ${props => (props.$primary ? 'white' : '#333')};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const EMOJIS = ['😀', '😍', '🎉', '👍']

const WriteCapsule = () => {
  const { userType = 'guest', jarId = '', writeType = 'normal', step = '1', capsuleId } = useParams()
  const navigate = useNavigate()
  const { showPopup } = usePopup()
  const { setLoading } = useLoading()

  const [content, setContent] = useState('')
  const [emoji, setEmoji] = useState(0)
  const [isPublic, setIsPublic] = useState(true)

  const isReply = writeType === 'reply'
  const currentStep = parseInt(step)

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleNext = () => {
    if (currentStep === 1) {
      // Validate content
      if (content.trim().length < 10) {
        showPopup({
          title: 'Content Too Short',
          content: 'Please write at least 10 characters.',
        })
        return
      }

      navigate(`/${userType}/write/${jarId}/${writeType}/2${isReply ? `/${capsuleId}` : ''}`)
    } else if (currentStep === 2) {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep === 1) {
      navigate(`/${userType}/capsule-box/${jarId}`)
    } else if (currentStep === 2) {
      navigate(`/${userType}/write/${jarId}/${writeType}/1${isReply ? `/${capsuleId}` : ''}`)
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)

      const payload: WritePayload = {
        content,
        emoji,
        isPublic,
      }

      const response =
        isReply && capsuleId ? await replyCapsule(jarId, capsuleId, payload) : await createCapsule(jarId, payload)

      if (response.status !== 200) {
        showPopup({
          title: 'Error',
          content: response.message || 'Failed to send the message.',
        })
        return
      }

      showPopup({
        title: 'Success',
        content: 'Your message has been sent!',
        onConfirm: () => navigate(`/${userType}/capsule-box/${jarId}`),
      })
    } catch (error) {
      showPopup({
        title: 'Error',
        content: 'An unexpected error occurred.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout headerTitle={isReply ? 'Reply to Capsule' : 'Write a Message'} headerLeftAction={handleBack}>
      <Container>
        <StepIndicator>
          <StepDot $active={currentStep === 1} />
          <StepDot $active={currentStep === 2} />
        </StepIndicator>

        {currentStep === 1 && (
          <>
            <TextArea value={content} onChange={handleContentChange} placeholder="Write your message here..." />
          </>
        )}

        {currentStep === 2 && (
          <>
            <h3 style={{ marginBottom: 15 }}>Choose an emoji</h3>
            <EmojiSelector>
              {EMOJIS.map((emojiChar, index) => (
                <EmojiOption key={index} $selected={emoji === index} onClick={() => setEmoji(index)}>
                  {emojiChar}
                </EmojiOption>
              ))}
            </EmojiSelector>

            <h3 style={{ marginBottom: 15 }}>Privacy setting</h3>
            <PrivacyOption>
              <Option $selected={isPublic} onClick={() => setIsPublic(true)}>
                Public
              </Option>
              <Option $selected={!isPublic} onClick={() => setIsPublic(false)}>
                Private
              </Option>
            </PrivacyOption>
          </>
        )}

        <ButtonContainer>
          <Button onClick={handleBack} whileTap={{ scale: 0.95 }}>
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </Button>
          <Button
            $primary
            onClick={handleNext}
            whileTap={{ scale: 0.95 }}
            disabled={currentStep === 1 && content.trim().length < 10}
          >
            {currentStep === 2 ? 'Submit' : 'Next'}
          </Button>
        </ButtonContainer>
      </Container>
    </Layout>
  )
}

export default WriteCapsule
