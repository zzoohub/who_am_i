import { ReactNode } from "react";
import { styled } from "styled-components";
import { Struct } from "../../../utils/type";

interface ScaffordProps {
  children: ReactNode;
  padding?: number;
  style?: Struct<any>;
}

const ScaffordDiv = styled.div<{ padding: number }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: ${({ padding }) => `${padding}px`};
  box-sizing: border-box;
`;

const Scafford = ({ children, padding = 20, style }: ScaffordProps) => {
  return (
    <ScaffordDiv style={style} padding={padding}>
      {children}
    </ScaffordDiv>
  );
};

export default Scafford;
