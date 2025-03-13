import { AnimatePresence, Variants, motion } from "framer-motion";

import { styled } from "styled-components";

import { useState } from "react";
import { useRecoilState } from "recoil";
import { isNewbieAtom } from "../../atom/atom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

const Frame = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  overflow: hidden;
  z-index: 1000;
`;

const Bubble = styled(motion.div)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 125px;
  border-radius: 12px;
  background-color: #fff;
  border: 1px solid #000;
  font-family: Noto Sans Kr;
  font-size: 20px;
  padding: 0px 20px;
  text-align: center;
  line-height: 24px;
  span {
    display: block;
    width: 100%;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
    strong {
      color: #5571ee;
    }
  }
`;

const CoinCount = styled.strong`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  font-family: Noto Sans Kr;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
`;

const Capsule = styled(motion.div)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 400px;
  left: 50%;
  transform: translateX(-50%);
  width: 70px;
  height: 70px;
  background-color: red;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
  border: 2px solid #263ca6;
`;

const CapsuleLight = styled.img`
  position: absolute;
  left: 10%;
  top: 10%;
  width: 30%;
  pointer-events: none;
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: #263ca6;
`;

const CopyURL = styled(motion.div)`
  position: absolute;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 25px;
  font-family: Noto Sans Kr;
  font-weight: bold;
  font-size: 18px;
  color: #fff;
  transform: translateX(-50%);
  z-index: 50;
  cursor: pointer;
  svg {
    margin-left: 5px;
  }
`;

type IStep = 1 | 2 | 3 | 4 | 5;

const bubbleVariants: Variants & Object = {
  animate: (step: IStep) => ({
    transform: "translateX(-50%)",
    ...(step <= 2
      ? { top: 60, bottom: "auto" }
      : { bottom: step <= 4 ? 200 : 100, top: "auto" }),
  }),
};

const NewbieIntro = () => {
  const [isNewbie, setIsNewbie] = useRecoilState(isNewbieAtom);
  const [step, setStep] = useState<IStep>(1);

  const nextStep = () => {
    if (step < 5) return setStep((old) => (old + 1) as IStep);
    setIsNewbie(false);
  };

  const makeText = (step: IStep) => {
    switch (step) {
      case 1:
        return (
          <span>
            환영의 인사로 <strong>코인 5개</strong>를 선물로 드려요! 코인은
            편지를 읽을 때 사용되요
          </span>
        );
      case 2:
        return (
          <span>
            타인에게 <strong>편지를 쓰거나 답장을 보내면</strong> 코인을 얻을 수
            있어요!
          </span>
        );
      case 3:
        return (
          <span>
            뽑기통의 캡슐엔 <strong>누군가가 쓴 편지</strong>가 담겨있어요
          </span>
        );
      case 4:
        return (
          <span>
            읽고 싶은 캡술을 선택하면 <strong>코인 2개</strong>가 소진돼요
          </span>
        );
      case 5:
        return (
          <span>
            링크를 클릭하면 복사가 돼요 다른 사람에게{" "}
            <strong>링크를 공유</strong>해 보세요!
          </span>
        );
    }
  };

  return (
    <Frame>
      <AnimatePresence>
        <Bubble
          custom={step}
          variants={bubbleVariants}
          animate="animate"
          layoutId="bubble"
          onClick={nextStep}
        >
          {makeText(step)}
        </Bubble>
        {step <= 2 && (
          <CoinCount>
            <span>COIN POINT</span>
            <span>0005</span>
          </CoinCount>
        )}

        <AnimatePresence>
          {step > 2 && step < 5 && (
            <Capsule
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Line />
              <CapsuleLight src="/images/capsule-light.png" />
            </Capsule>
          )}
        </AnimatePresence>

        {step === 5 && (
          <CopyURL>
            <strong>링크 복사하기</strong>
            <FontAwesomeIcon icon={faLink} />
          </CopyURL>
        )}
      </AnimatePresence>
    </Frame>
  );
};

export default NewbieIntro;
