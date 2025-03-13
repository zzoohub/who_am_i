import { styled } from 'styled-components'
import SignupForm from '../components/auth/SignupForm'
import Layout from '../components/common/Layout'
import Logo from '../components/common/UI/Logo'
import Scafford from '../components/common/UI/Scaffold'

const Em = styled.span`
  color: #fff;
  font-size: 20px;
  font-family: 'Noto Sans Kr';
  font-style: normal;
  font-weight: 300;
  text-align: center;
  margin-top: 10px;
`

const Signup = () => {
  return (
    <Layout bgColor="dark">
      <Scafford>
        <Logo width="70%" />
        <Em>나만의 뽑기통을 만들어 보세요!</Em>
        <SignupForm />
      </Scafford>
    </Layout>
  )
}

export default Signup
