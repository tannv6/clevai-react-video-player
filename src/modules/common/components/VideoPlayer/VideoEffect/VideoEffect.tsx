import PlayButton from "../PlayButton";
import PlayEffect from "../PlayEffect";
import ReplayButton from "../ReplayButton";
import SeekEffect from "../SeekEffect";
import SpinnerLoading from "../SpinnerLoading";
import VideoTitle from "../VideoTitle";

function VideoEffect({
  title,
  controlsShow,
  isFullScreen,
  handleFullScreen,
  loading,
  isPlay,
  isTouchAble,
  loaded,
  isEffectPlay,
  handlePlayVideo,
  isEnded,
  showEffect,
  seekEffect,
  handleReplayVideo,
}: any) {
  return (
    <>
      <VideoTitle
        title={title || ""}
        controlsShow={controlsShow}
        isFullScreen={isFullScreen}
        handleFullScreen={handleFullScreen}
      />
      {((loading && isPlay) || !loaded) && (
        <SpinnerLoading className="video-player-loading" />
      )}
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
