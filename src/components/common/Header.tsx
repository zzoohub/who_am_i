import React, { MouseEventHandler } from "react";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const HeaderTag = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 100%;
`;

const GoBackButton = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  cursor: pointer;

  &:hover {
    svg {
      transition: all ease-in-out 0.1s;
      transform: scale(120%);
    }
  }
`;
const GoBack = styled(FontAwesomeIcon)`
  display: block;
  color: #fff;
  height: 28px;
`;
const Title = styled.h2`
  justify-self: center;
  color: #fff;
  font-size: 22px;
  font-family: Noto Sans Kr;
  font-style: normal;
  font-weight: 500;
`;

interface HeaderProps {
  title: string;
  goBack: boolean;
  onGobackClick?: Function;
}

const Header = ({ title, goBack = true, onGobackClick }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <HeaderTag>
      {goBack && (
        <GoBackButton
          onClick={
            onGobackClick
              ? (onGobackClick as MouseEventHandler)
              : () => navigate(-1)
          }
        >
          <GoBack icon={faAngleLeft} />
        </GoBackButton>
      )}
      <Title>{title}</Title>
    </HeaderTag>
  );
};

export default React.memo(Header);
