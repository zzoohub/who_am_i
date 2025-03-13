import { useRecoilValue } from "recoil";
import { popupAtom } from "../../atom/atom";
import Dimmed from "./Dimmed";
import DefaultPopup from "./DefaultPopup";

const PopupWrap = () => {
  const popup = useRecoilValue(popupAtom);

  return (
    <>
      {popup.isShow && popup.withDimmed ? (
        <Dimmed>{popup.element ? popup.element : <DefaultPopup />}</Dimmed>
      ) : popup.isShow && popup.element ? (
        popup.element
      ) : (
        popup.isShow && <DefaultPopup />
      )}
    </>
  );
};

export default PopupWrap;
