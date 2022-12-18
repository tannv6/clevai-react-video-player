import { memo } from "react";
import "./playEffect.scss";
type Props = {
  isPlay?: boolean;
};
function PlayEffect({ isPlay }: Props) {
  return (
    <div className="play-effect-container">
      {isPlay && (
        <div className="play-effect-wrapper">
          <div className="play-icon"></div>
        </div>
      )}
      {!isPlay && (
        <div className="play-effect-wrapper">
          <div className="pause-icon">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(PlayEffect);
