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
  const { seekEffect } = useContext(Context).state;
  return (
    <>
      <VideoTitle title={title || ""} handleFullScreen={handleFullScreen} />
      <SpinnerLoading />
      <PlayButton onClick={handlePlayVideo} />
      <PlayEffect />
      <ReplayButton onReplay={handleReplayVideo} />
      <SeekEffect time={10} timeUnit={"SECOND"} key={seekEffect.key} />
    </>
  );
}

export default VideoEffect;
