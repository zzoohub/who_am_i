import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Layout } from '../../common/components'
import { useCapsules, useUser } from '../../../hooks'
import { usePopup, useLoading } from '../../../context'
import { Capsule } from '../../../types'
import { getCapsule, getRandomCapsule } from '../../../utils/api'

const Main = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #1f8dc0 0%, #9091cc 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 80vh;
`

const CapsuleBox = styled.div`
  position: relative;
  width: 280px;
  height: 300px;
  background-color: #f1f1f1;
  border: 1px solid #333;
  border-radius: 15px;
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
  gap: 10px;
  margin-bottom: 60px;
`

const CapsuleItem = styled(motion.div)<{ $bgcolor: string }>`
  width: 60px;
  height: 60px;
  background-color: ${props => props.$bgcolor};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`

const ActionButton = styled(motion.button)`
  width: 80%;
  height: 50px;
  border-radius: 25px;
  background-color: #5571ee;
  color: white;
  border: none;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #4561de;
  }
`

const CoinCount = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 8px 16px;
  border-radius: 20px;
  color: white;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: bold;
`

interface CapsuleModalState {
  isOpen: boolean
  capsuleData: Capsule | null
  content: string
}

const Home = () => {
  const { userType = 'guest', jarId = '' } = useParams()
  const navigate = useNavigate()
  const { showPopup } = usePopup()
  const { setLoading } = useLoading()

  const [capsuleModal, setCapsuleModal] = useState<CapsuleModalState>({
    isOpen: false,
    capsuleData: null,
    content: '',
  })

  const { data: userData, refetch: refetchUser } = useUser()
  const { data: jarData, refetch: refetchJar } = useCapsules(jarId)

  const handleWriteClick = () => {
    if (!userData) {
      showPopup({
        title: 'Login Required',
        content: 'You need to login to write a message.',
        onConfirm: () => navigate('/login'),
      })
      return
    }

    navigate(`/${userType}/write/${jarId}/normal/1`)
  }

  const handleCapsuleClick = async (capsule: Capsule) => {
    try {
      setLoading(true)

      // Check if the user has enough coins, etc.
      const response = await getCapsule(jarId, capsule.capsuleId)

      if (response.status !== 200) {
        showPopup({
          title: 'Error',
          content: response.message || 'Failed to load capsule',
        })
        return
      }

      // Show the capsule content
      setCapsuleModal({
        isOpen: true,
        capsuleData: capsule,
        content: response.data.content,
      })

      // Refresh data
      refetchUser()
      refetchJar()
    } catch (error) {
      showPopup({
        title: 'Error',
        content: 'An unexpected error occurred.',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRandomCapsule = async () => {
    try {
      setLoading(true)

      // Check if user has coins, etc.
      const response = await getRandomCapsule(jarId)

      if (response.status !== 200) {
        showPopup({
          title: 'Error',
          content: response.message || 'Failed to get random capsule',
        })
        return
      }

      // Show the random capsule
      const capsule = response.data
      setCapsuleModal({
        isOpen: true,
        capsuleData: capsule,
        content: capsule.content,
      })

      // Refresh data
      refetchUser()
      refetchJar()
    } catch (error) {
      showPopup({
        title: 'Error',
        content: 'An unexpected error occurred.',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/')
  }

  // When a capsule is opened, show it in a popup
  useEffect(() => {
    if (capsuleModal.isOpen && capsuleModal.content) {
      showPopup({
        title: `From: ${capsuleModal.capsuleData?.authorNickname || 'Anonymous'}`,
        content: capsuleModal.content,
        onConfirm: () => setCapsuleModal(prev => ({ ...prev, isOpen: false })),
      })
    }
  }, [capsuleModal, showPopup])

  return (
    <Layout headerTitle={`${jarData?.userNickname || ''}'s Capsule Box`} headerLeftAction={handleBack}>
      <Main>
        {userData && <CoinCount>Coins: {userData.coin}</CoinCount>}

        <CapsuleBox>
          {jarData?.capsules.map((capsule, index) => (
            <CapsuleItem
              key={capsule.capsuleId}
              $bgcolor={capsule.color}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCapsuleClick(capsule)}
            />
          ))}
        </CapsuleBox>

        <ActionButton whileTap={{ scale: 0.95 }} onClick={handleRandomCapsule}>
          Random Capsule
        </ActionButton>

        <ActionButton whileTap={{ scale: 0.95 }} onClick={handleWriteClick} style={{ marginTop: 10 }}>
          Write a Message
        </ActionButton>
      </Main>
    </Layout>
  )
}

export default Home
