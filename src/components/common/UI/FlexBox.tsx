import { ReactNode } from "react";
import { styled } from "styled-components";
import { Direction, Struct } from "../../../utils/type";

const Div = styled.div<{ direction: Direction }>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  width: 100%;
`;

interface FlexBoxProps {
  children: ReactNode;
  direction: Direction;
  style?: Struct<any>;
}
const FlexBox = ({ children, direction, style }: FlexBoxProps) => {
  return (
    <Div direction={direction} style={style}>
      {children}
    </Div>
  );
};

export default FlexBox;
