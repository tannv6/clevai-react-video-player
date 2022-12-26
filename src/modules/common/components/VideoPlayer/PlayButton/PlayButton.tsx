import { Context } from "../../../utils/hooks";
import { useContext } from "react";
import "./playButton.scss";
type Props = {
  onClick: any;
};
function PlayButton({ onClick }: Props) {
  const { controlsShow, isPlay, loaded, device } = useContext(Context).state;
  const show = device === "TOUCH" && loaded && (controlsShow || !isPlay);
  return show ? (
    <div className="play-button-container" onClick={onClick}>
      {isPlay ? (
        <div className="pause-button">
          <div></div>
          <div></div>
        </div>
      ) : (
        <div className="play-button"></div>
      )}
    </div>
  ) : (
    <></>
  );
}

export default PlayButton;
