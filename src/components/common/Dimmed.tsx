import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { popupAtom } from "../../atom/atom";

import { AnimatePresence, Variants, motion } from "framer-motion";
import React, { ReactNode } from "react";

const DimmedTag = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 110;
  background-color: rgba(0, 0, 0, 0.6);
`;

const dimmedVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

interface DimmedProps {
  children: ReactNode;
}

const Dimmed = ({ children }: DimmedProps) => {
  const popup = useRecoilValue(popupAtom);

  return (
    <AnimatePresence>
      {popup.isShow && (
        <DimmedTag
          key="dimmed"
          variants={dimmedVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.15 }}
          onClick={popup.onDimmedClick}
        >
          {children}
        </DimmedTag>
      )}
    </AnimatePresence>
  );
};

export default React.memo(Dimmed);
