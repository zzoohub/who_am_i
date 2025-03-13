import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { INIT_POPUP, IPopup, popupAtom, closePopup } from "../../atom/atom";
import { MouseEventHandler, useCallback } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";

const PopupLayout = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 320px;
  aspect-ratio: 4 / 3;
  padding: 20px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid #030138;
  background: #fff;
  z-index: 99;
`;

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

const Title = styled.strong``;
const CapsuleImg = styled(Img)`
  height: 55px;
  margin-top: 10px;
`;
const Content = styled.p`
  color: #000;
  text-align: center;
  font-size: 18px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  white-space: pre-line;
`;
const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 15px;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 14px;
  border: none;
  color: var(--white, #fff);
  text-align: center;
  font-size: 20px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
`;

const popupVariants: Variants = {
  initial: {
    x: "-50%",
    y: "-50%",
    scale: 0,
    opacity: 0,
  },
  animate: {
    x: "-50%",
    y: "-50%",
    scale: 1,
    opacity: 1,
  },
  exit: {
    x: "-50%",
    y: "-50%",
    opacity: 0,
    transition: {
      duration: 0.05,
    },
  },
};

const DefaultPopup = () => {
  const [popup, setPopup] = useRecoilState(popupAtom);
  const onReject: MouseEventHandler = useCallback(
    (event) => {
      if (popup.onReject) popup.onReject(event);
      setPopup(closePopup());
    },
    [popup, setPopup]
  );

  const onConfirm: MouseEventHandler = useCallback(
    (event) => {
      if (popup.onConfirm) popup.onConfirm(event);
      setPopup((popup: IPopup) => ({ ...popup, ...INIT_POPUP }));
    },
    [popup, setPopup]
  );

  return (
    <AnimatePresence>
      {popup.isShow && (
        <PopupLayout
          key="popup"
          variants={popupVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: "spring", duration: 0.1 }}
        >
          {popup.title ? (
            <Title>{popup.title}</Title>
          ) : (
            <CapsuleImg src="/images/capsule.png" alt="capsule" />
          )}

          <Content>{popup.content || "일시적인 오류가 발생했습니다."}</Content>
          <Buttons>
            {popup.numberOfButton === 2 && (
              <Button style={{ backgroundColor: "#CCCACA" }} onClick={onReject}>
                {popup.rejectText || "취소"}
              </Button>
            )}
            <Button style={{ backgroundColor: "#5571EE" }} onClick={onConfirm}>
              {popup.confirmText || "확인"}
            </Button>
          </Buttons>
        </PopupLayout>
      )}
    </AnimatePresence>
  );
};

export default DefaultPopup;
