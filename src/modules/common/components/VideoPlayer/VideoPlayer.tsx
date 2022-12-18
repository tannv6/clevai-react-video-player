/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-redundant-roles */
import { useState, memo } from "react";
import { useInitEffect } from "../../utils/hooks";
import Controls from "./Controls";
import PlayButton from "./PlayButton";

import PlayEffect from "./PlayEffect";
import ReplayButton from "./ReplayButton";
import SeekEffect from "./SeekEffect";
import Setting from "./Setting";
import SpinnerLoading from "./SpinnerLoading";
import "./videoPlayer.scss";
import VideoTitle from "./VideoTitle";
type RenderProps = {
  url: string;
  ref?: any;
  autoPlay?: boolean;
  volume?: any;
  setVolume?: any;
  muted?: boolean;
  title?: string;
};
type Props = {
  url: string;
  ref?: any;
  autoPlay?: boolean;
  setVolume?: any;
  muted?: boolean;
  title?: string;
};
function VideoPlayer({ url, autoPlay, ref, muted, title }: Props) {
  const [volume, setVolume] = useState(muted ? 0 : 100);
  return (
    <Render
      url={url}
      autoPlay={autoPlay}
      key={url}
      volume={volume}
      setVolume={setVolume}
      ref={ref}
      muted={muted}
      title={title}
    />
  );
}

export default memo(VideoPlayer);

const Render = ({
  url,
  autoPlay,
  volume,
  setVolume,
  ref,
  muted,
  title,
}: RenderProps) => {
  const [
    range,
    isFullScreen,
    mute,
    setMute,
    isPip,
    loading,
    setLoading,
    setIsPlay,
    isError,
    setIsError,
    loaded,
    setLoaded,
    handleMouseMove,
    handleClickSetting,
    handleDoubleClick,
    handleReplayVideo,
    handleMouseLeave,
    handleShowControls,
    handleClickVideo,
    isEnded,
    timeClock,
    showEffect,
    seekEffect,
    containerRef,
    shouldIsMobile,
    wrapperRef,
    controlsShow,
    handleFullScreen,
    handlePlayVideo,
    isPlay,
    videoRef,
    setIsEnded,
    showSetting,
    handleSeek,
    setRange,
    holdControlsShow,
    setIsPip,
    setShowSetting,
    device,
    setDevice,
    setTimeClock,
  ] = useInitEffect({ ref, muted });
  return (
    <div className="video-player-container" ref={containerRef}>
      <div
        className={`video-wrapper ${
          shouldIsMobile ? "video-wrapper-is-mobile" : ""
        }`}
        ref={wrapperRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {!isError && (
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
            {shouldIsMobile && loaded && (controlsShow || !isPlay) ? (
              <PlayButton isPlay={isPlay} onClick={handlePlayVideo} />
            ) : !shouldIsMobile && loaded && !isEnded && showEffect ? (
              <PlayEffect isPlay={!videoRef.current?.paused} />
            ) : (
              <></>
            )}
            {!shouldIsMobile && (
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
            <video
              ref={videoRef}
              onDoubleClick={handleDoubleClick}
              onClick={handleClickVideo}
              onContextMenu={(e) => e.preventDefault()}
              muted={mute}
              onLoadStart={() => {
                setLoading(true);
              }}
              onCanPlay={() => {
                setLoading(false);
                setIsError(false);
              }}
              autoPlay={autoPlay}
              onWaiting={() => {
                setLoading(true);
              }}
              onPlay={() => {
                setIsPlay(true);
              }}
              onPause={() => {
                setIsPlay(false);
              }}
              onError={() => {
                setIsError(true);
              }}
              onLoadedMetadata={() => {
                setLoaded(true);
              }}
              onEnded={() => {
                setIsEnded(true);
              }}
            >
              <source src={url} type="video/mp4" />
            </video>
            <Controls
              {...{
                controlsShow,
                range,
                handleSeek,
                videoRef,
                mute,
                setMute,
                setVolume,
                setRange,
                holdControlsShow,
                setIsPip,
                handlePlayVideo,
                volume,
                isPip,
                handleFullScreen,
                isFullScreen,
                handleClickSetting,
                showSetting,
                setShowSetting,
                device,
                setDevice,
                timeClock,
                setTimeClock,
                handleShowControls,
              }}
            />
            <Setting
              videoRef={videoRef}
              showSetting={showSetting}
              setShowSetting={setShowSetting}
              isMobile={shouldIsMobile}
            />
          </>
        )}
      </div>
    </div>
  );
};
