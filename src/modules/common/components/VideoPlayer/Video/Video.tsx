import { useContext } from "react";
import { ACTIONS_TYPE, Context } from "../../../utils/hooks";
import { VideoElement } from "../StyledComponents";
function Video({
  videoRef,
  handleDoubleClick,
  handleClickVideo,
  mute,
  autoPlay,
  url,
}: any) {
  const { dispatch } = useContext(Context);
  return (
    <VideoElement
      ref={videoRef}
      onDoubleClick={handleDoubleClick}
      onClick={handleClickVideo}
      onContextMenu={(e) => e.preventDefault()}
      muted={mute}
      onLoadStart={() => {
        dispatch({ type: ACTIONS_TYPE.SET_LOADING, res: true });
      }}
      onCanPlay={() => {
        dispatch({ type: ACTIONS_TYPE.SET_LOADING, res: false });
        dispatch({ type: ACTIONS_TYPE.SET_IS_ERROR, res: false });
      }}
      autoPlay={autoPlay}
      onWaiting={() => {
        dispatch({ type: ACTIONS_TYPE.SET_LOADING, res: true });
      }}
      onPlay={() => {
        dispatch({ type: ACTIONS_TYPE.SET_IS_PLAY, res: true });
      }}
      onPause={() => {
        dispatch({ type: ACTIONS_TYPE.SET_IS_PLAY, res: false });
      }}
      onError={() => {
        dispatch({ type: ACTIONS_TYPE.SET_IS_ERROR, res: true });
      }}
      onLoadedMetadata={() => {
        dispatch({ type: ACTIONS_TYPE.SET_LOADED, res: true });
      }}
      onEnded={() => {
        dispatch({ type: ACTIONS_TYPE.SET_IS_ENDED, res: true });
      }}
    >
      <source src={url} type="video/mp4" />
    </VideoElement>
  );
}

export default Video;
