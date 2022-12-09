import { memo, useEffect, useRef, useState } from "react";
import { IconPause, IconPlay } from "../../../assets/icons";
import "./playEffect.scss";
type Props = {
  isPlay: boolean;
};
function PlayEffect({ isPlay }: Props) {
  const [showPlay, setShowPlay] = useState(false);
  const [showPause, setShowPause] = useState(false);
  const timerPlayRef = useRef<any>(null);
  const timerPauseRef = useRef<any>(null);
  useEffect(() => {
    if (isPlay) {
      setShowPlay(true);
      if (timerPlayRef.current) {
        clearTimeout(timerPlayRef.current);
        timerPlayRef.current = null;
      }
      timerPlayRef.current = setTimeout(() => {
        setShowPlay(false);
      }, 400);
    } else {
      setShowPause(true);
      if (timerPauseRef.current) {
        clearTimeout(timerPauseRef.current);
        timerPauseRef.current = null;
      }
      timerPauseRef.current = setTimeout(() => {
        setShowPause(false);
      }, 400);
    }
  }, [isPlay]);
  return (
    <div className="play-effect-container">
      {showPlay && (
        <div className="play-effect-wrapper">
          <img src={IconPlay} alt="" />{" "}
        </div>
      )}
      {showPause && (
        <div className="play-effect-wrapper">
          <img src={IconPause} alt="" />{" "}
        </div>
      )}
    </div>
  );
}

export default memo(PlayEffect);
