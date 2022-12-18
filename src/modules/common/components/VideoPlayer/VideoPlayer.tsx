/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-redundant-roles */
import { useEffect, useRef, useState, memo } from "react";
import { MOBILE_WIDTH } from "../../utils/constants";
import { isTouchDevice } from "../../utils/functions";
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const videoRef = ref ? ref : useRef<HTMLVideoElement>(null);
  const timerShowControls = useRef<any>(null);
  const timeStart = useRef(0);
  const [controlsShow, setControlsShow] = useState(false);
  const [range, setRange] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [mute, setMute] = useState(muted);
  const [isPip, setIsPip] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPlay, setIsPlay] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_WIDTH);
  const [isError, setIsError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [timeClock, setTimeClock] = useState(0);
  const [device, setDevice] = useState<"TOUCH" | "NO_TOUCH">(
    isTouchDevice() ? "TOUCH" : "NO_TOUCH"
  );
  const timerClickRef = useRef<any>(null);
  const [showEffect, setShowEffect] = useState(false);
  const timerShowPlayEffectRef = useRef<any>(null);
  const playEffect = () => {
    setShowEffect(true);
    clearTimeout(timerShowPlayEffectRef.current);
    timerShowPlayEffectRef.current = setTimeout(() => {
      setShowEffect(false);
    }, 500);
  };
  const [seekEffect, setSeekEffect] = useState<{
    show: boolean;
    type: "BACKWARD" | "FORWARD" | "";
    key: number;
  }>({
    show: false,
    type: "",
    key: 0,
  });

  const isTouchAble = device === "TOUCH";
  const shouldIsMobile = isTouchAble || isMobile;
  // const mustIsMobile = isTouchAble && isMobile;

  useEffect(() => {
    if (controlsShow) {
      if (isTouchDevice()) {
        setDevice("TOUCH");
      } else {
        setDevice("NO_TOUCH");
      }
    }
  }, [controlsShow]);
  const handlePlayVideo = () => {
    holdControlsShow();
    if (videoRef.current?.paused || videoRef.current?.ended) {
      videoRef.current?.play();
      playEffect();
    } else {
      videoRef.current?.pause();
      playEffect();
    }
  };

  const handleReplayVideo = () => {
    holdControlsShow();
    videoRef.current?.play();
  };

  const handleShowControls = () => {
    clearTimeout(timerShowControls.current);
    setControlsShow(true);
  };

  const handleClickVideo = (e: any) => {
    e.preventDefault();
    holdControlsShow();
    if (showSetting) {
      setShowSetting(false);
    } else {
      if (controlsShow && !shouldIsMobile) {
        if (videoRef.current?.paused || videoRef.current?.ended) {
          videoRef.current?.play();
          playEffect();
        } else {
          videoRef.current?.pause();
          playEffect();
        }
      } else {
        if (e.detail === 1) {
          timerClickRef.current = setTimeout(() => {
            if (controlsShow && shouldIsMobile) {
              clearTimeout(timerShowControls.current);
              setControlsShow(false);
            } else if (!controlsShow && shouldIsMobile) {
              setControlsShow(true);
            }
          }, 250);
        } else {
          clearTimeout(timerClickRef.current);
        }
      }
    }
  };

  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else if (!document.fullscreenElement) {
      if ((document as any).webkitFullscreenElement) {
        (document as any).webkitExitFullscreen();
        setIsFullScreen(true);
      } else if ((wrapperRef?.current as any)?.webkitRequestFullscreen) {
        (wrapperRef?.current as any)?.webkitRequestFullscreen();
        setIsFullScreen(true);
      } else {
        wrapperRef?.current?.requestFullscreen();
        setIsFullScreen(true);
      }
    }
  };

  const holdControlsShow = () => {
    clearTimeout(timerShowControls.current);
    if (!showSetting && !videoRef.current?.paused) {
      timeStart.current = Date.now();
      timerShowControls.current = setTimeout(() => {
        setControlsShow(false);
      }, 6000);
    }
  };

  const handleMouseMove = (e: any) => {
    e.preventDefault();
    if (!(e.target.id || "")?.includes("progress")) {
      if (!controlsShow) {
        setControlsShow(true);
        holdControlsShow();
      } else if (Date.now() - timeStart.current < 6000) {
        holdControlsShow();
      }
    }
  };

  const handleMouseLeave = () => {
    if (!showSetting && !videoRef.current?.paused) {
      clearTimeout(timerShowControls.current);
      setControlsShow(false);
    }
  };

  const handleSeek = (type: "FORWARD" | "BACKWARD") => {
    holdControlsShow();
    if (type === "FORWARD") {
      if (
        videoRef.current?.currentTime ||
        videoRef.current?.currentTime === 0
      ) {
        videoRef.current.currentTime = videoRef.current?.currentTime! + 10;
        setTimeClock(videoRef.current.currentTime || 0);
        const total = videoRef.current?.duration;
        setRange((range) => range + (10 / total) * 100);
        setSeekEffect({
          show: true,
          type: "FORWARD",
          key: Math.random(),
        });
      }
    } else {
      if (videoRef.current?.currentTime) {
        videoRef.current.currentTime = videoRef.current?.currentTime! - 10;
        setTimeClock(videoRef.current.currentTime || 0);
        const total = videoRef.current?.duration;
        setRange((range) => range - (10 / total) * 100);
        setSeekEffect({
          show: true,
          type: "BACKWARD",
          key: Math.random(),
        });
      }
    }
  };

  const handleDOMFocusIn = (e: any) => {
    if (
      !containerRef.current?.contains(e.target) &&
      e.target.tagName === "INPUT"
    ) {
      window.removeEventListener("keydown", handleKeyDown);
    }
  };

  const handleDOMFocusOut = (e: any) => {
    if (
      !containerRef.current?.contains(e.target) &&
      e.target.tagName === "INPUT"
    ) {
      window.removeEventListener("keydown", handleKeyDown);
      window.addEventListener("keydown", handleKeyDown);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "ArrowRight") {
      setControlsShow(true);
      handleSeek("FORWARD");
      e.preventDefault();
    } else if (e.code === "ArrowLeft") {
      setControlsShow(true);
      handleSeek("BACKWARD");
      e.preventDefault();
    } else if (e.code === "Space") {
      setControlsShow(true);
      handlePlayVideo();
    }
  };

  useEffect(() => {
    if (isPlay) {
      setIsEnded(false);
    }
  }, [isPlay]);

  const handleResize = () => {
    if (containerRef.current?.offsetWidth! <= MOBILE_WIDTH) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const handleClickOutSite = (e: any) => {
    if (!containerRef.current?.contains(e.target as any)) {
      clearTimeout(timerShowControls.current);
      setControlsShow(false);
      setShowSetting(false);
    }
  };

  const onFullScreenChange = (e: any) => {
    if (
      !(document as any).webkitIsFullScreen &&
      !(document as any).mozFullScreen &&
      !(document as any).msFullscreenElement
    ) {
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("focusout", handleDOMFocusOut);
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleDOMFocusIn);
    const handleLeavePip = () => {
      setIsPip(false);
    };
    videoRef.current?.addEventListener("leavepictureinpicture", handleLeavePip);
    window.addEventListener("click", handleClickOutSite);
    document.addEventListener("fullscreenchange", onFullScreenChange, false);
    document.addEventListener("mozfullscreenchange", onFullScreenChange, false);
    document.addEventListener("MSFullscreenChange", onFullScreenChange, false);
    document.addEventListener(
      "webkitfullscreenchange",
      onFullScreenChange,
      false
    );

    return () => {
      window.removeEventListener("focusout", handleDOMFocusOut);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleDOMFocusIn);
      document.removeEventListener("fullscreenchange", onFullScreenChange);
      document.removeEventListener(
        "mozfullscreenchange",
        onFullScreenChange,
        false
      );
      document.removeEventListener(
        "MSFullscreenChange",
        onFullScreenChange,
        false
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        onFullScreenChange,
        false
      );
      videoRef.current?.removeEventListener(
        "leavepictureinpicture",
        handleLeavePip
      );
      window.removeEventListener("click", handleClickOutSite);
    };
  }, []);

  const handleClickSetting = () => {
    if (showSetting) {
      setShowSetting(false);
    } else {
      setShowSetting(true);
      clearTimeout(timerShowControls.current);
    }
  };

  const handleDoubleClick = (e: any) => {
    if (!shouldIsMobile) {
      handleFullScreen();
    } else {
      const videoOffsetX =
        e.target?.getBoundingClientRect()?.left! -
        document.documentElement.getBoundingClientRect().left;
      if (e.clientX < videoOffsetX + e.target.clientWidth / 2) {
        handleSeek("BACKWARD");
      } else {
        handleSeek("FORWARD");
      }
    }
  };

  return (
    <div
      className="video-player-container"
      id="video-player-container"
      ref={containerRef}
    >
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
