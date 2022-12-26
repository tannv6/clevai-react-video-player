import { IconReplay } from "../../../assets/icons";
import { useContext } from "react";
import "./replayButton.scss";
import { Context } from "../../../utils/hooks";
type Props = {
  onReplay: any;
};
function ReplayButton({ onReplay }: Props) {
  const { isEnded, device } = useContext(Context).state;
  const isTouchAble = device === "TOUCH";
  const show = !isTouchAble;
  return isEnded && show ? (
    <button className="btn-replay" onClick={onReplay}>
      <img src={IconReplay} alt="" />
    </button>
  ) : (
    <></>
  );
}

export default ReplayButton;
