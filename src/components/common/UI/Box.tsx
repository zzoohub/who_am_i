import { styled } from "styled-components";

const Div = styled.div<{ h: string }>`
  height: ${({ h }) => h};
  width: 100%;
`;

const Box = ({ h }: { h: string }) => {
  return <Div h={h} />;
};

export default Box;
