import { styled } from "styled-components";

const Img = styled.img`
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
`;

const LogoImg = styled(Img)<{ width: string }>`
  width: ${(props) => props.width};
  margin: 0 auto;
`;

interface LogoProps {
  width: string;
}

const Logo = ({ width }: LogoProps) => {
  return <LogoImg width={width} src="/images/fullLogo.png" />;
};

export default Logo;
