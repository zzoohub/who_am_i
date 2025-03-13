import { styled } from 'styled-components'
import Header from '../components/common/Header'
import Layout from '../components/common/Layout'
import Input from '../components/auth/Input'
import Scafford from '../components/common/UI/Scaffold'
import FlexBox from '../components/common/UI/FlexBox'
import { theme } from '../css/theme'
import { MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react'
import BigButton from '../components/common/UI/BigButton'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { IJar, IUser } from '../utils/type'
import { useQuery } from '@tanstack/react-query'
import { capsules, replyCapsule, sendCapsule, user } from '../api/api'
import { IResponse, isEmpty, isExist } from '../utils/functions'
import { popupAtom, showPopup } from '../atom/atom'
import { useRecoilState } from 'recoil'

const H2 = styled.h2`
  color: #fff;
  font-size: 20px;
  font-family: Noto Sans Kr;
  font-style: normal;
  font-weight: 700;
  margin-top: 30px;
`

const P = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 18px;
  font-family: Noto Sans Kr;
  font-style: normal;
  font-weight: 500;
  margin-top: 10px;
`

const Capsule = styled.div<{ bgcolor: string; selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  background-color: ${props => props.bgcolor};
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  box-shadow: 0px 10px 10px rgba(88, 83, 83, 0.2);
  cursor: pointer;
  filter: ${({ selected }) => !selected && 'blur(3px)'};
  transform: ${({ selected }) => !selected && 'scale(85%)'};
  transition: all ease-in-out 0.1s;
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`

const Button = styled.button<{ selected: boolean }>`
  display: flex;
  width: 48%;
  height: 60px;

  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border: none;
  cursor: pointer;
  border-radius: 14px;
  background: ${({ selected }) => (selected ? '#5571ee' : '#28282B')};
  transition: all ease-in-out 0.1s;
  color: ${({ selected }) => (selected ? '#fff' : 'rgba(255, 255, 255, 0.40);')};
  border: ${({ selected }) => (selected ? 'none' : 'border: 1px solid rgba(255, 255, 255, 0.14)')};
  font-size: 20px;
  font-family: Noto Sans Kr;
  font-style: normal;
  font-weight: 500;
  line-height: 167.023%;
`

const Setting = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Writing = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: max-content;
`

const TextArea = styled.textarea`
  width: 100%;
  height: 300px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid var(--unnamed, #c6c6c6);
  background: var(--unnamed, rgba(255, 255, 255, 0.14));
  margin-top: 20px;
  padding: 20px;
  color: #fff;
  font-size: 20px;
  font-family: Noto Sans Kr;
  font-style: normal;
  font-weight: 500;
  ::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`

const SettingVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

const WritingVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
}

export interface IWritePayload {
  authorNickname: string
  content: string
  color: string
  public: boolean
}

const INIT_PAYLOAD = {
  authorNickname: '',
  content: '',
  color: theme.capsule.red,
  public: false,
}

const WriteCapsule = () => {
  const { userType, jarId, writeType, step } = useParams()
  const [qs, setQs] = useSearchParams()
  const [popup, setPopup] = useRecoilState(popupAtom)
  const navigate = useNavigate()

  const recipient = useRef(qs.get('recipient'))

  const { data: userData } = useQuery<IUser>({
    queryKey: ['user'],
    queryFn: () => user().then(response => response.data),
  })

  const { data: jar } = useQuery<IJar>({
    queryKey: ['jar'],
    queryFn: () => capsules(jarId ?? '').then(response => response.data),
  })

  const [payload, setPayload] = useState<IWritePayload>(INIT_PAYLOAD)

  const onButtonClick = useCallback(async () => {
    if (writeType === 'reply' && step === 'setting') {
      const capsuleId = qs.get('capsuleId')
      return navigate(`/${userType}/write/${jarId}/reply/writing?capsuleId=${capsuleId}`)
    }
    if (writeType === 'send' && step === 'setting') {
      return navigate(`/${userType}/write/${jarId}/send/writing`)
    }
    if (step === 'writing') {
      let response: IResponse | undefined
      if (userData?.nickname) payload['authorNickname'] = userData?.nickname!
      if (writeType === 'send') response = await sendCapsule(jarId!, payload)
      if (writeType === 'reply') {
        const capsuleId = qs.get('capsuleId')
        response = await replyCapsule(jarId!, capsuleId!, payload)
      }
      if (response?.status! >= 300) return setPopup(showPopup({ content: response?.message ?? '' }))
      setPopup(
        showPopup({
          content: writeType === 'send' ? '캡슐이 잘 전달됐어요.' : '답장이 잘 전달됐어요.',
          onConfirm: () => navigate(`/${writeType === 'send' ? 'guest' : 'master'}/capsule-box/${jarId}`),
        }),
      )
    }
  }, [navigate, userType, jarId, step, writeType, qs, setPopup, payload])

  const onGobackClick = useCallback(() => {
    if (step === 'writing') {
      return setPopup(
        showPopup({
          content: `잠깐!\n창을 닫으면 작성한 내용이 사라져요`,
          numberOfButton: 2,
          rejectText: '그만쓰기',
          confirmText: '이어쓰기',
          onReject: () => navigate(-1),
        }),
      )
    }
    navigate(-1)
  }, [step])

  return (
    <Layout bgColor="dark">
      <Header goBack onGobackClick={onGobackClick} title={writeType === 'send' ? '편지쓰기' : '답장하기'} />
      <Scafford style={{ justifyContent: 'space-between' }}>
        <AnimatePresence mode="sync">
          {step === 'setting' && (
            <Setting variants={SettingVariants} initial="initial" animate="animate" exit="exit">
              <H2>닉네임 적기</H2>
              <P>로그인을 하면 닉네임을 바꿀 수 없어요</P>
              <Input
                type="text"
                placeholder={userData?.nickname ? userData?.nickname : '익명의 누군가'}
                style={{ marginTop: '20px' }}
                disabled={isExist(userData?.nickname!)}
                onChange={(e: any) =>
                  setPayload(payload => ({
                    ...payload,
                    authorNickname: e.target.value,
                  }))
                }
              />

              <H2>캡슐 색 고르기</H2>
              <P>로그인을 하면 닉네임을 바꿀 수 없어요</P>
              <FlexBox direction="row" style={{ justifyContent: 'space-around', marginTop: '20px' }}>
                {Object.entries(theme.capsule).map(([key, color]) => (
                  <Capsule
                    key={color}
                    onClick={() => setPayload(payload => ({ ...payload, color }))}
                    bgcolor={color}
                    selected={color === (payload?.color ?? theme.capsule.red)}
                  />
                ))}
              </FlexBox>
              <H2>편지 보여주기</H2>
              <P>편지를 모두에게 공개할까요?</P>
              <Buttons>
                <Button
                  onClick={() => setPayload(payload => ({ ...payload, public: false }))}
                  selected={!payload?.public}
                >
                  비공개
                </Button>
                <Button
                  onClick={() =>
                    setPayload((payload: IWritePayload) => ({
                      ...payload,
                      public: true,
                    }))
                  }
                  selected={payload?.public}
                >
                  공개
                </Button>
              </Buttons>
            </Setting>
          )}
          {step === 'writing' && (
            <Writing variants={WritingVariants} initial="initial" animate="animate" exit="exit">
              <H2>TO. {writeType === 'send' ? jar?.userNickname : recipient.current}</H2>
              <TextArea
                placeholder="내용을 적어주세요. 다른 사람에게 상처를 주는 말은 자제해주세요."
                onChange={(e: any) =>
                  setPayload(payload => ({
                    ...payload,
                    content: e.target.value,
                  }))
                }
              />
            </Writing>
          )}
        </AnimatePresence>

        <BigButton onClick={onButtonClick}>{step === 'setting' ? '다음' : '보내기'}</BigButton>
      </Scafford>
    </Layout>
  )
}

export default WriteCapsule
