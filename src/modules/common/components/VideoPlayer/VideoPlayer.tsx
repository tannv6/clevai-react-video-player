/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-redundant-roles */
import { useState, memo, useEffect } from "react";
import { useInitEffect } from "../../utils/hooks";
import Controls from "./Controls";
import Setting from "./Setting";
import Video from "./Video";
import VideoEffect from "./VideoEffect";
import "./videoPlayer.scss";
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

const Render = ({
  url,
  autoPlay,
  volume,
  setVolume,
  customRef,
  mute,
  title,
  setMute,
}: RenderProps) => {
  const [
    range,
    isFullScreen,
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
    isTouchAble,
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
    isEffectPlay,
    containerWidth,
  ] = useInitEffect(customRef);

  return (
    <div className="video-player-container" ref={containerRef}>
      <div
        className={`video-wrapper ${
          isTouchAble ? "video-wrapper-is-mobile" : ""
        } ${
          containerWidth < 400 && !isTouchAble
            ? "video-wrapper-need-zoom-2"
            : ""
        } ${
          (containerWidth < 500 && !isTouchAble) ||
          (containerWidth < 340 && isTouchAble)
            ? "video-wrapper-need-zoom-1"
            : ""
        }`}
        ref={wrapperRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {!isError && (
          <>
            <VideoEffect
              {...{
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
              }}
            />
            <Video
              {...{
                videoRef,
                handleDoubleClick,
                handleClickVideo,
                mute,
                setLoading,
                setIsError,
                autoPlay,
                setIsPlay,
                setLoaded,
                setIsEnded,
                url,
              }}
            />
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
              isMobile={isTouchAble}
            />
          </>
        )}
      </div>
    </div>
  );
};
