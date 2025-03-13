import { styled } from 'styled-components'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/common/Layout'

const Img = styled(motion.img)`
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  /* user-drag: none; */
`

const Logo = styled(Img)`
  position: absolute;
  left: 50%;
  top: 48%;
  margin-left: 5px;
  transform: translate(-50%, -50%);
  width: 75%;
`

const Capsule = styled(Img)`
  position: absolute;
  top: 63%;
  right: 20%;
  width: 24%;
`

const Star1 = styled(Img)`
  position: absolute;
  top: 30%;
  right: 10%;
  width: 9%;
`

const Star2 = styled(Img)`
  position: absolute;
  top: 25%;
  left: 10%;
  width: 5%;
`

const Star3 = styled(Img)`
  position: absolute;
  top: 15%;
  left: 40%;
  width: 6%;
`

const Star4 = styled(Img)`
  position: absolute;
  top: 12%;
  left: 70%;
  width: 4%;
`

const Star5 = styled(Img)`
  position: absolute;
  top: 30%;
  left: 40%;
  width: 4%;
`

const Button = styled.div`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  width: 87%;
  height: 68px;
  padding: 16px 114px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: #5571ee;
  text-align: center;
  font-size: 24px;
  font-family: Noto Sans KR;
  font-weight: 500;
  line-height: 100%;
  color: #fff;
`

const Splash = () => {
  const navigate = useNavigate()
  return (
    <Layout bgColor="dark">
      <Star1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, repeatDelay: 0.2, duration: 0.2 }}
        src="/images/star-1.png"
      />
      <Star2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 0.4 }}
        src="/images/star-2.png"
      />
      <Star3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 0.3 }}
        src="/images/star-3.png"
      />
      <Star4
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 0.15 }}
        src="/images/star-4.png"
      />
      <Star5
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 0.25 }}
        src="/images/star-4.png"
      />
      <Logo src="/images/logo.png" />
      <Capsule
        initial={{
          y: 0,
        }}
        animate={{
          y: [0, 15, 0],
        }}
        transition={{ repeat: Infinity, repeatDelay: 2, duration: 0.4 }}
        whileTap={{
          scale: 1.2,
          rotate: 720,
        }}
        src="/images/capsule.png"
      />
      <Button onClick={() => navigate('/login', { replace: true })}>시작하기</Button>
    </Layout>
  )
}

export default Splash
