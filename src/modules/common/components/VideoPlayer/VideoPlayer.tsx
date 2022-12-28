/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-redundant-roles */
import { useState, memo, useEffect, useReducer, Fragment } from "react";
import { Context, initState, reducer, useInitEffect } from "../../utils/hooks";
import Controls from "./Controls";
import Setting from "./Setting";
import { VideoContainer, VideoWrapper } from "./StyledComponents";
import Video from "./Video";
import VideoEffect from "./VideoEffect";
function VideoPlayer({ url, autoPlay, customRef, muted, title }: Props) {
  const [volume, setVolume] = useState(muted ? 0 : 100);
  const [mute, setMute] = useState(muted);
  const [key, setKey] = useState(url);
  useEffect(() => {
    setKey(url);
  }, [url]);
  return (
    <Render
      url={url}
      autoPlay={autoPlay}
      key={key}
      volume={volume}
      setVolume={setVolume}
      customRef={customRef}
      mute={mute}
      title={title}
      setMute={setMute}
    />
  );
}

export default memo(VideoPlayer);

const Render = (props: RenderProps) => {
  const { url, autoPlay, volume, setVolume, customRef, mute, title, setMute } =
    props;
  const [state, dispatch] = useReducer(reducer, initState);
  const [
    handleMouseMove,
    handleDoubleClick,
    handleReplayVideo,
    handleMouseLeave,
    handleShowControls,
    handleClickVideo,
    containerRef,
    wrapperRef,
    handleFullScreen,
    handlePlayVideo,
    videoRef,
    handleSeek,
    holdControlsShow,
    handleClickSetting,
  ] = useInitEffect(customRef, state, dispatch);
  const { containerWidth, isError, device } = state;
  // const isTouchAble = device === "TOUCH";
  // const wrapperClassName = `video-wrapper ${
  //   isTouchAble ? "video-wrapper-is-mobile" : ""
  // } ${
  //   containerWidth < 400 && !isTouchAble ? "video-wrapper-need-zoom-2" : ""
  // } ${
  //   (containerWidth < 500 && !isTouchAble) ||
  //   (containerWidth < 340 && isTouchAble)
  //     ? "video-wrapper-need-zoom-1"
  //     : ""
  // }`;
  return (
    <Context.Provider value={{ state, dispatch }}>
      <VideoContainer ref={containerRef}>
        <VideoWrapper
          ref={wrapperRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {!isError && (
            <Fragment>
              <VideoEffect
                title={title}
                handleFullScreen={handleFullScreen}
                handlePlayVideo={handlePlayVideo}
                handleReplayVideo={handleReplayVideo}
              />
              <Video
                videoRef={videoRef}
                handleDoubleClick={handleDoubleClick}
                handleClickVideo={handleClickVideo}
                mute={mute}
                autoPlay={autoPlay}
                url={url}
              />
              <Controls
                handleSeek={handleSeek}
                videoRef={videoRef}
                mute={mute}
                setMute={setMute}
                setVolume={setVolume}
                holdControlsShow={holdControlsShow}
                handlePlayVideo={handlePlayVideo}
                volume={volume}
                handleFullScreen={handleFullScreen}
                handleShowControls={handleShowControls}
                handleClickSetting={handleClickSetting}
              />
              <Setting videoRef={videoRef} />
            </Fragment>
          )}
        </VideoWrapper>
      </VideoContainer>
    </Context.Provider>
  );
};

type RenderProps = {
  url: string;
  customRef?: any;
  autoPlay?: boolean;
  volume?: any;
  setVolume?: any;
  mute?: boolean;
  title?: string;
  setMute?: any;
};
type Props = {
  url: string;
  customRef?: any;
  autoPlay?: boolean;
  setVolume?: any;
  muted?: boolean;
  title?: string;
};
