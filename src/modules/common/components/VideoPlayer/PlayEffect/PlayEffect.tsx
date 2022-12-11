import { memo, useEffect, useRef, useState } from "react";
import "./playEffect.scss";
type Props = {
  isPlay?: boolean;
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
    } else if (isPlay !== null) {
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
          <div className="play-icon"></div>
        </div>
      )}
      {showPause && (
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
