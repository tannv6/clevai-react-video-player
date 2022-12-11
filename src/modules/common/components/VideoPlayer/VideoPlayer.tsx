/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-redundant-roles */
import { useEffect, useRef, useState, memo } from "react";
import Controls from "./Controls";
import PlayButton from "./PlayButton";

import PlayEffect from "./PlayEffect";
import SeekEffect from "./SeekEffect";
import SpinnerLoading from "./SpinnerLoading";
import "./videoPlayer.scss";
type Props = {
  url: string;
  ref?: any;
  autoPlay?: boolean;
  volume?: any;
  setVolume?: any;
};
function VideoPlayer({ url, autoPlay }: Props) {
  const [volume, setVolume] = useState(100);
  return (
    <Render
      url={url}
      autoPlay={autoPlay}
      key={url}
      volume={volume}
      setVolume={setVolume}
    />
  );
}

export default memo(VideoPlayer);

const Render = ({ url, autoPlay, volume, setVolume }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerShowControls = useRef<any>(null);
  const timeStart = useRef(0);
  const [controlsShow, setControlsShow] = useState(false);
  const [range, setRange] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [mute, setMute] = useState(false);
  const [isPip, setIsPip] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPlay, setIsPlay] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isError, setIsError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [seekEffect, setSeekEffect] = useState<{
    show: boolean;
    type: "BACKWARD" | "FORWARD" | "";
    key: number;
  }>({
    show: false,
    type: "",
    key: 0,
  });

  const handlePlayVideo = (e?: any) => {
    e?.preventDefault();
    holdControlsShow();
    if (videoRef.current?.paused || videoRef.current?.ended) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };
  const handleClickVideo = (e?: any) => {
    e?.preventDefault();
    holdControlsShow();
    if (controlsShow && !isMobile) {
      if (videoRef.current?.paused || videoRef.current?.ended) {
        videoRef.current?.play();
      } else {
        videoRef.current?.pause();
      }
    } else if (controlsShow && isMobile) {
      setControlsShow(false);
    } else if (!controlsShow && isMobile) {
      setControlsShow(true);
    }
  };

  const handleExitFull = () => {
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
    timerShowControls.current && clearTimeout(timerShowControls.current);
    timerShowControls.current = null;
    timeStart.current = Date.now();
    timerShowControls.current = setTimeout(() => {
      setControlsShow(false);
    }, 5000);
  };

  const handleMouseMove = () => {
    if (!isMobile) {
      if (!controlsShow) {
        setControlsShow(true);
        timeStart.current = Date.now();
        timerShowControls.current = setTimeout(() => {
          setControlsShow(false);
        }, 5000);
      } else if (Date.now() - timeStart.current < 5000) {
        holdControlsShow();
      }
    }
  };

  const handleSeek = (type: "FORWARD" | "BACKWARD") => {
    holdControlsShow();
    if (type === "FORWARD") {
      if (videoRef.current?.currentTime) {
        videoRef.current.currentTime = videoRef.current?.currentTime! + 10;
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

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
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
    if (videoRef.current?.volume || videoRef.current?.volume === 0) {
      videoRef.current.volume = volume / 100;
    }
    return () => {
      window.removeEventListener("focusout", handleDOMFocusOut);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleDOMFocusIn);
      videoRef.current?.removeEventListener(
        "leavepictureinpicture",
        handleLeavePip
      );
    };
  }, []);

  const handleMouseLeave = () => {
    timerShowControls.current && clearTimeout(timerShowControls.current);
    timerShowControls.current = null;
    setControlsShow(false);
  };

  return (
    <div
      className="video-player-container"
      id="video-player-container"
      ref={containerRef}
    >
      <div
        className={`video-wrapper ${isMobile ? "video-wrapper-is-mobile" : ""}`}
        ref={wrapperRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {!isError && (
          <>
            {((loading && isPlay) || !loaded) && (
              <SpinnerLoading className="video-player-loading" />
            )}
            {isMobile && loaded && (controlsShow || !isPlay) ? (
              <PlayButton isPlay={isPlay} onClick={handlePlayVideo} />
            ) : !isMobile && loaded ? (
              <PlayEffect isPlay={isPlay} />
            ) : (
              <></>
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
              onDoubleClick={handleExitFull}
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
                handleExitFull,
                isFullScreen,
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};
