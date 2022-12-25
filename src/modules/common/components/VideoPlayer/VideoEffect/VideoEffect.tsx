import PlayButton from "../PlayButton";
import PlayEffect from "../PlayEffect";
import ReplayButton from "../ReplayButton";
import SeekEffect from "../SeekEffect";
import SpinnerLoading from "../SpinnerLoading";
import VideoTitle from "../VideoTitle";
import { useContext } from "react";
import { Context } from "../../../utils/hooks";
function VideoEffect({
  title,
  handleFullScreen,
  handlePlayVideo,
  handleReplayVideo,
}: any) {
  const {
    state: {
      seekEffect,
      controlsShow,
      loading,
      isPlay,
      loaded,
      isEffectPlay,
      isEnded,
      showEffect,
      device,
    },
  } = useContext(Context);
  const isTouchAble = device === "TOUCH";
  return (
    <>
      <VideoTitle title={title || ""} handleFullScreen={handleFullScreen} />
      {((loading && isPlay) || !loaded) && <SpinnerLoading />}
      {isTouchAble && loaded && (controlsShow || !isPlay) ? (
        <PlayButton isPlay={isPlay} onClick={handlePlayVideo} />
      ) : !isTouchAble && loaded && !isEnded && showEffect ? (
        <PlayEffect isPlay={isEffectPlay} />
      ) : (
        <></>
      )}
      {!isTouchAble && (
        <ReplayButton isEnded={isEnded} onReplay={handleReplayVideo} />
      )}
      {seekEffect.show && seekEffect.type === "FORWARD" && (
        <SeekEffect
          time={10}
          timeUnit={"SECOND"}
          className="seek-forward"
          type="FORWARD"
          key={seekEffect.key}
        />
      )}
      {seekEffect.show && seekEffect.type === "BACKWARD" && (
        <SeekEffect
          time={10}
          timeUnit={"SECOND"}
          className="seek-backward"
          type="BACKWARD"
          key={seekEffect.key}
        />
      )}
    </>
  );
}

export default VideoEffect;
