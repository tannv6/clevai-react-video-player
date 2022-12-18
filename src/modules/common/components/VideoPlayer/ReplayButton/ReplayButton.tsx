import { IconReplay } from "../../../assets/icons";
import "./replayButton.scss";
type Props = {
  isEnded: any;
  onReplay: any;
};
function ReplayButton({ isEnded, onReplay }: Props) {
  return (
    isEnded && (
      <button className="btn-replay" onClick={onReplay}>
        <img src={IconReplay} alt="" />
      </button>
    )
  );
}

export default ReplayButton;
