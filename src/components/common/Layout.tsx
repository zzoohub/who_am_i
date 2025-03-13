import React, { ReactNode, useCallback, useEffect } from "react";
import { styled } from "styled-components";
import { useRecoilState } from "recoil";
import { osAtom } from "../../atom/atom";
import { osCheck } from "../../utils/functions";
import { OS } from "../../utils/type";
import Loading from "./Loading";
import PopupWrap from "./PopupWrap";

const makeBgColor = (bgColor: BgColor) => {
  switch (bgColor) {
    case "dark":
      return "#1A1A1D";
    case "blue":
      return "#208DC0";
    default:
      return "#fff";
  }
};

export type BgColor = "dark" | "blue";

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Frame = styled.div<{ os: OS; bgcolor: BgColor }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 430px;
  height: ${({ os }) => (os !== "web" ? "100vh" : "800px")};
  min-height: ${({ os }) => (os !== "web" ? "100vh" : "800px")};
  border-radius: ${({ os }) => (os === "web" ? "10px" : "0px")};
  background-color: ${({ bgcolor }) => makeBgColor(bgcolor)};
  overflow: auto;
`;

interface LayoutProps {
  children: ReactNode;
  bgColor: BgColor;
}
const Layout = ({ children, bgColor }: LayoutProps) => {
  const [os, setOs] = useRecoilState(osAtom);
  const resize = useCallback(() => {
    setOs(osCheck());
  }, [setOs]);

  useEffect(() => {
    setOs(osCheck());
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [setOs, resize]);

  return (
    <Root>
      <Frame os={os} bgcolor={bgColor}>
        <Loading />
        <PopupWrap />
        {children}
      </Frame>
    </Root>
  );
};

export default React.memo(Layout);
