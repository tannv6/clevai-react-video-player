/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-redundant-roles */
import { useEffect, useRef, useState } from "react";
import {
  IconExitFullScreen,
  IconEXitPip,
  IconFullScreen,
  IconMute,
  IconPause,
  IconPip,
  IconPlay,
  IconRewind,
  IconVolume,
} from "../../assets/icons";
import { formatTime } from "../../utils/functions";
import PlayEffect from "./PlayEffect";
import SeekEffect from "./SeekEffect";
import SpinnerLoading from "./SpinnerLoading";
import "./videoPlayer.scss";
type Props = {
  url: string;
};
function VideoPlayer({ url }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timer = useRef<any>(null);
  const timeStart = useRef(0);
  const [controlsShow, setControlsShow] = useState(false);
  const [timeClock, setTimeClock] = useState(0);
  const timerInput = useRef<any>(null);
  const [range, setRange] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(0);
  const [isPip, setIsPip] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [seekEffect, setSeekEffect] = useState<{
    show: boolean;
    type: "BACKWARD" | "FORWARD" | "";
    key: number;
  }>({
    show: false,
    type: "",
    key: 0,
  });

  useEffect(() => {
    const clock = setInterval(() => {
      setTimeClock(videoRef.current?.currentTime || 0);
    }, 1000);
    timerInput.current = setInterval(() => {
      const total = videoRef.current?.duration;
      const pro1 = (videoRef.current?.currentTime! / total!) * 100;
      setRange(pro1);
    }, 1000);
    return () => {
      clearInterval(clock);
      clearInterval(timerInput.current);
    };
  }, []);

  const handlePlayVideo = (e?: any) => {
    e?.preventDefault();
    holdControlsShow();
    setIsPlay((isPlay) => !isPlay);
    if (videoRef.current?.paused || videoRef.current?.ended) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
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

  const handleMouseMove = () => {
    if (!controlsShow) {
      setControlsShow(true);
      timeStart.current = Date.now();
      timer.current = setTimeout(() => {
        setControlsShow(false);
      }, 5000);
    } else if (Date.now() - timeStart.current < 5000) {
      holdControlsShow();
    }
  };

  const showControls = () => {
    setControlsShow(true);
  };

  const holdControlsShow = () => {
    timer.current && clearTimeout(timer.current);
    timer.current = null;
    timeStart.current = Date.now();
    timer.current = setTimeout(() => {
      setControlsShow(false);
    }, 5000);
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

  const handleChangeRange = (e: any) => {
    setRange(Number(e.target.value));
    holdControlsShow();
  };

  const handleRangeMouseUp = (e: any) => {
    if (videoRef.current?.currentTime || videoRef.current?.currentTime === 0) {
      const total = videoRef.current?.duration;
      const timeSeek = (e.target.value * total!) / 100;
      videoRef.current.currentTime = timeSeek;
    }
    timerInput.current = setInterval(() => {
      const total = videoRef.current?.duration;
      const pro1 = (videoRef.current?.currentTime! / total!) * 100;
      setRange(pro1);
    }, 1000);
  };

  const handleRangeMouseDown = () => {
    if (timerInput.current) {
      clearInterval(timerInput.current);
      timerInput.current = null;
    }
  };

  const handlePip = async () => {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else {
      await videoRef.current?.requestPictureInPicture();
      setIsPip(true);
    }
  };

  useEffect(() => {
    const handleLeavePip = () => {
      setIsPip(false);
    };
    videoRef.current?.addEventListener("leavepictureinpicture", handleLeavePip);
    return () => {
      videoRef.current?.removeEventListener(
        "leavepictureinpicture",
        handleLeavePip
      );
    };
  }, []);

  const handleSetMute = () => {
    if (mute) {
      setMute(false);
      setVolume(videoRef.current?.volume! * 100);
    } else {
      setMute(true);
      setVolume(0);
    }
  };

  const handleVolumeChange = (e: any) => {
    setVolume(e.target.value);
    if (videoRef.current?.volume || videoRef.current?.volume === 0) {
      videoRef.current.volume = e.target.value / 100;
    }
    if (Number(e.target.value) === 0) {
      setMute(true);
    } else {
      setMute(false);
    }
  };

  const handleMouseLeave = () => {
    timer.current && clearTimeout(timer.current);
    timer.current = null;
    setControlsShow(false);
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
      showControls();
      handleSeek("FORWARD");
      e.preventDefault();
    } else if (e.code === "ArrowLeft") {
      showControls();
      handleSeek("BACKWARD");
      e.preventDefault();
    } else if (e.code === "Space") {
      showControls();
      handlePlayVideo();
    }
  };

  useEffect(() => {
    window.addEventListener("focusout", handleDOMFocusOut);
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleDOMFocusIn);
    return () => {
      window.removeEventListener("focusout", handleDOMFocusOut);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleDOMFocusIn);
    };
  }, []);

  return (
    <div
      className="video-player-container"
      id="video-player-container"
      ref={containerRef}
    >
      <div
        className="video-wrapper"
        ref={wrapperRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {loading && isPlay && (
          <SpinnerLoading className="video-player-loading" />
        )}
        <PlayEffect isPlay={isPlay} />
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
          onClick={handlePlayVideo}
          onContextMenu={(e) => e.preventDefault()}
          muted={mute}
          onLoadStart={() => {
            setLoading(true);
          }}
          onCanPlay={() => {
            setLoading(false);
          }}
          autoPlay
          onWaiting={() => {
            setLoading(true);
          }}
        >
          <source src={url} type="video/mp4" />
        </video>
        <div
          className={`controls ${
            controlsShow ? "controls-show" : "controls-hide"
          }`}
        >
          <div className="player-progress">
            <input
              type="range"
              min="0"
              max="100"
              step="0.01"
              value={range || 0}
              onChange={handleChangeRange}
              onMouseUp={handleRangeMouseUp}
              onMouseDown={handleRangeMouseDown}
              onTouchStart={handleRangeMouseDown}
              onTouchEnd={handleRangeMouseUp}
              className="input-range"
              style={{
                background: `linear-gradient(to right, #1877f2 ${range}%, #7b7b7b ${range}%)`,
              }}
            ></input>
          </div>
          <div className="main-controls">
            <div className="main-controls_left">
              <button
                onClick={() => handleSeek("BACKWARD")}
                className="btn-rewind"
              >
                <img className="icon-rewind" src={IconRewind} alt="" />
              </button>
              <button onClick={handlePlayVideo} className="btn-play-pause">
                <img
                  src={!videoRef.current?.paused ? IconPause : IconPlay}
                  alt=""
                />
              </button>
              <button
                onClick={() => handleSeek("FORWARD")}
                className="btn-fast-forward"
              >
                <img className="icon-rewind" src={IconRewind} alt="" />
              </button>
              <button className="btn-volume">
                <img
                  src={mute ? IconMute : IconVolume}
                  alt=""
                  onClick={handleSetMute}
                />
                <div className="input-volume-wrapper">
                  <input
                    type="range"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="input-volume"
                    style={{
                      background: `linear-gradient(to right, #ff2b2b ${volume}%,#ffffff  ${volume}%)`,
                    }}
                  />
                </div>
              </button>
              <span className="clock">
                {formatTime(timeClock)} /{" "}
                {formatTime(videoRef.current?.duration || 0)}
              </span>
            </div>
            <div className="main-controls_right">
              <button onClick={handlePip} className="btn-pip">
                <img src={isPip ? IconEXitPip : IconPip} alt="" />
              </button>
              <button onClick={handleExitFull} className="btn-full-screen">
                <img
                  src={isFullScreen ? IconExitFullScreen : IconFullScreen}
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
