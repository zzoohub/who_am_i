import React, { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { keyframes, styled } from "styled-components";
import { loadingAtom } from "../../atom/atom";
import { FetchInstance } from "../../api/api";

const LoadingTag = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  left: 0px;
  top: 0px;
  z-index: 99;
  pointer-events: none;
`;

const spin = keyframes` /* 2. css코드를 씀. */
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const Spiner = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #fff;
    border-radius: 50%;
    animation: ${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
    &:nth-child(1) {
      animation-delay: -0.45s;
    }
    &:nth-child(2) {
      animation-delay: -0.3s;
    }
    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
`;

const Loading = () => {
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const callCount = useRef<number>(0);

  useEffect(() => {
    FetchInstance.interceptor.request.use(() => {
      callCount.current += 1;
      setLoading(true);
    });

    FetchInstance.interceptor.response.use(
      (response: Response) => {
        try {
          callCount.current -= 1;
          if (callCount.current === 0) {
            setLoading(false);
          }
        } catch (error) {
          alert("fuck");
          setLoading(false);
        }
        return response;
      },
      (response: Response) => {
        callCount.current -= 1;
        if (callCount.current === 0) {
          setLoading(false);
        }
        return response;
      }
    );
  }, []);

  return (
    <>
      {loading && (
        <LoadingTag>
          <Spiner>
            <div />
            <div />
            <div />
          </Spiner>
        </LoadingTag>
      )}
    </>
  );
};

export default React.memo(Loading);
