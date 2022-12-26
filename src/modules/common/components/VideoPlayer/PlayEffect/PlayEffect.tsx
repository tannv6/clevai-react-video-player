import { memo, useContext } from "react";
import { Context } from "../../../utils/hooks";
import "./playEffect.scss";

function PlayEffect() {
  const { loaded, isEffectPlay, isEnded, showEffect, device } =
    useContext(Context).state;
  const show = device !== "TOUCH" && loaded && !isEnded && showEffect;
  return show ? (
    <div className="play-effect-container">
      {isEffectPlay && (
        <div className="play-effect-wrapper">
          <div className="play-icon"></div>
        </div>
      )}
      {!isEffectPlay && (
        <div className="play-effect-wrapper">
          <div className="pause-icon">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
}

export default memo(PlayEffect);
